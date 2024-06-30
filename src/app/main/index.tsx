import { css } from "@emotion/react";
import { fadeIn } from "@/style/keyframe.ts";
import WelcomMenting from "@/component/main/WelcomeMenting.tsx";
import { Fragment, useEffect, useRef, useState } from "react";
import DateSection from "@/component/main/DateSection.tsx";
import ContentBox from "@/component/common/ContentBox.tsx";

import sphere3D from "@/assets/3d/agenda/sphere.gif";
import light3D from "@/assets/3d/agenda/light.gif";
import Add from "@/assets/img/add.svg?react";

// import ball from "@/assets/3d/character/ball.png";
// import creature from "@/assets/3d/character/creature.png";
// import donut from "@/assets/3d/character/donut.png";
// import flower from "@/assets/3d/character/flower.png";
// import fuzz from "@/assets/3d/character/fuzz.png";
// import heart from "@/assets/3d/character/heart.png";
// import star from "@/assets/3d/character/star.png";

import Performence from "@/component/main/Performence.tsx";
import TodoList from "@/component/main/TodoList.tsx";
import CompleteList from "@/component/main/CompleteList.tsx";
import Input from "@/component/main/Input.tsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";
import moment from "moment";
import "moment/locale/ko";
import { Beforeunload } from "react-beforeunload";
import NotDataWithContentBox from "@/component/common/NotDataWithContentBox.tsx";
import StatusBar from "@/component/main/StatusBar.tsx";
import { useApiPostMonthAgenda } from "@/hooks/api/agenda/month/useApiPostMonthAgenda.ts";
import { getTodayAgenda } from "@/hooks/api/agenda/today/useApiGetTodayAgenda.ts";
// import { useApiGetMonthAgenda } from "@/hooks/api/agenda/month/useApiGetMonthAgenda.ts";

export type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];
export interface agendaProps {
  agendaId?: number;
  todo: string;
  state: boolean;
  pagingId: number;
  createdAt?: string;
}

