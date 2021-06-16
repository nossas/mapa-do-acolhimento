import Express, { Response } from "express";
import debug, { Debugger } from "debug";
import { userToContact } from "components/dist";
import AdvogadaCreateUser from "./integrations/AdvogadaCreateUser";
import PsicologaCreateUser from "./integrations/PsicologaCreateUser";
import ListTicketsFromUser from "./integrations/ListTicket";
import AdvogadaCreateTicket from "./integrations/AdvogadaCreateTicket";
import AdvogadaUpdateTicket from "./integrations/AdvogadaUpdateTicket";
import PsicologaCreateTicket from "./integrations/PsicologaCreateTicket";
import PsicologaUpdateTicket from "./integrations/PsicologaUpdateTicket";
import read_mautic_request from "./filterService";
import { FILTER_FORM_NAME_STATUS, filterFormName } from "./filterFormName";
import getFormEntries from "./getFormEntries";
import BondeCreatedDate from "./integrations/BondeCreatedDate";
import { checkNames, checkCep } from "./utils";

// interface DataType {
//   data: {
//     logTable: {
//       returning: {
//         id: number;
//       }[];
//     };
//   };
// }

// interface FormData {
//   cep: string;
// }

class Server {
  private server = Express().use(Express.json());

  private dbg: Debugger;

  // private formData?: FormData;

  constructor() {
    this.dbg = debug("webhooks-mautic-zendesk");
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
      return undefined;
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
        const advogadaCreateTicket = new AdvogadaCreateTicket(res);
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
      const psicólogaCreateTicket = new PsicologaCreateTicket(res);
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
        res
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
      res
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
    
    this.dbg(`PORT ${PORT}`);

    this.server
      .get("/", async (_req, res) => {
        return res.status(200).json({ status: 'success' });
      })
      .post("/asdads", async (req, res) => {
        const data = read_mautic_request(req);

        // if (serviceStatus === FILTER_SERVICE_STATUS.NOT_DESIRED_SERVICE) {
        //   return res
        //     .status(200)
        //     .json(
        //       `Service "${serviceName}" isn't desired, but everything is OK.`
        //     );
        // }
        // if (serviceStatus === FILTER_SERVICE_STATUS.INVALID_REQUEST) {
        //   this.dbg("Erro desconhecido ao filtrar por serviço.");
        //   return res
        //     .status(400)
        //     .json("Erro desconhecido ao filtrar por serviço.");
        // }

        const {
          InstanceClass,
          results,
          status: formNameStatus,
          name,
          data: errorData,
          dateSubmitted
        } = await filterFormName(data!);
        if (formNameStatus === FILTER_FORM_NAME_STATUS.FORM_NOT_IMPLEMENTED) {
          this.dbg(`Form "${name}" not implemented. But it's ok`);
          return res
            .status(200)
            .json(`Form "${name}" not implemented. But it's ok`);
        }
        if (formNameStatus === FILTER_FORM_NAME_STATUS.INVALID_REQUEST) {
          this.dbg("Invalid request.");
          this.dbg(errorData);
          return res.status(400).json("Invalid request, see logs.");
        }

        if (!results || !dateSubmitted) {
          return res
            .status(400)
            .json("Invalid request, failed to parse results");
        }

        const formEntries = await getFormEntries();
        if (!formEntries) {
          return this.dbg("getFormEntries error");
        }

        const bondeCreatedDate = new BondeCreatedDate(
          results.email,
          checkNames(results),
          checkCep(results.cep)
        );
        const bondeCreatedAt = await bondeCreatedDate.start(formEntries);

        if (!bondeCreatedAt) {
          return this.dbg(bondeCreatedAt);
        }

        const instance = await new InstanceClass!(res);
        let user;
        if (instance instanceof AdvogadaCreateUser) {
          user = await instance.start(results, bondeCreatedAt);
        } else if (instance instanceof PsicologaCreateUser) {
          user = await instance.start(results!, bondeCreatedAt);
        }

        if (!user.response) {
          this.dbg(`Failed to create user ${results.email}`);
          return res.status(500).json("Failed to create user");
        }

        const {
          response: {
            data: {
              user: createdUser,
              user: {
                created_at: responseCreatedAt,
                updated_at: responseUpdatedAt,
                id: userId
              }
            }
          }
        } = user;

        // Save users in Mautic
        await userToContact([{ ...createdUser, user_id: userId }]);

        if (responseCreatedAt === responseUpdatedAt) {
          this.dbg(`Success, created user "${userId}"!`);
        } else {
          this.dbg(`Success, updated user "${userId}"!`);
        }

        const resultTicket = (await this.createTicket(
          instance,
          createdUser,
          dateSubmitted,
          res
        )) as { data: { ticket: { id: number } } };
        if (resultTicket) {
          this.dbg(`Success updated ticket "${resultTicket.data.ticket.id}".`);

          return res.status(200).json("Success finish integration");
        }
        this.dbg("Failed to create ticket");
        return res.status(500).json("Failed failed integration");
      })
      .listen(Number(PORT), "0.0.0.0", () => {
        this.dbg(`Server listen on port ${PORT}`);
      });
  };
}

export default Server;
