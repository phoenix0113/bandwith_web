import styled from "styled-components";
import { fadeInAnimation, COLORS } from "../../components/styled";

export const HomeHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10vh 20px;
`;

export const ToggleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  color: lightgray;
  padding: 5px 20px;
  font-size: 14px;

  & > * {
    padding: 0 5px;
  }
`;

export const HomeContent = styled.div`
  background-color: ${COLORS.MAIN_DARK};
  flex-grow: 1;
  display: flex;
  padding: 15% 30px 0 30px;
  color: ${COLORS.WHITE};
  border-radius: 28px 28px 0 0;
  flex-direction: column;
  justify-content: space-around;
`;

export const ContentHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  animation: ${fadeInAnimation} 1s;

`;

export const HeaderTitle = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 40px;
  letter-spacing: 0px;
  text-align: center;
`;

export const HeaderDescription = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: center;
`;

export const CallButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  bottom: 0;
  animation: ${fadeInAnimation} 1s;
`;

export const CallButtonImg = styled.img`
  cursor: pointer;
`;
