import styled from "styled-components";
import { COLORS, CALL_PAGE_NAVIGATION_HEIGHT } from "../../styled";

/**
 * Bottom navigation
 */

export const CallPageBottomNavigation = styled.div`
  width: 100%;
  background: ${COLORS.MAIN_DARK};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 27px;
  height: ${CALL_PAGE_NAVIGATION_HEIGHT}px;
`;

export const BottomNavigationItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-width: 18%;
`;

export const ItemText = styled.div`
  margin-top: 6px;
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0px;
  text-align: center;
  color: ${COLORS.WHITE};
`;

/**
  * Content
  */
export const CallWraper = styled.div`
  background-color: ${COLORS.MAIN_DARK};
  display: flex;
  flex-direction: column;
  height: calc(100vh - ${CALL_PAGE_NAVIGATION_HEIGHT * 2}px);
`;

export const CallParticipant = styled.div`
  height: 50%;
`;

export const ParticipantStatusOverlay = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${COLORS.BLACK};
  opacity: 0.75;
  color: ${COLORS.WHITE};
  font-size: 16px;
  line-height: 21px;
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
`;
