import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import Input from "@/component/common/Input.tsx";
import password from "@/assets/icon/password.svg";
import wavingHand from "@/assets/emoji/waving-hand.png";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";
import Button from "@/component/common/Button.tsx";
import { fadeUp } from "@/style/keyframe.ts";
import { changePassword } from "@/hooks/api/member/changePassword.ts";

interface locationType {
  userId: string;
}

export default function Change() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = useRef("");
  const [tempPW, setTempPW] = useState("");
  const [PW, setPW] = useState("");
  const [ConfirmPW, setConfirmPW] = useState("");
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    if (!localStorage.getItem("REWORK_AC")) navigate("/error");
    userId.current = (location.state as locationType).userId;

    const counter = setInterval(() => {
      setChapter((chapter) => chapter + 1);
    }, 2000);

    if (chapter === 2) {
      clearInterval(counter);
    }

    return () => clearInterval(counter);
  }, [chapter]);

  const handleChnage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "tempPassword") {
      setTempPW(e.target.value);
    }

    if (e.target.name === "password") {
      setPW(e.target.value);
    }

    if (e.target.name === "confirmPassword") {
      setConfirmPW(e.target.value);
    }
  };

  const handleConfirm = () => {
    if (PW === ConfirmPW) {
      console.log(userId.current, tempPW, PW);
      changePassword(userId.current, tempPW, PW)
        .then(() => {
          navigate("/main");
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <section
      css={css`
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      `}
    >
      <article
        css={css`
          min-width: 30rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          row-gap: 2.5rem;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 1.2rem;

            span {
              display: none;
              text-align: center;
            }

            span:nth-of-type(1) {
              color: #222;
              font-weight: 600;
              font-size: 2rem;
              display: ${chapter === 1 && "inline"};
              animation: ${fadeUp} 0.4s;
            }

            span:nth-of-type(2) {
              font-weight: 400;
              font-size: 1.3rem;
              color: ${DESIGN_SYSTEM_COLOR.grey400};
              display: ${chapter === 1 && "inline"};
              animation: ${fadeUp} 0.4s;
            }
          `}
        >
          <img
            src={wavingHand}
            style={{ display: `${chapter === 0 && "inline"}` }}
            css={css`
              display: none;
              width: 3rem;
              height: auto;
              margin-bottom: 1.2rem;
              animation: ${fadeUp} 0.4s;
            `}
          />
          <span style={{ display: `${chapter === 1 && "inline"}` }}> 반가워요, 리워크에 처음오셨나요? </span>
          <span style={{ display: `${chapter === 1 && "inline"}` }}>
            보안을 위해 비밀번호 변경을 권장드리고 있어요, 변경하실 비밀번호를 입력해주세요
          </span>
        </div>
        <div
          style={{ display: `${chapter === 2 && "flex"}` }}
          css={css`
            display: none;
            flex-direction: column;
            row-gap: 1.3rem;
            width: 30rem;
            animation: ${fadeUp} 0.6s;
          `}
        >
          <Input title="부여받은 임시 비밀번호" name="tempPassword" icon={password} value={tempPW} onChange={handleChnage} type="password" />
          <Input title="변경할 비밀번호" name="password" icon={password} value={PW} onChange={handleChnage} type="password" />
          <Input title="비밀번호 확인" name="confirmPassword" icon={password} value={ConfirmPW} onChange={handleChnage} type="password" />
          <Button
            onClick={handleConfirm}
            css={css`
              transition: 0.6s all;
              opacity: ${PW && ConfirmPW && PW === ConfirmPW ? "100%" : "30%"};
            `}
          >
            비밀번호 변경
          </Button>
        </div>
      </article>
    </section>
  );
}
