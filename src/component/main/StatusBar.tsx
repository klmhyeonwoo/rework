import { css } from "@emotion/react";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";
import { agendaProps } from "@/app/main";

interface statusDataProps {
  todoList: agendaProps[];
  completeList: agendaProps[];
}
export default function StatusBar({ todoList, completeList }: statusDataProps) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1.5rem;
        width: 100%;
      `}
    >
      <div
        css={css`
          position: relative;
          width: 100%;
          border-radius: 0.7rem;
          height: 0.8rem;
          background-color: ${DESIGN_SYSTEM_COLOR.grey100};
        `}
      >
        <div
          css={css`
            position: absolute;
            width: ${(completeList.length / (todoList.length + completeList.length)) * 100}%;
            border-radius: 0.7rem;
            height: 0.8rem;
            background-color: ${DESIGN_SYSTEM_COLOR.kreamBlack};
            transition: 0.4s all;
          `}
        />
      </div>
      <div
        css={css`
          width: 100%;
          display: flex;
          color: ${DESIGN_SYSTEM_COLOR.kreamBlack};
          font-weight: 300;

          #score {
            font-weight: 500;
          }

          span:nth-of-type(1) {
            margin-right: auto;
          }

          div:nth-of-type(1) {
            margin-left: auto;
            display: flex;
            column-gap: 0.8rem;
          }
        `}
      >
        <span id="score">
          {todoList.length || completeList.length ? Math.floor((completeList.length / (todoList.length + completeList.length)) * 100) : 0}%{" "}
        </span>
        <div>
          <span>
            완료된 아젠다 <span id="score">{completeList.length}</span>
          </span>
          <span>
            오픈된 아젠다 <span id="score">{todoList.length}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
