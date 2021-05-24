import { Form, Input } from "antd";
import AdminHeader from "../../../components/Admin/AdminHeader";
import {
  AdminPageWrapper, AdminAuthForm, AdminPanelTitle, AdminPanelDescription, EmailIcon,
  AdminPanelImage, AdminContent, AdminAuthButton, AdminForgotPassword, AdminContentWrapper,
  TitleScale,
} from "../../../components/Admin/styled";
import { InputIconWrapper } from "../../../components/styled";
import ArtistLoader from "../../../assets/images/ArtistLoader.svg";
import emailIcon from "../../../assets/images/admin/icon_mail.svg";
import passwordIcon from "../../../assets/images/admin/icon_password.svg";
import { FormFields } from "./types";

const AdminLoginPage = (): JSX.Element => {
  const here = "";
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
            <Form id="admin-auth-form" className="admin-panel-form">
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
          </AdminAuthForm>
          <AdminPanelImage alt="logo" src={ArtistLoader} />
        </AdminContent>
      </AdminContentWrapper>
    </AdminPageWrapper>
  );
};

export default AdminLoginPage;
