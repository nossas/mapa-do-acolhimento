import gql from "graphql-tag";
import { client as GraphQLAPI } from "../";
import logger from "../../logger";

const log = logger.child({ module: "updateFormEntries" });

const FORM_ENTRIES_MUTATION = gql`
  mutation update_form_entries($forms: [Int!]) {
    update_form_entries(
      _set: { rede_syncronized: true }
      where: { id: { _in: $forms } }
    ) {
      returning {
        id
      }
    }
  }
`;

// type Response = {
//   data: {
//     update_form_entries?: {
//       returning: Array<{
//         id;
//         updated_at;
//       }>;
//     };
//     errors?: Array<any>;
//   };
// };

const updateFormEntries = async (forms: number[]) => {
  log.info("Updating form_entries syncronized on GraphQL API...");
  try {
    const res = await GraphQLAPI.mutate({
      mutation: FORM_ENTRIES_MUTATION,
      variables: { forms }
    });

    if (res && res.data && res.data.errors) {
      log.error(`failed on update form entries: ${forms} %o`, res.data.errors);
      return undefined;
    }

    const {
      data: {
        update_form_entries: { returning: formEntries }
      }
    } = res;

    return formEntries;
  } catch (err) {
    log.error(`failed on update form entries: ${forms} %o`, err);
    return undefined;
  }
};

export default updateFormEntries;
