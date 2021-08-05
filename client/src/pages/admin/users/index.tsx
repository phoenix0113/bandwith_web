import React, { useState, useEffect, useContext } from "react";
import { observer } from "mobx-react";
import AdminHeader from "../../../components/Admin/AdminHeader";
import AdminSideBar from "../../../components/Admin/AdminSideBar";
import AdminUserListProfile from "../../../components/Admin/AdminUserListProfile";
import { AdminStorageContext } from "../../../services/admin";
import {
  AdminRecordingManageContent, AdminRecordingManageWrapper, AdminRecordingListTitle,
  AdminRecordingList, TextRight, AdminRecordingListStatus, AdminRecordingListStatusLabel,
  AdminRecordingListStatusInput,
} from "../../../components/Admin/styled";
import { AdminPageWrapper, AdminPageContent, AdminScrollContent } from "../styled";
import { PAGE_TYPE } from "./types";
import { PUBLIC_STATUS, BLOCK_STATUS, APPROVED_STATUS } from "../../../utils/constants";

const AdminUsersPage = observer((): JSX.Element => {
  const {
    users,
    updateUserStatus,
  } = useContext(AdminStorageContext);

  const onChangeStatus = (
    id: string, status: string,
  ) => {
    updateUserStatus(id, status);
  };

  return (
    <AdminPageWrapper>
      <AdminHeader />
      <AdminPageContent>
        <AdminSideBar pageType={PAGE_TYPE} />
        <AdminRecordingManageContent>
          <AdminRecordingListTitle>
            Users List
          </AdminRecordingListTitle>
          <AdminRecordingManageWrapper>
            <AdminScrollContent className="scrollbar-content">
              {
                users.map((user) => (
                  <AdminRecordingList key={user?._id}>
                    <div style={{ marginLeft: "26px", marginRight: "26px" }}>
                      <AdminUserListProfile
                        imageUrl={user.imageUrl}
                        name={user.name}
                        email={user.email}
                        type="none"
                      />
                    </div>
                    <AdminRecordingListStatus>
                      <TextRight>
                        <AdminRecordingListStatusLabel htmlFor={user?._id}>
                          Available
                        </AdminRecordingListStatusLabel>
                        <AdminRecordingListStatusInput
                          type="radio"
                          value={PUBLIC_STATUS}
                          name={user?._id}
                          id={user?._id}
                          checked={(user.status === APPROVED_STATUS)}
                          onChange={() => onChangeStatus(user?._id, APPROVED_STATUS)}
                        />
                      </TextRight>
                      <TextRight>
                        <AdminRecordingListStatusLabel htmlFor={user?._id}>
                          Block
                        </AdminRecordingListStatusLabel>
                        <AdminRecordingListStatusInput
                          type="radio"
                          value={BLOCK_STATUS}
                          name={user?._id}
                          id={user?._id}
                          checked={(user.status === "block")}
                          onChange={() => onChangeStatus(user?._id, "block")}
                        />
                      </TextRight>
                    </AdminRecordingListStatus>
                  </AdminRecordingList>
                ))
              }
            </AdminScrollContent>
          </AdminRecordingManageWrapper>
        </AdminRecordingManageContent>
      </AdminPageContent>
    </AdminPageWrapper>
  );
});

export default AdminUsersPage;
