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
  SHARED="/shared/:id",
  ADMIN="/admin",
  ADMIN_LOGIN="/admin/login",
  ADMIN_NEW_RECORDINGS="/admin/new-recordings",
  ADMIN_AVAILABLE_RECORDINGS="/admin/available-recordings",
  ADMIN_BLOCKED_RECORDINGS="/admin/blocked-recordings",
  ADMIN_USERS="/admin/users",
  ADMIN_VIDEO="/admin/video/:id/:type",
  ADMIN_HELP="/admin/help",
}

export enum Params {
  CALL_ID="callId",
  RECORDING_ID="recordingId",
}
