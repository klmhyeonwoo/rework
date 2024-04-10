import {css} from "@emotion/react";
import {PropsWithChildren} from "react";

export default function Button({children, ...props}: PropsWithChildren<Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "types">>) {
    return (
        <button css={css`
            width: 100%;
            padding: 1.5rem 1rem 1.5rem 1rem;
            border-radius: 50px;
            border: none;
            background: #333333;
            color: white;
            
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
        `}
            {...props}>
            {children}
        </button>
    )
}