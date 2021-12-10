import * as yup from "yup";
import requestZendeskApi from "./request-zendesk-api";

export type Ticket = {
  id: number;
  status: "open" | "new" | "pending" | "hold" | string;
  subject: string;
};

type FetchTicketsInput = {
  userId: number | string;
};

const validationTickets = yup.array().of(
  yup
    .object()
    .shape({
      id: yup.number().required(),
      status: yup.string().required(),
      subject: yup.string().required()
    })
    .required()
);

const fetchTickets = async (
  input: FetchTicketsInput
): Promise<Ticket[] | undefined> => {
  const resp = await requestZendeskApi<{ tickets: Ticket[] }>(
    "GET",
    `users/${input.userId}/tickets/requested`
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return validationTickets.validate(resp.data.tickets) as any;
};

export default fetchTickets;
