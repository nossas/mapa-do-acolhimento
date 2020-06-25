interface HasuraError {
  errors: unknown;
}

const isError = (
  data: HasuraResponse<string, unknown>
): data is HasuraError => {
  if ("error" in data) {
    return true;
  }
  return false;
};

export type HasuraResponse<queryName extends string, dataType> =
  | HasuraError
  | {
      data: {
        [K in queryName]: dataType;
      };
    };

export default isError;
