import { useContext } from "react";
import { observer } from "mobx-react";
import { Redirect, Route, RouteComponentProps, useHistory, useLocation } from "react-router-dom";

import { Routes } from "../../utils/routes";

import { GlobalStorageContext, GlobalStorage } from "../../services/global";
import { IncommingCallStorageContext } from "../../services/incommingCall";
import { OutgoingCallStorageContext } from "../../services/outgoingCall";

import { OutgoingCallStatus, IncommingCallStatus } from "../../interfaces/call";
import { GlobalServiceStatus } from "../../interfaces/global";
import { SuspenceFallbackComponent } from "../SuspenceFallback";

interface IProps {
  Component: React.FC<RouteComponentProps>;
  path: string;
  exact?: boolean;
}

interface OnAuthCallback {
  path: string;
  search: string;
}

export const isAuthRoute = (
  path: string,
): boolean => path === Routes.LOGIN || path === Routes.REGISTRATION || path === Routes.WELCOME;

let onAuthCallback: OnAuthCallback = null;

export const PrivateRouterComponent = observer(({ Component, path, exact }: IProps) => {
  const history = useHistory();
  const { search } = useLocation();

  const { token, serviceStatus, avcoreCloudClient, socket } = useContext(GlobalStorageContext);
  const { status: outgoingStatus } = useContext(OutgoingCallStorageContext);
  const { status: incommingStatus } = useContext(IncommingCallStorageContext);

  if (token && (!socket || !avcoreCloudClient)) {
    return <SuspenceFallbackComponent />;
  }

  if (
    serviceStatus === GlobalServiceStatus.AUTHENTICATING) {
    return <SuspenceFallbackComponent />;
  }

  if (!token && !isAuthRoute(path)) {
    onAuthCallback = { search, path };
    return <Redirect to={Routes.WELCOME} />;
  }

  if (GlobalStorage.profile?.role === "admin") {
    onAuthCallback = { search, path };
    return <Redirect to={Routes.ADMIN_LOGIN} />;
  }

  if (token && isAuthRoute(path)) {
    if (onAuthCallback) {
      history.push({
        pathname: onAuthCallback.path,
        search: onAuthCallback.search,
      });
      onAuthCallback = null;
    } else {
      return <Redirect to={Routes.HOME} />;
    }
  }

  if (
    incommingStatus === IncommingCallStatus.INCOMMING
    && path !== Routes.INCOMMING_CALL) {
    return <Redirect to={Routes.INCOMMING_CALL} />;
  }

  if (
    outgoingStatus === OutgoingCallStatus.WAITING_FOR_PARTICIPANT
    && path !== Routes.OUTGOING_CALL
  ) {
    return <Redirect to={Routes.OUTGOING_CALL} />;
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) => <Component {...props} />}
    />
  );
});
