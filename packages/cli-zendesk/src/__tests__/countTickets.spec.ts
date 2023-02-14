import countTickets from "../countTickets";

describe("check if countTickets calculate fields correctly", () => {
  it("should calculate the 'calculado' fields correctly, v01", async () => {
    const data = [
      {
        requester_id: 396650460752,
        status_acolhimento: "encaminhamento__realizado",
        status: "pending",
        organization_id: 360282119532
      },
      {
        requester_id: 396650460752,
        status_acolhimento: "atendimento__iniciado",
        status: "pending",
        organization_id: 360282119532
      },
      {
        requester_id: 396650460752,
        status_acolhimento: "atendimento_triagem_1",
        status: "pending",
        organization_id: 360282119532
      },
      {
        requester_id: 396650460752,
        status_acolhimento: "atendimento_triagem_2",
        status: "pending",
        organization_id: 360282119532
      },
      {
        requester_id: 396650460752,
        status_acolhimento: "atendimento_acompanhamento_1",
        status: "pending",
        organization_id: 360282119532
      },
      {
        requester_id: 396650460752,
        status_acolhimento: "atendimento_acompanhamento_2",
        status: "pending",
        organization_id: 360282119532
      },
      {
        requester_id: 396650460752,
        status_acolhimento: "encaminhamento__negado",
        status: "solved",
        organization_id: 360282119532
      },
      {
        requester_id: 397177485272,
        status_acolhimento: "encaminhamento__realizado",
        status: "pending",
        organization_id: 360269610652
      },
      {
        requester_id: 400733928872,
        status_acolhimento: "encaminhamento__realizado",
        status: "open",
        organization_id: 360269610652
      },
      {
        requester_id: 400733928872,
        status: "solved",
        status_acolhimento: null,
        organization_id: 360269610652
      }
    ];
    const expectedResult = {
      "396650460752": {
        id: 396650460752,
        atendimentos_em_andamento_calculado_: 5,
        atendimentos_concludos_calculado_: 0,
        encaminhamentos_realizados_calculado_: 1
      },
      "397177485272": {
        id: 397177485272,
        atendimentos_em_andamento_calculado_: 0,
        atendimentos_concludos_calculado_: 0,
        encaminhamentos_realizados_calculado_: 1
      },
      "400733928872": {
        id: 400733928872,
        atendimentos_em_andamento_calculado_: 0,
        atendimentos_concludos_calculado_: 0,
        encaminhamentos_realizados_calculado_: 1
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count = await countTickets(data as any);
    expect(count).toStrictEqual(expectedResult);
  });

  it("should calculate the 'calculado' fields correctly, v02", async () => {
    const data = [
      {
        requester_id: 382376031231,
        status_acolhimento: "atendimento__iniciado",
        status: "pending",
        organization_id: 360282119532
      },
      {
        requester_id: 382376031231,
        status_acolhimento: null,
        status: "closed",
        organization_id: 360282119532
      },
      {
        requester_id: 382376031231,
        status_acolhimento: "atendimento__iniciado",
        status: "pending",
        organization_id: 360282119532
      },
      {
        requester_id: 382376031231,
        status_acolhimento: "encaminhamento__realizado",
        status: "pending",
        organization_id: 360282119532
      },
      {
        requester_id: 382376031231,
        status_acolhimento: "encaminhamento__realizado",
        status: "pending",
        organization_id: 360282119532
      },
      {
        requester_id: 382376031231,
        status: "pending",
        status_acolhimento: "atendimento__iniciado",
        organization_id: 360282119532
      },
      {
        requester_id: 382376031231,
        status: "closed",
        status_acolhimento: "atendimento__iniciado",
        organization_id: 360282119532
      },
      {
        requester_id: 382376031231,
        status: "closed",
        status_acolhimento: null,
        organization_id: 360282119532
      }
    ];

    const expectedResult = {
      "382376031231": {
        id: 382376031231,
        atendimentos_em_andamento_calculado_: 3,
        atendimentos_concludos_calculado_: 0,
        encaminhamentos_realizados_calculado_: 2
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count = await countTickets(data as any);
    expect(count).toStrictEqual(expectedResult);
  });

  it("should calculate the 'calculado' fields correctly, v03", async () => {
    const data = [
      {
        requester_id: 377501500792,
        status_acolhimento: "atendimento__iniciado",
        status: "pending",
        organization_id: 360282119532
      },
      {
        requester_id: 377501500792,
        status_acolhimento: "atendimento__iniciado",
        status: "pending",
        organization_id: 360282119532
      },
      {
        requester_id: 377501500792,
        status_acolhimento: "encaminhamento__realizado",
        status: "pending",
        organization_id: 360282119532
      },
      {
        requester_id: 377501500792,
        status_acolhimento: "atendimento__iniciado",
        status: "closed",
        organization_id: 360282119532
      },
      {
        requester_id: 377501500792,
        status_acolhimento: "encaminhamento__realizado",
        status: "closed",
        organization_id: 360282119532
      },
      {
        requester_id: 377501500792,
        status: "closed",
        status_acolhimento: "encaminhamento__realizado",
        organization_id: 360282119532
      }
    ];

    const expectedResult = {
      "377501500792": {
        id: 377501500792,
        atendimentos_em_andamento_calculado_: 2,
        atendimentos_concludos_calculado_: 0,
        encaminhamentos_realizados_calculado_: 1
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count = await countTickets(data as any);
    expect(count).toStrictEqual(expectedResult);
  });

  it("should calculate the 'calculado' fields with 0 values", async () => {
    const data = [
      {
        requester_id: 377501500792,
        status_acolhimento: "atendimento__iniciado",
        status: "closed",
        organization_id: 360282119532
      },
      {
        requester_id: 377501500792,
        status_acolhimento: "atendimento__iniciado",
        status: "closed",
        organization_id: 360282119532
      },
      {
        requester_id: 377501500792,
        status_acolhimento: "encaminhamento__realizado",
        status: "closed",
        organization_id: 360282119532
      },
      {
        requester_id: 377501500792,
        status: "closed",
        status_acolhimento: "encaminhamento__realizado",
        organization_id: 360282119532
      }
    ];

    const expectedResult = {
      "377501500792": {
        id: 377501500792,
        atendimentos_em_andamento_calculado_: 0,
        atendimentos_concludos_calculado_: 0,
        encaminhamentos_realizados_calculado_: 0
      }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count = await countTickets(data as any);
    expect(count).toStrictEqual(expectedResult);
  });
});
