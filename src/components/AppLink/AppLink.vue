<template>
  <a
    v-if="isExternal"
    :href="to === 'false' ? 'javascript:;' : to"
    :target="to === 'false' ? '_self' : '_blank'"
    rel="noopener"
    :ga="ga"
    @click="trackGA"
  >
    <slot />
  </a>

  <router-link v-else v-bind="$props" @click="trackGA">
    <slot />
  </router-link>
</template>

<script>
import { RouterLink } from 'vue-router';

export default {
  props: {
    ...RouterLink.props,
    ga: {
      type: String,
    },
  },
  computed: {
    isExternal() {
      return (
        typeof this.to === 'string' &&
        (this.to.startsWith('http') || this.to === 'false')
      );
    },
  },
  methods: {
    trackGA() {
      if (!this.ga) return;
      this.$store.dispatch('gaTracking', this.ga);
    },
  },
};
</script>

<style lang="scss">
@import './AppLink.scss';
</style>
