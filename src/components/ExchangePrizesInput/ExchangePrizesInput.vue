<template>
  <div class="input_wrap">
    <div class="gift_name">
      <span>{{ prize.awards_item }}</span>
    </div>
    <div class="gift_point">
      <span>{{ prize.awards_points }}</span
      >點
    </div>
    <div class="group">
      <slot />
    </div>
    <div v-if="statusString" class="remind">
      <span>{{ statusString }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    prize: {
      type: Object,
      required: true,
    },
  },
  computed: {
    statusString() {
      const amount = this.prize.awards_last_nu;
      if (amount <= 10 && amount > 0) return `僅剩${amount}組，要換要快`;
      if (amount === 0) return '兌換完畢，感謝支持';
      return false;
    },
  },
};
</script>

<style lang="scss">
@import './ExchangePrizesInput.scss';
</style>
