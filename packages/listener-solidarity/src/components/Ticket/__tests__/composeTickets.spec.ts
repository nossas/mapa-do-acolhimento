import faker from "faker";
import composeTickets from "../composeTickets";
import { formatDate } from "../../../utils";

const mockUser = (mockUser = {}) => ({
  ...mockUser,
  user_fields: {
    data_de_inscricao_no_bonde: faker.date.past(),
    tipo_de_acolhimento: "psicológico",
    city: faker.address.city,
    state: faker.address.stateAbbr,
    condition: "inscrita",
  },
  external_id: faker.random.uuid(),
  name: faker.name.firstName(),
  user_id: faker.random.uuid(),
});

describe("composeTickets", () => {
  it("should create a closed ticket if user condition is 'desabilitada'", () => {
    const user = mockUser();
    const ticket = composeTickets([
      {
        ...user,
        user_fields: {
          ...user.user_fields,
          condition: "desabilitada",
        },
      },
    ]);
    expect(ticket).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: "solved",
          tags: ["fora-do-perfil"],
        }),
      ])
    );
    expect(ticket).toHaveLength(1);
  });

  it("should create two closed tickets if user condition is 'desabilitada' and 'tipo de acolhimento' it psy and legal", () => {
    const user = mockUser();
    const ticket = composeTickets([
      {
        ...user,
        user_fields: {
          ...user.user_fields,
          condition: "desabilitada",
          tipo_de_acolhimento: "psicológico_e_jurídico",
        },
      },
    ]);
    expect(ticket).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          status: "solved",
          tags: ["fora-do-perfil"],
        }),
        expect.objectContaining({
          status: "solved",
          tags: ["fora-do-perfil"],
        }),
      ])
    );
    expect(ticket).toHaveLength(2);
  });

  it("should create two tickets if 'tipo de acolhimento' is psychological and legal", () => {
    const user = mockUser();
    const tickets = composeTickets([
      {
        ...user,
        user_fields: {
          ...user.user_fields,
          tipo_de_acolhimento: "psicológico_e_jurídico",
        },
      },
    ]);
    expect(tickets).toStrictEqual(
      expect.arrayContaining([
        expect.objectContaining({
          subject: `[Jurídico] ${user.name}, ${user.user_fields.city} - ${user.user_fields.state}`,
        }),
        expect.objectContaining({
          subject: `[Psicológico] ${user.name}, ${user.user_fields.city} - ${user.user_fields.state}`,
        }),
      ])
    );
    expect(tickets).toHaveLength(2);
  });

  it("should create a ticket if 'tipo de acolhimento' is psychological", () => {
    const user = mockUser();
    const tickets = composeTickets([user]);
    expect(tickets).toStrictEqual([
      {
        subject: `[Psicológico] ${user.name}, ${user.user_fields.city} - ${user.user_fields.state}`,
        external_id: user.external_id,
        comment: {
          body: "Importado pelo BONDE.",
          public: false,
        },
        requester_id: user.user_id,
        custom_fields: [
          {
            id: 360017056851,
            value: formatDate(
              user.user_fields.data_de_inscricao_no_bonde.toISOString()
            ),
          },
          { id: 360014379412, value: "solicitação_recebida" },
          { id: 360016681971, value: user.name },
        ],
      },
    ]);
  });

  it("should create a ticket if 'tipo de acolhimento' is legal", () => {
    const user = mockUser();
    const tickets = composeTickets([
      {
        ...user,
        user_fields: {
          ...user.user_fields,
          tipo_de_acolhimento: "jurídico",
        },
      },
    ]);
    expect(tickets).toStrictEqual([
      {
        subject: `[Jurídico] ${user.name}, ${user.user_fields.city} - ${user.user_fields.state}`,
        external_id: user.external_id,
        comment: {
          body: "Importado pelo BONDE.",
          public: false,
        },
        requester_id: user.user_id,
        custom_fields: [
          {
            id: 360017056851,
            value: formatDate(
              user.user_fields.data_de_inscricao_no_bonde.toISOString()
            ),
          },
          { id: 360014379412, value: "solicitação_recebida" },
          { id: 360016681971, value: user.name },
        ],
      },
    ]);
  });
});
