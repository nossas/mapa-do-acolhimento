import { action } from "easy-peasy";

type Status =
  | "confirm"
  | "noPhoneNumber"
  | "success"
  | "pending"
  | "rejected"
  | undefined;

const statusModel: { data: Status; setStatus: Function } = {
  data: undefined,
  setStatus: action((state, payload) => ({
    data: payload
  }))
};

export default statusModel;
