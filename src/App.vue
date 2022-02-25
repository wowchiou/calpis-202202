<template>
  <div class="page">
    <TheHeader v-if="!$store.state.comingSoon" />

    <!-- <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="$route.path"></component>
      </transition>
    </router-view> -->
    <router-view></router-view>

    <teleport to="#portal-loading">
      <AppLoader v-if="$store.state.loader" />
    </teleport>

    <teleport to="#portal-popup">
      <BrowserBlocker v-if="$store.state.modal === 'browserBlocker'" />
    </teleport>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader';
import Modals from '@/components/Modals';
import AppLoader from '@/components/AppLoader';
import { getBrowserVersion, isWebInApp } from '@/utils';
import { fbConfig, googleConfig } from '@/utils/auth-config.js';
import { CALPIS_SIGN } from '@/utils/storage';
import { getTime } from '@/api';

export default {
  components: {
    TheHeader,
    BrowserBlocker: Modals.BrowserBlockerModal,
    AppLoader,
  },
  async beforeCreate() {
    // 取得活動時間狀態
    const timeData = await getTime();
    if (timeData.result) {
      if (timeData.msg_type === '00') {
        this.$store.commit('setComingSoon');
        return this.$router.replace({ name: 'coming-soon' });
      }
      alert(timeData.msg);
    }
  },
  async created() {
    // 偵測網址是否正確
    const location = window.location;
    if (location.host === 'calpistw.mg.megais.com') {
      location.href = `https://asahisoftdrinks.mg.megais.com${location.pathname}${location.hash}`;
    }
    if (
      location.host === 'calpistw.com.tw' ||
      location.host === 'www.calpistw.com.tw'
    ) {
      location.href = `https://asahisoftdrinks.com.tw${location.pathname}${location.hash}`;
    }
    // 偵測網頁是否由fb、line、ig的內建瀏覽器開啟
    if (isWebInApp(getBrowserVersion().versions)) {
      this.$store.dispatch('showModal', 'browserBlocker');
    }
    // 網頁resize畫面大於1200px自動關閉menu
    window.matchMedia('(max-width: 1200px)').addListener((e) => {
      if (!e.matches) {
        this.$store.dispatch('showMenu', false);
      }
    });
  },
  methods: {
    initGoogleAuth() {
      const that = this;
      window.gapi.load('auth2', function () {
        window.gapi.auth2.init(googleConfig).then(
          () => {
            that.$store.commit('auth/setGoogleInit');
            that.checkGoogleStatus();
          },
          (err) => {
            console.log(err);
            that.$store.dispatch('showLoader', false);
          }
        );
      });
    },
    checkGoogleStatus() {
      const auth2 = window.gapi.auth2.getAuthInstance();
      this.$store.commit('auth/setAuth2', auth2);
      const googleSignIn = auth2.isSignedIn.get();
      if (googleSignIn) {
        const googleUser = auth2.currentUser.get();
        return this.$store.dispatch('auth/setGoogleAuth', { data: googleUser });
      }
      localStorage.removeItem(CALPIS_SIGN);
      sessionStorage.removeItem(CALPIS_SIGN);
      this.$store.dispatch('showLoader', false);
    },
  },
  async mounted() {
    const that = this;
    window.fbAsyncInit = function () {
      const FB = window.FB;
      FB.init(fbConfig);
      FB.AppEvents.logPageView();
      that.$store.commit('auth/setFBInit');
      FB.getLoginStatus((res) => {
        if (res.status === 'connected') {
          return that.$store.dispatch('auth/setFBAuth', { data: res });
        }
        that.initGoogleAuth();
      });
    };
  },
};
</script>
