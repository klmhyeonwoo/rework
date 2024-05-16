import { PropsWithChildren, ReactElement } from "react";
import { css } from "@emotion/react";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";

interface boxProps {
  title: string;
  subscribe?: string;
  length?: number;
  util?: ReactElement<SVGElement>;
}
export default function ContentBox({ title, subscribe, length, children, util, ...props }: PropsWithChildren<boxProps>) {
  return (
    <article
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 1.2rem;
        position: relative;
      `}
    >
      <div
        css={css`
          color: #4e4c4c;
          font-weight: 500;
          font-size: 1.5rem;
        `}
      >
        {title} {typeof length === "number" && `(${length})`}
      </div>
      <div
        css={css`
          color: #aeaeae;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          height: 1.5rem;
        `}
      >
        <span>{subscribe}</span>
        {util}
      </div>
      <div
        css={css`
          display: flex;
          flex-direction: column;
          width: 100%;
          height: 100%;
          box-shadow: inset 0 0 0 1px ${DESIGN_SYSTEM_COLOR.greyOpacity200};
          border-radius: 0.8rem;
          overflow-y: auto;
          padding: 2.9rem;
          box-sizing: border-box;
          min-height: 30rem;
          transition: 0.4s all;
          overflow-x: hidden;
        `}
        {...props}
      >
        {children}
      </div>
    </article>
  );
}
