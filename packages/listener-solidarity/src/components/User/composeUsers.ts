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
import dbg from "../../dbg";

const log = dbg.extend("composeUser");

const limiter = new Bottleneck({
  maxConcurrent: 1,
  minTime: 1000
});

export default async (
  cache: FormEntry[],
  widgets: Widget[],
  getGeolocation
): Promise<User[]> => {
  log("Composing users...");
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

    // log({ instance });

    const register: User = {
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
        whatsapp: null,
        registration_number: null,
        occupation_area: null,
        disponibilidade_de_atendimentos: null,
        data_de_inscricao_no_bonde: "",
        latitude: null,
        longitude: null
      }
    };

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

    if (![16850, 3297].includes(widget.id)) {
      const availability = (
        instance["disponibilidade_de_atendimentos"] || ""
      ).replace(/\D/g, "");

      if (availability === "") {
        register["user_fields"]["disponibilidade_de_atendimentos"] = "1";
      } else {
        register["user_fields"]["disponibilidade_de_atendimentos"] =
          Number(availability) > 5
            ? "5_ou_mais"
            : Number(availability).toString();
      }
    }

    register["user_fields"]["data_de_inscricao_no_bonde"] =
      formEntry.created_at;

    // register["user_fields"]["state"] = "";

    const geocoding = (await limiter.schedule(() =>
      getGeolocation(instance)
    )) as IndividualGeolocation;
    Object.keys(geocoding).map(g => {
      register["user_fields"][g] = geocoding[g];
    });

    const terms = instance["accept_terms"];
    if (terms && terms.match(/sim/gi))
      register["user_fields"]["condition"] = "inscrita";
    // Some MSR forms didn't have the `accept_terms` field
    if (
      formEntry.created_at < "2019-06-10 18:08:55.49997" &&
      widget.id === 16850
    )
      register["user_fields"]["condition"] = "inscrita";
    if (widget.id === 3297) {
      register["user_fields"]["condition"] = "inscrita";
    }

    register["user_fields"]["tipo_de_acolhimento"] = setType(
      instance.tipo_de_acolhimento
    );

    // log({ register });

    return register;
  });

  return (await Promise.all(users)).filter(Boolean) as User[];
};
