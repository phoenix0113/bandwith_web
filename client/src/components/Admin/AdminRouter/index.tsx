import { useContext } from "react";
import { observer } from "mobx-react";
import { Redirect, Route, RouteComponentProps, useHistory, useLocation } from "react-router-dom";
import { Routes } from "../../../utils/routes";
import { GlobalStorage, GlobalStorageContext } from "../../../services/global";
import { GlobalServiceStatus } from "../../../interfaces/global";
import { SuspenceFallbackComponent } from "../../SuspenceFallback";

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
): boolean => path === Routes.ADMIN_LOGIN;

let onAuthCallback: OnAuthCallback = null;

export const AdminRouterComponent = observer(({ Component, path, exact }: IProps) => {
  const history = useHistory();
  const { search } = useLocation();

  const { token, serviceStatus, avcoreCloudClient, socket } = useContext(GlobalStorageContext);

  if (token && (!socket || !avcoreCloudClient)) {
    return <SuspenceFallbackComponent />;
  }

  if (
    serviceStatus === GlobalServiceStatus.AUTHENTICATING) {
    return <SuspenceFallbackComponent />;
  }

  if (!token && !isAuthRoute(path)) {
    onAuthCallback = { search, path };
    return <Redirect to={Routes.ADMIN_LOGIN} />;
  }

  if (GlobalStorage.profile?.role === "user") {
    onAuthCallback = { search, path };
    return <Redirect to={Routes.WELCOME} />;
  }

  if (token && isAuthRoute(path)) {
    if (onAuthCallback) {
      history.push({
        pathname: onAuthCallback.path,
        search: onAuthCallback.search,
      });
      onAuthCallback = null;
    } else {
      return <Redirect to={Routes.ADMIN_DASHBOARD} />;
    }
  }

  return (
    <Route
      exact={exact}
      path={path}
      render={(props: RouteComponentProps) => <Component {...props} />}
    />
  );
});
