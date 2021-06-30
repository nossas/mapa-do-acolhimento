// In this function we fetch the date the volunteer first subscribed
// in the project and decide wether to use the data that came from
// the Mautic form response or the data that the volunteer first
// inputed in the form_entry.
// import yup from "yup";
import { getFormEntryByEmail } from "../getFormEntries";
import { Subscribe } from "./types";

type Input = {
  email: string;
  name?: string;
  cep?: string;
};

export default async ({ email, name, cep }: Input): Promise<Subscribe> => {
  const formEntryFields = await getFormEntryByEmail(email);
  // Prepare fields to return Subscribe
  return {
    ...formEntryFields,
    name:
      typeof name !== "string" || name.length === 0
        ? `${name} ${formEntryFields.lastname}`
        : name,
    cep: typeof cep !== "string" || cep.length === 0 ? String(cep) : cep
  };
};
