export const conf = {
  frontendPath: '../client/build',
  port: 80,
  mongoURI: 'mongodb://bandwith-mongodb:27017/bandwith',
  firebaseDatabase: 'https://teleport-384a0.firebaseio.com',
  auth: {
    secret: getEnvStr('JWT_SECRET'),
    algorithm: 'HS512',
    succeedWithoutToken: true,
  },
  cloud: {
    token:
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRJZCI6IjVmOGQ1NWJhYjBjYTQ1ZTlmZjI0ZjYzNiIsImlhdCI6MTYwMzEwMTM3OH0.-YaT6M42HFG2IsCv2vau0yGISQuRlzvlEdE-LI4ZyXQwgFXG3zzioCSdZIC0X5gH2muz9yUYQuflJakI-NcQzw',
    url: 'https://mesh-admin.codeda.com',
  },
  oauth: {
    google: {
      client_id: getEnvStr('GOOGLE_CLIENT_ID'),
      client_secret: getEnvStr('GOOGLE_CLIENT_SECRET'),
      ios_client_id: getEnvStr('GOOGLE_CLIENT_ID_IOS'),
      ios_client_secret: getEnvStr('GOOGLE_CLIENT_SECRET_IOS'),
    },
    facebook: {
      client_id: getEnvStr('FACEBOOK_CLIENT_ID'),
      user_data_url: 'https://graph.facebook.com/v9.0',
    },
    unsetField: 'unset',
  },
  publishTimeOut: 60000,
  storage: {
    bucket: getEnvStr('STORAGE_BUCKET'),
    key: getEnvStr('STORAGE_KEY'),
    secret: getEnvStr('STORAGE_SECRET'),
    endpoint: getEnvStr('STORAGE_ENDPOINT'),
  },
  ffmpeg: {
    path: 'ffmpeg',
    recordCutTime: '00:00:05.500',
  },
  callDisconnectTimeout: getEnvStr('CALL_DISCONNECT_TIMEOUT_SECONDS'),
  iosNotifications: {
    keyId: '3326Z4266X',
    teamId: '6TT7A7VZ6Y',
    bundleId: 'org.reactjs.native.example.DoejoBandwwithLLC',
    production: getEnvStr('APN_ENVIRONMENT_PRODUCTION'),
  },
  phoneVerification: {
    apiKey: getEnvStr('NEXMO_API_KEY'),
    apiSecret: getEnvStr('NEXMO_API_SECRET'),
    code_length: 4,
  },
};

function getEnvStr(key: string, _default?: string): string {
  const s = process.env[key];
  if (!s) {
    if (_default || _default === '') {
      return _default;
    } else {
      throw `env ${key} is required`;
    }
  } else {
    return s;
  }
}

export function parseQuery(query, fn?: (val: string) => number | string) {
  return Object.keys(query).reduce((map, key) => {
    const value = query[key];
    if (value) {
      const val = value.toString();
      map[key] = fn ? fn(val) : val;
    }
    return map;
  }, {});
}
