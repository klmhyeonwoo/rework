import { css } from "@emotion/react";
import RightArrow from "@/assets/img/right-arrow.svg?react";
import LeftArrow from "@/assets/img/left-arrow.svg?react";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";
import { Dispatch, SetStateAction } from "react";
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
  const changeDate = (method: string) => {
    const today = new Date();

    const day = new Date((date as Date).getTime());
    const newDate = new Date(day.getTime());

    if (method === DATE_METHOD[0]) newDate.setDate(day.getDate() - 1);
    if (method === DATE_METHOD[1]) newDate.getDate() < today.getDate() && newDate.setDate(day.getDate() + 1);
    return newDate;
  };

  return (
    <header
      css={css`
        width: 100%;
        display: flex;
        align-items: center;
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
