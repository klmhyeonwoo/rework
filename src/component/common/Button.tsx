import {css} from "@emotion/react";
import {PropsWithChildren} from "react";

export default function Button({children, ...props}: PropsWithChildren<Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "types">>) {
    return (
        <button css={css`
          display: flex;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}
            {...props}>
            {children}
        </button>
    )
}