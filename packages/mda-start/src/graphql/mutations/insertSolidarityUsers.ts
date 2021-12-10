import gql from "graphql-tag";
import * as yup from "yup";
import { client as GraphQLAPI } from "../";
import logger from "../../logger";

const log = logger.child({ labels: { process: "insertSolidarityUsers" } });

const CREATE_USERS_MUTATION = gql`
  mutation insert_solidarity_users($users: [solidarity_users_insert_input!]!) {
    insert_solidarity_users(
      objects: $users
      on_conflict: {
        constraint: solidarity_users_user_id_key
        update_columns: [
          updated_at
          name
          role
          organization_id
          email
          external_id
          phone
          verified
          tipo_de_acolhimento
          condition
          state
          city
          cep
          address
          whatsapp
          registration_number
          occupation_area
          disponibilidade_de_atendimentos
          data_de_inscricao_no_bonde
          latitude
          longitude
          user_fields
          community_id
          user_id
          cor
        ]
      }
    ) {
      returning {
        external_id
      }
    }
  }
`;

const userSchema = yup
  .array()
  .of(
    yup
      .object()
      .shape({
        role: yup.string().nullable(),
        organization_id: yup.number().required(),
        name: yup.string().required(),
        email: yup.string().required(),
        external_id: yup.string().required(),
        user_id: yup.number().required(),
        condition: yup.string().required(),
        city: yup.string().nullable(),
        community_id: yup.string().required(),
        data_de_inscricao_no_bonde: yup.string().required(),
        address: yup.string().required(),
        latitude: yup
          .string()
          .nullable()
          .defined(),
        longitude: yup
          .string()
          .nullable()
          .defined(),
        phone: yup.string().nullable(),
        state: yup.string().nullable(),
        tipo_de_acolhimento: yup.string().nullable(),
        registration_number: yup.string().nullable(),
        occupation_area: yup.string().nullable(),
        disponibilidade_de_atendimentos: yup.string().nullable(),
        whatsapp: yup.string().nullable(),
        verified: yup.boolean(),
        cep: yup.string().nullable(),
        cor: yup.string().nullable(),
        user_fields: yup
          .object()
          .shape({
            condition: yup.string().required(),
            city: yup.string().nullable(),
            state: yup.string().nullable(),
            data_de_inscricao_no_bonde: yup.string().required(),
            tipo_de_acolhimento: yup.string().nullable(),
            registration_number: yup.string().nullable(),
            occupation_area: yup.string().nullable(),
            disponibilidade_de_atendimentos: yup.string().nullable(),
            latitude: yup
              .string()
              .nullable()
              .defined(),
            longitude: yup
              .string()
              .nullable()
              .defined(),
            whatsapp: yup.string().nullable(),
            cep: yup.string().nullable(),
            address: yup.string().required(),
            cor: yup.string().nullable()
          })
          .required()
      })
      .required()
  )
  .required();

type Users = yup.InferType<typeof userSchema>;

const insertSolidarityUsers = async (
  users: Users
): Promise<{ external_id: number }[] | undefined> => {
  log.info("Saving users in Hasura...");
  const ids = users.map(u => u.external_id);
  try {
    const validatedUsers = await userSchema.validate(users, {
      stripUnknown: true
    });
    // log(validatedUsers);
    const res = await GraphQLAPI.mutate({
      mutation: CREATE_USERS_MUTATION,
      variables: { users: validatedUsers }
    });

    if (res && res.data && res.data.errors) {
      log.error(
        `failed on insert solidarity users: ${ids} %o`,
        res.data.errors
      );
      return undefined;
    }

    const {
      data: {
        insert_solidarity_users: { returning }
      }
    } = res;

    return returning;
  } catch (err: any) {
    log.error(`failed on insert solidarity users: ${ids} %o`, err);
    return err;
  }
};

export default insertSolidarityUsers;
