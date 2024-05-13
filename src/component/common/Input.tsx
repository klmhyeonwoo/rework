import {css} from "@emotion/react";
import {InputHTMLAttributes} from "react";
import {DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT} from "@/style/variable.ts";

type inputProps = {
    value: string;
    placeholder: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "types">

export default function Input({value, placeholder, ...props}: inputProps) {
    return <input css={css`
      ${DESIGN_SYSTEM_TEXT.CAPTION}
      width: 100%;
      padding: 1.5rem 2rem 1.5rem 2rem;
      border-radius: 50px;
      border: none;
      box-shadow: inset 0 0 0 1px ${DESIGN_SYSTEM_COLOR.greyOpacity200};
      box-sizing: border-box;

      &:focus {
        outline: none;
      }
      
      ::placeholder {
        color: ${DESIGN_SYSTEM_COLOR.grey400}
      }
    `}
    {...props}
        placeholder={placeholder ?? "텍스트를 입력해주세요"}
    />
}