export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
export const FACEBOOK_CLIENT_ID = process.env.REACT_APP_FACEBOOK_CLIENT_ID as string;

// const { origin } = window.location;
// export const SERVER_BASE_URL = origin.includes("localhost") ? "http://localhost:1380" : origin;
export const SERVER_BASE_URL = "https://teleport-dev.codeda.com";
// export const SERVER_BASE_URL = "https://teleport.wtf";
// export const SERVER_BASE_URL = "http://127.0.0.1:1380";

console.log(`> Using ${SERVER_BASE_URL} server`);

export const COMMENTS_LOAD_LIMIT = 20;

export const RECORDINGS_LOAD_LIMIT = 5;

export const LOAD_MORE_RECORDINGS_THRESHOLD = 3;

export const SEND_LOGS_THRESHOLD = 5;

export const OUTGOING_CALL_SECONDS = 15;

export const NAVIGATOR_SHARE_ERROR = "Your browser doesn't support Social Share";
