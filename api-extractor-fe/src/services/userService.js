import { postData } from "../provider/apiProvider";

const login = async (req) => {
  return postData("/login", req).then((data) => data || []);
}

export { login };