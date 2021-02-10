import { useHistory } from "react-router-dom";
import { notification } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";

import { Routes } from "../../utils/routes";
import { GOOGLE_CLIENT_ID } from "../../utils/constants";
import { authWithGoogle } from "../../axios/routes/user";
import { GlobalStorage } from "../../services/global";

import {
  AuthPageTopBlock, AuthPageBottomBlock, AuthPageBlockContent,
  AuthPageContentWrapper, WelcomeLogo, COLORS,
} from "../../components/styled";

import {
  WelcomeWrapper, ContentToolbox, HeaderTitle,
  HeaderWrapper, LoginButton, RegistrationButton, ContinueWithIcon,
} from "./styled";
import logo from "../../assets/images/teleport.svg";
import GoogleIcon from "../../assets/images/welcome/ContinueWithGoogle.svg";

import { vibrate } from "../../utils/vibration";

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
        notification.open({
          message: "Google Error",
          description: err.message,
          icon: <InfoCircleOutlined style={{ color: COLORS.RED }} />,
        });
      }
    }
  };

  return (
    <WelcomeWrapper>
      <AuthPageTopBlock>
        <AuthPageBlockContent>
          <WelcomeLogo alt="Logo" src={logo} />
        </AuthPageBlockContent>
      </AuthPageTopBlock>
      <AuthPageBottomBlock>
        <AuthPageBlockContent>
          <AuthPageContentWrapper>
            <HeaderWrapper>
              <HeaderTitle>Record and Publish Random Video Calls</HeaderTitle>
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
          </AuthPageContentWrapper>
        </AuthPageBlockContent>
      </AuthPageBottomBlock>
    </WelcomeWrapper>
  );
};

export default WelcomePage;
