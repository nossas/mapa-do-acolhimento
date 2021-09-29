import { Request, Response } from "express";
import { userToContact } from "components";
import log, { apmAgent } from "../dbg";
import { readMauticRequest } from "../filterService";
import { customFilterName, FILTER_FORM_NAME_STATUS } from "../filterFormName";
import createZendeskUser from "../integration-functions/create-user";
import createOrUpdateTicket from "../integration-functions/create-or-update-ticket";

export const mauticZendeskHandle = async (req: Request, res: Response) => {
  const data = await readMauticRequest(req);
  const {
    results,
    organization,
    status: formNameStatus,
    name,
    data: errorData,
    dateSubmitted
  } = await customFilterName(data!);

  apmAgent?.setCustomContext({
    formNameStatus
  });

  if (formNameStatus === FILTER_FORM_NAME_STATUS.FORM_NOT_IMPLEMENTED) {
    log.warn(`Form "${name}" not implemented. But it's ok`);
    return res
      .status(404)
      .json({ error: `Form "${name}" not implemented. But it's ok` });
  }

  if (formNameStatus === FILTER_FORM_NAME_STATUS.INVALID_REQUEST) {
    log.error("Invalid request.");
    log.error(errorData as object);
    return res.status(404).json({ error: "Invalid request, see logs." });
  }

  if (!results || !dateSubmitted) {
    return res
      .status(404)
      .json({ error: "Invalid request, failed to parse results" });
  }

  try {
    const user = await createZendeskUser({ results, organization });

    if (!user) {
      log.error(`Failed to create user ${results.email}`);
      return res.status(500).json("Failed to Create Zendesk User");
    }

    apmAgent?.setUserContext({ id: user.user_id || user.user_id });

    // Save users in Mautic
    await userToContact([user]);

    if (user.created_at === user.updated_at) {
      log.info(`Success, created user "${user.user_id}"`);
    } else {
      log.info(`Success, updated user "${user.user_id}"`);
    }

    const result = await createOrUpdateTicket(
      organization,
      user,
      dateSubmitted
    );
    if (!result) throw new Error("Failed to create ticket");

    log.info(`Success create or updated ticket ${result.data.ticket.id}.`);
    return res.status(200).json({ user, ticket: result.data.ticket });
  } catch (e) {
    apmAgent?.captureError(e);
    log.error(e);
    return res
      .status(500)
      .json({ error: "Failed to Create Zendesk User or Ticket" });
  }
};
