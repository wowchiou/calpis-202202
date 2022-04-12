<template>
  <DefaultLayout class="home">
    <section class="kv">
      <div class="wrap">
        <div class="banner">
          <div :class="{ active: !$store.state.auth.user }" class="login">
            <div class="login_btns">
              <a
                :class="{ active: $store.state.auth.fbInit }"
                id="fb_login"
                href="javascript:;"
                @click="fbLogin"
              ></a>
              <a
                :class="{ active: $store.state.auth.auth2 }"
                id="google_login"
                href="javascript:;"
                @click="$store.dispatch('gaTracking', 'google-login')"
              ></a>
            </div>
            <div class="login_text"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="prize">
      <div class="wrap">
        <ContentLoader v-if="!prizes" />
        <PrizeSlider v-else :prizes="prizes" />
      </div>
    </section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout';
import PrizeSlider from '@/components/PrizeSlider';
import ContentLoader from '@/components/ContentLoader';

import { getAwardsData } from '@/api';

export default {
  components: { DefaultLayout, PrizeSlider, ContentLoader },
  data() {
    return {
      prizes: null,
    };
  },
  computed: {
    isAuth2() {
      return this.$store.state.auth.auth2;
    },
  },
  watch: {
    isAuth2(val) {
      if (!val) return;
      this.renderGoogleAuthButton();
    },
  },
  methods: {
    closeLoader() {
      this.$store.dispatch('showLoader', false);
    },

    fbLogin() {
      this.$store.dispatch('gaTracking', 'fb-login');
      if (!this.$store.state.auth.fbInit) return;
      this.$store.dispatch('showLoader', true);
      window.FB.login(async (res) => {
        if (res.status !== 'connected') return this.closeLoader();
        this.$store.dispatch('auth/setFBAuth', { data: res, login: true });
      });
    },

    renderGoogleAuthButton() {
      const store = this.$store;
      store.state.auth.auth2.attachClickHandler(
        document.querySelector('#google_login'),
        {},
        successLoginGoogle,
        failLoginGoogle
      );

      function successLoginGoogle(data) {
        store.dispatch('auth/setGoogleAuth', { data, login: true });
      }

      function failLoginGoogle(err) {
        console.log(JSON.stringify(err, undefined, 2));
        store.dispatch('showLoader', false);
      }
    },
  },
  async mounted() {
    if (this.isAuth2) this.renderGoogleAuthButton();
    const { result, msg, awards_list } = await getAwardsData();
    if (!result) return console.log(msg);
    this.prizes = awards_list;
  },
};
</script>

<style lang="scss">
@import './Home.scss';
</style>
