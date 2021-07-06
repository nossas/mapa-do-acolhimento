import * as fetchTickets from "../../integration-functions/fetch-tickets";
import * as requestZendeskApi from "../../integration-functions/request-zendesk-api";
import createOrUpdateTicket, {
  Status
} from "../../integration-functions/create-or-update-ticket";

const spyFetchTickets = jest.spyOn(fetchTickets, "default");
const spyZendesk = jest.spyOn(requestZendeskApi, "default");

describe("createOrUpdateTicket", () => {
  const user = {
    user_id: 23,
    role: "user",
    organization_id: 2,
    name: "Test Name",
    email: "test@test.org",
    external_id: "123456",
    phone: "21999999999",
    verified: true,
    user_fields: {
      registration_number: "1234567",
      condition: "open",
      state: "RJ",
      city: "Rio de Janeiro"
    }
  };

  it("throw Error when not found tickets to userId", async () => {
    spyFetchTickets.mockResolvedValue(undefined);

    await expect(
      createOrUpdateTicket("ADVOGADA", user, new Date().toDateString())
    ).rejects.toThrow(`Ticket not found for user ${user.user_id}`);
  });

  it("create a new Ticket when tickets not filtered", async () => {
    const organization = "ADVOGADA";
    const createdAt = new Date().toDateString();
    const results = [
      {
        id: 1,
        status: "new",
        subject: "Outro assunto 1"
      },
      {
        id: 2,
        status: "open",
        subject: "Outro assunto 2"
      }
    ];
    spyZendesk.mockResolvedValueOnce({ data: { tickets: results } } as any);
    spyFetchTickets.mockResolvedValueOnce(results);

    await createOrUpdateTicket(organization, user, createdAt);

    const data = {
      requester_id: user.user_id,
      organization_id: user.organization_id,
      description: "-",
      status_inscricao: "aprovada",
      subject: `[${organization === "ADVOGADA" ? "Advogada" : "Psicóloga"}] ${
        user.name
      } - ${user.user_fields.registration_number}`,
      custom_fields: [
        { id: 360021665652, value: Status[user.user_fields.condition] },
        { id: 360016631592, value: user.name },
        { id: 360021812712, value: user.phone },
        { id: 360021879791, value: user.user_fields.state },
        { id: 360021879811, value: user.user_fields.city }
      ],
      created_at: createdAt
    };

    expect(spyZendesk).toBeCalledWith("POST", "/tickets", data);
  });

  it("update Ticket when found ticket filtered", async () => {
    const organization = "ADVOGADA";
    const createdAt = new Date().toDateString();
    const results = [
      {
        id: 1,
        status: "new",
        subject: "Outro assunto 1"
      },
      {
        id: 2,
        status: "open",
        subject: `[Advogada] ${user.name} - ${user.user_fields.registration_number}`
      }
    ];
    spyZendesk.mockResolvedValueOnce({ data: { tickets: results } } as any);
    spyFetchTickets.mockResolvedValueOnce(results);

    await createOrUpdateTicket(organization, user, createdAt);

    const data = {
      requester_id: user.user_id,
      organization_id: user.organization_id,
      description: "-",
      status_inscricao: "aprovada",
      subject: `[${organization === "ADVOGADA" ? "Advogada" : "Psicóloga"}] ${
        user.name
      } - ${user.user_fields.registration_number}`,
      custom_fields: [
        { id: 360021665652, value: Status[user.user_fields.condition] },
        { id: 360016631592, value: user.name },
        { id: 360021812712, value: user.phone },
        { id: 360021879791, value: user.user_fields.state },
        { id: 360021879811, value: user.user_fields.city }
      ],
      created_at: createdAt
    };

    expect(spyZendesk).toBeCalledWith("PUT", `/tickets/${results[1].id}`, data);
  });

  it("find ticket psicologa", async () => {
    const organization: any = "PSICOLOGA";
    const createdAt = new Date().toDateString();
    const results = [
      {
        id: 1,
        status: "new",
        subject: "Outro assunto 1"
      },
      {
        id: 2,
        status: "open",
        subject: `[Psicóloga] ${user.name} - ${user.user_fields.registration_number}`
      }
    ];
    spyZendesk.mockResolvedValueOnce({ data: { tickets: results } } as any);
    spyFetchTickets.mockResolvedValueOnce(results);

    await createOrUpdateTicket(organization, user, createdAt);

    const data = {
      requester_id: user.user_id,
      organization_id: user.organization_id,
      description: "-",
      status_inscricao: "aprovada",
      subject: `[${organization === "ADVOGADA" ? "Advogada" : "Psicóloga"}] ${
        user.name
      } - ${user.user_fields.registration_number}`,
      custom_fields: [
        { id: 360021665652, value: Status[user.user_fields.condition] },
        { id: 360016631592, value: user.name },
        { id: 360021812712, value: user.phone },
        { id: 360021879791, value: user.user_fields.state },
        { id: 360021879811, value: user.user_fields.city }
      ],
      created_at: createdAt
    };

    expect(spyZendesk).toBeCalledWith("PUT", `/tickets/${results[1].id}`, data);
  });

  it("capture error when call zendesk has problem", async () => {
    const organization = "ADVOGADA";
    const createdAt = new Date().toDateString();
    const results = [
      {
        id: 1,
        status: "new",
        subject: "Outro assunto 1"
      },
      {
        id: 2,
        status: "open",
        subject: `[Advogada] ${user.name} - ${user.user_fields.registration_number}`
      }
    ];
    spyFetchTickets.mockResolvedValueOnce(results);

    await expect(
      createOrUpdateTicket(organization, user, createdAt)
    ).rejects.toThrow("Request failed with status code 422");
  });
});
