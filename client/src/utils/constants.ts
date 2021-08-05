export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
export const FACEBOOK_CLIENT_ID = process.env.REACT_APP_FACEBOOK_CLIENT_ID as string;

const servers = {
  DEV_URL: "https://bandwith.codeda.com",
  PROD_URL: "https://app.bandwwith.com",
  LOCAL_DOCKER_URL: "http://localhost:1380",
};

const { origin } = window.location;
export const SERVER_BASE_URL = origin.includes("localhost") ? servers.DEV_URL : origin;

console.log(`> Using ${SERVER_BASE_URL} server`);

export const COMMENTS_LOAD_LIMIT = 20;

export const RECORDINGS_LOAD_LIMIT = 11;

export const LOAD_MORE_RECORDINGS_THRESHOLD = 3;

export const SEND_LOGS_THRESHOLD = 5;

export const OUTGOING_CALL_SECONDS = 30;

export const NAVIGATOR_SHARE_ERROR = "Your browser doesn't support Social Share";

export const ADMIN_RECORDINGS_LOAD_LIMIT = 12;

export const PUBLIC_STATUS = "public";

export const FEATURE_STATUS = "feature";

export const BLOCK_STATUS = "block";

export const APPROVED_STATUS = "approved";

export const INVITED_STATUS = "invited";
