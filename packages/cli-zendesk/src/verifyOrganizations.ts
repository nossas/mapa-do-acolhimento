import * as yup from "yup";
import dbg from "./dbg";
import { Ticket } from "./interfaces/Ticket";
import { ORGANIZATIONS } from "./interfaces/Organizations";

const log = dbg.child({ labels: { process: "verifyOrganization" } });

const verifyOrganization = async (ticket: Ticket) => {
  const { ZENDESK_ORGANIZATIONS = "" } = process.env;
  try {
    const organizations = await yup
      .object()
      .shape({
        ADVOGADA: yup.number().required(),
        MSR: yup.number().required(),
        PSICÓLOGA: yup.number().required()
      })
      .required()
      .validate(JSON.parse(ZENDESK_ORGANIZATIONS));

    const { organization_id } = ticket;

    switch (organization_id) {
      case organizations.ADVOGADA:
        return ORGANIZATIONS.ADVOGADA;
      case organizations.MSR:
        return ORGANIZATIONS.MSR;
      case organizations.PSICÓLOGA:
        return ORGANIZATIONS.PSICOLOGA;
      default:
        log.warn(`failed to parse organization '${organization_id}'`);
        return null;
    }
  } catch (e) {
    dbg.child({ labels: { process: "verifyOrganization" } }).error(e);
    return null;
  }
};

export default verifyOrganization;
