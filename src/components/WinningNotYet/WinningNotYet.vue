<template>
  <AppSubtitle>{{ title }}</AppSubtitle>
  <div class="text">
    <p>得獎名單將於2022年{{ dateComputed }}公告</p>
  </div>
</template>

<script>
import AppSubtitle from '@/components/AppSubtitle';

export default {
  components: { AppSubtitle },
  props: {
    title: {
      type: String,
      default: '尚未開獎',
    },
    date: {
      type: String,
      default: '04/15',
    },
  },
  computed: {
    dateComputed() {
      return this.date.replace('/', '月') + '日';
    },
  },
};
</script>

<style lang="scss" scoped>
@import './WinningNotYet.scss';
</style>
