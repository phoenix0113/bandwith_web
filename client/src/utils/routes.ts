export enum Routes {
  WELCOME="/",
  LOGIN="/login",
  REGISTRATION="/registration",
  HOME="/home",
  NOTIFICATIONS="/notifications",
  CONTACT_LIST="/contacts",
  INCOMMING_CALL="/call/incomming",
  OUTGOING_CALL="/call/outgoing",
  LIVE_CALL="/call/live",
  FEED="/feed",
  ADMIN="/admin",
  ADMIN_LOGIN="/admin/login",
  ADMIN_HELP="/admin/help",
  ADMIN_DASHBOARD="/admin/dashboard",
  ADMIN_VIDEO="/admin/video",
  ADMIN_USERS="/admin/users",
  ADMIN_VIDEOS="/admin/manage",
  ADMIN_SINGLE_VIDEO="/admin/video/:id/:type",
}

export enum Params {
  CALL_ID="callId",
  RECORDING_ID="recordingId",
}
