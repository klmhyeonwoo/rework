import { api } from "@/api";

interface changePasswordType {
  code: number;
  data: boolean;
  message: string;
}

export const changePassword = (userId: string, oldPassword: string, newPassword: string) => {
  const res = api
    .put(`/api/v1/members/password`, {
      userId: userId,
      oldPassword: oldPassword,
      newPassword: newPassword,
    })
    .then((res) => res.data as changePasswordType);
  return res;
};
