<template>
  <section class="comingSoon">
    <div class="wrap">
      <div class="content">
        <h2>活動尚未開始</h2>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  beforeCreate() {
    if (this.$store.state.comingSoon) return;
    this.$router.replace({ name: 'home' });
  },
};
</script>

<style lang="scss" scoped>
@import './ComingSoon.scss';
</style>
