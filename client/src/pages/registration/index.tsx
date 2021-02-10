import { useHistory } from "react-router-dom";
import { Form, Input } from "antd";
import md5 from "md5";

import logo from "../../assets/images/teleport.svg";
import backIcon from "../../assets/images/auth/back.svg";
import profileIcon from "../../assets/images/auth/profile-outline.svg";
import emailIcon from "../../assets/images/auth/email.svg";
import passwordIcon from "../../assets/images/auth/password.svg";

import {
  PageWrapper, AuthFormWrapper, InputIconWrapper,
  AuthButton, Text, StyledLink, AuthLinkRow, WelcomeLogo,
  NavigationBar, NavigationIcon, CenterItem, LeftItem, RightItem,
  AuthPageTopBlock, AuthPageBottomBlock, AuthPageBlockContent, AuthPageContentWrapper,
} from "../../components/styled";

import { Routes } from "../../utils/routes";
import { showErrorNotification } from "../../utils/notification";
import { FormFields, IFormValues } from "./types";
import { register, login } from "../../axios/routes/user";
import { GlobalStorage } from "../../services/global";
import { vibrate } from "../../utils/vibration";

import "../../styles/authentication.scss";

const RegistrationPage = (): JSX.Element => {
  const history = useHistory();

  const onFinish = async ({ name, email, password }: IFormValues) => {
    vibrate("click");
    GlobalStorage.setAction("pending");
    try {
      const encodedPassword = md5(password);

      await register({ name, email: email.toLowerCase(), password: encodedPassword });

      const { token } = await login({ email, password: encodedPassword });
      if (token) {
        GlobalStorage.login(token);
      }
    } catch (err) {
      GlobalStorage.setAction("error");
      showErrorNotification(err.message);
    }
  };

  return (
    <PageWrapper className="registration-page">
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
        <CenterItem>Registration</CenterItem>
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
                <Form.Item name={FormFields.NAME} rules={[{ required: true, message: "Name is required" }]}>
                  <Input
                    placeholder="Name"
                    prefix={(
                      <InputIconWrapper>
                        <img src={profileIcon} alt="Name" />
                      </InputIconWrapper>
                )}
                  />
                </Form.Item>
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
                <Form.Item
                  name={FormFields.CONFIRM_PASSWORD}
                  rules={[
                    { required: true, message: "Password is required" },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (getFieldValue(FormFields.PASSWORD) === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject("Passwords must match");
                      },
                    }),
                  ]}
                >
                  <Input
                    placeholder="Confirm password"
                    type="password"
                    autoComplete="new-password"
                    prefix={(
                      <InputIconWrapper>
                        <img src={passwordIcon} alt="Password" />
                      </InputIconWrapper>
              )}
                  />
                </Form.Item>
                <AuthButton type="submit">Sign Up</AuthButton>
                <AuthLinkRow onClick={() => {
                  vibrate("click");
                  history.push(Routes.LOGIN);
                }}
                >
                  <Text>Have an account?</Text>
                  <StyledLink>Login here</StyledLink>
                </AuthLinkRow>
              </Form>
            </AuthFormWrapper>
          </AuthPageContentWrapper>
        </AuthPageBlockContent>
      </AuthPageBottomBlock>
    </PageWrapper>
  );
};
export default RegistrationPage;
