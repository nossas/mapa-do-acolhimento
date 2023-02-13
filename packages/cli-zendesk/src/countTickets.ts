import verifyOrganization from "./verifyOrganizations";
import { Requesters } from "./interfaces/Requester";
import { Ticket } from "./interfaces/Ticket";
// import updateTicketRelation from "./updateTicketRelation";

/*
  Initiates a requester entry if none was already initiated, then adds to their calculated fields accordingly.
  Each ticket has a requester, but the fields "calculado" are in the user fields. That's why we need to initiate the requesters object, and add to the "calculado" field according to the requester_id.
*/
const countTickets = async (tickets: Ticket[]): Promise<Requesters> => {
  const requesters: Requesters = {};
  const promises = tickets.map(async i => {
    const organization_id = await verifyOrganization(i);

    // Cria um pivô e inicializa o valor
    let requester = requesters[i.requester_id];
    if (!requesters[i.requester_id]) {
      requesters[i.requester_id] = {
        id: i.requester_id,
        atendimentos_em_andamento_calculado_: 0,
        atendimentos_concludos_calculado_: 0,
        encaminhamentos_realizados_calculado_: 0
      };
      requester = requesters[i.requester_id];
    }

    if (
      organization_id !== null &&
      i.status !== "deleted" &&
      i.status !== "solved" &&
      i.status !== "closed"
    ) {
      switch (i.status_acolhimento) {
        case "atendimento__iniciado":
          requester.atendimentos_em_andamento_calculado_ += 1;
          break;
        case "atendimento_triagem_1":
          requester.atendimentos_em_andamento_calculado_ += 1;
          break;
        case "atendimento_triagem_2":
          requester.atendimentos_em_andamento_calculado_ += 1;
          break;
        case "atendimento_acompanhamento_1":
          requester.atendimentos_em_andamento_calculado_ += 1;
          break;
        case "atendimento_acompanhamento_2":
          requester.atendimentos_em_andamento_calculado_ += 1;
          break;
        case "atendimento__concluído":
          requester.atendimentos_concludos_calculado_ += 1;
          break;
        case "encaminhamento__realizado":
        case "encaminhamento__realizado_para_serviço_público":
          requester.encaminhamentos_realizados_calculado_ += 1;
          break;
        default:
          return;
      }
    }
  });

  await Promise.all(promises);
  return requesters;
};

export default countTickets;
