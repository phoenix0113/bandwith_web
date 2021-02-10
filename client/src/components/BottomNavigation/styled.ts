import styled from "styled-components";
import { COLORS } from "../styled";

export const BottomNavigation = styled.div`
  background-color: ${COLORS.MAIN_DARK};
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 35px 0;
`;

export const BottomNavItem = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
