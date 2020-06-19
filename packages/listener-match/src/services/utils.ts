export const getRequestedVolunteerType = (subject: string) => {
  const str = typeof subject === "string" ? subject.toLowerCase() : "";
  const removeSpecialCaracters = str.replace(/[^\w\s]/gi, "");
  if (removeSpecialCaracters.indexOf("jurdico") !== -1) return "lawyer";
  if (removeSpecialCaracters.indexOf("psicolgico") !== -1) return "therapist";
  return undefined;
};

export const zendeskOrganizations = () =>
  JSON.parse(process.env.ZENDESK_ORGANIZATIONS || "{}");

export const getVolunteerOrganizationId = (type: string) =>
  zendeskOrganizations()[type];

export const getCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
};

const LAWYER = zendeskOrganizations()["lawyer"];
const THERAPIST = zendeskOrganizations()["therapist"];

export const getVolunteerType = (id: number) => {
  if (id === LAWYER)
    return {
      type: "Advogada",
      registry_type: "OAB",
      path: "diretrizes_atendimento_advogada.pdf",
      filename: "Diretrizes_de_Atendimento___Advogadas_Voluntarias.pdf"
    };
  if (id === THERAPIST)
    return {
      type: "Psicóloga",
      registry_type: "CRP",
      path: "diretrizes_atendimento_psicologa.pdf",
      filename: "Diretrizes_de_Atendimento___Psicologas_Voluntarias.pdf"
    };
  throw new Error("Volunteer organization_id not supported in search for type");
};
