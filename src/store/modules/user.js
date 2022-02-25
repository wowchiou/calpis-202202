import { postAddUser, getUserData } from '@/api';

export default {
  namespaced: true,

  state: {
    info: {},
  },

  getters: {
    serialList(state) {
      return state.info.serial_list || null;
    },
    exchangeList(state) {
      return state.info.exchange_list || null;
    },
    points(state) {
      return state.info.user_points || 0;
    },
    lastPoints(state) {
      return state.info.user_last_points || 0;
    },
    usedPoints(state) {
      return state.info.user_used_points || 0;
    },
    formName(state) {
      return state.info.form_name || '';
    },
    formEmail(state) {
      return state.info.form_email || '';
    },
    formAddress(state) {
      return state.info.form_address || '';
    },
    formPhone(state) {
      return state.info.form_phone || '';
    },
  },

  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    setSerialInfo(state, info) {
      state.info = {
        ...state.info,
        serial_list: info.serial_list,
        user_points: info.user_points,
        user_last_points: info.user_last_points,
        user_used_points: info.user_used_points,
      };
    },
    setExchangeInfo(state, info) {
      state.info = {
        ...state.info,
        exchange_list: info.exchange_list,
        user_points: info.user_points,
        user_last_points: info.user_last_points,
        user_used_points: info.user_used_points,
      };
    },
    setCommunicateForm(state, form) {
      state.info = {
        ...state.info,
        ...form,
      };
    },
  },

  actions: {
    async addUser(context, data) {
      const userData = await postAddUser(data);
      if (!userData.result) console.log(userData);
    },

    async getUserData({ commit, dispatch }, user) {
      const userData = await getUserData(user);
      if (!userData.result) return console.log(userData.msg);
      commit('setInfo', userData);
      dispatch('showLoader', false, { root: true });
      return true;
    },
  },
};
