import {
  CommonButton, NavigationBar, LeftItem, CenterItem, RightItem,
  PageWrapper, CommonPageContentWrapper, CommonContentDescription,
  CommonContentTitle, CommonContentWrapper, COLORS,
} from "../../../components/styled";
import { ProfileImageWrapper } from "../../../components/ProfileImageWrapper";

import { NotificationUser } from "../../../shared/interfaces";

interface IProps {
  _id: string;
  closeHandler: () => void;
  acceptHandler: (_id: string, userId: string) => void;
  declineHandler: (_id: string) => void;
  user: NotificationUser;
}

export const InvitationComponent = (
  { _id, closeHandler, acceptHandler, declineHandler, user }: IProps,
): JSX.Element => (
  <PageWrapper>
    <NavigationBar>
      <LeftItem />
      <CenterItem>Add to Friends?</CenterItem>
      <RightItem color={COLORS.ALTERNATIVE} onClick={closeHandler}>Cancel</RightItem>
    </NavigationBar>
    <CommonPageContentWrapper>
      <ProfileImageWrapper src={user.imageUrl} />
      <CommonContentWrapper>
        <CommonContentTitle>{user.name}</CommonContentTitle>
        <CommonContentDescription>
          Sent you a friend request
        </CommonContentDescription>
        <CommonButton
          margin="5% 0 20px 0"
          onClick={() => acceptHandler(_id, user._id)}
          backgroundColor={COLORS.MAIN_LIGHT}
          color={COLORS.WHITE}
        >
          Accept
        </CommonButton>
        <CommonButton
          margin="0 0 20px 0"
          onClick={() => declineHandler(_id)}
          backgroundColor={COLORS.MAIN_LIGHT}
          color={COLORS.WHITE}
        >
          Decline
        </CommonButton>
      </CommonContentWrapper>
    </CommonPageContentWrapper>
  </PageWrapper>
);
