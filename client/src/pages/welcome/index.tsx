import { useHistory } from "react-router-dom";
import { notification } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

import { Routes } from "../../utils/routes";
import { GOOGLE_CLIENT_ID } from "../../utils/constants";
import { authWithGoogle } from "../../axios/routes/user";
import { GlobalStorage } from "../../services/global";

import {
  WelcomeWrapper, ContentToolbox, HeaderContent, HeaderImage,
  HeaderWrapper, LoginButton, RegistrationButton, ContinueWithIcon,
} from "./styled";
import logo from "../../assets/images/Bandwith.svg";
import GoogleIcon from "../../assets/images/ContinueWithGoogle.svg";
import HandIcon from "../../assets/images/Hand.svg";

import { vibrate } from "../../utils/vibration";
import { showErrorNotification } from "../../utils/notification";

const WelcomePage = (): JSX.Element => {
  const history = useHistory();

  const googleResponse = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    if (!response.code) {
      GlobalStorage.setAction("pending");
      const { tokenId } = response as GoogleLoginResponse;
      try {
        const { token } = await authWithGoogle({ tokenId });
        GlobalStorage.login(token);
      } catch (err) {
        GlobalStorage.setAction("error");
        showErrorNotification("Google error");
      }
    }
  };

  return (
    <WelcomeWrapper>
      <HeaderWrapper>
        <HeaderImage width="50%" margin="20% 0 30% 0" alt="Logo" src={logo} />
        <HeaderImage width="33%" alt="LogoHand" src={HandIcon} style={{ margin: "30px" }} />
        <HeaderContent>in order to use the application you need to log in</HeaderContent>
      </HeaderWrapper>
      <ContentToolbox>
        <LoginButton onClick={() => {
          vibrate("click");
          history.push(Routes.LOGIN);
        }}
        >
          Login
        </LoginButton>
        <RegistrationButton onClick={() => {
          vibrate("click");
          history.push(Routes.REGISTRATION);
        }}
        >
          Register
        </RegistrationButton>
        <GoogleLogin
          render={(renderProps) => (
            <ContinueWithIcon
              onClick={() => {
                vibrate("click");
                renderProps.onClick();
              }}
              src={GoogleIcon}
              alt="Google"
            />
          )}
          clientId={GOOGLE_CLIENT_ID}
          onSuccess={googleResponse}
          cookiePolicy="single_host_origin"
        />
      </ContentToolbox>
    </WelcomeWrapper>
  );
};

export default WelcomePage;
