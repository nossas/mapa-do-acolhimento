import { User, FullContact, Contact } from "../../types";
import { findUserByEmail, createOrUpdateContact } from "../mautic";
import log from "../../logger";

export default async (
  user: User
): Promise<{ contact: FullContact } | undefined> => {
  const newContact: Contact = {
    ...user,
    ...user.user_fields,
    firstname: user.name,
    data_de_inscricao_no_bond: user.user_fields.data_de_inscricao_no_bonde,
    f_condition: user.user_fields.condition,
    state1: user.user_fields.state.toLowerCase()
  };

  const findUser = await findUserByEmail(user.email);
  let mauticId = 0;
  if (findUser && findUser.total > 0) {
    log.info("Found a user with this email");
    mauticId = Number(Object.keys(findUser.contacts)[0]);
  }
  console.log({ mauticId });
  console.log({ newContact });
  return await createOrUpdateContact(mauticId, newContact);
};
