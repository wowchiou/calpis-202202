<template>
  <div class="tabs">
    <AppLink class="tab" :to="{ name: 'register' }" ga="tab-register">
      <span>輸入序號</span>
    </AppLink>

    <AppLink class="tab" :to="{ name: 'serial-number' }" ga="tab-serial-number">
      <span>我的序號</span>
    </AppLink>

    <AppLink class="tab" :to="{ name: 'exchange' }" ga="tab-exchange">
      <span>贈品兌換</span>
    </AppLink>
  </div>
</template>

<script>
import AppLink from '@/components/AppLink';

export default {
  components: { AppLink },
};
</script>

<style lang="scss" scoped>
@import './PageTabs.scss';
</style>
