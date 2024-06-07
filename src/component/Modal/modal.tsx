import { Dispatch, ReactNode, SetStateAction } from "react";
import { css } from "@emotion/react";
import { createPortal } from "react-dom";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";
import lying from "@/assets/emoji/lying-face.png";

interface modalProps {
  setModalState: Dispatch<SetStateAction<boolean>>;
  title: string;
  feature_image: string;
  content: ReactNode;
  isDoubleButton: boolean;
}
export default function Modal({ title, feature_image, setModalState, content, isDoubleButton }: modalProps) {
  const handlePositiveButton = () => {
    setModalState(false);
  };

  const handleNegativeButton = () => {
    setModalState(false);
  };

  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.6);
        position: relative;
        z-index: 99999;
      `}
    >
      <div
        css={css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;

          min-width: 40rem;
          min-height: 30rem;
          background-color: white;
          border-radius: 0.8rem;
        `}
        id="modal-container"
      >
        <div
          id="modal-content"
          css={css`
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            row-gap: 3rem;
            padding: 3.3rem;

            color: ${DESIGN_SYSTEM_COLOR.kreamBlack};

            button {
              padding: 1.1rem 2.3rem;
              border: none;
              background: #222222;
              color: white;
              border-radius: 0.6rem;
              font-size: 1.1rem;
              cursor: pointer;
              width: 100%;
            }

            #modal-header {
              font-size: 1.7rem;
              font-weight: 800;
            }

            #modal-featured-image {
              width: 100%;
              display: flex;
              justify-content: center;
            }

            #modal-featured-image img {
              width: 5rem;
              height: auto;
            }

            #modal-subtext {
              font-size: 1.2rem;
              font-weight: 300;
              color: ${DESIGN_SYSTEM_COLOR.kreamBlack};

              display: flex;
              flex-direction: column;
              text-align: center;
              row-gap: 0.4rem;
            }

            #modal-button-container {
              display: flex;
              flex-direction: row;
              column-gap: 1rem;
              width: 100%;
              margin-top: auto;

              & > button:nth-of-type(1) {
                ${isDoubleButton &&
                css`
                  background: ${DESIGN_SYSTEM_COLOR.grey200};
                  color: ${DESIGN_SYSTEM_COLOR.kreamBlack};
                `}
              }
            }
          `}
        >
          <div id="modal-header"> {title ? title : "우아한 제목을 입력해주세요"} </div>
          <div id="modal-featured-image">{feature_image ? <img src={feature_image} /> : <img src={lying} />}</div>
          <div id="modal-subtext">{content ? content : <span> 모달에 들어갈 멋진 내용을 입력해주세요 </span>}</div>
          <div id="modal-button-container">
            {isDoubleButton && <button onClick={handleNegativeButton}> 취소할게요 </button>}
            <button onClick={handlePositiveButton}> 확인했어요 </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export const ModalPortal = ({ title, feature_image, setModalState, content, isDoubleButton = true }: modalProps) => {
  const el = document.getElementById("modal");
  return createPortal(
    <Modal title={title} isDoubleButton={isDoubleButton} feature_image={feature_image} setModalState={setModalState} content={content} />,
    el as HTMLElement,
  );
};
