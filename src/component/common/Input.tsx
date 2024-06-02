import { css } from "@emotion/react";
import { InputHTMLAttributes, useState } from "react";
import { DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT } from "@/style/variable.ts";
import { fadeUp } from "@/style/keyframe.ts";

type inputProps = {
  value: string;
  placeholder?: string;
  icon?: string;
  isVisible?: boolean;
  title?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "types">;

export default function Input({ isVisible = true, icon, value, title, placeholder, ...props }: inputProps) {
  const [isFocus, setFocus] = useState(false);
  return (
    <div
      css={css`
        display: ${isVisible ? "flex" : "none"};
        position: relative;
        animation: ${fadeUp} 0.4s;
        padding: 1.5rem 2rem 1.5rem 2rem;
        box-shadow: inset 0 0 0 1px ${DESIGN_SYSTEM_COLOR.greyOpacity200};
        box-sizing: border-box;
        background: transparent;
        border-radius: 50px;
      `}
    >
      <input
        css={css`
          ${DESIGN_SYSTEM_TEXT.CAPTION}
          width: 100%;
          padding-left: ${icon && "2.8rem"};
          border: none;
          background: transparent;

          ${title &&
          (isFocus || value) &&
          css`
            transform: translateY(0.6rem);
          `}

          &:focus {
            outline: none;
          }

          ::placeholder {
            color: ${DESIGN_SYSTEM_COLOR.grey400};
          }
        `}
        {...props}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {icon && (
        <img
          src={icon}
          css={css`
            position: absolute;
            width: 2.1rem;
            height: auto;
            top: 50%;
            left: 0;
            margin-left: 1.8rem;
            transform: translate(0%, -50%);
            opacity: 40%;
          `}
        />
      )}
      {title && (
        <span
          css={css`
            position: absolute;
            height: auto;
            width: 100%;
            top: 50%;
            left: 10%;
            margin-left: 1.8rem;
            transform: translate(0%, -50%);
            opacity: 40%;
            font-size: 1.2rem;
            transition: 0.4s all;
            z-index: -1;

            ${(isFocus || value) &&
            css`
              transform: translateY(-1.7rem);
              font-size: 1.1rem;
            `}
          `}
        >
          {title}
        </span>
      )}
    </div>
  );
}
