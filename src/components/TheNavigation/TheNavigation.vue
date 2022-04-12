<template>
  <ul>
    <li v-for="(nav, idx) in menu" :key="nav.path + idx" class="btn">
      <AppLink :to="{ name: nav.path }" :ga="`menu_${nav.path}`">
        <span>{{ nav.text }}</span>
        <i v-if="nav.children" class="fas fa-caret-down"></i>
      </AppLink>
      <ul v-if="nav.children" class="sub_menu">
        <li
          v-for="(subNav, subIndex) in nav.children"
          :key="subNav.page + subIndex"
        >
          <AppLink
            :to="`${nav.path}#${subNav.page}`"
            :ga="`menu_${nav.path}-${subNav.page}`"
            @click="$store.dispatch('showMenu', false)"
          >
            <span>{{ subNav.text }}</span>
          </AppLink>
        </li>
      </ul>
    </li>
    <li class="fans">
      <AppLink
        v-for="fan in fansItems"
        :key="fan.name"
        :to="fan.path"
        :ga="`menu_${fan.name}`"
        :class="`fans_${fan.name}`"
      >
      </AppLink>
    </li>
    <li class="btn" id="sign_out" v-if="$store.state.auth.user">
      <AppLink to="false" ga="logout" @click="logout">
        <span>登出</span>
      </AppLink>
    </li>
  </ul>
</template>

<script>
import AppLink from '@/components/AppLink';
import menuSource from '@/utils/menuSource.js';
import { CALPIS_SIGN } from '@/utils/storage';

export default {
  components: { AppLink },
  data() {
    return {
      fansItems: menuSource.fansItems,
    };
  },
  computed: {
    menu() {
      const isAuth = this.$store.state.auth.user;
      return isAuth
        ? menuSource.navItems
        : menuSource.navItems.filter((itm) => !itm.requestAuth);
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('showLoader', true);
      const login_type = this.$store.state.auth.user.login_type;
      switch (login_type) {
        case 'Google':
          return this.googleLogout();
        case 'FB':
          return this.fbLogout();
      }
    },
    clearAuth() {
      this.$store.commit('auth/setUser', null);
      localStorage.removeItem(CALPIS_SIGN);
      sessionStorage.removeItem(CALPIS_SIGN);
      this.$router.go(0);
    },
    googleLogout() {
      const that = this;
      this.$store.state.auth.auth2
        .signOut()
        .then(() => {
          that.clearAuth();
        })
        .catch((err) => {
          console.error('google logout error', err);
          that.$store.dispatch('showLoader', false);
        });
    },
    fbLogout() {
      try {
        window.FB.logout(() => {
          this.clearAuth();
        });
      } catch (error) {
        console.error('fb logout error', error);
        this.$store.dispatch('showLoader', false);
      }
    },
  },
};
</script>

<style lang="scss">
@import './TheNavigation.scss';
</style>
