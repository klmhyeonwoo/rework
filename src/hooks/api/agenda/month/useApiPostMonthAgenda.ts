import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useApiPostMonthAgenda = () => {
  const postAgenda = async () => {
    const res = await api
      .post(`/api/v1/monthlyAgenda/`, {
        todo: "테스트",
      })
      .then((res) => res.data);
    return res;
  };

  return useMutation({
    mutationFn: () => postAgenda(),
  });
};
