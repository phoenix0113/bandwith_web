import styled from "styled-components";
import { COLORS } from "../../styled";

export const IcommingCallWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  background-color: ${COLORS.MAIN_DARK};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: ${COLORS.WHITE};
  padding-top: 20%;

  @media (max-height: 568px) {
    padding-top: 10%;
  }
`;

export const CallUser = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const UserName = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 40px;
  letter-spacing: 0px;
  text-align: center;
  color: ${COLORS.WHITE};
`;

export const UserStatus = styled.div`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: center;
  color: ${COLORS.ALTERNATIVE};
`;

export const CallToolbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5% 30px 25% 30px;
  width: 100%;
`;

interface CallToolbarItemProps {
  size?: "big"|"small";
}

export const CallToolbarItem = styled.div<CallToolbarItemProps>`
  height: 100%;
  width: ${({ size }) => (size === "big" ? "37%" : "22%")};
  display: flex;
  justify-content: center;

  & > * {
    width: 100%;
  }
`;
