import { css } from "@emotion/react";
import Checkbox from "@/assets/img/empty-box.svg?react";
import { Dispatch, forwardRef, SetStateAction } from "react";
import Input from "@/component/main/Input.tsx";
import { agendaProps } from "@/app/main";
import Trash from "@/assets/img/trash.svg?react";
import line from "@/assets/img/line.svg";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";

interface listProps {
  todoList: agendaProps[];
  setTodo: Dispatch<SetStateAction<agendaProps[]>>;
  completeList: agendaProps[];
  setComplete: Dispatch<SetStateAction<agendaProps[]>>;
  setFocus: Dispatch<SetStateAction<boolean>>;
}

const TodoList = forwardRef(({ completeList, setComplete, todoList, setTodo, setFocus }: listProps, ref: React.Ref<HTMLDivElement>) => {
  const changeNewData = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const list = [...todoList];
    if (event.target.value === "") {
      list.splice(index, 1);
    } else {
      list[index].content = event.target.value;
    }
    setFocus(false);
    setTodo(list);
  };

  const reorder = (list: agendaProps[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const items = reorder(todoList, result.source.index, result.destination.index);
    setTodo([...items]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {
        <Droppable droppableId={"fields"}>
          {(provided) => (
            <div id="fields" ref={provided.innerRef} {...provided.droppableProps}>
              <div
                ref={ref}
                css={css`
                  display: flex;
                  flex-direction: column;
                  margin-left: -2.9rem;
                `}
              >
                {todoList.map((item, index) => {
                  // TODO: 텍스트 클릭 시에 INPUT 태그로 나오도록 수정
                  return (
                    <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                      {(provided) => (
                        <div
                          key={item.id}
                          // style={getItemStyle(provided.draggableStyle, snapshot.isDraggingOver)}
                          css={css`
                            display: flex;
                            align-items: center;
                            column-gap: 0.8rem;
                            padding: 0.7rem 0 0.7rem 2.9rem;
                            position: relative;

                            &:hover {
                              #trash,
                              #line {
                                display: inline;
                              }
                            }
                          `}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                        >
                          <img
                            src={line}
                            id="line"
                            {...provided.dragHandleProps}
                            css={css`
                              display: none;
                              width: 1.1rem;
                              position: absolute;
                              left: 1rem;
                            `}
                          />
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
                              height: 100%;
                              display: flex;
                              align-items: center;
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
                              width={14}
                              height={14}
                              css={css`
                                display: none;
                                cursor: pointer;
                                position: absolute;
                                right: 0;
                              `}
                              onClick={() => {
                                setTodo(todoList.filter((todo) => todo !== item));
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      }
    </DragDropContext>
  );
});

TodoList.displayName = "TodoList";
export default TodoList;
