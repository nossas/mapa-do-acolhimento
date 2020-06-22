import { extractTypeFromSubject } from "../../utils";
import { Ticket } from "../../types";
import dbg from "../../dbg";

const log = dbg.extend("checkOldTickets");

const getStatusAcolhimento = (ticket: Ticket): string | boolean => {
  const status = ticket.fields.find(field => field.id === 360014379412);
  return status && status.value;
};

export default (
  subject: string,
  tickets: Ticket[]
): false | number | number[] => {
  log("Checking old tickets");
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
      status_acolhimento != "atendimento__concluído"
    );
  });

  // she has a match ticket
  if (hasACurrentMatch.length > 0) return hasACurrentMatch.map(t => t.id);

  const oldestTicket = hasSameSubject.sort(
    (a, b) => (new Date(a.created_at) as any) - (new Date(b.created_at) as any)
  )[0];

  const status_acolhimento = getStatusAcolhimento(oldestTicket);
  return status_acolhimento === "solicitação_recebida" && oldestTicket.id;
};
