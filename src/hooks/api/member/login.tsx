import { api } from "@/api";

export default function executeLogin(id: string, password: string) {
  return api.post("/api/v1/members/login", {
    userId: id,
    password: password,
  });
}
