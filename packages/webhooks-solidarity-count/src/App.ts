import { userToContact } from "components/dist";
import { getGeolocation } from "bonde-core-tools";
import handleUserFields from "./interfaces/User/handleUserFields";
import getTicket from "./zendesk/getTicket";
import dbg from "./dbg";
import getUserRequestedTickets from "./zendesk/getUserRequestedTickets";
import updateRequesterFields from "./zendesk/updateRequesterFields";
import countTickets from "./countTickets";
import verifyOrganization from "./verifyOrganizations";
import { ORGANIZATIONS } from "./interfaces/Organizations";
import updateHasura from "./updateHasura";
import updateUserTicketCount from "./hasura/updateUserTicketCount";
import getUser from "./zendesk/getUser";
import saveUsers from "./hasura/saveUsers";
import handleCustomFields from "./interfaces/Ticket/handleCustomFields";
import parseZipcode from "./util/parseZipcode";
import handleTicketId from "./interfaces/Ticket/handleTicketId";

const log = dbg.child({ module: "app" });

/**
 * @param ticket_id ID do ticket
 */
const App = async (ticket_id: string) => {
  // Busca o ticket no zendesk
  const response = await getTicket(ticket_id);
  if (!response) {
    return Promise.reject({
      status: 404,
      msg: `Can't find ticket '${ticket_id}' in Zendesk.`
    });
  }

  // Converte o ticket para conter os custom_fields na raiz
  const { ticket: ticketWithoutCustomValues } = response.data;
  const ticket = handleCustomFields(handleTicketId(ticketWithoutCustomValues));

  const hasuraTicket = await updateHasura(ticket);

  // Salva o ticket no Hasura
  if (!hasuraTicket) {
    return Promise.reject({
      status: 502,
      msg: `Failed to save ticket ${ticket_id} in Hasura.`
    });
  }
  log.info(`Ticket '${ticket_id}' updated in Hasura.`);

  // Busca a usuária no zendesk
  const getUserResponse = await getUser(ticket.requester_id);
  if (!getUserResponse) {
    return Promise.reject({
      status: 404,
      msg: `Failed to get user ${ticket.requester_id} in Zendesk.`
    });
  }

  let userWithUserFields = handleUserFields(getUserResponse.data.user);

  const organization = await verifyOrganization(ticket);

  if (!organization) {
    return Promise.reject({
      status: 422,
      msg: `Failed to parse the organization_id for this ticket '${ticket_id}'`
    });
  }

  // Atualizando todos os campos das usuárias
  // Buscando e setando lat/lng/address
  const parsedZipcode = parseZipcode(
    userWithUserFields.cep && userWithUserFields.cep
  );

  // Caso o CEP possa ser um número e não é vazio
  if (userWithUserFields.cep && userWithUserFields.cep !== null) {
    const coordinates = await getGeolocation({
      cep: userWithUserFields.cep,
      email: userWithUserFields.email
    });

    userWithUserFields = {
      ...userWithUserFields,
      ...coordinates,
      cep: parsedZipcode,
      user_fields: {
        ...userWithUserFields.user_fields,
        ...coordinates,
        cep: parsedZipcode
      }
    };

    // Atualiza a usuária voluntária no zendesk
    const updateRequesterZendeskResponse = await updateRequesterFields(
      ticket.requester_id,
      coordinates
    );
    if (!updateRequesterZendeskResponse) {
      return Promise.reject({
        status: 502,
        msg: `Can't update lat/lng/address for user '${ticket.requester_id}' in Zendesk. Ticket '${ticket_id}'.`
      });
    }
    log.info(`
      User '${ticket.requester_id}' lat/lng/address updated in Zendesk.
    `);
  }

  // Save users in Mautic
  await userToContact([userWithUserFields]);

  // Salva a usuária no Hasura
  const saveUserResponse = await saveUsers([userWithUserFields]);
  if (!saveUserResponse) {
    return Promise.reject({
      status: 502,
      msg: `Failed to save user '${ticket.requester_id}' in Hasura. Ticket ${ticket.ticket_id}.`
    });
  }
  log.info(`User '${ticket.requester_id}' fields updated in Hasura`);

  if (organization === ORGANIZATIONS.MSR) {
    log.info(
      `Updated ticket '${ticket_id}' belongs to MSR organization, recount tickets isn't necessary.`
    );
    log.info("Finished sync");
    return "Ok!";
  }

  // Faz o count dos tickets das voluntárias e atualiza no zendesk e hasura
  // Busca todos os tickets do requester_id
  const ticketsFromUser = await getUserRequestedTickets(ticket.requester_id);
  if (!ticketsFromUser) {
    return Promise.reject({
      status: 404,
      msg: `Can't find tickets for user '${ticket.requester_id}' in Zendesk. Ticket '${ticket_id}'.`
    });
  }

  // Conta os tickets
  const {
    data: { tickets }
  } = ticketsFromUser;
  const countTicket = countTickets(tickets.map(i => handleCustomFields(i)));

  // Atualiza o count da voluntária no zendesk
  const updateRequesterZendeskResponse = await updateRequesterFields(
    ticket.requester_id,
    countTicket
  );

  if (!updateRequesterZendeskResponse) {
    return Promise.reject({
      status: 502,
      msg: `Can't update user count for user '${ticket.requester_id}' in Zendesk. Ticket '${ticket_id}'.`
    });
  }
  log.info(
    `User '${ticket.requester_id}' count updated in Zendesk. Ticket '${ticket_id}'.`
  );

  // Atualiza o count da voluntária no Hasura
  const saveUsersHasuraResponse = await updateUserTicketCount([
    {
      user_id: ticket.requester_id,
      ...countTicket
    }
  ]);

  if (!saveUsersHasuraResponse) {
    return Promise.reject({
      status: 502,
      msg: `Failed to update user count '${ticket.requester_id}' in Hasura.`
    });
  }

  log.info(
    `User '${ticket.requester_id}' count updated in Hasura. Ticket '${ticket_id}'.`
  );
  log.info("Finished sync");
  return "Ok!";
};

export default App;
