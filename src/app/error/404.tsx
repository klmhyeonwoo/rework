import { css } from "@emotion/react";
import NotFound from "@/assets/img/not-found.svg?react";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";

export default function Error() {
  return (
    <div
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: rgb(141, 150, 161);

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        row-gap: 0.5em;

        span {
          display: block;
          text-align: center;
        }
      `}
    >
      <NotFound
        css={css`
          margin-bottom: 0.5em;
        `}
      />
      <div
        css={css`
          font-size: 2.6rem;
          font-weight: 600;
          color: rgb(60, 70, 81);
          margin-bottom: 0.3em;
        `}
      >
        페이지를 찾을 수 없어요
      </div>
      <span>웁스, 잘못된 접근을 하신 것 같아요</span>
      <span>요청하신 페이지의 접근 권한 또는 페이지 주소를 다시 한번 확인해주세요!</span>
      <button
        css={css`
          margin-top: 1em;
          width: 12em;
          height: 2.7em;
          border-radius: 0.3em;
          background-color: ${DESIGN_SYSTEM_COLOR.kreamBlack};
          border: none;
          color: white;
          font-weight: 600;
          cursor: pointer;
        `}
        onClick={() => (window.location.href = "/")}
      >
        홈으로 돌아가기
      </button>
      <span
        css={css`
          margin-top: 0.5em;
          color: rgb(205, 210, 214);
          font-weight: 400;
          letter-spacing: -0.03em;
        `}
      >
        404 Not Found
      </span>
    </div>
  );
}
