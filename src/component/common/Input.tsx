import { css } from "@emotion/react";
import { InputHTMLAttributes, useState } from "react";
import { DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT } from "@/style/variable.ts";
import { fadeUp } from "@/style/keyframe.ts";
import VisibleIcon from "@/assets/icon/visible.svg?react";
import NotVisibleIcon from "@/assets/icon/notVisible.svg?react";

type inputProps = {
  value: string;
  placeholder?: string;
  icon?: string;
  title?: string;
  type?: string;
  visible?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "types">;

export default function Input({ type, icon, value, title, visible = true, placeholder, ...props }: inputProps) {
  const [isFocus, setFocus] = useState(false);
  const [isVisible, setVisible] = useState(true);
  return (
    <div
      css={css`
        display: ${visible ? "flex" : "none"};
        position: relative;
        animation: ${fadeUp} 0.4s;
        padding: 1.5rem 2rem 1.5rem 2rem;
        box-shadow: inset 0 0 0 1px ${DESIGN_SYSTEM_COLOR.greyOpacity200};
        box-sizing: border-box;
        background: transparent;
        border-radius: 50px;
        padding-left: ${icon && "4.8rem"};
      `}
    >
      <input
        css={css`
          ${DESIGN_SYSTEM_TEXT.CAPTION}
          width: 100%;
          border: none;
          background: transparent;
          padding: ${type === "password" ? "0 3rem 0 0" : 0};

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
        value={value}
        placeholder={placeholder}
        type={isVisible ? type : ""}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      {type === "password" && (
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;

            cursor: pointer;
            position: absolute;
            right: 0;
            margin-right: 1.5rem;
            top: 50%;
            transform: translate(0%, -50%);
          `}
          onClick={() => setVisible(!isVisible)}
        >
          {isVisible ? <VisibleIcon /> : <NotVisibleIcon />}
        </div>
      )}
      {icon && (
        <img
          src={icon}
          css={css`
            position: absolute;
            width: 2.1rem;
            height: auto;
            margin-left: 1.8rem;
            top: 50%;
            left: 0;
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
            transform: translate(0%, -50%);
            opacity: 40%;
            font-size: 1.2rem;
            transition: 0.4s all;
            z-index: -1;

            ${(isFocus || value) &&
            css`
              transform: translateY(-1.8rem);
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
