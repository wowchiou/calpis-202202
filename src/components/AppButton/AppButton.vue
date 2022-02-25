<template>
  <div class="btn">
    <AppLink :to="to" :ga="ga">
      <slot />
      <i v-if="icon" class="fas fa-caret-right"></i>
    </AppLink>
  </div>
</template>

<script>
import AppLink from '@/components/AppLink';

export default {
  components: { AppLink },
  props: {
    to: {
      type: [String, Object],
    },
    ga: {
      type: String,
    },
    icon: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss">
@import './AppButton.scss';
</style>
