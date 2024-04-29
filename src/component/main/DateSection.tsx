import { css } from "@emotion/react";
import RightArrow from "@/assets/img/right-arrow.svg?react";
import LeftArrow from "@/assets/img/left-arrow.svg?react";

interface dayProps {
  year: number | string;
  month: number | string;
  day: number | string;
}
export default function DateSection({ year, month, day, ...props }: dayProps) {
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
      />
      <div
        css={css`
          font-size: 2.5rem;
        `}
      >
        {year}년 {month}월 {day}일
      </div>
      <RightArrow
        css={css`
          margin-left: auto;
          cursor: pointer;
        `}
      />
    </header>
  );
}
