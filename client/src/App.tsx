import { Suspense, lazy, useContext, useRef, useState } from "react";
import { Switch, useLocation, Route } from "react-router-dom";
import { Utils } from "avcore/client";
import { observer } from "mobx-react";

import { PrivateRouterComponent as ProtectedRoute, isAuthRoute } from "./components/PrivateRouter";
import { AdminRouterComponent } from "./components/Admin/AdminRouter";
import { AppWrapper } from "./components/AppWrapper";
import { SuspenceFallbackComponent } from "./components/SuspenceFallback";
import { DisclaimerComponent } from "./components/Disclaimer";

import ringtone from "./assets/audio/ringtone.mp3";

/**
 * Initializing services
 */
import { GlobalStorageContext } from "./services/global";
import "./services/incommingCall";
import "./services/outgoingCall";
import "./services/logger";

import { Routes } from "./utils/routes";

const WelcomePage = lazy(() => import("./pages/welcome"));
const RegistrationPage = lazy(() => import("./pages/registration"));
const LoginPage = lazy(() => import("./pages/login"));
const HomePage = lazy(() => import("./pages/home"));
const IncommingCallPage = lazy(() => import("./pages/call/incomming"));
const OutgoingCallPage = lazy(() => import("./pages/call/outgoing"));
const LiveCallPage = lazy(() => import("./pages/call/live"));
const NotificationPage = lazy(() => import("./pages/notifications"));
const ContactListPage = lazy(() => import("./pages/contacts"));
const FeedPage = lazy(() => import("./pages/feed"));
const SharedPage = lazy(() => import("./pages/shared"));
const AdminLoginPage = lazy(() => import("./pages/admin/login"));
const AdminNewRecordingsPage = lazy(() => import("./pages/admin/new-recordings"));
// const AdminAvailableRecordingsPage = lazy(() => import("./pages/admin/available-recordings"));
// const AdminBlockedRecordingsPage = lazy(() => import("./pages/admin/blocked-recordings"));
const AdminRecordingPage = lazy(() => import("./pages/admin/video"));
const AdminUsersPage = lazy(() => import("./pages/admin/users"));
const AdminHelpPage = lazy(() => import("./pages/admin/help"));
// const AdminRecordingPage = lazy(() => import("./pages/admin/video"));
// const AdminSingleVideoPage = lazy(() => import("./pages/admin/single"));
// const AdminManagePage = lazy(() => import("./pages/admin/manage"));
// const AdminUsersPage = lazy(() => import("./pages/admin/users"));

export const App = observer((): JSX.Element => {
  const { pathname } = useLocation();
  const safariAudioPlayer = useRef<HTMLAudioElement>(null);

  const { setSafariPlayer } = useContext(GlobalStorageContext);

  const [appActivated, setAppActivated] = useState(false);
  const clickHandler = () => {
    setAppActivated(true);
    safariAudioPlayer.current.play();
    setSafariPlayer(safariAudioPlayer.current);
  };

  return (
    <AppWrapper>
      <audio ref={safariAudioPlayer} src={ringtone} muted />
      {!appActivated && !isAuthRoute(pathname) && Utils.isSafari && (
        <DisclaimerComponent clickHandler={clickHandler} />
      )}

      <Suspense fallback={<SuspenceFallbackComponent />}>
        <Switch>
          <ProtectedRoute exact path={Routes.WELCOME} Component={WelcomePage} />
          <ProtectedRoute exact path={Routes.LOGIN} Component={LoginPage} />
          <ProtectedRoute exact path={Routes.REGISTRATION} Component={RegistrationPage} />
          <ProtectedRoute exact path={Routes.HOME} Component={HomePage} />
          <ProtectedRoute exact path={Routes.INCOMMING_CALL} Component={IncommingCallPage} />
          <ProtectedRoute exact path={Routes.OUTGOING_CALL} Component={OutgoingCallPage} />
          <ProtectedRoute exact path={Routes.LIVE_CALL} Component={LiveCallPage} />
          <ProtectedRoute exact path={Routes.NOTIFICATIONS} Component={NotificationPage} />
          <ProtectedRoute exact path={Routes.CONTACT_LIST} Component={ContactListPage} />
          <ProtectedRoute exact path={Routes.FEED} Component={FeedPage} />
          <Route exact path={Routes.SHARED} component={SharedPage} />
          <AdminRouterComponent exact path={Routes.ADMIN_LOGIN} Component={AdminLoginPage} />
          <AdminRouterComponent
            exact
            path={Routes.ADMIN_NEW_RECORDINGS}
            Component={AdminNewRecordingsPage}
          />
          <AdminRouterComponent exact path={Routes.ADMIN_VIDEO} Component={AdminRecordingPage} />
          <AdminRouterComponent
            exact
            path={Routes.ADMIN_AVAILABLE_RECORDINGS}
            Component={AdminUsersPage}
          />
          <AdminRouterComponent
            exact
            path={Routes.ADMIN_BLOCKED_RECORDINGS}
            Component={AdminUsersPage}
          />
          <AdminRouterComponent exact path={Routes.ADMIN_USERS} Component={AdminUsersPage} />
          <AdminRouterComponent exact path={Routes.ADMIN_HELP} Component={AdminHelpPage} />
        </Switch>
      </Suspense>
    </AppWrapper>
  );
});
