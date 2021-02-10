import styled from "styled-components";

import { CALL_PAGE_NAVIGATION_HEIGHT, COLORS } from "../../../components/styled";

export const LiveCallWrapper = styled.div`
  height: calc(100vh - ${CALL_PAGE_NAVIGATION_HEIGHT}px);
  width: 100%;
  background-color: ${COLORS.MAIN_DARK};
`;
