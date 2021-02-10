import { observer } from "mobx-react";
import { useContext, useMemo } from "react";
import { Badge } from "antd";
import { useHistory, useLocation } from "react-router-dom";
import { ReactComponent as NotificationIcon } from "../../../assets/images/home/notification.svg";

import { Routes } from "../../../utils/routes";
import { BottomNavItem } from "../styled";
import { COLORS } from "../../styled";

import { GlobalStorageContext } from "../../../services/global";

export const WithBadgeNotificationRoute = observer((): JSX.Element => {
  const history = useHistory();
  const { pathname } = useLocation();

  const { notifications } = useContext(GlobalStorageContext);

  const unreadNotificationsLength = useMemo(
    () => notifications.filter((n) => !n.read).length,
    [notifications],
  );

  return (
    <BottomNavItem>
      {unreadNotificationsLength > 0
        ? (
          <Badge count={unreadNotificationsLength} style={{ backgroundColor: COLORS.RED }}>
            <NotificationIcon
              fill={pathname === Routes.NOTIFICATIONS ? COLORS.ALTERNATIVE : COLORS.WHITE}
              onClick={() => history.push(Routes.NOTIFICATIONS)}
            />
          </Badge>
        ) : (
          <NotificationIcon
            fill={pathname === Routes.NOTIFICATIONS ? COLORS.ALTERNATIVE : COLORS.WHITE}
            onClick={() => history.push(Routes.NOTIFICATIONS)}
          />
        )}
    </BottomNavItem>
  );
});
