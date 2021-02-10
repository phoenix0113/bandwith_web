import { Form, Input } from "antd";
import { useHistory } from "react-router-dom";
import md5 from "md5";

import logo from "../../assets/images/teleport.svg";
import backIcon from "../../assets/images/auth/back.svg";
import emailIcon from "../../assets/images/auth/email.svg";
import passwordIcon from "../../assets/images/auth/password.svg";

import {
  PageWrapper, AuthFormWrapper, InputIconWrapper,
  AuthButton, Text, StyledLink, AuthLinkRow,
  NavigationBar, NavigationIcon, CenterItem, LeftItem, RightItem, WelcomeLogo,
  AuthPageTopBlock, AuthPageBottomBlock, AuthPageBlockContent, AuthPageContentWrapper,
} from "../../components/styled";

import { FormFields, IFormValues } from "./types";
import { login } from "../../axios/routes/user";
import { GlobalStorage } from "../../services/global";
import { Routes } from "../../utils/routes";
import { showErrorNotification } from "../../utils/notification";
import { vibrate } from "../../utils/vibration";

import "../../styles/authentication.scss";

const LoginPage = (): JSX.Element => {
  const history = useHistory();

  const onFinish = async ({ email, password }: IFormValues) => {
    vibrate("click");
    GlobalStorage.setAction("pending");
    try {
      const { token } = await login({ email: email.toLowerCase(), password: md5(password) });
      if (token) {
        GlobalStorage.login(token);
      }
    } catch (err) {
      GlobalStorage.setAction("error");
      showErrorNotification(err.message);
    }
  };

  return (
    <PageWrapper className="login-page">
      <NavigationBar position="absolute">
        <LeftItem>
          <NavigationIcon
            alt="Back"
            src={backIcon}
            onClick={() => {
              vibrate("click");
              history.push(Routes.WELCOME);
            }}
          />
        </LeftItem>
        <CenterItem>Login</CenterItem>
        <RightItem />
      </NavigationBar>
      <AuthPageTopBlock>
        <AuthPageBlockContent>
          <WelcomeLogo alt="Logo" src={logo} />
        </AuthPageBlockContent>
      </AuthPageTopBlock>
      <AuthPageBottomBlock>
        <AuthPageBlockContent>
          <AuthPageContentWrapper>
            <AuthFormWrapper>
              <Form id="auth-form" onFinish={onFinish}>
                <Form.Item name={FormFields.EMAIL} rules={[{ required: true, type: "email", message: "Enter a valid email" }]}>
                  <Input
                    placeholder="Email"
                    prefix={(
                      <InputIconWrapper>
                        <img src={emailIcon} alt="Email" />
                      </InputIconWrapper>
                    )}
                  />
                </Form.Item>
                <Form.Item name={FormFields.PASSWORD} rules={[{ required: true, message: "Password is required" }]}>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    prefix={(
                      <InputIconWrapper>
                        <img src={passwordIcon} alt="Password" />
                      </InputIconWrapper>
                    )}
                  />
                </Form.Item>
                <AuthButton type="submit">Login</AuthButton>
                <AuthLinkRow onClick={() => {
                  vibrate("click");
                  history.push(Routes.REGISTRATION);
                }}
                >
                  <Text>Don&apos;t have an account?</Text>
                  <StyledLink>Signup here</StyledLink>
                </AuthLinkRow>
              </Form>
            </AuthFormWrapper>
          </AuthPageContentWrapper>
        </AuthPageBlockContent>
      </AuthPageBottomBlock>
    </PageWrapper>
  );
};

export default LoginPage;
