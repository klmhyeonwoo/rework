import { css } from "@emotion/react";
import Checkbox from "@/assets/img/checked-box.svg?react";
import { Dispatch, SetStateAction } from "react";
import Input from "@/component/main/Input.tsx";
import { agendaProps } from "@/app/main";

interface listProps {
  todoList: agendaProps[];
  setTodo: Dispatch<SetStateAction<agendaProps[]>>;
  completeList: agendaProps[];
  setComplete: Dispatch<SetStateAction<agendaProps[]>>;
}
export default function CompleteList({ completeList, setComplete, todoList, setTodo }: listProps) {
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
            key={item.id}
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
                setComplete(completeList.filter((complete) => complete !== item));
                setTodo([item, ...todoList]);
              }}
            />
            <Input value={item.content} disabled />
          </div>
        );
      })}
    </div>
  );
}
