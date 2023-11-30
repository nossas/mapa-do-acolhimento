import { capitalize, formatDate } from "../../utils";
import { User, PartialTicket } from "../../types";
import logger from "../../logger";

const log = logger.child({ labels: { process: "composeTickets" } });

export default (users): PartialTicket[] => {
  log.info("Entering tickets creation logic");
  const tickets: PartialTicket[] = users.map((user: User) => {
    const {
      user_fields: {
        data_de_inscricao_no_bonde,
        tipo_de_acolhimento,
        city,
        state,
        condition
      },
      external_id,
      name,
      user_id
    } = user;

    // if (!tipo_de_acolhimento) {
    //   log("Only MSR's get their ticket created.");
    //   return log("Ticket integration is done.");
    // }

    const subject = (type: string) =>
      `[${capitalize(type)}] ${name}, ${city} - ${state}`;

    const ticket = {
      external_id,
      comment: {
        body: "Importado pelo BONDE.",
        public: false
      },
      requester_id: user_id,
      custom_fields: [
        { id: 360017056851, value: formatDate(data_de_inscricao_no_bonde) },
        { id: 360014379412, value: "solicitação_recebida" },
        { id: 360016681971, value: name }
      ]
    };

    if (tipo_de_acolhimento === "psicológico_e_jurídico") {
      return ["psicológico", "jurídico"].map(i => ({
        ...ticket,
        subject: subject(i)
      }));
    }

    const defaultTicket = {
      ...ticket,
      subject: subject(tipo_de_acolhimento || "Sem tipo de acolhimento")
    };

    //MSR condition "desabilitada"
    if (condition === "desabilitada") {
      return {
        ...defaultTicket,
        status: "solved",
        tags: ["fora-do-perfil"]
      };
    }

    //MSR condition "inscrita"
    return defaultTicket;
  });
  return tickets.flat(2);
};
