import {
  verificaDiretrizesAtendimento,
  verificaEstudoDeCaso,
  verificaLocalização,
  checkNames,
  filterByEmail
} from "../utils";
import { CONDITION } from "../types";

describe("User condition status verification", () => {
  const responses = {
    aprovada: {
      one: {
        todos_os_atendimentos_rea: "aceito",
        as_voluntarias_do_mapa_do: "compreendo",
        o_comprometimento_a_dedic: "sim",
        o_mapa_do_acolhimento_ent: "sim",
        para_que_as_mulheres_que: "sim",
        no_seu_primeiro_atendimen: "A",
        para_voce_o_que_e_mais_im: "A",
        durante_os_encontros_ana: "A",
        durante_os_atendimentos_a: "A"
      },
      two: {
        todos_os_atendimentos_rea: "aceito",
        as_voluntarias_do_mapa_do: "compreendo",
        o_comprometimento_a_dedic: "sim",
        o_mapa_do_acolhimento_ent: "sim",
        para_que_as_mulheres_que: "sim",
        no_seu_primeiro_atendimen: "A",
        para_voce_o_que_e_mais_im: "B",
        durante_os_encontros_ana: "A",
        durante_os_atendimentos_a: "A"
      },
      three: {
        todos_os_atendimentos_rea: "aceito",
        as_voluntarias_do_mapa_do: "compreendo",
        o_comprometimento_a_dedic: "sim",
        o_mapa_do_acolhimento_ent: "sim",
        para_que_as_mulheres_que: "sim",
        no_seu_primeiro_atendimen: "A",
        para_voce_o_que_e_mais_im: "B",
        durante_os_encontros_ana: "B",
        durante_os_atendimentos_a: "A"
      }
    },
    reprovada_diretrizes_do_mapa: {
      one: {
        todos_os_atendimentos_rea: "aceito",
        as_voluntarias_do_mapa_do: "compreendo",
        o_comprometimento_a_dedic: "sim",
        o_mapa_do_acolhimento_ent: "nao",
        para_que_as_mulheres_que: "sim",
        no_seu_primeiro_atendimen: "A",
        para_voce_o_que_e_mais_im: "A",
        durante_os_encontros_ana: "B",
        durante_os_atendimentos_a: "A"
      },
      two: {
        todos_os_atendimentos_rea: "aceito",
        as_voluntarias_do_mapa_do: "compreendo",
        o_comprometimento_a_dedic: "nao",
        o_mapa_do_acolhimento_ent: "sim",
        para_que_as_mulheres_que: "sim",
        qual_sua_area_de_atuacao: "psicologia-clinica",
        no_seu_primeiro_atendimen: "A",
        para_voce_o_que_e_mais_im: "B",
        durante_os_encontros_ana: "C",
        durante_os_atendimentos_a: "A"
      }
    },
    reprovada_estudo_de_caso: {
      one: {
        no_seu_primeiro_atendimen: "A",
        para_voce_o_que_e_mais_im: "C",
        durante_os_encontros_ana: "B",
        durante_os_atendimentos_a: "A"
      },
      two: {
        no_seu_primeiro_atendimen: "A",
        para_voce_o_que_e_mais_im: "C",
        durante_os_encontros_ana: "A",
        durante_os_atendimentos_a: "A"
      }
    }
  };
  describe("verificaDiretrizesAtendimento", () => {
    it("should approve the user", async () => {
      const condition: [CONDITION] = [CONDITION.UNSET];
      await verificaDiretrizesAtendimento(condition, responses.aprovada.one);
      expect(condition).toStrictEqual([CONDITION.UNSET]);
    });
    it("should change condition to reprovada_diretrizes_do_mapa -> 1", async () => {
      const condition: [CONDITION] = [CONDITION.UNSET];
      await verificaDiretrizesAtendimento(
        condition,
        responses.reprovada_diretrizes_do_mapa.one
      );
      expect(condition).toStrictEqual([CONDITION.REPROVADA_DIRETRIZES_DO_MAPA]);
    });
    it("should change condition to reprovada_diretrizes_do_mapa -> 2", async () => {
      const condition: [CONDITION] = [CONDITION.UNSET];
      await verificaDiretrizesAtendimento(
        condition,
        responses.reprovada_diretrizes_do_mapa.two
      );
      expect(condition).toStrictEqual([CONDITION.REPROVADA_DIRETRIZES_DO_MAPA]);
    });
  });

  describe("verificaEstudoDeCaso", () => {
    it("should approve the user", async () => {
      const condition: [CONDITION] = [CONDITION.UNSET];
      await verificaEstudoDeCaso(condition, responses.aprovada.two);
      expect(condition).toStrictEqual([CONDITION.UNSET]);
    });
    it("should change condition to reprovada_estudo_de_caso -> 1", async () => {
      const condition: [CONDITION] = [CONDITION.UNSET];
      await verificaEstudoDeCaso(
        condition,
        responses.reprovada_estudo_de_caso.one
      );
      expect(condition).toStrictEqual([CONDITION.REPROVADA_ESTUDO_DE_CASO]);
    });
    it("should change condition to reprovada_estudo_de_caso -> 2", async () => {
      const condition: [CONDITION] = [CONDITION.UNSET];
      await verificaEstudoDeCaso(
        condition,
        responses.reprovada_estudo_de_caso.two
      );
      expect(condition).toStrictEqual([CONDITION.REPROVADA_ESTUDO_DE_CASO]);
    });
  });

  describe("aprovada", () => {
    it("should approve the user", async () => {
      const condition: [CONDITION] = [CONDITION.UNSET];
      await verificaEstudoDeCaso(condition, responses.aprovada.three);
      verificaDiretrizesAtendimento(condition, responses.aprovada.three);
      expect(condition).toStrictEqual([CONDITION.UNSET]);
    });
  });
});

