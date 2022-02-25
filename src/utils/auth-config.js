export const fbConfig = {
  appId: process.env.VUE_APP_FACEBOOK_ID,
  cookie: true,
  xfbml: true,
  version: 'v12.0',
};

export const googleConfig = {
  client_id: process.env.VUE_APP_GOOGLE_ID,
  cookie_policy: 'single_host_origin',
  ux_mode: 'popup',
};
