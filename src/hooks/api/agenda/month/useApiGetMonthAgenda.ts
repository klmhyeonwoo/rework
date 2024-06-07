// TODO: 서버 측에서 해당 API 수정 후 연동 예정
// import { api } from "@/api";
// import { useQuery } from "@tanstack/react-query";
//
// export const useApiGetMonthAgenda = () => {
//   const getAgenda = async () => {
//     const res = await api
//       .get(`/api/v1/monthlyAgenda/`, {
//         year: 2024,
//         month: 6,
//       })
//       .then((res) => console.log(res));
//     return res;
//   };
//
//   return useQuery({
//     queryFn: () => getAgenda(),
//     queryKey: ["monthAgenda"],
//   });
// };
