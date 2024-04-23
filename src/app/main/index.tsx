import Logo from "@/assets/logo_symbol.svg?react";
import { css } from "@emotion/react";
import { fadeUp } from "@/style/keyframe.ts";
import WelcomMenting from "@/component/main/WelcomeMenting.tsx";
import { Fragment, useEffect, useState } from "react";
export default function Main() {
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    const counter = setInterval(() => {
      setChapter((chapter) => chapter + 1);
    }, 2500);

    if (counter === 3) {
      clearInterval(counter);
    }

    return () => clearInterval(counter);
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
        <Fragment>
          <Logo
            width={50}
            height={50}
            css={css`
              animation: ${fadeUp} 0.4s;
              transform: ${chapter === 3 && `translateY(0)`};
              transition: 0.4s all;
            `}
          />
        </Fragment>
      )}
      {/* chapter 값이 3 미만일 때만 사용이 되고, 그 외에는 렌더링되지 않습니다. */}
      <WelcomMenting chapter={chapter} />
    </section>
  );
}
