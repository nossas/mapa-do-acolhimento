import * as yup from "yup";
import { User, FullContact, Contact } from "../../types";
import { findUserByEmail, createOrUpdateContact } from "../mautic";
import logger from "./childLogger";

const log = logger.child({ module: "userToContact" });

const schema = yup
  .object()
  .shape({
    firstname: yup.string().required(),
    email: yup.string().required(),
    user_id: yup.number().required(),
    data_de_inscricao_no_bond1: yup.string().defined(),
    f_condition: yup.string().required(),
    city: yup.string().required(),
    state1: yup.string().defined(),
    address: yup.string().required(),
    phone: yup.string().defined(),
    whatsapp: yup.string().defined(),
    tipo_de_acolhimento: yup.string().defined(),
    cor: yup.string().defined(),
    organization_id: yup.number().required()
  })
  .required();

/*
 * Creates a new Mutic contact object based on the User data passed
 * from the param.
 */
export const newContact = async (user: User): Promise<Contact | undefined> => {
  const contact = {
    ...user,
    ...user.user_fields,
    firstname: user.name,
    data_de_inscricao_no_bond1: user.user_fields.data_de_inscricao_no_bonde,
    f_condition: user.user_fields.condition,
    state1: user.user_fields.state ? user.user_fields.state.toLowerCase() : null
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

/**
 * Searchs Mautic to find if contact already exists.
 * We'll update it if it does, if not, we'll create
 * a new one.
 */
export default async (
  users: User[]
): Promise<Array<{ contact: FullContact } | undefined>> => {
  const contacts = users.map(async user => {
    const findUser = await findUserByEmail(user.email);
    let mauticId = 0;
    if (findUser && findUser.total > 0) {
      log.info("Found a user with this email");
      mauticId = Number(Object.keys(findUser.contacts)[0]);
    }

    const contact = await newContact(user);

    if (!contact) {
      log.error(`Failed to create new contact with email ${user.email}`);
      return undefined;
    }

    const create = await createOrUpdateContact(mauticId, contact);
    if (!create) {
      log.error(`Failed to create or update contact in Mautic ${user.email}`);
    }
    return create;
  });
  return await Promise.all(contacts);
};
