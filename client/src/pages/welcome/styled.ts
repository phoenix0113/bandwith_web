import styled from "styled-components";
import { COLORS } from "../../components/styled";

export const WelcomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 42px;
`;

export const HeaderTitle = styled.div`
  font-size: 24px;
  font-style: normal;
  font-weight: 800;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: center;
  color: ${COLORS.MAIN_LIGHT};
`;

export const HeaderContent = styled.div`
  font-weight: 400;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0px;
  text-align: center;
  color: ${COLORS.MAIN_LIGHT};
`;

export const ContentToolbox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 26px 30px;
  justify-content: center;

  & > * {
    margin-bottom: 15px;
  }
`;

const BasicButton = styled.button`
  padding: 11px 37.5px;
  border-radius: 6px;
  border: 2px solid;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  line-height: 25px;
  letter-spacing: 0px;
  text-align: center;

`;

export const LoginButton = styled(BasicButton)`
  background-color: white;
  border-color: ${COLORS.MAIN_LIGHT};
`;

export const RegistrationButton = styled(BasicButton)`
  background-color: ${COLORS.MAIN_LIGHT};
  border-color: ${COLORS.MAIN_LIGHT};
  color: white;
  flex-grow: 1;
  margin-left: 10px;
`;

export const ContinueWithIcon = styled.img`
  width: 100%;
  cursor: pointer;
  height: 50px;
  max-width: 340px;

  @media (min-width: 768px) {
    width: auto;
  }
`;
