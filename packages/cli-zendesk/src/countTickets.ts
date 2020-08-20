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
  const promises = tickets
    .filter(
      i =>
        i.status !== "deleted" && i.status !== "solved" && i.status !== "closed"
    )
    .map(async i => {
      const organization_id = await verifyOrganization(i);

      if (organization_id !== null) {
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
        // Atualiza os atendimentos em andamento:
        switch (i.status_acolhimento) {
          case "atendimento__iniciado":
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
