import { css } from "@emotion/react";
import { fadeUp } from "@/style/keyframe.ts";

interface welcomeMentingProps {
  chapter: number;
  month: number | string;
  day: number | string;
}
export default function WelcomMenting({ chapter, month, day }: welcomeMentingProps) {
  const introduceMessage = [
    <span key={0}>
      오늘은 어떤 일에 <span className="bold">몰입</span>을 하게 될까요?
    </span>,
    <span key={1}>
      {month}월 {day}일의 <span className="bold">성장</span>을 시작합니다
    </span>,
    <span key={2}>
      현우님의 꿈을 위해 오늘도 <span className="bold">리워크</span>는 함께합니다
    </span>,
  ];

  return (
    <div
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 100%;
        box-sizing: border-box;

        display: flex;
        justify-content: center;

        transition: 0.4s all;

        span {
          animation: ${fadeUp} 0.6s;
          font-weight: 400;
          font-size: 2rem;
          letter-spacing: -0.03rem;
        }

        .bold {
          font-weight: 600;
        }
      `}
    >
      {chapter === 0 && <p> {introduceMessage[0]} </p>}
      {chapter === 1 && <p> {introduceMessage[1]} </p>}
      {chapter === 2 && <p> {introduceMessage[2]} </p>}
    </div>
  );
}
