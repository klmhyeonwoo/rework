import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";

export const useApiPostMonthAgenda = () => {
  const postAgenda = async ({ monthAgenda }: { monthAgenda: string }) => {
    console.log(monthAgenda);
    const res = await api
      .post(`/api/v1/monthlyAgenda`, {
        todo: monthAgenda,
      })
      .then((res) => res.data);
    return res;
  };

  return useMutation({
    mutationFn: ({ monthAgenda }: { monthAgenda: string }) => postAgenda({ monthAgenda }),
  });
};
