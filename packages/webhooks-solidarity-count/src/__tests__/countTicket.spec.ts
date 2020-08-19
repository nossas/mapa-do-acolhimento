import countTickets from "../countTickets";

describe("check if countTickets calculate fields correctly", () => {
  it("should calculate the 'calculado' fields correctly, v01", async () => {
    const data = [
      {
        status_acolhimento: "encaminhamento__realizado",
        status: "pending"
      },
      {
        status_acolhimento: "atendimento__iniciado",
        status: "pending"
      },
      {
        status_acolhimento: "encaminhamento__negado",
        status: "solved"
      },
      {
        status_acolhimento: "encaminhamento__realizado",
        status: "pending"
      },
      {
        status_acolhimento: "encaminhamento__realizado",
        status: "open"
      },
      {
        status: "solved",
        status_acolhimento: null
      }
    ];
    const expectedResult = {
      atendimentos_em_andamento_calculado_: 1,
      atendimentos_concludos_calculado_: 0,
      encaminhamentos_realizados_calculado_: 3
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count = await countTickets(data as any);
    expect(count).toStrictEqual(expectedResult);
  });

  it("should calculate the 'calculado' fields correctly, v02", async () => {
    const data = [
      {
        status_acolhimento: "atendimento__iniciado",
        status: "pending"
      },
      {
        status_acolhimento: null,
        status: "closed"
      },
      {
        status_acolhimento: "atendimento__iniciado",
        status: "pending"
      },
      {
        status_acolhimento: "encaminhamento__realizado",
        status: "pending"
      },
      {
        status_acolhimento: "encaminhamento__realizado",
        status: "pending"
      },
      {
        status: "pending",
        status_acolhimento: "atendimento__iniciado"
      },
      {
        status: "closed",
        status_acolhimento: "atendimento__iniciado"
      },
      {
        status: "closed",
        status_acolhimento: null
      }
    ];

    const expectedResult = {
      atendimentos_em_andamento_calculado_: 3,
      atendimentos_concludos_calculado_: 0,
      encaminhamentos_realizados_calculado_: 2
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count = await countTickets(data as any);
    expect(count).toStrictEqual(expectedResult);
  });

  it("should calculate the 'calculado' fields correctly, v03", async () => {
    const data = [
      {
        status_acolhimento: "atendimento__iniciado",
        status: "pending"
      },
      {
        status_acolhimento: "atendimento__iniciado",
        status: "pending"
      },
      {
        status_acolhimento: "encaminhamento__realizado",
        status: "pending"
      },
      {
        status_acolhimento: "atendimento__iniciado",
        status: "closed"
      },
      {
        status_acolhimento: "encaminhamento__realizado",
        status: "closed"
      },
      {
        status: "closed",
        status_acolhimento: "encaminhamento__realizado"
      }
    ];

    const expectedResult = {
      atendimentos_em_andamento_calculado_: 2,
      atendimentos_concludos_calculado_: 0,
      encaminhamentos_realizados_calculado_: 1
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count = await countTickets(data as any);
    expect(count).toStrictEqual(expectedResult);
  });
});
