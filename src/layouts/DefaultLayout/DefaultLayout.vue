<template>
  <main class="container">
    <slot />
  </main>
</template>

<script>
export default {
  unmounted() {
    this.$store.dispatch('showMenu', false);
  },
};
</script>

<style lang="scss">
@import './DefaultLayout.scss';
</style>
