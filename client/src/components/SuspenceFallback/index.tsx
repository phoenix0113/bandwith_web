import { Spin } from "antd";
import { SuspenceWrapper } from "./styled";

import { LoaderWrapper } from "../styled";

export const SuspenceFallbackComponent = (): JSX.Element => (
  <SuspenceWrapper>
    <LoaderWrapper>
      <Spin size="large" />
    </LoaderWrapper>
  </SuspenceWrapper>
);
