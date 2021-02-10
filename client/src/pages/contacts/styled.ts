import styled from "styled-components";
import { COLORS, slideDownAnimation } from "../../components/styled";

export const ContactListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${COLORS.MAIN_DARK};
  padding: 30px 16px;
  flex-grow: 1;
  overflow-y: scroll;
`;

export const Contact = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 65px;
  animation: ${slideDownAnimation} 0.6s;
`;

export const ContactNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0.26px;
  color: ${COLORS.GREY};
  padding-right: 10px;
`;

export const ContactImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
`;

export const ContactContent = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 14px;
`;

export const ContentHeader = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.2625px;
  color: ${COLORS.WHITE};
`;

interface ContextBodyProps {
  color?: string;
}

export const ContentBody = styled.div<ContextBodyProps>`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0.26px;
  text-align: left;
  color: ${({ color }) => color || COLORS.GREY};
  text-transform: capitalize;
`;
