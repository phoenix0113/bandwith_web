import { notification } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { COLORS } from "../components/styled";

export const showErrorNotification = (message: string, duration?: number): void => {
  notification.open({
    message: "Error",
    description: message,
    duration: duration || 4.5,
    icon: <InfoCircleOutlined style={{ color: COLORS.RED }} />,
  });
};

export const showInfoNotification = (message: string, duration?: number): void => {
  notification.open({
    message,
    duration: duration || 3.5,
    icon: <InfoCircleOutlined style={{ color: COLORS.ALTERNATIVE }} />,
  });
};
