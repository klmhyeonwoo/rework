import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";

interface postAgendaProps {
  todo: string;
  pagingId: number;
  createdAt?: string;
}

interface postTodayAgendaResponse {
  code: number;
  message: string;
  data: {
    agendaId: number;
    todo: string;
  };
}
export const useApiPostTodayAgenda = () => {
  const postAgenda = async ({ todo, pagingId, createdAt }: postAgendaProps) => {
    const res = await api.post(`/api/v1/dailyAgenda`, { todo: todo, pagingId: pagingId, createdAt: createdAt });
    return res.data as postTodayAgendaResponse;
  };

  return useMutation({
    mutationFn: ({ todo, pagingId, createdAt }: postAgendaProps) => postAgenda({ todo, pagingId, createdAt }),
    onSuccess: (res) => console.log(res),
    onError: (err) => console.log(err),
  });
};
