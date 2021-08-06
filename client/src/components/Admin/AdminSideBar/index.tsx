import { useState, useEffect, useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { Modal } from "antd";
import { GlobalStorageContext } from "../../../services/global";
import { vibrate } from "../../../utils/vibration";
import { Routes } from "../../../utils/routes";
import {
  SideBarSection, SideBarUl, SideBarLi, SideBarActive, SideBarHref,
  LogoutModalTitle, LogoutModalFooter, LogoutModalButton,
} from "./styled";

interface Data {
  pageType: string;
}

const AdminSideBar = (props:Data): JSX.Element => {
  const { pathname } = useLocation();
  const history = useHistory();

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
        <SideBarLi className={(type === "new recordings") ? "admin-active" : ""}>
          {(type === "new recordings") ? <SideBarActive /> : <></>}
          <SideBarHref
            className={(type === "new recordings") ? "sidebar-active" : ""}
            onClick={() => history.push(Routes.ADMIN_NEW_RECORDINGS)}
          >
            New Recordings
          </SideBarHref>
        </SideBarLi>
        <SideBarLi className={(type === "available recordings") ? "admin-active" : ""}>
          {(type === "available recordings") ? <SideBarActive /> : <></>}
          <SideBarHref
            className={(type === "available recordings") ? "sidebar-active" : ""}
            onClick={() => history.push(Routes.ADMIN_AVAILABLE_RECORDINGS)}
          >
            Available Recordings
          </SideBarHref>
        </SideBarLi>
        <SideBarLi className={(type === "blocked recordings") ? "admin-active" : ""}>
          {(type === "blocked recordings") ? <SideBarActive /> : <></>}
          <SideBarHref
            className={(type === "blocked recordings") ? "sidebar-active" : ""}
            onClick={() => history.push(Routes.ADMIN_BLOCKED_RECORDINGS)}
          >
            Blocked Recordings
          </SideBarHref>
        </SideBarLi>
        <SideBarLi className={(type === "users") ? "admin-active" : ""}>
          {(type === "users") ? <SideBarActive /> : <></>}
          <SideBarHref
            className={(type === "users") ? "sidebar-active" : ""}
            onClick={() => history.push(Routes.ADMIN_USERS)}
          >
            Users
          </SideBarHref>
        </SideBarLi>
        <SideBarLi className={(type === "help") ? "admin-active" : ""}>
          {(type === "help") ? <SideBarActive /> : <></>}
          <SideBarHref
            className={(type === "help") ? "sidebar-active" : ""}
            onClick={() => history.push(Routes.ADMIN_HELP)}
          >
            Help
          </SideBarHref>
        </SideBarLi>
        <SideBarLi
          onClick={handleLogoutModal}
          className="pa-left-40 cursor-pointer"
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
