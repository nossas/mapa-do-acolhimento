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
