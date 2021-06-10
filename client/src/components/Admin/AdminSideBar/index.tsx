import { useState, useEffect } from "react";
import { Modal } from "antd";
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
  const [showSubPage, setShowSubPage] = useState(false);

  const handleLogoutModal = () => {
    setLogoutModalStatus(true);
  };

  const handleLogoutCancel = () => {
    setLogoutModalStatus(false);
  };

  const handleLogout = () => {
    setLogoutModalStatus(false);
  };

  const changeShowSubPage = () => {
    setShowSubPage(!showSubPage);
  };

  useEffect(() => {
    setType(props.pageType);
    if (type === "users" || type === "manage") {
      setShowSubPage(true);
    }
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
        <SideBarLi className={(type === "video") ? "admin-active" : ""}>
          {(type === "video") ? <SideBarActive /> : <></>}
          <SideBarHref
            className={(type === "video") ? "sidebar-active" : ""}
            href="/admin/video"
          >
            Video
          </SideBarHref>
        </SideBarLi>
        <SideBarLi>
          <SideBarHref
            onClick={changeShowSubPage}
          >
            Manage
          </SideBarHref>
        </SideBarLi>
        {
          (showSubPage) ? (
            <>
              <SideBarLi className={(type === "users") ? "admin-active" : ""}>
                {(type === "users") ? <SideBarActive /> : <></>}
                <SideBarHref
                  className={(type === "users") ? "sub-sidebar-active" : ""}
                  href="/admin/users"
                  style={{ paddingLeft: "70px" }}
                >
                  User Manage
                </SideBarHref>

              </SideBarLi>
              <SideBarLi className={(type === "manage") ? "admin-active" : ""}>
                {(type === "manage") ? <SideBarActive /> : <></>}
                <SideBarHref
                  className={(type === "manage") ? "sub-sidebar-active" : ""}
                  href="/admin/manage"
                  style={{ paddingLeft: "70px" }}
                >
                  Video Manage
                </SideBarHref>
              </SideBarLi>
            </>
          ) : (
            <></>
          )
        }
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
