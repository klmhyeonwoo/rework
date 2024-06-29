import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";

interface editAgendaProps {
  agendaId: number;
  todo: string;
  state: boolean;
  pagingId: number;
}

interface editTodayAgendaResponse {
  code: number;
  message: string;
  data: {
    agendaId: number;
    todo: string;
  };
}

export const useApiEditTodayAgenda = () => {
  const editAgenda = async ({ agendaId, todo, state, pagingId }: editAgendaProps) => {
    const res = await api.put(`/api/v1/dailyAgenda`, {
      agendaId: agendaId,
      todo: todo,
      state: state,
      pagingId: pagingId,
    });
    return res.data as editTodayAgendaResponse;
  };

  return useMutation({
    mutationFn: ({ agendaId, todo, state, pagingId }: editAgendaProps) => editAgenda({ agendaId, todo, state, pagingId }),
  });
};
