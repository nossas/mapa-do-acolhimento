import { capitalize, formatDate } from "../../utils";
import { User, PartialTicket } from "../../types";
import logger from "../../logger";

const log = logger.child({ module: "composeTickets" });

interface HasuraUser extends User {
  community_id: number;
  user_id: number;
}

export default (users): PartialTicket[] => {
  log.info("Entering tickets creation logic");
  const tickets: PartialTicket[] = users.map((user: HasuraUser) => {
    const {
      user_fields: {
        data_de_inscricao_no_bonde,
        tipo_de_acolhimento,
        city,
        state
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

    return {
      ...ticket,
      subject: subject(tipo_de_acolhimento || "Sem tipo de acolhimento")
    };
  });
  return tickets.flat(2);
};
