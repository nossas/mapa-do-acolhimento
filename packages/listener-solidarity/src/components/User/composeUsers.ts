import Bottleneck from "bottleneck";
import { getOrganizationType, setType, organizationsIds } from "../../utils";
import {
  Widget,
  User,
  FormEntry,
  Instance,
  Fields,
  IndividualGeolocation
} from "../../types";
import logger from "../../logger";

const log = logger.child({ labels: { process: "composeUser" } });

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1000
});

const createUser = (): User => ({
  name: "",
  role: "end-user",
  organization_id: 0,
  email: "",
  external_id: "",
  phone: "",
  verified: true,
  user_fields: {
    tipo_de_acolhimento: null,
    condition: "desabilitada",
    state: "",
    city: "",
    cep: "",
    address: "",
    cor: null,
    whatsapp: null,
    registration_number: null,
    occupation_area: null,
    disponibilidade_de_atendimentos: null,
    data_de_inscricao_no_bonde: "",
    latitude: null,
    longitude: null
  }
});

const addAvailability = (availability: string) => {
  const formattedAvailability = availability.replace(/\D/g, "");
  if (formattedAvailability === "") {
    return "1";
  }

  return Number(formattedAvailability) > 5
    ? "5_ou_mais"
    : Number(formattedAvailability).toString();
};

const changeCondition = (
  created_at: string,
  widget_id: number,
  terms?: string
) => {
  if (terms && terms.match(/sim/gi)) return "inscrita";
  // Some MSR forms didn't have the `accept_terms` field
  if (created_at < "2019-06-10 18:08:55.49997" && widget_id === 16850)
    return "inscrita";
  if (widget_id === 3297) {
    return "inscrita";
  }
  return "desabilitada";
};

export default async (
  cache: FormEntry[],
  widgets: Widget[],
  getGeolocation
): Promise<User[]> => {
  log.info("Composing users...");
  const users = cache.map(async (formEntry: FormEntry) => {
    const fields: Fields = JSON.parse(formEntry.fields);
    const widget = widgets.find((w: Widget) => w.id === formEntry.widget_id);

    if (!widget) return undefined;

    const instance: Instance = {
      tipo_de_acolhimento: null,
      first_name: "",
      email: ""
    };

    widget.metadata.form_mapping.map(field => {
      instance[field.name] = (
        fields.find(f => f.uid === field.uid) || {}
      ).value;
    });

    const register = createUser();
    const isMsr = getOrganizationType(widget.id) === "MSR";

    register["email"] = instance.email;
    if (instance.phone) register["phone"] = instance.phone;

    if ([16850, 3297].includes(widget.id)) {
      register["name"] = instance.first_name;
    } else {
      register["name"] = instance.last_name
        ? `${instance.first_name} ${instance.last_name}`
        : instance.first_name;
    }

    register["organization_id"] =
      organizationsIds[getOrganizationType(widget.id)];

    register["external_id"] = formEntry.id.toString();

    for (const key in register.user_fields) {
      if (instance[key]) register["user_fields"][key] = instance[key];
    }

    register["user_fields"]["cor"] = instance.cor
      ? instance.cor.toLowerCase().replace(/\s/g, "")
      : null;

    if (![16850, 3297].includes(widget.id)) {
      register["user_fields"][
        "disponibilidade_de_atendimentos"
      ] = addAvailability(instance["disponibilidade_de_atendimentos"] || "");
    }

    register["user_fields"]["data_de_inscricao_no_bonde"] =
      formEntry.created_at;

    const geocoding = (await limiter.schedule(() =>
      getGeolocation(instance)
    )) as IndividualGeolocation;

    Object.keys(geocoding).map(g => {
      register["user_fields"][g] = geocoding[g];
    });

    if (isMsr) {
      register["user_fields"]["condition"] = changeCondition(
        formEntry.created_at,
        widget.id,
        instance["accept_terms"]
      );
    } else if (instance["condition"]) {
      register["user_fields"]["condition"] = instance["condition"];  
    } else {
      register["user_fields"]["condition"] = "cadastrada";
    }

    register["user_fields"]["tipo_de_acolhimento"] = setType(
      instance.tipo_de_acolhimento
    );

    return register;
  });

  return (await Promise.all(users)).filter(Boolean) as User[];
};