describe("Checks geolocation process logic", () => {
  const mockGetGeolocationResolve = jest.fn().mockResolvedValue({
    latitude: "-30.0314405",
    longitude: "-51.21005779999999"
  });
  describe("verificaLocalização", () => {
    // describe("cep falsy", () => {
    //   it("should add to the tags array the value 'cep-incorreto'", async () => {
    //     const data1 = await verificaLocalização({}, mockGetGeolocationReject);
    //     const data2 = await verificaLocalização(
    //       { cep: null },
    //       mockGetGeolocationReject
    //     );
    //     const data3 = await verificaLocalização(
    //       { cep: undefined },
    //       mockGetGeolocationReject
    //     );
    //     expect(data1).toHaveProperty("tags", ["cep-incorreto"]);
    //     expect(data2).toHaveProperty("tags", ["cep-incorreto"]);
    //     expect(data3).toHaveProperty("tags", ["cep-incorreto"]);
    //   });
    // });
    // describe("GM returns ZERO_RESULTS", () => {
    // it("variable 'tags' has value '[cep-incorreto]'", async () => {
    //   const data = await verificaLocalização(
    //     { cep: "42250579" },
    //     mockGetGeolocationReject
    //   );
    //   expect(data).toHaveProperty("tags", ["cep-incorreto"]);
    // });
    // });
    describe("GM returns a valid response", () => {
      it("latitude and longitude is not null", async () => {
        const data = await verificaLocalização(
          { cep: "66093-672" },
          mockGetGeolocationResolve
        );
        expect(data.latitude).not.toBe(null);
        expect(data.longitude).not.toBe(null);
      });
    });
  });
});

describe("checkNames", () => {
  describe("first and lastname are in arrays", () => {
    it("should return a string of names", () => {
      expect(
        checkNames({
          primeiro_nome: ["Nome", "Nome"],
          sobrenome_completo: ["Teste", "Teste"]
        })
      ).toStrictEqual("Nome,Nome Teste,Teste");
    });
  });
  describe("first and lastname are in strings", () => {
    it("should return a string of names", () => {
      expect(
        checkNames({
          primeiro_nome: "Nome",
          sobrenome_completo: "Teste"
        })
      ).toStrictEqual("Nome Teste");
    });
  });
  describe("first and lastname empty", () => {
    it("should return null", () => {
      expect(
        checkNames({
          primeiro_nome: undefined,
          sobrenome_completo: undefined
        })
      ).toStrictEqual(null);
    });
  });
});

