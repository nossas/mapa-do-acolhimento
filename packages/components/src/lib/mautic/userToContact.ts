import * as yup from "yup";
import { User, FullContact, Contact } from "../../types";
import { findUserByEmail, createOrUpdateContact } from "../mautic";
import log from "../../logger";

const schema = yup
  .object()
  .shape({
    firstname: yup.string().required(),
    email: yup.string().required(),
    user_id: yup.number().required(),
    data_de_inscricao_no_bond: yup.string().defined(),
    f_condition: yup.string().required(),
    city: yup.string().required(),
    state1: yup.string().required(),
    address: yup.string().required(),
    phone: yup.string().defined(),
    whatsapp: yup.string().defined(),
    tipo_de_acolhimento: yup.string().defined(),
    cor: yup.string().defined()
  })
  .required();

export const newContact = async (user: User): Promise<Contact | undefined> => {
  const contact = {
    ...user,
    ...user.user_fields,
    firstname: user.name,
    data_de_inscricao_no_bond: user.user_fields.data_de_inscricao_no_bonde,
    f_condition: user.user_fields.condition,
    state1: user.user_fields.state.toLowerCase()
  };
  try {
    const validatedContact = await schema.validate(contact, {
      stripUnknown: true
    });

    return validatedContact;
  } catch (e) {
    log.error(e);
    return undefined;
  }
};

export default async (
  user: User
): Promise<{ contact: FullContact } | undefined> => {
  const findUser = await findUserByEmail(user.email);
  let mauticId = 0;
  if (findUser && findUser.total > 0) {
    log.info("Found a user with this email");
    mauticId = Number(Object.keys(findUser.contacts)[0]);
  }

  const contact = await newContact(user);

  if (!contact) return undefined;

  return await createOrUpdateContact(mauticId, contact);
};
