import {
  verificaDiretrizesAtendimento,
  verificaEstudoDeCaso,
  verificaLocalização
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
  describe("verificaLocalização", () => {
    describe("cep falsy", () => {
      it("should add to the tags array the value 'cep-incorreto'", async () => {
        const data1 = await verificaLocalização({});
        const data2 = await verificaLocalização({ cep: null });
        const data3 = await verificaLocalização({ cep: undefined });
        expect(data1).toHaveProperty("tags", ["cep-incorreto"]);
        expect(data2).toHaveProperty("tags", ["cep-incorreto"]);
        expect(data3).toHaveProperty("tags", ["cep-incorreto"]);
      });
    });
    describe("GM returns ZERO_RESULTS", () => {
      it("variable 'tags' has value '[cep-incorreto]'", async () => {
        const data = await verificaLocalização({ cep: "42250579" });
        expect(data).toHaveProperty("tags", ["cep-incorreto"]);
      });
    });
    describe("GM returns a valid response", () => {
      it("'tags' array is empty", async () => {
        const data = await verificaLocalização({ cep: "66093-672" });
        expect(data).toHaveProperty("tags", []);
      });
      it("latitude and longitude is not null", async () => {
        const data = await verificaLocalização({ cep: "66093-672" });
        expect(data.latitude).not.toBe(null);
        expect(data.longitude).not.toBe(null);
      });
    });
  });
});