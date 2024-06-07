import { api } from "@/api";

interface loginResponseType {
  accessToken: string;
}

export default function executeLogin(id: string, password: string) {
  const res = api
    .post("/api/v1/members/login", {
      userId: id,
      password: password,
    })
    .then((res) => res.data as loginResponseType);
  return res;
}
