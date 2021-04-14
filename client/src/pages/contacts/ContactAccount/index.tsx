import {
  CommonButton, NavigationBar, LeftItem, CenterItem, RightItem, PageWrapper,
  CommonPageContentWrapper, CommonContentTitle, CommonContentWrapper, COLORS,
} from "../../../components/styled";
import { ProfileImageWrapper } from "../../../components/ProfileImageWrapper";
import { UserStatus } from "../../../shared/socket";

interface IProps {
  _id: string;
  name: string;
  imageUrl: string;
  status: UserStatus;
  deleteHandler: (id: string) => void;
  callHandler: (id: string) => void;
  closeHandler: () => void;
}

export const ContactAccountComponent = (
  { name, imageUrl, _id, deleteHandler, callHandler, closeHandler, status }: IProps,
): JSX.Element => (
  <PageWrapper>
    <NavigationBar>
      <LeftItem />
      <CenterItem>Contact Account</CenterItem>
      <RightItem color={COLORS.ALTERNATIVE} onClick={closeHandler}>Cancel</RightItem>
    </NavigationBar>
    <CommonPageContentWrapper>
      <ProfileImageWrapper src={imageUrl} />
      <CommonContentWrapper>
        <CommonContentTitle>{name}</CommonContentTitle>
        <CommonButton
          margin="5% 0 20px 0"
          onClick={() => callHandler(_id)}
          backgroundColor={COLORS.MAIN_LIGHT}
          color={COLORS.WHITE}
        >
          Make a Call
        </CommonButton>
        <CommonButton
          margin={status === "online" ? "0 0 20px 0" : "5% 0 20px 0"}
          onClick={() => deleteHandler(_id)}
          backgroundColor={COLORS.MAIN_LIGHT}
          color={COLORS.RED}
        >
          Delete
        </CommonButton>
      </CommonContentWrapper>
    </CommonPageContentWrapper>
  </PageWrapper>
);
