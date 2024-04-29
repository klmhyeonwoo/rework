import { PropsWithChildren } from "react";
import { css } from "@emotion/react";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";

interface boxProps {
  title: string;
  subscribe?: string;
  length?: number;
}
export default function ContentBox({ title, subscribe, length, children, ...props }: PropsWithChildren<boxProps>) {
  return (
    <article
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 16px;
      `}
    >
      <div
        css={css`
          color: #4e4c4c;
          font-weight: 500;
          font-size: 1.5rem;
        `}
      >
        {title} {length && `(${length})`}
      </div>
      <div
        css={css`
          color: #aeaeae;
          font-size: 1.2rem;
        `}
      >
        {subscribe}
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          box-shadow: inset 0 0 0 1px ${DESIGN_SYSTEM_COLOR.greyOpacity200};
          border-radius: 0.8rem;
          overflow-y: auto;
          padding: 2.9rem;
          box-sizing: border-box;
        `}
        {...props}
      >
        {children}
      </div>
    </article>
  );
}
