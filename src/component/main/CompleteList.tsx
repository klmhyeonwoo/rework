import { css } from "@emotion/react";
import Checkbox from "@/assets/img/checked-box.svg?react";
import { Dispatch, SetStateAction } from "react";
import Input from "@/component/main/Input.tsx";

interface listProps {
  data: string[];
  todoList: string[];
  setTodo: Dispatch<SetStateAction<string[]>>;
  completeList: string[];
  setComplete: Dispatch<SetStateAction<string[]>>;
}
export default function CompleteList({ data, completeList, setComplete, todoList, setTodo }: listProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1.5rem;
      `}
    >
      {data.map((item) => {
        return (
          <div
            key={item}
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
            <Input value={item} disabled />
          </div>
        );
      })}
    </div>
  );
}
