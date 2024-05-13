import { css } from "@emotion/react";
import RightArrow from "@/assets/img/right-arrow.svg?react";
import LeftArrow from "@/assets/img/left-arrow.svg?react";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";
import { Dispatch, SetStateAction, useRef } from "react";
import { Value } from "@/app/main";

interface dayProps {
  year: number | string;
  month: number | string;
  day: number | string;
  date: Date | Value;
  setDate: Dispatch<SetStateAction<Value>>;
}
export default function DateSection({ year, month, day, date, setDate, ...props }: dayProps) {
  const DATE_METHOD = ["MINUS", "PLUS"];
  const today = useRef(new Date((date as Date).getTime()));
  const changeDate = (method: string) => {
    const day = new Date((date as Date).getTime());
    const yesterDay = new Date(day.getTime());
    yesterDay.setDate(day.getDate() - 1);
    const nextDay = new Date(day.getTime());
    nextDay.setDate(day.getDate() + 1);

    if (method === DATE_METHOD[0]) return yesterDay;
    if (method === DATE_METHOD[1] && today.current.getTime() > (date as Date).getTime()) return nextDay;

    return day;
  };

  return (
    <header
      css={css`
        width: 100%;
        display: flex;
        align-items: center;
        user-select: none;
      `}
      {...props}
    >
      <LeftArrow
        css={css`
          margin-right: auto;
          cursor: pointer;
        `}
        onClick={() => setDate(changeDate(DATE_METHOD[0]))}
      />
      <div
        css={css`
          font-size: 2.5rem;
          color: ${DESIGN_SYSTEM_COLOR.newBlack};
        `}
      >
        {year}년 {month}월 {day}일
      </div>
      <RightArrow
        css={css`
          margin-left: auto;
          cursor: pointer;
        `}
        onClick={() => setDate(changeDate(DATE_METHOD[1]))}
      />
    </header>
  );
}
