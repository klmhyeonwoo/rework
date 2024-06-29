import { css } from "@emotion/react";

export default function Loading() {
  return (
    <div
      css={css`
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        ::before {
          content: "\\00a0"; /* Non-breaking space */
          visibility: visible;
        }
      `}
    >
      <div
        css={css`
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          right: 1.8rem;

          div {
            position: relative;
            width: 0.7rem;
            height: 0.7rem;
            border-radius: 50%;
            background: #fff;
            animation-timing-function: linear;
          }

          div:nth-child(1) {
            left: 1rem;
            animation: ellipsis1 0.7s infinite;
          }

          @keyframes ellipsis1 {
            0% {
              transform: scale(0);
            }
            100% {
              transform: scale(1);
            }
          }

          // last lighting bullet
          div:nth-child(4) {
            left: 2.5rem;
            animation: ellipsis4 0.7s infinite;
          }

          @keyframes ellipsis4 {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(0);
            }
          }

          div:nth-child(2) {
            left: 0.3rem;
            animation: ellipsis2 0.7s infinite;
          }

          div:nth-child(3) {
            left: 1.4rem;
            animation: ellipsis2 0.7s infinite;
          }

          @keyframes ellipsis2 {
            0% {
              transform: translate(0, 0);
            }
            100% {
              transform: translate(1.7rem, 0);
            }
          }
        `}
      >
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
