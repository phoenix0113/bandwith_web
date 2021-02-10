import { useContext } from "react";
import { observer } from "mobx-react";
import { Spin } from "antd";

import { GlobalStorageContext } from "../../services/global";

import { Wrapper } from "./styled";
import { LoaderWrapper } from "../styled";
import { GlobalServiceStatus } from "../../interfaces/global";

interface IProps {
  children: React.ReactNode;
}

export const AppWrapper = observer(({ children }: IProps): JSX.Element => {
  const { action, serviceStatus } = useContext(GlobalStorageContext);

  return (
    <Wrapper>
      {(action === "pending" || serviceStatus === GlobalServiceStatus.AUTHENTICATING) && (
        <LoaderWrapper>
          <Spin size="large" />
        </LoaderWrapper>
      )}
      {children}
    </Wrapper>
  );
});
