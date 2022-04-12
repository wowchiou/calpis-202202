<template>
  <header class="header" :class="$store.state.menu ? 'active' : ''">
    <div class="wrap">
      <div class="top">
        <AppLink
          class="logo"
          :to="{ name: 'home' }"
          ga="logo"
          @click="$store.dispatch('showMenu', false)"
        />
        <div class="menu_open" @click="showMenu(true)"></div>
      </div>
      <div class="menu">
        <div class="wrap">
          <div class="content">
            <div class="menu_close" @click="showMenu(false)"></div>
            <TheNavigation />
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import TheNavigation from '@/components/TheNavigation';
import AppLink from '@/components/AppLink';

export default {
  components: { TheNavigation, AppLink },
  methods: {
    showMenu(active) {
      this.$store.dispatch('showMenu', active);
      this.$store.dispatch('gaTracking', 'menu');
    },
  },
};
</script>

<style lang="scss">
@import './TheHeader.scss';
</style>
