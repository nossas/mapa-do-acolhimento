import { Response, Request } from "express";
import { userToContact } from "components";
import AdvogadaCreateUser from "../integrations/AdvogadaCreateUser";
import PsicologaCreateUser from "../integrations/PsicologaCreateUser";
import ListTicketsFromUser from "../integrations/ListTicket";
import AdvogadaCreateTicket from "../integrations/AdvogadaCreateTicket";
import AdvogadaUpdateTicket from "../integrations/AdvogadaUpdateTicket";
import PsicologaCreateTicket from "../integrations/PsicologaCreateTicket";
import PsicologaUpdateTicket from "../integrations/PsicologaUpdateTicket";
import { FILTER_SERVICE_STATUS, filterService } from "../filterService";
import { FILTER_FORM_NAME_STATUS, filterFormName } from "../filterFormName";
import log, { apmAgent } from "../dbg";
import { getFormEntries } from "../getFormEntries";
import BondeCreatedDate from "../integrations/BondeCreatedDate";
import { checkNames, checkCep } from "../utils";

const dictionary: { [s: string]: string } = {
  aprovada: "aprovada",
  reprovada_estudo_de_caso: "reprovada_-_estudo_de_caso",
  reprovada_registro_inválido: "reprovada_-_registro_inválido",
  reprovada_diretrizes_do_mapa: "reprovada_-_diretrizes_do_mapa"
};

const createTicket = async (
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
      const advogadaCreateTicket = new AdvogadaCreateTicket(res, apmAgent);
      return advogadaCreateTicket.start({
        requester_id: id,
        organization_id,
        description: "-",
        status_inscricao: "aprovada",
        subject: `[Advogada] ${name} - ${registration_number}`,
        custom_fields: [
          {
            id: 360021665652,
            value: dictionary[condition]
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
    const psicologaCreateTicket = new PsicologaCreateTicket(res, apmAgent);
    return psicologaCreateTicket.start({
      requester_id: id,
      organization_id,
      description: "-",
      status_inscricao: "aprovada",
      subject: `[Psicóloga] ${name} - ${registration_number}`,
      custom_fields: [
        {
          id: 360021665652,
          value: dictionary[condition]
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
      apmAgent
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
          value: dictionary[condition]
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
    apmAgent
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
        value: dictionary[condition]
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

export const hasuraZendeskHandle = async (req: Request, res: Response) => {
  const { status: serviceStatus, serviceName, data } = filterService(req.body);

  apmAgent?.setCustomContext({
    serviceStatus
  });

  if (serviceStatus === FILTER_SERVICE_STATUS.NOT_DESIRED_SERVICE) {
    return res
      .status(200)
      .json(`Service "${serviceName}" isn't desired, but everything is OK.`);
  }
  if (serviceStatus === FILTER_SERVICE_STATUS.INVALID_REQUEST) {
    log.warn("Unkown error while filtering by service status");
    return res
      .status(400)
      .json("Unkown error while filtering by service status");
  }

  const {
    InstanceClass,
    results,
    status: formNameStatus,
    name,
    data: errorData,
    dateSubmitted
  } = await filterFormName(data!, apmAgent);
  apmAgent?.setUserContext({ email: results.email });
  apmAgent?.setCustomContext({ formNameStatus });

  if (formNameStatus === FILTER_FORM_NAME_STATUS.FORM_NOT_IMPLEMENTED) {
    log.warn(`Form "${name}" not implemented. But it's ok`);
    return res.status(200).json(`Form "${name}" not implemented. But it's ok`);
  }

  if (formNameStatus === FILTER_FORM_NAME_STATUS.INVALID_REQUEST) {
    log.error("Invalid request.");
    log.error(errorData as object);
    return res.status(400).json("Invalid request, see logs.");
  }

  if (!results || !dateSubmitted) {
    return res.status(400).json("Invalid request, failed to parse results");
  }

  const formEntries = await getFormEntries(results.email, apmAgent);
  if (!formEntries) {
    return res.status(500);
  }

  const bondeCreatedDate = new BondeCreatedDate(
    results.email,
    checkNames(results),
    checkCep(results.cep),
    apmAgent
  );
  const bondeCreatedAt = await bondeCreatedDate.start(formEntries);

  const instance = await new InstanceClass!(res, apmAgent);
  let user;
  if (instance instanceof AdvogadaCreateUser) {
    user = await instance.start(results, bondeCreatedAt);
  } else if (instance instanceof PsicologaCreateUser) {
    user = await instance.start(results!, bondeCreatedAt);
  }

  if (!user.response) {
    log.error(`Failed to create user ${results.email}`);
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

  apmAgent.setUserContext({ id: userId });

  // Save users in Mautic
  await userToContact([{ ...createdUser, user_id: userId }]);

  if (responseCreatedAt === responseUpdatedAt) {
    log.info(`Success, created user "${userId}"!`);
  } else {
    log.info(`Success, updated user "${userId}"!`);
  }

  const resultTicket = (await createTicket(
    instance,
    createdUser,
    dateSubmitted,
    res
  )) as { data: { ticket: { id: number } } };
  if (resultTicket) {
    log.info(`Success updated ticket "${resultTicket.data.ticket.id}".`);
    return res.status(200).json("Success finish integration");
  }
  log.error("Failed to create ticket");
  return res.status(500).json("Failed failed integration");
};
