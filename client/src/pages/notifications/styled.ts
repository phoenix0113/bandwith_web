import styled from "styled-components";
import { slideDownAnimation, COLORS } from "../../components/styled";

const backgrounds = [
  "linear-gradient(180deg, #FD9D00 0%, #FA6400 100%)",
  "linear-gradient(180deg, #00C4FF 0%, #0091FF 100%)",
  "linear-gradient(180deg, #DC43F2 0%, #B620E0 100%)",
  "linear-gradient(180deg, #9B66FF 0%, #6236FF 100%)",
  "linear-gradient(180deg, #FCDB00 0%, #F7B500 100%)",
  "linear-gradient(180deg, #342FCC 0%, #18159D 100%)",
];

const getColorFromIndex = (index: number) => backgrounds[index % backgrounds.length];

export const NotificationPageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  background-color: ${COLORS.MAIN_DARK};
  position: relative;
  overflow-y: scroll;
  padding-top: 20px;
`;

export const NotificationBlock = styled.div`
  display: flex;
  flex-direction: row;
  padding: 14px 40px 17px 20px;
  cursor: pointer;
  user-select: none;
  height: 75px;
  background-color: ${COLORS.MAIN_DARK};
  /* animation: ${slideDownAnimation} 0.6s; */
`;

interface NotificationCircleProps {
  colorIndex: number;
}

export const NotificationCircle = styled.div<NotificationCircleProps>`
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 100%;
  background: ${({ colorIndex }) => getColorFromIndex(colorIndex)};
`;

export const NotificationContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
`;

export const ContentHeader = styled.div`
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 25px;
  letter-spacing: -0.08px;
  text-align: left;
  color: ${COLORS.WHITE};
`;

export const ContentBody = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: left;
  color: ${COLORS.GREY};
`;
