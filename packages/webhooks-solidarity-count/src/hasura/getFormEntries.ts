import HasuraBase from "./HasuraBase";
import isError, { HasuraResponse } from "./isError";
import dbg from "./dbg";

const log = dbg.child({ labels: { process: "getFormEntries" } });

const query = `query($advogadaId: Int!, $psicologaId: Int!) {
  form_entries(where: {widget_id: {_in: [$advogadaId, $psicologaId]}}) {
    fields
    created_at
    widget_id
  }
}`;

interface Response {
  fields: string;
  created_at: string;
  widget_id: number;
}

const getFormEntries = async () => {
  try {
    const widget_ids = JSON.parse(
      process.env.WIDGET_IDS.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    );

    const advogadaId = widget_ids.ADVOGADA;
    const psicologaId = widget_ids.PSICOLOGA;

    const response = await HasuraBase<
      HasuraResponse<"form_entries", Response[]>
    >(query, {
      advogadaId,
      psicologaId
    });

    if (isError(response.data)) {
      return response.data.errors;
    }

    return response.data.data.form_entries;
  } catch (e) {
    return log.error(e);
  }
};

export default getFormEntries;
