import { PropsWithChildren } from "react";
import { css } from "@emotion/react";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";
import Logo from "@/assets/img/logo_symbol.svg?react";

export default function NotDataWithContentBox({ children, ...props }: PropsWithChildren) {
  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        row-gap: 0.9rem;
        align-items: center;
        position: absolute;
        top: 55%;
        left: 50%;
        transform: translate(-50%, -50%);
      `}
    >
      <Logo
        width={40}
        height={40}
        css={css`
          opacity: 20%;
        `}
      />
      <p
        css={css`
          white-space: nowrap;
          font-weight: 400;
          font-size: 1.2rem;
          color: ${DESIGN_SYSTEM_COLOR.grey300};
        `}
        {...props}
      >
        {children}
      </p>
    </div>
  );
}