export default function Main() {
  const [chapter, setChapter] = useState(0);
  const [complete, setComplete] = useState<agendaProps[]>([]);
  const [todo, setTodo] = useState<agendaProps[]>([]);
  const [focus, setFocus] = useState(false);
  const [monthAgenda, setMonthAgenda] = useState("");
  const [dayDiff, setDayDiff] = useState(0);
  const scaledDateNumber = (number: number) => {
    if (number < 10) {
      return `0${number}`;
    }

    return number;
  };

  const [dateObj, setDate] = useState<Value>(new Date());
  const today = moment();
  const year = scaledDateNumber((dateObj as Date).getFullYear());
  const month = scaledDateNumber((dateObj as Date).getMonth() + 1);
  const day = scaledDateNumber((dateObj as Date).getDate());

  const GRAPHIC_LIST = [sphere3D, light3D];
  // const CHARACTER_LIST = [ball, creature, donut, flower, fuzz, heart, star];
  const key = useRef(Math.floor(Math.random() * GRAPHIC_LIST.length));
  const todoRef = useRef(null);

  // const { data: monthAgenda } = useApiGetMonthAgenda();
  const { mutate: setMonthlyAgenda } = useApiPostMonthAgenda();
  // const { mutate: setTodayAgendaSet } = useApiPostTodayAgenda();

  // TODO: 이달의 아젠다 조회, 서버 쪽 해결이 되면 바로 다시 시작
  // const { data: getMonthlyAgenda } = useApiGetMonthAgenda();

  useEffect(() => {
    setTodo([]);
    setComplete([]);
    /** 오늘의 TODO 아젠다를 불러오기 */
    getTodayAgenda({ year: year, month: month, day: day, state: false })
      .then((res) => {
        setTodo(res.agendaList);
      })
      .catch((err) => {
        console.log(err);
      });

    /** 오늘의 COMPLETED 아젠다를 불러오기 */
    getTodayAgenda({ year: year, month: month, day: day, state: true })
      .then((res) => {
        setComplete(res.agendaList);
      })
      .catch((err) => {
        console.log(err);
      });

    const date = moment(`${year}-${month}-${day}`);
    setDayDiff(today.diff(date, "days"));
  }, [year, month, day]);

  useEffect(() => {
    /** 오늘의 첫 방문이라면 웰컴 멘트를 제공하고, 이러한 상황이 아니라면 기존 스토리지에 값을 조회하여 멘트 제공에 대한 판단을 진행합니다. */
    const REWORK_VISTED = localStorage.getItem("REWORK_VISITED");
    if (REWORK_VISTED) {
      if (REWORK_VISTED !== String(day)) {
        localStorage.removeItem("REWORK_VISITED");
      } else {
        setChapter(3);
      }
    }

    const counter = setInterval(() => {
      setChapter((chapter) => chapter + 1);
    }, 2500);

    if (chapter === 3) {
      clearInterval(counter);
      localStorage.setItem("REWORK_VISITED", day as string);
    }

    return () => clearInterval(counter);
  }, [chapter]);

  useEffect(() => {
    if (todoRef.current) {
      const inputNodes = (todoRef.current as HTMLDivElement)?.querySelectorAll("#todo");
      for (let i = 0; i < inputNodes.length; i++) {
        const input = inputNodes[i] as HTMLInputElement;
        if (input.value === "") {
          setFocus(true);
          return input.focus();
        }
      }
      setFocus(false);
    }
    // TODO: 아젠다 연결부분 이어서 진행하기
  }, [todo]);

  return (
    <Fragment>
      {todo.length + complete.length > 0 && <Beforeunload onBeforeunload={(event: BeforeUnloadEvent) => event.preventDefault()} />}
      <section
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          row-gap: 3.5rem;

          width: 90rem;
          margin: 0 auto;
          padding: 6rem;
        `}
      >
        {/* TODO: 메인 페이지 구성 필요 */}
        {chapter >= 3 && (
          <article
            css={css`
              width: 100%;
              animation: ${fadeIn} 0.7s;
              display: flex;
              flex-direction: column;
              row-gap: 7rem;
            `}
          >
            <DateSection year={year} month={month} day={day} date={dateObj} setDate={setDate} />
            <div
              css={css`
                display: grid;
                grid-template-columns: 1fr 1fr;
                column-gap: 2.2rem;
                row-gap: 3.1rem;
              `}
            >
              <ContentBox
                title="오늘의 아젠다"
                length={todo.length}
                subscribe="오늘의 아젠다를 선정하고 성장해보세요"
                util={
                  <Add
                    css={css`
                      ${dayDiff !== 0 &&
                      css`
                        display: none;
                      `}
                      margin-left: auto;
                      cursor: pointer;
                      pointer-events: ${focus && "none"};
                    `}
                    width={20}
                    height={20}
                    onClick={() => {
                      if (todo.length < 1 || todo[0].todo !== "") {
                        setTodo([
                          {
                            todo: "",
                            state: true,
                            pagingId: todo.length + complete.length,
                            createdAt: `${year}-${month}-${day}`,
                          },
                          ...todo,
                        ]);
                      } else {
                        setTodo(todo.filter((todo) => todo.todo !== ""));
                      }
                    }}
                  />
                }
              >
                {todo.length ? (
                  <TodoList
                    completeList={complete}
                    setComplete={setComplete}
                    todoList={todo}
                    setTodo={setTodo}
                    setFocus={setFocus}
                    ref={todoRef}
                    year={year}
                    month={month}
                    day={day}
                    dayDiff={dayDiff}
                  />
                ) : (
                  <NotDataWithContentBox> 오늘 생성된 아젠다가 존재하지 않습니다 </NotDataWithContentBox>
                )}
              </ContentBox>
              <ContentBox title="오늘의 캘린더" subscribe="내가 기록한 아젠다 아카이빙을 확인해보세요">
                <Calendar
                  css={css`
                    width: 100% !important;
                    height: 100% !important;
                    border: none !important;

                    .react-calendar__tile--active {
                      background: ${DESIGN_SYSTEM_COLOR.newBlack} !important;
                      color: white;
                    }

                    .react-calendar__navigation button:disabled,
                    .react-calendar__tile:disabled,
                    .react-calendar__tile--now,
                    .react-calendar__tile--active:enabled:hover,
                    .react-calendar__tile--active:enabled:focus,
                    .react-calendar__tile:enabled:hover,
                    .react-calendar__tile:enabled:focus,
                    .react-calendar__navigation button:enabled:hover,
                    .react-calendar__navigation button:enabled:focus {
                      background: transparent;
                    }

                    .react-calendar__navigation__prev2-button,
                    .react-calendar__navigation__next2-button {
                      display: none;
                    }

                    abbr[title] {
                      text-decoration: none;
                      font-weight: 400;
                    }
                  `}
                  showNeighboringMonth={false}
                  maxDate={moment().toDate()}
                  value={dateObj}
                  onChange={setDate}
                />
              </ContentBox>
              <ContentBox title="완료된 아젠다" subscribe="오늘 내가 완료한 아젠다를 확인할 수 있어요" length={complete.length}>
                {complete.length ? (
                  <CompleteList
                    completeList={complete}
                    setComplete={setComplete}
                    todoList={todo}
                    setTodo={setTodo}
                    year={year}
                    month={month}
                    day={day}
                  />
                ) : (
                  <NotDataWithContentBox> 아직 완료된 아젠다가 존재하지 않습니다 </NotDataWithContentBox>
                )}
              </ContentBox>
              <ContentBox
                title="아젠다 마일스톤"
                subscribe="오늘의 아젠다 마일스톤을 확인해보세요"
                css={css`
                  justify-content: center;
                  align-items: center;
                  row-gap: 3.1rem;
                  padding: 4.8rem;
                `}
              >
                <img
                  src={GRAPHIC_LIST[key.current]}
                  css={css`
                    width: 10rem;
                    height: auto;
                  `}
                />
                <Input
                  css={css`
                    font-size: 1.5rem;
                    text-align: center;
                  `}
                  placeholder={"이달의 아젠다를 입력해주세요"}
                  type="monthly"
                  value={monthAgenda}
                  onChange={(e) => setMonthAgenda(e.target.value)}
                  onBlur={() => setMonthlyAgenda({ monthAgenda })}
                />
                <StatusBar todoList={todo} completeList={complete} />
              </ContentBox>
            </div>
            <ContentBox
              title="이번 달 성과 요약"
              subscribe="작성한 내용을 기반으로 AI가 요약한 성과 정보를 알려드려요"
              css={css`
                border: none;
                padding: 0;
                box-shadow: none;
              `}
            >
              <Performence />
            </ContentBox>
          </article>
        )}
        {/* chapter 값이 3 미만일 때만 사용이 되고, 그 외에는 렌더링되지 않습니다. */}
        <WelcomMenting chapter={chapter} month={month} day={day} />
      </section>
    </Fragment>
  );
}
