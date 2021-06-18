import Express, { Response } from "express";
import { Logger } from "pino";
// import debug, { Debugger } from "debug";
import log from "./dbg";
import { userToContact } from "components/dist";
import AdvogadaCreateUser from "./integrations/AdvogadaCreateUser";
import PsicologaCreateUser from "./integrations/PsicologaCreateUser";
import ListTicketsFromUser from "./integrations/ListTicket";
import AdvogadaCreateTicket from "./integrations/AdvogadaCreateTicket";
import AdvogadaUpdateTicket from "./integrations/AdvogadaUpdateTicket";
import PsicologaCreateTicket from "./integrations/PsicologaCreateTicket";
import PsicologaUpdateTicket from "./integrations/PsicologaUpdateTicket";
import read_mautic_request from "./filterService";
import { filterFormName, FILTER_FORM_NAME_STATUS } from "./filterFormName";
import createZendeskUser from "./integration-functions/create-user";

class Server {
  private server = Express().use(Express.json());

  private dbg: Logger;
  private apm: any;

  constructor(apm) {
    this.dbg = log;
    this.apm = apm;
  }

  dictionary: { [s: string]: string } = {
    aprovada: "aprovada",
    reprovada_estudo_de_caso: "reprovada_-_estudo_de_caso",
    reprovada_registro_inválido: "reprovada_-_registro_inválido",
    reprovada_diretrizes_do_mapa: "reprovada_-_diretrizes_do_mapa"
  };

  createTicket = async (
    instance: AdvogadaCreateUser | PsicologaCreateUser,
    {
      id,
      organization_id,
      name,
      phone,
      user_fields: { registration_number, condition, state, city }
    },
    created_at: string,
    res: Response
  ) => {
    const listTickets = new ListTicketsFromUser(id, res);
    const tickets = await listTickets.start();
    if (!tickets) {
      return res.status(404).json(`Ticket not found for user ${id}`);
    }
    const filteredTickets = (tickets as {
      data: { tickets };
    }).data.tickets.filter(i => {
      if (instance instanceof AdvogadaCreateUser) {
        return (
          ["open", "new", "pending", "hold"].includes(i.status) &&
          i.subject === `[Advogada] ${name} - ${registration_number}`
        );
      }
      return (
        ["open", "new", "pending", "hold"].includes(i.status) &&
        i.subject === `[Psicóloga] ${name} - ${registration_number}`
      );
    });

    if (filteredTickets.length === 0) {
      if (instance instanceof AdvogadaCreateUser) {
        const advogadaCreateTicket = new AdvogadaCreateTicket(res, this.apm);
        return advogadaCreateTicket.start({
          requester_id: id,
          organization_id,
          description: "-",
          status_inscricao: "aprovada",
          subject: `[Advogada] ${name} - ${registration_number}`,
          custom_fields: [
            {
              id: 360021665652,
              value: this.dictionary[condition]
            },
            {
              id: 360016631592,
              value: name
            },
            {
              id: 360021812712,
              value: phone
            },
            {
              id: 360021879791,
              value: state
            },
            {
              id: 360021879811,
              value: city
            }
          ],
          created_at
        });
      }
      const psicólogaCreateTicket = new PsicologaCreateTicket(res, this.apm);
      return psicólogaCreateTicket.start({
        requester_id: id,
        organization_id,
        description: "-",
        status_inscricao: "aprovada",
        subject: `[Psicóloga] ${name} - ${registration_number}`,
        custom_fields: [
          {
            id: 360021665652,
            value: this.dictionary[condition]
          },
          {
            id: 360016631592,
            value: name
          },
          {
            id: 360021812712,
            value: phone
          },
          {
            id: 360021879791,
            value: state
          },
          {
            id: 360021879811,
            value: city
          }
        ],
        created_at
      });
    }
    if (instance instanceof AdvogadaCreateUser) {
      const advogadaUpdateTicket = new AdvogadaUpdateTicket(
        filteredTickets[0].id,
        res,
        this.apm
      );
      return advogadaUpdateTicket.start({
        requester_id: id,
        organization_id,
        description: "-",
        status_inscricao: "aprovada",
        subject: `[Advogada] ${name} - ${registration_number}`,
        custom_fields: [
          {
            id: 360021665652,
            value: this.dictionary[condition]
          },
          {
            id: 360016631592,
            value: name
          },
          {
            id: 360021812712,
            value: phone
          },
          {
            id: 360021879791,
            value: state
          },
          {
            id: 360021879811,
            value: city
          }
        ]
      });
    }
    const psicólogaUpdateTicket = new PsicologaUpdateTicket(
      filteredTickets[0].id,
      res,
      this.apm
    );
    return psicólogaUpdateTicket.start({
      requester_id: id,
      organization_id,
      description: "-",
      status_inscricao: "aprovada",
      subject: `[Psicóloga] ${name} - ${registration_number}`,
      custom_fields: [
        {
          id: 360021665652,
          value: this.dictionary[condition]
        },
        {
          id: 360016631592,
          value: name
        },
        {
          id: 360021812712,
          value: phone
        },
        {
          id: 360021879791,
          value: state
        },
        {
          id: 360021879811,
          value: city
        }
      ]
    });
  };

