<template>
  <div class="access">
    <div class="type">
      <span>{{ title }}</span>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import './WhereToBuyAccess.scss';
</style>
