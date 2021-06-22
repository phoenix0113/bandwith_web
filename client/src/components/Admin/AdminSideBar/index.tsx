import { useState, useEffect, useContext } from "react";
import { Modal } from "antd";
import { GlobalStorageContext } from "../../../services/global";
import { vibrate } from "../../../utils/vibration";
import {
  SideBarSection, SideBarUl, SideBarLi, SideBarActive, SideBarHref,
  LogoutModalTitle, LogoutModalFooter, LogoutModalButton,
} from "./styled";

interface Data {
  pageType: string;
}

const AdminSideBar = (props:Data): JSX.Element => {
  const [logoutModalStatus, setLogoutModalStatus] = useState(false);
  const [type, setType] = useState("");
  const { logout } = useContext(GlobalStorageContext);

  const handleLogoutModal = () => {
    setLogoutModalStatus(true);
  };

  const handleLogoutCancel = () => {
    setLogoutModalStatus(false);
  };

  const handleLogout = () => {
    setLogoutModalStatus(false);
    vibrate("click");
    logout();
  };

  useEffect(() => {
    setType(props.pageType);
  });

  return (
    <SideBarSection>
      <SideBarUl>
        <SideBarLi className={(type === "dashboard") ? "admin-active" : ""}>
          {(type === "dashboard") ? <SideBarActive /> : <></>}
          <SideBarHref
            className={(type === "dashboard") ? "sidebar-active" : ""}
            href="/admin/dashboard"
          >
            Dashboard
          </SideBarHref>
        </SideBarLi>
        <SideBarLi className={(type === "manage") ? "admin-active" : ""}>
          {(type === "manage") ? <SideBarActive /> : <></>}
          <SideBarHref
            className={(type === "manage") ? "sidebar-active" : ""}
            href="/admin/manage"
          >
            Manage
          </SideBarHref>
        </SideBarLi>
        <SideBarLi className={(type === "help") ? "admin-active" : ""}>
          {(type === "help") ? <SideBarActive /> : <></>}
          <SideBarHref
            className={(type === "help") ? "sidebar-active" : ""}
            href="/admin/help"
          >
            Help
          </SideBarHref>
        </SideBarLi>
        <SideBarLi
          onClick={handleLogoutModal}
          className="pa-left-50 cursor-pointer"
        >
          Log Out
        </SideBarLi>
      </SideBarUl>
      <Modal
        width={685}
        title={<LogoutModalTitle>Are you sure tha you want Logout ?</LogoutModalTitle>}
        centered
        visible={logoutModalStatus}
        onCancel={handleLogoutCancel}
        onOk={handleLogout}
        footer={(
          <LogoutModalFooter>
            <LogoutModalButton key="back" onClick={handleLogout}>Logout</LogoutModalButton>
            <LogoutModalButton key="submit" onClick={handleLogoutCancel}>Cancel</LogoutModalButton>
          </LogoutModalFooter>
        )}
      />
    </SideBarSection>

  );
};

export default AdminSideBar;
