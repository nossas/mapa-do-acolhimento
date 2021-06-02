import BondeCreatedDate from "../integrations/BondeCreatedDate";
import { checkNames, checkCep } from "../utils";

const apm = {
  captureError: jest.fn(),
  setCustomContext: jest.fn(),
  setUserContext: jest.fn()
};

describe("BondeCreatedData Class", () => {
  describe("form entry not found for email, but there is name and cep from Mautic form results", () => {
    it("should return name/cep from mautic and createdAt is current", async () => {
      const bondeCreatedDate = new BondeCreatedDate(
        "form_entry_not_found@email.com",
        checkNames({
          primeiro_nome: "Nádia",
          sobrenome_completo: "de Lima"
        }),
        checkCep("30710456"),
        apm
      );
      const bondeCreatedAt = await bondeCreatedDate.start([]);
      expect(bondeCreatedAt).toHaveProperty("cep", "30710456");
      expect(bondeCreatedAt).toHaveProperty("name", "Nádia de Lima");
      expect(typeof bondeCreatedAt.createdAt === "string").toBe(true);
    });
  });
  describe("form entry not found for email, there's no cep from Mautic form results but but there's a name ", () => {
    it("should return createdAt: now, cep undefined and Mautic form name", async () => {
      const bondeCreatedDate = new BondeCreatedDate(
        "form_entry_not_found@email.com",
        checkNames({
          primeiro_nome: "Gabriela",
          sobrenome_completo: "Caetano"
        }),
        checkCep(undefined),
        apm
      );
      const bondeCreatedAt = await bondeCreatedDate.start([]);
      expect(bondeCreatedAt).toHaveProperty("cep", undefined);
      expect(bondeCreatedAt).toHaveProperty("name", "Gabriela Caetano");
      expect(typeof bondeCreatedAt.createdAt === "string").toBe(true);
    });
  });
  describe("form entry not found for email and there's no name or cep from Mautic form results", () => {
    it("should return createdAt: now, name: sem nome and cep undefined", async () => {
      const bondeCreatedDate = new BondeCreatedDate(
        "form_entry_not_found@email.com",
        checkNames({
          primeiro_nome: "",
          sobrenome_completo: ""
        }),
        checkCep(undefined),
        apm
      );
      const bondeCreatedAt = await bondeCreatedDate.start([]);
      expect(bondeCreatedAt).toHaveProperty("cep", undefined);
      expect(bondeCreatedAt).toHaveProperty("name", "sem nome");
      expect(typeof bondeCreatedAt.createdAt === "string").toBe(true);
    });
  });
  describe("form entry found, but there's no cep from Mautic form results", () => {
    it("should return name from Mautic, cep and createdAt from form_entry", async () => {
      const bondeCreatedDate = new BondeCreatedDate(
        "form_entry_found@email.com",
        checkNames({
          primeiro_nome: "Ana",
          sobrenome_completo: "Moniz"
        }),
        checkCep(undefined),
        apm
      );
      const bondeCreatedAt = await bondeCreatedDate.start([
        {
          fields: JSON.stringify([
            {
              uid: "field-1533735752669-39",
              kind: "email",
              label: "SEU MELHOR EMAIL",
              placeholder: "",
              required: "true",
              value: "form_entry_found@email.com"
            },
            {
              uid: "field-1533735803691-45",
              kind: "text",
              label: "CEP DE ATENDIMENTO (Só números)",
              placeholder: "",
              required: "true",
              value: "02202030"
            }
          ]),
          created_at: "2020-08-11 20:11:08.963001",
          widget_id: 17633
        }
      ]);
      expect(bondeCreatedAt).toHaveProperty("cep", "02202030");
      expect(bondeCreatedAt).toHaveProperty("name", "Ana Moniz");
      expect(typeof bondeCreatedAt.createdAt === "string").toBe(true);
    });
  });
  describe("form entry found, and there's name and cep from Mautic form results", () => {
    it("should return createdAt from form_entries and name/cep from Mautic results", async () => {
      const bondeCreatedDate = new BondeCreatedDate(
        "form_entry_found@email.com",
        checkNames({
          primeiro_nome: "Fátima",
          sobrenome_completo: "Furtado"
        }),
        checkCep("11075600"),
        apm
      );
      const bondeCreatedAt = await bondeCreatedDate.start([
        {
          fields: JSON.stringify([
            {
              uid: "field-1533735752669-39",
              kind: "email",
              label: "SEU MELHOR EMAIL",
              placeholder: "",
              required: "true",
              value: "form_entry_found@email.com"
            },
            {
              uid: "field-1533735803691-45",
              kind: "text",
              label: "CEP DE ATENDIMENTO (Só números)",
              placeholder: "",
              required: "true",
              value: "11075601"
            },
            {
              uid: "field-1533735738039-59",
              kind: "text",
              label: "NOME",
              placeholder: "",
              required: "true",
              value: "Fatima"
            },

            {
              uid: "field-1533735745400-14",
              kind: "text",
              label: "SOBRENOME",
              placeholder: "",
              required: "true",
              value: "Frutado"
            }
          ]),
          created_at: "2020-09-16T21:03:44.543Z",
          widget_id: 17633
        }
      ]);
      expect(bondeCreatedAt).toHaveProperty("cep", "11075600");
      expect(bondeCreatedAt).toHaveProperty("name", "Fátima Furtado");
      expect(typeof bondeCreatedAt.createdAt === "string").toBe(true);
    });
  });
});
