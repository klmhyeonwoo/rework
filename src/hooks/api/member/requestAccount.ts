import { api } from "@/api";

interface requestAccountType {
  code: number;
  data: boolean;
  message: string;
}
export const requestAccount = (userId: string) => {
  const res = api
    .post(`/api/v1/members/register-email`, {
      email: userId,
    })
    .then((res) => res.data as requestAccountType);
  return res;
};
