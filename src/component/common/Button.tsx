import { css } from "@emotion/react";
import { PropsWithChildren } from "react";
import Loading from "@/component/common/Loading.tsx";

interface buttonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "types"> {
  loading?: boolean;
}
export default function Button({ children, loading = false, ...props }: PropsWithChildren<buttonProps>) {
  return (
    <button
      css={css`
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
        min-height: 3.25rem;
      `}
      {...props}
    >
      {loading ? <Loading /> : children}
    </button>
  );
}
