import styled from "styled-components";
import { COLORS, Z_INDEX } from "../styled";

export const DisclaimerWrapper = styled.div`
  position: absolute;
  bottom: 0;  
  
  display: flex;
  flex-direction: column;
  padding: 3% 20px;
  background-color: ${COLORS.MAIN_DARK};
  color: ${COLORS.WHITE};

  border-top: 4px solid ${COLORS.MAIN_LIGHT};

  z-index: ${Z_INDEX.HIGH};
`;

export const DisclaimerText = styled.div`
  display: flex;
  flex-grow: 1;

  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: center;
  
  padding: 10px;
`;
