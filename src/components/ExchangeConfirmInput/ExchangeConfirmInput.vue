<template>
  <div class="input_wrap">
    <label>
      <span>{{ name }}</span>
    </label>
    <div class="group">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss">
@import './ExchangeConfirmInput.scss';
</style>
