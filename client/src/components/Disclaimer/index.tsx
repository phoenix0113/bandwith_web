import { DisclaimerText, DisclaimerWrapper } from "./styled";
import { CommonButton } from "../styled";

interface IProps {
  clickHandler: () => void;
}

export const DisclaimerComponent = ({ clickHandler }: IProps): JSX.Element => (
  <DisclaimerWrapper>
    <DisclaimerText>
      Your calls are recorded. The content that is inappropriate for some ages is prohibited
    </DisclaimerText>
    <CommonButton onClick={clickHandler}>Agree</CommonButton>
  </DisclaimerWrapper>
);
