import User from ".";

const handleUserFields = (user: User): any => {
  const { id, user_fields, ...otherFields } = user;
  return {
    user_fields,
    ...otherFields,
    ...user_fields,
    user_id: id as number
  };
};

export default handleUserFields;
