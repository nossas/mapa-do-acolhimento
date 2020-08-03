import { Response } from "express";
import { userToContact } from "components/dist";
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
import setCommunity from "./util/setCommunity";
import getLatLng from "./util/getLatLng";
import parseZipcode from "./util/parseZipcode";
import handleTicketId from "./interfaces/Ticket/handleTicketId";
import { Client } from "@googlemaps/google-maps-services-js";

const log = dbg.extend("app");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const maps = (cep: string): Promise<any> => {
  const client = new Client({});

  return client.geocode({
    params: {
      address: `${cep},BR`,
      key: process.env.GOOGLE_MAPS_API_KEY
    },
    timeout: 1000 // milliseconds
  });
};

/**
 * @param ticket_id ID do ticket
 */
const App = async (ticket_id: string, res: Response) => {
  // Busca o ticket no zendesk
  const response = await getTicket(ticket_id);
  if (!response) {
    return res.status(500).json(`Can't find ticket '${ticket_id}'.`);
  }

  // Converte o ticket para conter os custom_fields na raiz
  const { ticket: ticketWithoutCustomValues } = response.data;
  const ticket = handleCustomFields(
    setCommunity(handleTicketId(ticketWithoutCustomValues))
  );

  // Salva o ticket no Hasura
  if (!(await updateHasura(ticket))) {
    log(`Failed to update ticket '${ticket_id}' in Hasura.`);
    return res.status(500).json("Failed to save ticket in Hasura.");
  }
  log(`Ticket '${ticket_id}' updated in Hasura.`);

  // Busca a usuária no zendesk
  const getUserResponse = await getUser(ticket.requester_id);
  if (!getUserResponse) {
    log(`Failed to get user '${ticket.requester_id}'.`);
    return res.status(500).json("Failed to get user.");
  }

  let userWithUserFields = handleUserFields(getUserResponse.data.user);

  const organization = await verifyOrganization(ticket);

  // Atualizando todos os campos das usuárias
  // Buscando e setando lat/lng/address
  if (
    organization === ORGANIZATIONS.MSR ||
    organization === ORGANIZATIONS.ADVOGADA ||
    organization === ORGANIZATIONS.PSICOLOGA
  ) {
    const parsedZipcode = parseZipcode(
      userWithUserFields.cep && userWithUserFields.cep
    );

    // Caso o CEP possa ser um número e não é vazio
    if (userWithUserFields.cep && userWithUserFields.cep !== null) {
      const coordinates = await getLatLng(userWithUserFields.cep, maps);

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
        log(
          `Can't update user fields for user '${ticket.requester_id}', ticket '${ticket_id}'.`
        );
        return res.status(500).json("Can't update user fields.");
      }
      log(`User '${ticket.requester_id}' lat/lng/address updated in Zendesk.`);
    }

    // Save users in Mautic
    await userToContact([userWithUserFields]);

    // Salva a usuária no Hasura
    const saveUserResponse = await saveUsers([userWithUserFields]);
    if (!saveUserResponse) {
      log(
        `Failed to save user '${ticket.requester_id}'. Ticket ${ticket.ticket_id}.`
      );
      return res.status(500).json("Failed to save user.");
    }
    log(`User '${ticket.requester_id}' fields updated in Hasura`);
  }

  // Faz o count dos tickets das voluntárias e atualiza no zendesk e hasura
  if (
    organization === ORGANIZATIONS.ADVOGADA ||
    organization === ORGANIZATIONS.PSICOLOGA
  ) {
    // Busca todos os tickets do requester_id
    const ticketsFromUser = await getUserRequestedTickets(ticket.requester_id);
    if (!ticketsFromUser) {
      log(
        `Can't find tickets for user '${ticket.requester_id}', ticket '${ticket_id}'.`
      );
      return res.status(500).json("Can't find tickets.");
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
      log(
        `Can't update user count for user '${ticket.requester_id}', ticket '${ticket_id}'.`
      );
      return res.status(500).json("Can't update user count.");
    }
    log(
      `User '${ticket.requester_id}' count updated in Zendesk, ticket '${ticket_id}'.`
    );

    // Atualiza o count da voluntária no Hasura
    const saveUsersHasuraResponse = await updateUserTicketCount([
      {
        user_id: ticket.requester_id,
        ...countTicket
      }
    ]);

    if (!saveUsersHasuraResponse) {
      log(`Failed to update user count '${ticket.requester_id}' in Hasura.`);
      return res.status(500).json("Failed to update user count in Hasura.");
    }

    log(
      `User '${ticket.requester_id}' count updated in Hasura, ticket '${ticket_id}'.`
    );
    log("Finished sync");
    return res.status(200).json("Ok!");
  }

  if (organization === ORGANIZATIONS.MSR) {
    log(
      `Updated ticket '${ticket_id}' belongs to MSR organization, recount tickets isn't necessary.`
    );
    log("Finished sync");
    return res.status(200).json("Ok!");
  }

  log("Finished sync");
  return res
    .status(202)
    .json(`Failed to parse the organization_id for this ticket '${ticket_id}`);
};

export default App;
