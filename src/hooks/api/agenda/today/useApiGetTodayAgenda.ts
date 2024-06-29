import { api } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { agendaProps } from "@/app/main";

interface todayAgendaProps {
  year: number | string;
  month: number | string;
  day: number | string;
  state: boolean | string;
}

interface getTodayAgendaResponse {
  code: number;
  message: string;
  data: {
    agendaList: agendaProps[];
  };
}

export const getTodayAgenda = async ({ year, month, day, state }: todayAgendaProps) => {
  const res = await api.get(`/api/v1/dailyAgenda?year=${year}&month=${month}&day=${day}&state=${state}`);
  return (res.data as getTodayAgendaResponse).data;
};
export const useApiGetTodayAgenda = ({ year, month, day, state }: todayAgendaProps) => {
  return useQuery({
    queryKey: ["todayAgenda"],
    queryFn: () => getTodayAgenda({ year, month, day, state }),
  });
};
