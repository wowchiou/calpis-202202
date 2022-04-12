<template>
  <div class="username">
    <span id="user_name">
      {{ name }}
    </span>
  </div>
</template>

<script>
export default {
  props: ['name'],
};
</script>

<style lang="scss">
@import './UserName.scss';
</style>
