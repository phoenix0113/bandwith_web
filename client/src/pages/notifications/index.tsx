import { useState, useContext, useEffect, useMemo } from "react";
import SwipeToDelete from "react-swipe-to-delete-component";
import { observer } from "mobx-react";
import { LogoutOutlined } from "@ant-design/icons";

import { BottomNavigationComponent } from "../../components/BottomNavigation";
import {
  NavigationBar, CenterItem, PageWrapper, RightItem, LeftItem, COLORS,
} from "../../components/styled";
import { InvitationComponent } from "./Invitation";
import { HintComponent } from "../../components/Hint";

import { Notification, NotificationTypes, NotificationUser } from "../../shared/interfaces";
import { GlobalStorageContext } from "../../services/global";

import notificationIcon from "../../assets/images/notifications/icon.svg";

import {
  NotificationPageContent, NotificationBlock, NotificationContent,
  NotificationCircle, ContentBody, ContentHeader,
} from "./styled";
import { Routes } from "../../utils/routes";

const NotificationsPage = observer((): JSX.Element => {
  const {
    notifications, deleteNotification, logout, addContact, checkNotificationsStatus, profile,
  } = useContext(GlobalStorageContext);

  useEffect(() => {
    if (notifications?.length) {
      checkNotificationsStatus();
    }
  }, [notifications]);

  const [invitationViewerId, setViewerInvitationId] = useState<string>(null);
  const [invitationViewerUser, setViewerInvitationUser] = useState<NotificationUser>(null);

  const handleDelete = (notification: Notification) => {
    console.log(`> Notification with id ${notification._id} is about be removed`);
    deleteNotification(notification._id);
  };

  const handleNotificationClick = (notification: Notification) => {
    if (notification.type === NotificationTypes.INVITATION) {
      setViewerInvitationId(notification._id);
      setViewerInvitationUser(notification.user);
    }
  };

  const closeViewer = () => {
    setViewerInvitationId(null);
    setViewerInvitationUser(null);
  };

  const removeNotification = (_id: string) => {
    handleDelete(notifications.find((n) => n._id === _id));
    closeViewer();
  };

  const acceptInvitation = (_id: string, userId: string) => {
    addContact(userId, () => {
      removeNotification(_id);
    });
  };

  if (invitationViewerId && invitationViewerUser) {
    return (
      <InvitationComponent
        _id={invitationViewerId}
        user={invitationViewerUser}
        acceptHandler={acceptInvitation}
        declineHandler={removeNotification}
        closeHandler={closeViewer}
      />
    );
  }

  return (
    <PageWrapper background={COLORS.MAIN_LIGHT}>
      <HintComponent page={Routes.NOTIFICATIONS} />
      <NavigationBar>
        <LeftItem />
        <CenterItem>Notifications</CenterItem>
        <RightItem>
          <LogoutOutlined onClick={logout} />
        </RightItem>
      </NavigationBar>
      <NotificationPageContent>
        {notifications.map((notification, index) => (
          <SwipeToDelete
            key={notification._id}
            item={notification}
            onDelete={() => handleDelete(notification)}
          >
            <NotificationBlock onClick={() => handleNotificationClick(notification)}>
              <NotificationCircle colorIndex={index}>
                <img alt="Logo" src={notificationIcon} />
              </NotificationCircle>
              <NotificationContent>
                <ContentHeader>{notification.header}</ContentHeader>
                <ContentBody>{notification.body}</ContentBody>
              </NotificationContent>
            </NotificationBlock>
          </SwipeToDelete>
        ))}
      </NotificationPageContent>
      <BottomNavigationComponent />
    </PageWrapper>
  );
});

export default NotificationsPage;
