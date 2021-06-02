import * as yup from "yup";
import { CONDITION, FormEntry } from "./types";

export const setCondition = (condition: [CONDITION], value: CONDITION) => {
  const newCondition = condition;
  if (newCondition[0] === CONDITION.UNSET) {
    newCondition[0] = value;
  }
};

/**
 * TODO: adicionar tag cep_incorreto
 */
export const verifyLocation = async (data, getGeolocation) => {
  const geolocationData = await getGeolocation({
    cep: data.cep,
    email: data.email
  });

  return {
    ...data,
    ...geolocationData
  };
};

export const verificaDiretrizesAtendimento = async (
  condition: [CONDITION],
  data: Record<string, unknown>
) => {
  let newData = data;
  const verificaCamposDiretrizesAtendimento = yup
    .object()
    .shape({
      todos_os_atendimentos_rea: yup.string().required(),
      as_voluntarias_do_mapa_do: yup.string().required(),
      o_comprometimento_a_dedic: yup.string().required(),
      o_mapa_do_acolhimento_ent: yup.string().required(),
      para_que_as_mulheres_que: yup.string().required()
    })
    .required();

  try {
    await verificaCamposDiretrizesAtendimento.validate(newData, {
      strict: true
    });
  } catch (e) {
    setCondition(condition, CONDITION.REPROVADA_REGISTRO_INVÁLIDO);
  }

  const verificaRespostasDiretrizesAtendimento = yup
    .object()
    .shape({
      todos_os_atendimentos_rea: yup.string().matches(/aceito/),
      as_voluntarias_do_mapa_do: yup.string().matches(/compreendo/),
      o_comprometimento_a_dedic: yup.string().matches(/sim/),
      o_mapa_do_acolhimento_ent: yup.string().matches(/sim/),
      para_que_as_mulheres_que: yup.string().matches(/sim/)
    })
    .required();

  if (!(await verificaRespostasDiretrizesAtendimento.isValid(newData))) {
    setCondition(condition, CONDITION.REPROVADA_DIRETRIZES_DO_MAPA);
  }

  const stripDiretrizesAtendimento = yup
    .object()
    .shape({
      todos_os_atendimentos_rea: yup.mixed().strip(true),
      as_voluntarias_do_mapa_do: yup.mixed().strip(true),
      o_comprometimento_a_dedic: yup.mixed().strip(true),
      o_mapa_do_acolhimento_ent: yup.mixed().strip(true),
      para_que_as_mulheres_que: yup.mixed().strip(true)
    })
    .required();

  newData = stripDiretrizesAtendimento.cast(newData);

  return newData;
};

export const verificaEstudoDeCaso = async (
  condition: [CONDITION],
  data: object
) => {
  let newData = data;
  const verificaCamposEstudoDeCaso = yup
    .object()
    .shape({
      no_seu_primeiro_atendimen: yup.string().required(),
      para_voce_o_que_e_mais_im: yup.string().required(),
      durante_os_encontros_ana: yup.string().required(),
      durante_os_atendimentos_a: yup.string().required()
    })
    .required();

  try {
    await verificaCamposEstudoDeCaso.validate(newData, {
      strict: true
    });
  } catch (e) {
    setCondition(condition, CONDITION.REPROVADA_REGISTRO_INVÁLIDO);
  }

  const verificaRespostaEstudoDeCaso = yup
    .object()
    .shape({
      no_seu_primeiro_atendimen: yup.string().matches(/A|B/),
      para_voce_o_que_e_mais_im: yup.string().matches(/A|B/),
      durante_os_encontros_ana: yup.string().matches(/A|B/),
      durante_os_atendimentos_a: yup.string().matches(/A|B/)
    })
    .required();

  if (!(await verificaRespostaEstudoDeCaso.isValid(newData))) {
    setCondition(condition, CONDITION.REPROVADA_ESTUDO_DE_CASO);
  }

  const stripRespostaEstudoDeCaso = yup
    .object()
    .shape({
      no_seu_primeiro_atendimen: yup.mixed().strip(true),
      para_voce_o_que_e_mais_im: yup.mixed().strip(true),
      durante_os_encontros_ana: yup.mixed().strip(true),
      durante_os_atendimentos_a: yup.mixed().strip(true)
    })
    .required();

  newData = stripRespostaEstudoDeCaso.cast(newData);

  return newData;
};

export const removeFalsyValues = obj =>
  Object.entries(obj).reduce((a, [k, v]) => (v ? ((a[k] = v), a) : a), {});

export const checkNames = ({
  primeiro_nome,
  sobrenome_completo
}: {
  primeiro_nome?: Array<string> | string;
  sobrenome_completo?: Array<string> | string;
}) => {
  let aux = "";
  if (primeiro_nome && primeiro_nome.length > 0) {
    aux += `${primeiro_nome}`;
  }

  if (sobrenome_completo && sobrenome_completo.length > 0) {
    aux += ` ${sobrenome_completo}`;
  }

  if (aux.length > 0) {
    return aux;
  }

  return null;
};

export const checkCep = (cep?: string) => {
  if (cep && cep.length > 0) {
    return cep.toString();
  }

  return null;
};

export const filterByEmail = (
  formEntries: FormEntry[],
  email: string
):
  | {
      name: string | null;
      lastname: string | null;
      cep: string | null;
      created_at: string;
      widget_id: number;
      registration_number: string;
    }
  | undefined => {
  const dicio = {
    "field-1533735738039-59": "name",
    "field-1464961964463-91": "name",
    "field-1497368661426-82": "name",
    "field-1530889190780-12": "name",
    "field-1530889762581-19": "name",
    "field-1533733461113-5": "name",
    "field-1464961980231-76": "lastname",
    "field-1533735745400-14": "lastname",
    "field-1497368672826-91": "lastname",
    "field-1530889199847-58": "lastname",
    "field-1530889778477-47": "lastname",
    "field-1533733485653-99": "lastname",
    "field-1533735803691-45": "cep",
    "field-1464962010023-34": "cep",
    "field-1497369214092-68": "cep",
    "field-1530889290557-13": "cep",
    "field-1530889888615-19": "cep",
    "field-1533733650118-7": "cep",
    "field-1464962055652-41": "registration_number",
    "field-1497368693005-33": "registration_number",
    "field-1530889245511-83": "registration_number",
    "field-1530889844695-35": "registration_number",
    "field-1533733501716-34": "registration_number",
    "field-1533735761357-93": "registration_number"
  };
  const getFieldsValue = formEntries.map(i => {
    try {
      const parsedFields = JSON.parse(i.fields);
      return {
        ...i,
        ...parsedFields.reduce((newObj, old) => {
          const key = (dicio[old.uid] && dicio[old.uid]) || old.kind;
          return {
            ...newObj,
            [key]: old.value
          };
        }, {})
      };
    } catch (e) {
      console.log(e);
      return undefined;
    }
  });
  return getFieldsValue.find(f => f.email === email);
};
