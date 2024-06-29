import { api } from "@/api";
import { useMutation } from "@tanstack/react-query";

interface agendaProps {
  agendaId?: number;
  todo: string;
  state: boolean;
  pagingId: number;
  createdAt?: string;
}
export const useApiOrderTodayAgenda = () => {
  const orderAgenda = async (data: agendaProps) => {
    const res = await api.put(`/api/v1/dailyAgenda/bulk-update-pagingId`, data);
    return res.data;
  };

  return useMutation({
    mutationFn: (data: agendaProps) => orderAgenda(data),
  });
};
