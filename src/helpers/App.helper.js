import { CALPIS_SIGN } from '@/utils/storage';

export default {
  isOldTestStation(host) {
    return host === 'calpistw.mg.megais.com';
  },

  isOldOfficialStation(host) {
    return host === 'calpistw.com.tw' || host === 'www.calpistw.com.tw';
  },

  redirectNewTestStation(pathname, hash) {
    window.location.href = `https://asahisoftdrinks.mg.megais.com${pathname}${hash}`;
  },

  redirectNewOfficialStation(pathname, hash) {
    window.location.href = `https://asahisoftdrinks.com.tw${pathname}${hash}`;
  },

  isWebInAppBrowser(device) {
    return device.fbapp || device.line || device.instagram ? true : false;
  },

  getGoogleAuthConfig() {
    return {
      client_id: process.env.VUE_APP_GOOGLE_ID,
      cookie_policy: 'single_host_origin',
      ux_mode: 'popup',
    };
  },

  getFacebookAuthConfig() {
    return {
      appId: process.env.VUE_APP_FACEBOOK_ID,
      cookie: true,
      xfbml: true,
      version: 'v12.0',
    };
  },

  removeStorageAuthData() {
    window.localStorage.removeItem(CALPIS_SIGN);
    window.sessionStorage.removeItem(CALPIS_SIGN);
  },
};
