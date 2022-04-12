import { createStore } from 'vuex';
import { StopBodyScroll } from '@/utils';
import { getTime, getAwardsData } from '@/api';

import auth from './modules/auth';
import user from './modules/user';

const stopBodyScroll = new StopBodyScroll();

export default createStore({
  modules: { auth, user },

  state: {
    menu: false,
    modal: '',
    loader: true,
    shortagePrizes: null,
    comingSoon: false,
  },

  mutations: {
    setMenu(state, active) {
      state.menu = active;
    },
    setModal(state, modal) {
      state.modal = modal;
    },
    setLoader(state, loading) {
      state.loader = loading;
    },
    setShortagePrizes(state, prizes) {
      state.shortagePrizes = prizes;
    },
    setComingSoon(state) {
      state.comingSoon = true;
    },
  },

  actions: {
    bodyScroller(context, active) {
      if (!active) {
        return stopBodyScroll.scrollBody();
      }
      stopBodyScroll.fixedBody();
    },

    showMenu({ dispatch, commit }, active) {
      commit('setMenu', active);
      dispatch('bodyScroller', active);
    },

    showModal({ dispatch, commit }, modal) {
      commit('setModal', modal);
      dispatch('bodyScroller', modal);
    },

    showLoader({ dispatch, commit }, loading) {
      commit('setLoader', loading);
      dispatch('bodyScroller', loading);
    },

    gaTracking(context, ga) {
      window.gtag('event', ga, {
        event_category: ga,
        event_label: 'Google',
        event_value: 'click',
      });
    },

    async getActivityTime() {
      const timeData = await getTime();
      if (timeData.result) {
        alert(timeData.msg);
      }
    },

    async getAwardsData() {
      const awardsData = await getAwardsData();
      if (!awardsData.result) return alert(awardsData.msg);
      return awardsData;
    },
  },
});
