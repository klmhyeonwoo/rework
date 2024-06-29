import { css } from "@emotion/react";
import Logo from "@/assets/img/logo_symbol.svg?react";
import Input from "@/component/common/Input.tsx";
import { ChangeEvent, Fragment, useEffect, useState } from "react";
import { EMAIL_REGEX } from "@/util/regex.ts";
import { fadeUp } from "@/style/keyframe.ts";
import Button from "@/component/common/Button.tsx";
import { DESIGN_SYSTEM_COLOR, DESIGN_SYSTEM_TEXT } from "@/style/variable.ts";
import { useNavigate } from "react-router-dom";
import { ModalPortal } from "@/component/Modal/modal.tsx";
import shaking from "@/assets/emoji/shaking-face.png";
import diagonalMouth from "@/assets/emoji/diagonal-mouth.png";
import mail from "@/assets/icon/mail.svg";
import password from "@/assets/icon/password.svg";
import executeLogin from "@/hooks/api/member/executeLogin.ts";
import { confirmChangePassword } from "@/hooks/api/member/confirmChangePassword.ts";
import { requestAccount } from "@/hooks/api/member/requestAccount.ts";
export default function SignIn() {
  const [ID, setID] = useState("");
  const [PW, setPW] = useState("");
  const [ID_CHECK, setIDCheck] = useState(false);
  const [PW_CHECK, setPWCheck] = useState(false);

  const [USER_EMAIL, setUserEmail] = useState("");
  const [USER_EMAIL_CHECK, setEmailCheck] = useState(false);

  const [isModal, setModalState] = useState(false);
  const [isDuplicatedModal, setDuplicatedModalState] = useState(false);
  const [isRequest, setRequest] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();
  const date = new Date();
  const day = date.getDate();

  /** 입력 값 상태 변화 함수 */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "ID") {
      setID(e.target.value);
      if (e.target.value.match(EMAIL_REGEX)) {
        setIDCheck(true);
      } else {
        setIDCheck(false);
      }
    }
    if (e.target.name === "PW") {
      setPW(e.target.value);
      if (e.target.value.length >= 5) {
        setPWCheck(true);
      } else {
        setPWCheck(false);
      }
    }
    if (e.target.name === "USER_EMAIL") {
      setUserEmail(e.target.value);
      if (e.target.value.match(EMAIL_REGEX)) {
        setEmailCheck(true);
      } else {
        setEmailCheck(false);
      }
    }
  };

  /** 로그인 관련 함수 */
  const handleLogin = () => {
    setLoading(true);
    /** TODO: 로그인 API 로직 */
    executeLogin(ID, PW)
      .then((res) => {
        // navigate("/main");
        localStorage.setItem("REWORK_AC", res.accessToken);
        confirmChangePassword()
          .then((res) => {
            console.log(res.data.initialPasswordUpdateState);
            if (!res.data.initialPasswordUpdateState) {
              navigate("/change", { state: { userId: ID } });
            } else {
              navigate("/main");
            }
            setLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(() => {
        setLoading(false);
        setModalState(true);
      });
  };

  const handleRequestAccount = () => {
    requestAccount(USER_EMAIL)
      .then(() => {
        localStorage.setItem("REWORK_REQUESTED", day.toString());
        setRequest(true);
        setUserEmail("");
        setEmailCheck(false);
      })
      .catch(() => {
        setUserEmail("");
        setEmailCheck(false);
        setDuplicatedModalState(true);
      });
  };

  useEffect(() => {
    const REQUESTED = localStorage.getItem("REWORK_REQUESTED");
    if (REQUESTED && day === parseInt(REQUESTED)) setRequest(true);
    if (REQUESTED) localStorage.removeItem("REWORK_REQUESTED");
    if (localStorage.getItem("REWORK_AC")) {
      // navigate("/main");
      localStorage.removeItem("REWORK_AC");
    }
  }, []);

  return (
    <Fragment>
      {isModal && (
        <ModalPortal
          setModalState={setModalState}
          title="Oops.."
          isDoubleButton={false}
          content={
            <Fragment>
              <span>리워크를 이용하기 위해서는 사전의 이메일 등록이 필요해요</span>
              <span>원활한 서비스 이용을 위해 이메일을 먼저 등록해주세요</span>
            </Fragment>
          }
          feature_image={shaking}
        />
      )}
      {isDuplicatedModal && (
        <ModalPortal
          setModalState={setDuplicatedModalState}
          title="Oops.."
          isDoubleButton={false}
          content={
            <Fragment>
              <span>이미 등록 요청이 되어진 계정이에요</span>
              <span>리워크를 원활하게 이용하기 위해서는 다른 계정을 이용해주세요</span>
            </Fragment>
          }
          feature_image={diagonalMouth}
        />
      )}
      <section
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;

          display: flex;
          column-gap: 4rem;
          justify-content: center;
          align-items: center;
        `}
      >
        <article
          css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 5rem;
            width: 30rem;
            padding: 5rem;
          `}
        >
          <Logo width={50} height={50} />
          <div
            css={css`
              display: flex;
              flex-direction: column;
              row-gap: 1.3rem;
              width: 100%;
              transition: 0.4s all;
              transform: ${ID_CHECK ? "translateY(-10px)" : ""};
              transform: ${PW_CHECK ? "translateY(-20px)" : ""};
            `}
          >
            <Input title="이메일 주소" icon={mail} name="ID" value={ID} onChange={(e) => handleChange(e)} />
            <Input
              css={css`
                animation: ${fadeUp} 0.4s;
              `}
              title="비밀번호"
              name="PW"
              icon={password}
              type="password"
              value={PW}
              visible={ID_CHECK}
              onChange={(e) => handleChange(e)}
            />
            <Button
              loading={isLoading}
              css={css`
                display: ${PW_CHECK ? "flex" : "none"};
                animation: ${fadeUp} 0.4s;
              `}
              onClick={handleLogin}
            >
              로그인
            </Button>
          </div>
        </article>
        <article
          css={css`
            display: flex;
            flex-direction: column;
            background: ${DESIGN_SYSTEM_COLOR.kreamBlack};
            width: 40rem;
            border-radius: 7px;
            justify-content: center;
            align-items: center;
            padding: 6rem 1.5rem;
            row-gap: 2.5rem;
            box-sizing: border-box;
            transition: 0.4s all;
            transform: ${USER_EMAIL_CHECK ? "translateY(-10px)" : ""};

            display: none;
          `}
        >
          <span
            css={css`
              ${DESIGN_SYSTEM_TEXT.S1}
              color: white;
              font-weight: 400;
            `}
          >
            우리는 효율적으로 일하는
            <span
              css={css`
                ${DESIGN_SYSTEM_TEXT.S1}
              `}
            >
              {" 리워크"}
            </span>
            입니다
          </span>
          <div
            css={css`
              ${DESIGN_SYSTEM_TEXT.CAPTION}
              color: white;
              text-align: center;

              span {
                display: block;
              }
            `}
          >
            <span> 리워크는 업무 효율성을 위한 기록용 아카이빙 서비스를 제공하고 있어요 </span>
            <span> 서비스 품질을 위해 소규모 회원을 위한 폐쇄성 있는 서비스를 제공해요 </span>
            <Input
              name="USER_EMAIL"
              css={css`
                box-shadow: none;
                margin-top: 1rem;
                background: none;
                color: white;
                text-align: center;

                &::placeholder {
                  ${DESIGN_SYSTEM_COLOR.whiteOpacity50}
                }
              `}
              value={USER_EMAIL}
              placeholder={isRequest ? "신청이 완료되었어요, 잠시만 기다려주세요" : "이곳에 이메일을 기재해주시면 컨텍 메일을 드릴게요"}
              onChange={(e) => handleChange(e)}
              disabled={isRequest && true}
            />
            <div
              css={css`
                column-gap: 1rem;
                justify-content: center;
                margin-top: 1rem;
                display: ${USER_EMAIL_CHECK ? "flex" : "none"};
                animation: ${fadeUp} 0.4s;
              `}
            >
              <span> 기재해주신 이메일로 컨텍 메일을 보내드릴게요 </span>
              <div
                css={css`
                  display: flex;
                  column-gap: 0.5rem;

                  span:nth-of-type(1),
                  span:nth-of-type(3) {
                    cursor: pointer;
                    &:hover {
                      text-decoration: underline;
                      text-underline-offset: 0.5rem;
                    }
                  }
                `}
              >
                <span onClick={handleRequestAccount}>예</span>
                <span>/</span>
                <span
                  onClick={() => {
                    setUserEmail("");
                    setEmailCheck(false);
                  }}
                >
                  아니요
                </span>
              </div>
            </div>
          </div>
        </article>
      </section>
    </Fragment>
  );
}
