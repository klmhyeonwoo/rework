import Logo from "@/assets/img/logo_symbol.svg?react";
import { css } from "@emotion/react";
import { fadeUp } from "@/style/keyframe.ts";
import WelcomMenting from "@/component/main/WelcomeMenting.tsx";
import { useEffect, useState } from "react";
import DateSection from "@/component/main/DateSection.tsx";
import ContentBox from "@/component/common/ContentBox.tsx";

import sphere3D from "@/assets/3d/sphere.gif";

export default function Main() {
  const [chapter, setChapter] = useState(0);
  const scaledDateNumber = (number: number) => {
    if (number < 10) {
      return `0${number}`;
    }

    return number;
  };

  const dateObj = new Date();
  const year = scaledDateNumber(dateObj.getFullYear());
  const month = scaledDateNumber(dateObj.getMonth() + 1);
  const day = scaledDateNumber(dateObj.getDate());

  useEffect(() => {
    /** 오늘의 첫 방문이라면 웰컴 멘트를 제공하고, 이러한 상황이 아니라면 기존 스토리지에 값을 조회하여 멘트 제공에 대한 판단을 진행합니다. */
    const REWORK_VISTED = localStorage.getItem("REWORK_VISITED");
    if (REWORK_VISTED) {
      if (parseInt(REWORK_VISTED) !== day) {
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

  return (
    <section
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 3.5rem;

        width: 40rem;
      `}
    >
      {/* TODO: 메인 페이지 구성 필요 */}
      {/*<Input value={""} placeholder={"오늘을 기록해보세요"} css={css`*/}
      {/*  animation: ${fadeUp} .6s;*/}
      {/*`}/>*/}

      {/* chapter 값이 3 이상일 때 사용이 되며, 렌더링 됩니다. */}
      {chapter >= 3 && (
        <section
          css={css`
            width: 90rem;
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
            <ContentBox title="오늘의 아젠다" length={5} subscribe="오늘의 아젠다를 선정하고 성장해보세요" />
            <ContentBox title="오늘의 캘린더" length={5} subscribe="내가 기록한 아젠다 아카이빙을 확인해보세요" />
            <ContentBox title="완료된 아젠다" subscribe="오늘 내가 완료한 아젠다를 확인할 수 있어요" />
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
                src={sphere3D}
                css={css`
                  width: 10rem;
                  height: auto;
                `}
              />
              <span
                css={css`
                  font-size: 1.5rem;
                `}
              >
                성공적인 웹 개발 기초 쌓기
              </span>
            </ContentBox>
          </div>
          <ContentBox title="이번 달 성과 요약" subscribe="작성한 내용을 기반으로 AI가 요약한 성과 정보를 알려드려요" />
        </section>
      )}
      {/* chapter 값이 3 미만일 때만 사용이 되고, 그 외에는 렌더링되지 않습니다. */}
      <WelcomMenting chapter={chapter} month={month} day={day} />
    </section>
  );
}