describe("filterByEmail", () => {
  const entries = [
    {
      fields:
        '[{"uid":"field-1533733461113-5","kind":"text","label":"NOME","placeholder":"","required":"true","value":"Hermínia"},{"uid":"field-1533733485653-99","kind":"text","label":"SOBRENOME","placeholder":"","required":"true","value":"Amorim"},{"uid":"field-1533733493037-11","kind":"email","label":"SEU MELHOR EMAIL","placeholder":"","required":"true","value":"herminia.amorim@email.com"},{"uid":"field-1533733501716-34","kind":"text","label":"CRP (Só números)","placeholder":"","required":"true","value":"000000"},{"uid":"field-1533733650118-7","kind":"text","label":"CEP DE ATENDIMENTO (Só números)","placeholder":"","required":"true","value":"22461010"},{"uid":"field-1533734419113-13","kind":"text","label":"TELEFONE PARA ATENDIMENTO (COM DDD)","placeholder":"","required":"true","value":"1212121212"},{"uid":"field-1533734468460-38","kind":"text","label":"WHATSAPP (COM DDD)","placeholder":"Obrigatório para contato com a equipe","required":"true","value":"1212121212"},{"uid":"field-1533734495315-40","kind":"dropdown","label":"Como voluntária do Mapa do Acolhimento, você se dispõe a atender, pelo menos, uma (1) mulher que precisa de ajuda. Caso você tenha mais tempo disponível, você pode atender mais de uma (1) mulher, de maneira concomitante. Lembrando que os atendimentos devem ser sempre individuais. Quantas vagas você pode oferecer para atender, simultaneamente, mulheres do Mapa do Acolhimento?","placeholder":"1, 2, 3, 4, 5 ou mais","required":"true","value":"2"}]',
      created_at: "2020-09-16T19:49:59.848563",
      widget_id: 17628
    },
    {
      fields:
        '[{"uid":"field-1533733461113-5","kind":"text","label":"NOME","placeholder":"","required":"true","value":"Lígia"},{"uid":"field-1533733485653-99","kind":"text","label":"SOBRENOME","placeholder":"","required":"true","value":"Garcia"},{"uid":"field-1533733493037-11","kind":"email","label":"SEU MELHOR EMAIL","placeholder":"","required":"true","value":"ligia.garcia@email.com"},{"uid":"field-1533733501716-34","kind":"text","label":"CRP (Só números)","placeholder":"","required":"true","value":"0000000"},{"uid":"field-1533733650118-7","kind":"text","label":"CEP DE ATENDIMENTO (Só números)","placeholder":"","required":"true","value":"61760-906"},{"uid":"field-1533734419113-13","kind":"text","label":"TELEFONE PARA ATENDIMENTO (COM DDD)","placeholder":"","required":"true","value":"1212121212"},{"uid":"field-1533734468460-38","kind":"text","label":"WHATSAPP (COM DDD)","placeholder":"Obrigatório para contato com a equipe","required":"true","value":"1212121212"},{"uid":"field-1533734495315-40","kind":"dropdown","label":"Como voluntária do Mapa do Acolhimento, você se dispõe a atender, pelo menos, uma (1) mulher que precisa de ajuda. Caso você tenha mais tempo disponível, você pode atender mais de uma (1) mulher, de maneira concomitante. Lembrando que os atendimentos devem ser sempre individuais. Quantas vagas você pode oferecer para atender, simultaneamente, mulheres do Mapa do Acolhimento?","placeholder":"1, 2, 3, 4, 5 ou mais","required":"true","value":"2"}]',
      created_at: "2020-09-16T00:47:23.429155",
      widget_id: 17628
    },
    {
      fields:
        '[{"uid":"field-1533733461113-5","kind":"text","label":"NOME","placeholder":"","required":"true","value":"Teresa"},{"uid":"field-1533733485653-99","kind":"text","label":"SOBRENOME","placeholder":"","required":"true","value":"Nascimento"},{"uid":"field-1533733493037-11","kind":"email","label":"SEU MELHOR EMAIL","placeholder":"","required":"true","value":"teresa.nascimento@email.com"},{"uid":"field-1533733501716-34","kind":"text","label":"CRP (Só números)","placeholder":"","required":"true","value":"08/06886"},{"uid":"field-1533733650118-7","kind":"text","label":"CEP DE ATENDIMENTO (Só números)","placeholder":"","required":"true","value":"82300332"},{"uid":"field-1533734419113-13","kind":"text","label":"TELEFONE PARA ATENDIMENTO (COM DDD)","placeholder":"","required":"true","value":"1212121212"},{"uid":"field-1533734468460-38","kind":"text","label":"WHATSAPP (COM DDD)","placeholder":"Obrigatório para contato com a equipe","required":"true","value":"1212121212"},{"uid":"field-1533734495315-40","kind":"dropdown","label":"Como voluntária do Mapa do Acolhimento, você se dispõe a atender, pelo menos, uma (1) mulher que precisa de ajuda. Caso você tenha mais tempo disponível, você pode atender mais de uma (1) mulher, de maneira concomitante. Lembrando que os atendimentos devem ser sempre individuais. Quantas vagas você pode oferecer para atender, simultaneamente, mulheres do Mapa do Acolhimento?","placeholder":"1, 2, 3, 4, 5 ou mais","required":"true","value":"2"}]',
      created_at: "2020-09-15T18:47:28.387207",
      widget_id: 17628
    },
    {
      fields:
        '[{"uid":"field-1533733461113-5","kind":"text","label":"NOME","placeholder":"","required":"true","value":"Angélica"},{"uid":"field-1533733485653-99","kind":"text","label":"SOBRENOME","placeholder":"","required":"true","value":"Lopes"},{"uid":"field-1533733493037-11","kind":"email","label":"SEU MELHOR EMAIL","placeholder":"","required":"true","value":"angelica.lopes@email.com"},{"uid":"field-1533733501716-34","kind":"text","label":"CRP (Só números)","placeholder":"","required":"true","value":"00000000000"},{"uid":"field-1533733650118-7","kind":"text","label":"CEP DE ATENDIMENTO (Só números)","placeholder":"","required":"true","value":"05422030"},{"uid":"field-1533734419113-13","kind":"text","label":"TELEFONE PARA ATENDIMENTO (COM DDD)","placeholder":"","required":"true","value":"12121212"},{"uid":"field-1533734468460-38","kind":"text","label":"WHATSAPP (COM DDD)","placeholder":"Obrigatório para contato com a equipe","required":"true","value":"12121212"},{"uid":"field-1533734495315-40","kind":"dropdown","label":"Como voluntária do Mapa do Acolhimento, você se dispõe a atender, pelo menos, uma (1) mulher que precisa de ajuda. Caso você tenha mais tempo disponível, você pode atender mais de uma (1) mulher, de maneira concomitante. Lembrando que os atendimentos devem ser sempre individuais. Quantas vagas você pode oferecer para atender, simultaneamente, mulheres do Mapa do Acolhimento?","placeholder":"1, 2, 3, 4, 5 ou mais","required":"true","value":"1"}]',
      created_at: "2020-09-14T22:10:46.092246",
      widget_id: 17628
    }
  ];
  describe("there's an entry with that e-mail", () => {
    it("should return an object with email/name/lastname/cep, part. 3", () => {
      const data = filterByEmail(entries, "herminia.amorim@email.com");
      expect(data).toHaveProperty("email", "herminia.amorim@email.com");
      expect(data).toHaveProperty("cep", "22461010");
      expect(data).toHaveProperty("lastname", "Amorim");
      expect(data).toHaveProperty("name", "Hermínia");
    });
    it("should return an object with email/name/lastname/cep, part. 4", () => {
      const data = filterByEmail(entries, "ligia.garcia@email.com");
      expect(data).toHaveProperty("email", "ligia.garcia@email.com");
      expect(data).toHaveProperty("cep", "61760-906");
      expect(data).toHaveProperty("lastname", "Garcia");
      expect(data).toHaveProperty("name", "Lígia");
    });
    it("should return an object with email/name/lastname/cep, part. 2", () => {
      const data = filterByEmail(entries, "teresa.nascimento@email.com");
      expect(data).toHaveProperty("email", "teresa.nascimento@email.com");
      expect(data).toHaveProperty("cep", "82300332");
      expect(data).toHaveProperty("lastname", "Nascimento");
      expect(data).toHaveProperty("name", "Teresa");
    });
    it("should return an object with email/name/lastname/cep, part. 1", () => {
      const data = filterByEmail(entries, "angelica.lopes@email.com");
      expect(data).toHaveProperty("email", "angelica.lopes@email.com");
      expect(data).toHaveProperty("cep", "05422030");
      expect(data).toHaveProperty("lastname", "Lopes");
      expect(data).toHaveProperty("name", "Angélica");
    });
  });
  describe("there's no entry with that e-mail", () => {
    it("should return undefined, part. 1", () => {
      expect(filterByEmail(entries, "nossas@email.com")).toStrictEqual(
        undefined
      );
    });
    it("should return undefined, part. 2", () => {
      expect(filterByEmail(entries, "bonde@email.com")).toStrictEqual(
        undefined
      );
    });
    it("should return undefined, part. 3", () => {
      expect(filterByEmail(entries, "teste@email.com")).toStrictEqual(
        undefined
      );
    });
    it("should return undefined, part. 4", () => {
      expect(filterByEmail(entries, "ligia.garci@email.com")).toStrictEqual(
        undefined
      );
    });
  });
});
