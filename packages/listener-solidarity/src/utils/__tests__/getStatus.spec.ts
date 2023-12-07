import { getStatus } from "../getSupportRequests";

describe("getStatus", () => {
  it("should return 'open' if zendeskStatus is an empty string", () => {
    expect(getStatus("")).toStrictEqual("open");
  });

  it("should return 'open' if zendeskStatus is not found in newStatus key/value pair", () => {
    expect(getStatus("encaminhamento__realizado")).toStrictEqual("open");
  });

  it("should return 'open' if zendeskStatus is 'solicitacao_recebida'", () => {
    expect(getStatus("solicitação_recebida")).toStrictEqual("open");
  });

  it("should return 'duplicated' if zendeskStatus is 'solicitação_repetida'", () => {
    expect(getStatus("solicitação_repetida")).toStrictEqual("duplicated");
  });
});
