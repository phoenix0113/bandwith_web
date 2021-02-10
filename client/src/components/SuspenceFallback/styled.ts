import styled from "styled-components";
import { COLORS } from "../styled";

export const SuspenceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: ${COLORS.MAIN_LIGHT};

  & > img {
    width: 46%;
  }
`;
