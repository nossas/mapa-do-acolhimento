import { extractTypeFromSubject, getStatusAcolhimento } from "../../utils";
import { Ticket } from "../../types";
import logger from "../../logger";

const log = logger.child({ module: "checkOldTickets" });

const getOldestTicket = (tickets: Ticket[]) =>
  tickets.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )[0];

export default (
  subject: string,
  tickets: Ticket[]
): { relatedTickets: number | number[]; agent: number } | false => {
  log.info("Checking old tickets");
  const newSubject = extractTypeFromSubject(subject);

  const hasSameSubject = tickets.filter(oldTicket => {
    const oldSubject = extractTypeFromSubject(oldTicket.subject);
    return (
      oldSubject === newSubject &&
      oldTicket.status !== "closed" &&
      oldTicket.status !== "solved"
    );
  });

  if (hasSameSubject.length < 1) return false;

  const hasACurrentMatch = hasSameSubject.filter(oldTicket => {
    const status_acolhimento = getStatusAcolhimento(oldTicket);
    return (
      status_acolhimento != "solicitação_recebida" &&
      status_acolhimento != "encaminhamento__negado" &&
      status_acolhimento != "atendimento__interrompido" &&
      status_acolhimento != "encaminhamento__realizado_para_serviço_público" &&
      status_acolhimento != "atendimento__concluído" &&
      status_acolhimento != "solicitação_repetida"
    );
  });

  // she has a match ticket
  if (hasACurrentMatch.length > 0)
    return {
      relatedTickets: hasACurrentMatch.map(t => t.id),
      agent: getOldestTicket(hasACurrentMatch).assignee_id as number
    };

  const oldestTicket = getOldestTicket(hasSameSubject);
  const status_acolhimento = getStatusAcolhimento(oldestTicket);
  return status_acolhimento === "solicitação_recebida"
    ? {
        relatedTickets: oldestTicket.id,
        agent: oldestTicket.assignee_id as number
      }
    : false;
};
