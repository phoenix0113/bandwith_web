import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminUserListProfile from "../../../components/Admin/AdminUserListProfile";
import { AdminStorageContext } from "../../../services/admin";
import {
  AdminPageContent, AdminPageWrapper, AdminVideoManageContent, AdminVideoManageWrapper,
  AdminVideoList, AdminVideoListStatus, TextRight, AdminVideoListStatusLabel,
  AdminVideoListStatusInput, AdminScrollContent, AdminVideoListTitle,
} from "../../../components/Admin/styled";
import { PAGE_TYPE } from "./types";
import {PUBLIC_STATUS, BLOCK_STATUS, APPROVED_STATUS} from "../../../utils/constants";

const AdminUsersPage = observer((): JSX.Element => {
  const {
    users,
    updateUserStatus,
  } = useContext(AdminStorageContext);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    setAllUsers(users);
  }, [users]);

  const setStatus = (id: string, status: string) => {
    const user = allUsers.find((item) => item._id === id);
    user.status = status;
  };

  const onChangeStatus = (
    id: string, status: string,
  ) => {
    updateUserStatus(id, status);
    setStatus(id, status);
  };

  return (
    <AdminPageWrapper>
      <AdminHeader />
      <AdminPageContent>
        <AdminSideBar pageType={PAGE_TYPE} />
        <AdminVideoManageContent>
          <AdminVideoListTitle>
            User List
          </AdminVideoListTitle>
          <AdminVideoManageWrapper>
            <AdminScrollContent className="scrollbar-content">
              {
                allUsers.map((user) => (
                  <AdminVideoList key={user._id}>
                    <div style={{ marginLeft: "26px", marginRight: "26px" }}>
                      <AdminUserListProfile
                        imageUrl={user.imageUrl}
                        name={user.name}
                        type="none"
                      />
                    </div>
                    <AdminVideoListStatus>
                      <TextRight>
                        <AdminVideoListStatusLabel htmlFor={user._id}>
                          Available
                        </AdminVideoListStatusLabel>
                        <AdminVideoListStatusInput
                          type="radio"
                          value={PUBLIC_STATUS}
                          name={user._id}
                          id={user._id}
                          checked={(user.status === APPROVED_STATUS)}
                          onChange={() => onChangeStatus(user._id, APPROVED_STATUS)}
                        />
                      </TextRight>
                      <TextRight>
                        <AdminVideoListStatusLabel htmlFor={user._id}>
                          Block
                        </AdminVideoListStatusLabel>
                        <AdminVideoListStatusInput
                          type="radio"
                          value={BLOCK_STATUS}
                          name={user._id}
                          id={user._id}
                          checked={(user.status === "block")}
                          onChange={() => onChangeStatus(user._id, "block")}
                        />
                      </TextRight>
                    </AdminVideoListStatus>
                  </AdminVideoList>
                ))
              }
            </AdminScrollContent>
          </AdminVideoManageWrapper>
        </AdminVideoManageContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
});

export default AdminUsersPage;
