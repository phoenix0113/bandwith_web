import { useLocation, useHistory } from "react-router-dom";

import { ReactComponent as HomeIcon } from "../../assets/images/home/home.svg";
import { ReactComponent as FeedIcon } from "../../assets/images/home/feed.svg";
import { ReactComponent as FriendsIcon } from "../../assets/images/home/friends.svg";

import { BottomNavigation, BottomNavItem } from "./styled";
import { Routes } from "../../utils/routes";

import { WithBadgeNotificationRoute } from "./WithBadgeNotificationRoute";

import { COLORS } from "../styled";

export const BottomNavigationComponent = (): JSX.Element => {
  const { pathname } = useLocation();
  const history = useHistory();

  return (
    <BottomNavigation>
      <BottomNavItem>
        <HomeIcon
          fill={pathname === Routes.HOME ? COLORS.ALTERNATIVE : COLORS.WHITE}
          onClick={() => history.push(Routes.HOME)}
        />
      </BottomNavItem>
      <BottomNavItem>
        <FeedIcon
          fill={pathname === Routes.FEED ? COLORS.ALTERNATIVE : COLORS.WHITE}
          onClick={() => history.push(Routes.FEED)}
        />
      </BottomNavItem>
      <BottomNavItem>
        <WithBadgeNotificationRoute />
      </BottomNavItem>
      <BottomNavItem>
        <FriendsIcon
          fill={pathname === Routes.CONTACT_LIST ? COLORS.ALTERNATIVE : COLORS.WHITE}
          onClick={() => history.push(Routes.CONTACT_LIST)}
        />
      </BottomNavItem>
    </BottomNavigation>
  );
};
