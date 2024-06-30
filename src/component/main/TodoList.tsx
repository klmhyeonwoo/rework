import { css } from "@emotion/react";
import Checkbox from "@/assets/img/empty-box.svg?react";
import { Dispatch, forwardRef, SetStateAction, useState } from "react";
import Input from "@/component/main/Input.tsx";
import { agendaProps } from "@/app/main";
import Trash from "@/assets/img/trash.svg?react";
import line from "@/assets/img/line.svg";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import { useApiPostTodayAgenda } from "@/hooks/api/agenda/today/useApiPostTodayAgenda.ts";
import { removeTodayAgenda } from "@/hooks/api/agenda/today/useApiRemoveTodayAgenda.ts";
import { useApiEditTodayAgenda } from "@/hooks/api/agenda/today/useApiEditTodayAgenda.ts";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";

interface listProps {
  todoList: agendaProps[];
  setTodo: Dispatch<SetStateAction<agendaProps[]>>;
  completeList: agendaProps[];
  setComplete: Dispatch<SetStateAction<agendaProps[]>>;
  setFocus: Dispatch<SetStateAction<boolean>>;
  year: number | string;
  month: number | string;
  day: number | string;
  dayDiff: number;
}

const TodoList = forwardRef(
  ({ dayDiff, year, month, day, completeList, setComplete, todoList, setTodo, setFocus }: listProps, ref: React.Ref<HTMLDivElement>) => {
    const { mutate: postAgenda } = useApiPostTodayAgenda();
    const { mutate: editAgenda } = useApiEditTodayAgenda();

    /** mode는 해당 아젠다 리스트에 각 요소를 포커스 시에, 값이 존재하면 "edit" 값이 존재하지 않으면 "post"가 되도록 설정
     * 해당 mode를 통해 서버에 전송하는 API도 달라지는 것을 확인할 수 있음
     * */
    const [mode, setMode] = useState("");

    const changeNewData = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
      const list = [...todoList];
      if (event.target.value === "") {
        list.splice(index, 1);
      } else {
        list[index].todo = event.target.value;
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

    const postData = (item: agendaProps) => {
      if (mode === "post")
        postAgenda(
          { todo: item.todo, pagingId: item.pagingId, createdAt: item.createdAt },
          {
            onSuccess: (data) => {
              item.agendaId = data.data.agendaId;
            },
            onError: () => {
              console.log(todoList);
            },
          },
        );
      if (mode === "edit" && item.agendaId)
        editAgenda(
          { agendaId: item.agendaId, todo: item.todo, state: false, pagingId: item.pagingId },
          {
            onSuccess: () => {
              item.createdAt = `${year}-${month}-${day}`;
            },
          },
        );
    };

    const onDragEnd = (result: DropResult) => {
      if (!result.destination) {
        return;
      }

      const items = reorder(todoList, result.source.index, result.destination.index);
      setTodo([...items]);
      // orderAgenda([...items]);
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
                    return (
                      <Draggable key={item.agendaId} draggableId={String(item.agendaId)} index={index}>
                        {(provided) => (
                          <div
                            key={item.agendaId}
                            // style={getItemStyle(provided.draggableStyle, snapshot.isDraggingOver)}
                            css={css`
                              display: flex;
                              align-items: center;
                              column-gap: 0.8rem;
                              padding: 0.7rem 0 0.7rem 2.9rem;
                              position: relative;

                              ${dayDiff === 0 &&
                              css`
                                &:hover {
                                  #trash,
                                  #line {
                                    display: inline;
                                  }
                                }
                              `}
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
                                if (dayDiff !== 0) return;
                                if (item.agendaId)
                                  editAgenda(
                                    { agendaId: item.agendaId, todo: item.todo, state: true, pagingId: item.pagingId },
                                    {
                                      onSuccess: () => {
                                        item.createdAt = `${year}-${month}-${day}`;
                                        setComplete([...completeList, item]);
                                        setTodo(todoList.filter((todo) => todo !== item));
                                      },
                                    },
                                  );
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
                                value={item.todo}
                                placeholder="아젠다를 입력해주세요"
                                css={css`
                                  color: ${dayDiff !== 0 && DESIGN_SYSTEM_COLOR.grey300};
                                `}
                                onBlur={(event) => {
                                  changeNewData(event, index);
                                  if (item.todo !== "") {
                                    // 포스팅을 하려고 했는데, 현재 내 인덱스 번호가 일치하지 않을 경우
                                    console.log(todoList[item.pagingId + 1]);
                                    const nextList = todoList[item.pagingId + 1];
                                    if (nextList && nextList.todo !== "" && mode === "post") {
                                      const nextPagingId = nextList.pagingId + 1;
                                      editAgenda(
                                        {
                                          agendaId: nextList.agendaId as number,
                                          todo: nextList.todo,
                                          state: false,
                                          pagingId: nextPagingId,
                                        },
                                        {
                                          onSuccess: () => {
                                            item.createdAt = `${year}-${month}-${day}`;
                                            nextList.pagingId = nextPagingId;
                                            postData(item);
                                          },
                                          onError: () => {
                                            console.log(todoList);
                                          },
                                        },
                                      );
                                    } else {
                                      postData(item);
                                    }
                                  }
                                }}
                                onFocus={(e) => {
                                  if (e.target.value !== "") {
                                    setMode("edit");
                                  } else {
                                    setMode("post");
                                  }
                                }}
                                onKeyUp={(event) => {
                                  if (event.key === "Enter") {
                                    const list = [...todoList];
                                    if ((event.target as HTMLInputElement).value !== "") {
                                      list.splice(index + 1, 0, {
                                        todo: "",
                                        state: true,
                                        pagingId: index + 1,
                                        createdAt: `${year}-${month}-${day}`,
                                      });
                                      setTodo(list);
                                    }
                                  }
                                }}
                                disabled={dayDiff !== 0}
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
                                  if (item.agendaId) {
                                    removeTodayAgenda({ id: item.agendaId })
                                      .then(() => setTodo(todoList.filter((todo) => todo !== item)))
                                      .catch((err) => console.log(err));
                                  }
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
  },
);

TodoList.displayName = "TodoList";
export default TodoList;
