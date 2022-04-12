import { getBrowserVersion } from '@/utils';
import { CALPIS_SIGN } from '@/utils/storage';

export default {
  namespaced: true,

  state: {
    user: null,
    fbInit: false,
    googleInit: false,
    auth2: null,
  },

  getters: {
    username(state) {
      return state.user ? state.user.login_name : 'loading...';
    },
  },

  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setFBInit(state) {
      state.fbInit = true;
    },
    setGoogleInit(state) {
      state.googleInit = true;
    },
    setAuth2(state, auth2) {
      state.auth2 = auth2;
    },
  },

  actions: {
    setFBAuth({ commit, dispatch }, auth) {
      window.FB.api('/me', async (res) => {
        if (!res || res.error) {
          console.log('fb api me error', res.error);
          return dispatch('showLoader', false, { root: true });
        }
        const userAuth = {
          login_type: 'FB',
          login_id: res.id,
          login_name: res.name,
          login_token: auth.data.authResponse.accessToken,
          device: getBrowserVersion().versions.mobile ? 'm' : 'pc',
        };
        commit('setUser', userAuth);
        localStorage.setItem(CALPIS_SIGN, true);
        sessionStorage.setItem(CALPIS_SIGN, true);
        if (auth.login) {
          await dispatch('user/addUser', userAuth, { root: true });
        }
        dispatch('user/getUserData', userAuth, { root: true });
      });
    },

    async setGoogleAuth({ commit, dispatch }, auth) {
      const user = auth.data.getBasicProfile();
      const userAuth = {
        login_type: 'Google',
        login_id: user.getId(),
        login_name: user.getName(),
        login_token: auth.data.getAuthResponse().id_token,
        device: getBrowserVersion().versions.mobile ? 'm' : 'pc',
      };
      commit('setUser', userAuth);
      localStorage.setItem(CALPIS_SIGN, true);
      sessionStorage.setItem(CALPIS_SIGN, true);
      if (auth.login) {
        await dispatch('user/addUser', userAuth, { root: true });
      }
      dispatch('user/getUserData', userAuth, { root: true });
    },
  },
};
