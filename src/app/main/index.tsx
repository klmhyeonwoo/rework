import { css } from "@emotion/react";
import { fadeIn } from "@/style/keyframe.ts";
import WelcomMenting from "@/component/main/WelcomeMenting.tsx";
import { useEffect, useRef, useState } from "react";
import DateSection from "@/component/main/DateSection.tsx";
import ContentBox from "@/component/common/ContentBox.tsx";
import gear3D from "@/assets/3d/agenda/gear.gif";
import glass3D from "@/assets/3d/agenda/glass.gif";
import secondGlass3D from "@/assets/3d/agenda/glass2.gif";
import light3D from "@/assets/3d/agenda/light.gif";
import molecule3D from "@/assets/3d/agenda/molecule.gif";
import Add from "@/assets/img/add.svg?react";

import Performence from "@/component/main/Performence.tsx";
import TodoList from "@/component/main/TodoList.tsx";
import CompleteList from "@/component/main/CompleteList.tsx";
import Input from "@/component/main/Input.tsx";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";
import moment from "moment";
import "moment/locale/ko";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
export default function Main() {
  const [chapter, setChapter] = useState(0);
  const [complete, setComplete] = useState<string[]>([]);
  const [todo, setTodo] = useState<string[]>([]);
  const scaledDateNumber = (number: number) => {
    if (number < 10) {
      return `0${number}`;
    }

    return number;
  };

  const [dateObj, setDate] = useState<Value>(new Date());
  const year = scaledDateNumber((dateObj as Date).getFullYear());
  const month = scaledDateNumber((dateObj as Date).getMonth() + 1);
  const day = scaledDateNumber((dateObj as Date).getDate());
  const GRAPHIC_LIST = [gear3D, glass3D, secondGlass3D, light3D, molecule3D];
  const key = useRef(Math.floor(Math.random() * GRAPHIC_LIST.length));
  const todoRef = useRef(null);

  useEffect(() => {
    /** 오늘의 첫 방문이라면 웰컴 멘트를 제공하고, 이러한 상황이 아니라면 기존 스토리지에 값을 조회하여 멘트 제공에 대한 판단을 진행합니다. */
    const REWORK_VISTED = localStorage.getItem("REWORK_VISITED");
    if (REWORK_VISTED) {
      if (REWORK_VISTED !== day) {
        localStorage.removeItem("REWORK_VISITED");
      } else {
        setChapter(3);
      }
    } else {
      const counter = setInterval(() => {
        setChapter((chapter) => chapter + 1);
      }, 2500);

      if (chapter === 3) {
        clearInterval(counter);
        localStorage.setItem("REWORK_VISITED", day as string);
      }

      return () => clearInterval(counter);
    }
  }, [chapter]);

  useEffect(() => {
    if (todoRef.current) {
      const input = (todoRef.current as HTMLDivElement)?.querySelector("#todo") as HTMLInputElement;
      if (input && input.value === "") input.focus();
    }
  }, [todo]);

  return (
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
      {/*<Input value={""} placeholder={"오늘을 기록해보세요"} css={css`*/}
      {/*  animation: ${fadeUp} .6s;*/}
      {/*`}/>*/}

      {/* chapter 값이 3 이상일 때 사용이 되며, 렌더링 됩니다. */}
      {chapter >= 3 && (
        <article
          css={css`
            width: 100%;
            animation: ${fadeIn} 0.7s;
          `}
        >
          {/*<Logo*/}
          {/*  width={50}*/}
          {/*  height={50}*/}
          {/*  css={css`*/}
          {/*    animation: ${fadeUp} 0.4s;*/}
          {/*    transform: ${chapter === 3 && `translateY(0)`};*/}
          {/*    transition: 0.4s all;*/}
          {/*  `}*/}
          {/*/>*/}
          <DateSection
            year={year}
            month={month}
            day={day}
            css={css`
              margin-bottom: 6.2rem;
            `}
          />
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
                    margin-left: auto;
                    cursor: pointer;
                  `}
                  width={20}
                  height={20}
                  onClick={() => {
                    if (todo[0] !== "") {
                      setTodo(["", ...todo]);
                    } else {
                      setTodo(todo.filter((todo) => todo !== ""));
                    }
                  }}
                />
              }
            >
              <TodoList data={todo} completeList={complete} setComplete={setComplete} todoList={todo} setTodo={setTodo} ref={todoRef} />
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
              <CompleteList data={complete} completeList={complete} setComplete={setComplete} todoList={todo} setTodo={setTodo} />
            </ContentBox>
            <ContentBox
              title="이번 달 아젠다"
              subscribe="내가 선정한 이번 달 아젠다를 확인할 수 있어요"
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
                value={"성공적인 웹 개발 기초 쌓기"}
                css={css`
                  font-size: 1.5rem;
                  text-align: center;
                `}
              />
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
  );
}
