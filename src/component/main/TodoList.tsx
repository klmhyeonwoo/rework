import { css } from "@emotion/react";
import Checkbox from "@/assets/img/empty-box.svg?react";
import { Dispatch, forwardRef, SetStateAction } from "react";
import Input from "@/component/main/Input.tsx";
import { agendaProps } from "@/app/main";
import Trash from "@/assets/img/trash.svg?react";

interface listProps {
  todoList: agendaProps[];
  setTodo: Dispatch<SetStateAction<agendaProps[]>>;
  completeList: agendaProps[];
  setComplete: Dispatch<SetStateAction<agendaProps[]>>;
}

const TodoList = forwardRef(({ completeList, setComplete, todoList, setTodo }: listProps, ref: React.Ref<HTMLDivElement>) => {
  const changeNewData = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const list = [...todoList];
    if (event.target.value === "") {
      list.splice(index, 1);
    } else {
      list[index].content = event.target.value;
    }
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
      {todoList.map((item, index) => {
        // TODO: 텍스트 클릭 시에 INPUT 태그로 나오도록 수정
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
                setComplete([...completeList, item]);
                setTodo(todoList.filter((todo) => todo !== item));
              }}
            />
            <div
              css={css`
                width: 100%;
                display: flex;
                align-items: center;

                &:hover {
                  #trash {
                    display: inline;
                  }
                }
              `}
            >
              <Input
                id="todo"
                value={item.content}
                placeholder="아젠다를 입력해주세요"
                onBlur={(event) => changeNewData(event, index)}
                onKeyUp={(event) => {
                  if (event.key === "Enter") {
                    const list = [...todoList];
                    if ((event.target as HTMLInputElement).value !== "") {
                      list.splice(index + 1, 0, { id: todoList.length + completeList.length, content: "" });
                      setTodo(list);
                    }
                  }
                }}
              />
              <Trash
                id="trash"
                width={15}
                height={15}
                css={css`
                  margin-left: auto;
                  display: none;
                  cursor: pointer;
                `}
                onClick={() => {
                  setTodo(todoList.filter((todo) => todo !== item));
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
});

TodoList.displayName = "TodoList";
export default TodoList;
