import * as turf from "@turf/turf";
import { IndividualTicket } from "../types";

export const getRequestedVolunteerType = (subject: string) => {
  const str = typeof subject === "string" ? subject.toLowerCase() : "";
  const removeSpecialCaracters = str.replace(/[^\w\s]/gi, "");
  if (removeSpecialCaracters.indexOf("jurdico") !== -1) return "lawyer";
  if (removeSpecialCaracters.indexOf("psicolgico") !== -1) return "therapist";
  return undefined;
};

export const zendeskOrganizations = JSON.parse(
  process.env.ZENDESK_ORGANIZATIONS || "{}"
);

export const getVolunteerOrganizationId = (type: string) =>
  zendeskOrganizations[type];

export const getCurrentDate = () => {
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
};

const LAWYER = zendeskOrganizations["lawyer"];
const THERAPIST = zendeskOrganizations["therapist"];

export const getVolunteerType = (id: number) => {
  if (id === LAWYER)
    return {
      type: "Advogada",
      registry_type: "OAB"
    };
  if (id === THERAPIST)
    return {
      type: "Psicóloga",
      registry_type: "CRP"
    };
  throw new Error("Volunteer organization_id not supported in search for type");
};

export const customFieldsDicio: {
  360014379412: "status_acolhimento";
  360016631592: "nome_voluntaria";
  360016631632: "link_match";
  360016681971: "nome_msr";
  360017056851: "data_inscricao_bonde";
  360017432652: "data_encaminhamento";
  360021665652: "status_inscricao";
  360021812712: "telefone";
  360021879791: "estado";
  360021879811: "cidade";
  360032229831: "atrelado_ao_ticket";
} = {
  360014379412: "status_acolhimento",
  360016631592: "nome_voluntaria",
  360016631632: "link_match",
  360016681971: "nome_msr",
  360017056851: "data_inscricao_bonde",
  360017432652: "data_encaminhamento",
  360021665652: "status_inscricao",
  360021812712: "telefone",
  360021879791: "estado",
  360021879811: "cidade",
  360032229831: "atrelado_ao_ticket"
};

export const composeCustomFields = custom_fields =>
  custom_fields.reduce((newObj, old) => {
    const key = customFieldsDicio[old.id] && customFieldsDicio[old.id];
    return {
      ...newObj,
      [key]: old.value
    };
  }, {});

export const agentSelectionDicio = {
  1: 377510044432,
  2: 377511446392,
  3: 377577169651
};

export const agentDicio = {
  377510044432: "Larissa",
  377577169651: "Ana",
  377511446392: "Gabriela"
};

export const calcDistance = (pointA: number[], pointB: number[]) => {
  if (
    typeof pointA[0] !== "number" ||
    typeof pointA[1] !== "number" ||
    typeof pointB[0] !== "number" ||
    typeof pointB[1] !== "number"
  )
    return undefined;
  const a = turf.point(pointA);
  const b = turf.point(pointB);

  return Number(turf.distance(a, b));
};

export const filterCache = (
  cache: IndividualTicket[],
  tickets: IndividualTicket[]
) =>
  cache
    .filter(c => !tickets.map(t => t.ticket_id).includes(c.ticket_id))
    .concat(tickets);
