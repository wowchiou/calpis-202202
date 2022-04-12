<template>
  <div class="btns pagination_btns">
    <AppButton
      v-if="currentPage !== 1"
      class="prev_btn"
      to="false"
      ga="serial-number-prev"
      @click="prev"
    >
      <span>上一頁</span>
    </AppButton>
    <AppButton
      v-if="currentPage !== lastPage"
      class="next_btn"
      to="false"
      ga="serial-number-next"
      @click="next"
    >
      <span>下一頁</span>
    </AppButton>
  </div>
</template>

<script>
import AppButton from '@/components/AppButton';

export default {
  components: { AppButton },
  props: ['prev', 'next', 'currentPage', 'lastPage'],
};
</script>

<style lang="scss">
@import './SerialNumberNavigation.scss';
</style>
