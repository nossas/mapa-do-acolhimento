import { Ticket } from "../types";

export const organizationsIds = {
  MSR: 360273031591,
  THERAPIST: 360282119532,
  LAWYER: 360269610652
};

export const setType = (type: string | null) => {
  switch (type) {
    case "Acolhimento Jurídico":
    case " Jurídico":
    case "Jurídico":
      return "jurídico";
    case "Acolhimento Terapêutico":
    case " Psicológico":
    case "Psicológico":
      return "psicológico";
    case "Acolhimento Terapêutico & Jurídico":
    case "psicológico & Jurídico":
    case "Psicológico & Jurídico":
    case " Psicológico & Jurídico ":
      return "psicológico_e_jurídico";
    default:
      return null;
  }
};

const { LAWYER_WIDGET_IDS = "", THERAPIST_WIDGET_IDS = "" } = process.env;
const lawyer_widgets = LAWYER_WIDGET_IDS.split(",").map(Number);
const therapist_widgets = THERAPIST_WIDGET_IDS.split(",").map(Number);

// type PossibleWidgetIds =
//   | 8190
//   | 16838
//   | 17633
//   | 2760
//   | 16835
//   | 17628
//   | 16850
//   | 3297;

export const getOrganizationType = (
  id: number
): "THERAPIST" | "LAWYER" | "MSR" => {
  if (therapist_widgets.includes(id)) return "THERAPIST";
  if (lawyer_widgets.includes(id)) return "LAWYER";
  return "MSR";
};

export const handleUserError = entries => {
  console.log(
    `Integration failed in these form entries ${entries.map(
      e => e.external_id
    )}`
  );
  return undefined;
};

export const handleTicketError = ({ requester_id }) => {
  console.log(`Ticket integration failed for this user ${requester_id}`);
  return undefined;
};

export const capitalize = (s: string) => {
  if (typeof s !== "string") return "";
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export const formatDate = (date: string) => {
  const formatted = new Date(date);
  const dd = String(formatted.getDate()).padStart(2, "0");
  const mm = String(formatted.getMonth() + 1).padStart(2, "0");
  const yyyy = formatted.getFullYear();

  return `${yyyy}-${mm}-${dd}`;
};

export const extractTypeFromSubject = (subject: string) =>
  subject
    .replace(/[-\\^$*+?.()|[\]{}]/g, "")
    .split(" ")[0]
    .toLowerCase();

export const removeDuplicatesBy = (keyFn, array: Array<unknown>) => {
  const mySet = new Set();
  return array.filter(x => {
    const key = keyFn(x),
      isNew = !mySet.has(key);
    if (isNew) mySet.add(key);
    return isNew;
  });
};

export const getStatusAcolhimento = (
  ticket: Ticket
): string | undefined | null => {
  const status = ticket.custom_fields.find(field => field.id === 360014379412);
  return status && status.value;
};

export { default as getGeolocation } from "./geocoding";
