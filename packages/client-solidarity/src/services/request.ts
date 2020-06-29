import Axios from "axios";

const get = async (route?: unknown, params?: string) =>
  Axios.get(`/api/${route}`, { params });
const post = async (body: Record<string, unknown>) =>
  Axios.post("/api/forward", body);

export default {
  get,
  post
};
