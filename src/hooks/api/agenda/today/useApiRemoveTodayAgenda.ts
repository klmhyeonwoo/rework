import { api } from "@/api";

interface removeAgendaProps {
  id: number;
}

interface removeAgendaResponse {
  code: number;
  data: boolean;
  message: string;
}

export const removeTodayAgenda = async ({ id }: removeAgendaProps) => {
  const res = await api.delete(`/api/v1/dailyAgenda?dailyAgendaId=${id}`);
  return res.data as removeAgendaResponse;
};
export const useApiRemoveTodayAgenda = () => {};
