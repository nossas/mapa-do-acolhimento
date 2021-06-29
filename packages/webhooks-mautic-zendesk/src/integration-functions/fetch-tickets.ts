import * as yup from "yup";
import requestZendeskApi from "./request-zendesk-api";

type Ticket = {
  status: "open" | "new" | "pending" | "hold";
  subject: string;
};

type FetchTicketsInput = {
  userId: number;
};

const validationTickets = yup.array().of(
  yup
    .object()
    .shape({
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