  start = () => {
    const { PORT } = process.env;

    this.server
      .get("/", async (_req, res) => {
        return res.status(200).json({ status: "success" });
      })
      .post("/mautic-zendesk", async (req, res) => {
        const data = read_mautic_request(req);

        const {
          results,
          organization,
          status: formNameStatus,
          name,
          data: errorData,
          dateSubmitted
        } = await filterFormName(data!, this.apm);

        this.apm.setCustomContext({
          formNameStatus
        });

        if (formNameStatus === FILTER_FORM_NAME_STATUS.FORM_NOT_IMPLEMENTED) {
          this.dbg.warn(`Form "${name}" not implemented. But it's ok`);
          return res
            .status(404)
            .json({ error: `Form "${name}" not implemented. But it's ok` });
        }

        if (formNameStatus === FILTER_FORM_NAME_STATUS.INVALID_REQUEST) {
          this.dbg.error("Invalid request.");
          this.dbg.error(errorData as object);
          return res.status(404).json({ error: "Invalid request, see logs." });
        }

        if (!results || !dateSubmitted) {
          return res
            .status(404)
            .json({ error: "Invalid request, failed to parse results" });
        }

        try {
          const user = await createZendeskUser({ results, organization });

          if (!user) {
            this.dbg.error(`Failed to create user ${results.email}`);
            return res.status(500).json("Failed to Create Zendesk User");
          }

          this.apm.setUserContext({ id: user.user_id });

          // Save users in Mautic
          await userToContact([user]);

          if (user.created_at === user.updated_at) {
            this.dbg.info(`Success, created user "${user.user_id}"`);
          } else {
            this.dbg.info(`Success, updated user "${user.user_id}"`);
          }

          return res.status(200).json({ user });
        } catch (e) {
          this.dbg.error(`createZendeskUser ${e}`);
          return res
            .status(500)
            .json({ error: "Failed to Create Zendesk User" });
        }

        // const resultTicket = (await this.createTicket(
        //   instance,
        //   createdUser,
        //   dateSubmitted,
        //   res
        // )) as { data: { ticket: { id: number } } };
        // if (resultTicket) {
        //   this.dbg(`Success updated ticket "${resultTicket.data.ticket.id}".`);

        //   return res.status(200).json("Success finish integration");
        // }
        // this.dbg("Failed to create ticket");
        // return res.status(500).json("Failed failed integration");
      })
      .listen(Number(PORT), "0.0.0.0", () => {
        this.dbg.info(`Server listen on port ${PORT}`);
      });
  };
}

export default Server;
