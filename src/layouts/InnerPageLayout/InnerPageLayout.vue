<template>
  <main class="container">
    <div class="bg"></div>
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
@import './InnerPageLayout.scss';
</style>
