export const PATH = {
  API: "api",
  OAUTH: "oauth",
  FACEBOOK: "facebook",
  GOOGLE: "google",
  CREDS: "creds",
  LOGIN: "login",
  REGISTRATION: "registration",
  API_DOCS: "api-docs",
  FIREBASE: "firebase",
  SUBSCRIBE: "subscribe",
  PUSH: "push",
  USER: "user",
  USER_VERIFICATION: "user-v",
  PROFILE: "profile",
  AUTH: "auth",
  CONTACTS: "contacts",
  NOTIFICATIONS: "notifications",
  CHECK: "check",
  COMMENTS: "comments",
  HINTS: "hints",
  RECORD: "record",
  PUBLISH: "publish",
  REC_COMMENTS: "rec-comments",
  LOGS: "logs",
  SERVER_SIDE: "serverSide",
  SEND_SMS: "sendSms",
  VERIFY_CODE: "verifyCode",
  PHONE: "phone",
  IMPORT: "contactsImport",
};

export const API = {
  OAUTH_FACEBOOK: `${PATH.API}/${PATH.OAUTH}/${PATH.FACEBOOK}`,
  OAUTH_GOOGLE: `${PATH.API}/${PATH.OAUTH}/${PATH.GOOGLE}`,
  OAUTH_CREDS: `${PATH.API}/${PATH.OAUTH}/${PATH.CREDS}`,
  LOGIN: `${PATH.API}/${PATH.LOGIN}`,
  REGISTRATION: `${PATH.API}/${PATH.REGISTRATION}`,
  SUBSCRIBE_TO_FIREBASE_PUSHES: `${PATH.API}/${PATH.FIREBASE}/${PATH.SUBSCRIBE}`,
  SEND_FIREBASE_PUSH: `${PATH.API}/${PATH.FIREBASE}/${PATH.PUSH}`,
  USER: `${PATH.API}/${PATH.USER}`,
  USER_HINTS: `${PATH.API}/${PATH.USER}/${PATH.HINTS}`,
  USER_PROFILE: `${PATH.API}/${PATH.PROFILE}`,
  AVCORE_CREDS: `${PATH.AUTH}`,
  USER_CONTACTS: `${PATH.API}/${PATH.CONTACTS}`,
  NOTIFICATIONS: `${PATH.API}/${PATH.NOTIFICATIONS}`,
  CHECK_NOTIFICATIONS: `${PATH.API}/${PATH.NOTIFICATIONS}/${PATH.CHECK}`,
  COMMENTS: `${PATH.API}/${PATH.COMMENTS}`,
  RECORDING_COMMENTS: `${PATH.API}/${PATH.COMMENTS}/${PATH.REC_COMMENTS}`,
  RECORD: `${PATH.API}/${PATH.RECORD}`,
  RECORD_PUBLISH: `${PATH.API}/${PATH.RECORD}/${PATH.PUBLISH}`,
  SEND_LOGS: `${PATH.API}/${PATH.LOGS}`,
  LOG_ON_SERVER: `${PATH.API}/${PATH.LOGS}/${PATH.SERVER_SIDE}`,
  SEND_SMS: `${PATH.API}/${PATH.USER}/${PATH.SEND_SMS}`,
  VERIFY_CODE: `${PATH.API}/${PATH.USER}/${PATH.VERIFY_CODE}`,
  UPDATE_PHONE: `${PATH.API}/${PATH.USER}/${PATH.PHONE}`,
  IMPORT_CONTACTS: `${PATH.API}/${PATH.CONTACTS}/${PATH.IMPORT}`,
};
