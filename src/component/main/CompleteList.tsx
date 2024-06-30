import { css } from "@emotion/react";
import Checkbox from "@/assets/img/checked-box.svg?react";
import { Dispatch, SetStateAction } from "react";
import Input from "@/component/main/Input.tsx";
import { agendaProps } from "@/app/main";
import { useApiEditTodayAgenda } from "@/hooks/api/agenda/today/useApiEditTodayAgenda.ts";

interface listProps {
  todoList: agendaProps[];
  setTodo: Dispatch<SetStateAction<agendaProps[]>>;
  completeList: agendaProps[];
  setComplete: Dispatch<SetStateAction<agendaProps[]>>;
  year: number | string;
  month: number | string;
  day: number | string;
}
export default function CompleteList({ completeList, setComplete, todoList, setTodo, year, month, day }: listProps) {
  const { mutate: editAgenda } = useApiEditTodayAgenda();

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1.5rem;
      `}
    >
      {completeList.map((item) => {
        return (
          <div
            key={item.agendaId}
            css={css`
              display: flex;
              align-items: center;
              column-gap: 0.8rem;
            `}
          >
            <Checkbox
              width={15}
              height={15}
              onClick={() => {
                if (item.agendaId) {
                  editAgenda(
                    { agendaId: item.agendaId, todo: item.todo, state: false, pagingId: item.pagingId },
                    {
                      onSuccess: () => {
                        item.createdAt = `${year}-${month}-${day}`;
                        setComplete(completeList.filter((complete) => complete !== item));
                        setTodo([item, ...todoList]);
                      },
                    },
                  );
                }
              }}
            />
            <Input value={item.todo} disabled />
          </div>
        );
      })}
    </div>
  );
}
