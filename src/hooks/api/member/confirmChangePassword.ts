import { api } from "@/api";

interface confirmType {
  data: {
    email: string;
    initialPasswordUpdateState: boolean;
    memberRole: string;
  };
}
export const confirmChangePassword = () => {
  const res = api.get(`/api/v1/members/info`).then((res) => res.data as confirmType);
  return res;
};
