import styled from "styled-components";
import { COLORS } from "../../styled";

export const OutgoingCallWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  background-color: ${COLORS.MAIN_DARK};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: ${COLORS.WHITE};
  padding: 20vh 43px 10vh 43px;
`;

export const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const TimerTime = styled.div`
  font-size: 32px;
  line-height: 38px;
  letter-spacing: 0px;
`;

export const TimerDescription = styled.div`
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0px;
  text-align: center;
`;

export const OutgoingCallContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentHeader = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 40px;
  letter-spacing: 0px;
  text-align: center;
`;

export const ContentDescription = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: center;
`;

export const ImgWrapper = styled.img`
  cursor: pointer;
`;
