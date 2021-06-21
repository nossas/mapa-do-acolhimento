import { Request, Response } from "express";
import { userToContact } from "components";
import log, { apmAgent } from "./dbg";
import read_mautic_request from "./filterService";
import { filterFormName, FILTER_FORM_NAME_STATUS } from "./filterFormName";
import createZendeskUser from "./integration-functions/create-user";

export const mauticZendeskHandle = async (req: Request, res: Response) => {
  const data = await read_mautic_request(req);
  const {
    results,
    organization,
    status: formNameStatus,
    name,
    data: errorData,
    dateSubmitted
  } = await filterFormName(data!, apmAgent);

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

    apmAgent?.setUserContext({ id: user.user_id });

    // Save users in Mautic
    await userToContact([user]);

    if (user.created_at === user.updated_at) {
      log.info(`Success, created user "${user.user_id}"`);
    } else {
      log.info(`Success, updated user "${user.user_id}"`);
    }

    return res.status(200).json({ user });
  } catch (e) {
    log.error(`createZendeskUser ${e}`);
    return res.status(500).json({ error: "Failed to Create Zendesk User" });
  }

  // const resultTicket = (await this.createTicket(
  //   instance,
  //   createdUser,
  //   dateSubmitted,
  //   res
  // )) as { data: { ticket: { id: number } } };
  // if (resultTicket) {
  //   this.dbg(`Success updated ticket "${resultTicket.data.ticket.id}".`);

  //   return res.status(200).json("Success finish integration");
  // }
  // this.dbg("Failed to create ticket");
  // return res.status(500).json("Failed failed integration");
};
