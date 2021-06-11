import { observer } from "mobx-react";
import { useHistory } from "react-router-dom";
import { LogoutOutlined } from "@ant-design/icons";
import { Logo, LogoSection, Header, CenterSection, RightSection } from "./styled";
import { AdminAuthButton } from "../styled";
import { vibrate } from "../../../utils/vibration";
import { Routes } from "../../../utils/routes";
import logo from "../../../assets/images/Bandwith.svg";

import "../../../styles/admin.scss";

const AdminHeader = observer((): JSX.Element => {
  const history = useHistory();

  return (
    <Header>
      <LogoSection className="admin-header admin-header-side">
        <Logo
          alt="Logo"
          src={logo}
          onClick={() => {
            vibrate("click");
            history.push(Routes.WELCOME);
          }}
        />
      </LogoSection>
      <CenterSection className="admin-header" />
      <RightSection className="admin-header admin-header-side" />
    </Header>
  );
});

export default AdminHeader;
