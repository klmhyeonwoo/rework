import { css } from "@emotion/react";
import Checkbox from "@/assets/img/empty-box.svg?react";
import React, { Dispatch, forwardRef, Fragment, SetStateAction } from "react";
import Input from "@/component/main/Input.tsx";

interface listProps {
  data: string[];
  todoList: string[];
  setTodo: Dispatch<SetStateAction<string[]>>;
  completeList: string[];
  setComplete: Dispatch<SetStateAction<string[]>>;
}
const TodoList = forwardRef(({ data, completeList, setComplete, todoList, setTodo }: listProps, ref: React.Ref<HTMLDivElement>) => {
  const changeNewData = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const list = [...todoList];
    list[index] = event.target.value;
    setTodo(list);
  };

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1.5rem;
      `}
      ref={ref}
    >
      {data.map((item, index) => {
        // TODO: 텍스트 클릭 시에 INPUT 태그로 나오도록 수정
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
                setComplete([...completeList, item]);
                setTodo(todoList.filter((todo) => todo !== item));
              }}
            />
            <Fragment>
              <Input id="todo" value={item} placeholder="아젠다를 입력해주세요" onBlur={(event) => changeNewData(event, index)} />
            </Fragment>
          </div>
        );
      })}
    </div>
  );
});

TodoList.displayName = "TodoList";
export default TodoList;
