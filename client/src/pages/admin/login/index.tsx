import { useHistory } from "react-router-dom";
import { Form, Input } from "antd";
import md5 from "md5";
import AdminHeader from "../../../components/Admin/AdminHeader";
import {
  AdminAuthForm, AdminPanelTitle, AdminPanelDescription, EmailIcon,
  AdminPanelImage, AdminContent, AdminAuthButton, AdminForgotPassword, AdminContentWrapper,
  TitleScale,
} from "../../../components/Admin/styled";
import { AdminPageWrapper } from "../styled";
import { InputIconWrapper } from "../../../components/styled";
import ArtistLoader from "../../../assets/images/ArtistLoader.svg";
import emailIcon from "../../../assets/images/admin/icon_mail.svg";
import passwordIcon from "../../../assets/images/admin/icon_password.svg";
import { FormFields, IFormValues } from "./types";
import { vibrate } from "../../../utils/vibration";
import { GlobalStorage } from "../../../services/global";
import { login } from "../../../axios/routes/user";
import { showErrorNotification } from "../../../utils/notification";
import { Routes } from "../../../utils/routes";

const AdminLoginPage = (): JSX.Element => {
  const history = useHistory();

  const onFinish = async ({ email, password }: IFormValues) => {
    vibrate("click");
    GlobalStorage.setAction("pending");
    try {
      const { token } = await login({ email: email.toLowerCase(), password: md5(password), role: "admin" });
      if (token) {
        GlobalStorage.login(token);
      }
    } catch (err) {
      GlobalStorage.setAction("error");
      showErrorNotification(err.message);
    }
  };

  return (
    <AdminPageWrapper>
      <AdminHeader />
      <AdminContentWrapper>
        <AdminContent>
          <AdminAuthForm>
            <TitleScale>
              <AdminPanelTitle>
                Welcome to
                <br />
                Bandwith Admin Panel
              </AdminPanelTitle>
            </TitleScale>
            <AdminPanelDescription>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              <br />
              sed do eiusmod tempor incididunt ut labore
              <br />
              et dolore magna aliqua.
            </AdminPanelDescription>
            <Form id="admin-auth-form" className="admin-panel-form" onFinish={onFinish}>
              <Form.Item name={FormFields.EMAIL} rules={[{ required: true, type: "email", message: "Enter a valid email" }]}>
                <Input
                  placeholder="Email"
                  prefix={(
                    <InputIconWrapper>
                      <EmailIcon src={emailIcon} alt="Email" />
                    </InputIconWrapper>
                  )}
                  className="admin-auth-input"
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
                  className="admin-auth-input"
                />
              </Form.Item>
              <AdminAuthButton type="submit">Get Start</AdminAuthButton>
            </Form>
            <AdminForgotPassword
              href="#"
            >
              Forgot Password ?
            </AdminForgotPassword>
            <AdminForgotPassword
              style={{ float: "right" }}
              href="/"
            >
              Goto Welcome Page
            </AdminForgotPassword>
          </AdminAuthForm>
          <AdminPanelImage alt="logo" src={ArtistLoader} />
        </AdminContent>
      </AdminContentWrapper>
    </AdminPageWrapper>
  );
};

export default AdminLoginPage;
