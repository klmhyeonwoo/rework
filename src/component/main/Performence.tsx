import drone3D from "@/assets/3d/performence/drone.gif";
import integration3D from "@/assets/3d/performence/integration.gif";
import arround3D from "@/assets/3d/performence/around.gif";
import clipboard3D from "@/assets/3d/performence/clipboard.gif";
import discount3D from "@/assets/3d/performence/discount.gif";
import folder3D from "@/assets/3d/performence/folder.gif";
import graphs3D from "@/assets/3d/performence/graphs.gif";
import groceries3D from "@/assets/3d/performence/groceries.gif";
import market3D from "@/assets/3d/performence/market.gif";
import message3D from "@/assets/3d/performence/message.gif";
import screen3D from "@/assets/3d/performence/screen.gif";
import tablet3D from "@/assets/3d/performence/tablet.gif";
import problem3D from "@/assets/3d/performence/problem.gif";
import telemechine3D from "@/assets/3d/performence/telemechine.gif";

import { css } from "@emotion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import { DESIGN_SYSTEM_COLOR } from "@/style/variable.ts";
import { useRef } from "react";

export default function Performence() {
  const GRAPHIC_LIST = [
    drone3D,
    integration3D,
    problem3D,
    arround3D,
    clipboard3D,
    discount3D,
    folder3D,
    graphs3D,
    groceries3D,
    integration3D,
    market3D,
    message3D,
    screen3D,
    tablet3D,
    telemechine3D,
  ];
  const mock = ["컨퍼런스 미팅", "데브챗 밋업 진행", "기술 블로그 오픈", "컨퍼런스 개최", "프론트엔드 다이빙 클럽 입성"];

  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={30}
        slidesPerView={3.5}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {mock.map((item) => {
          const key = useRef(Math.floor(Math.random() * GRAPHIC_LIST.length));
          return (
            <SwiperSlide key={item}>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  row-gap: 2.5rem;
                  align-items: center;
                  justify-content: center;
                  border: none;
                  padding: 2.8rem;
                  border-radius: 0.8rem;
                  box-shadow: inset 0 0 0 1px ${DESIGN_SYSTEM_COLOR.greyOpacity200};
                `}
              >
                <img
                  src={GRAPHIC_LIST[key.current]}
                  css={css`
                    width: 12rem;
                    height: auto;
                  `}
                />
                <span>{item}</span>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
