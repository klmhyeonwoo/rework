import { InputHTMLAttributes, useState } from "react";
import { css } from "@emotion/react";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";

type inputProps = {
  value: string;
  placeholder?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "types">;
export default function Input({ value, placeholder, ...props }: inputProps) {
  const [agenda, setAgenda] = useState(value);

  return (
    <input
      css={css`
        border: none;
        color: ${DESIGN_SYSTEM_COLOR.grey700};
        background: transparent;
        width: 100%;
        cursor: default;

        &:focus {
          outline: none;
        }
      `}
      placeholder={placeholder}
      value={agenda}
      onChange={(e) => setAgenda(e.target.value)}
      {...props}
    />
  );
}
