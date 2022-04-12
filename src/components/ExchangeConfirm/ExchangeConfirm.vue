<template>
  <div class="page confirm_page">
    <AppSubtitle>本次兌換</AppSubtitle>
    <div class="table">
      <div class="wrap">
        <div class="t_header">
          <div class="row">
            <div class="grid">
              <span>兌換項目</span>
            </div>
            <div class="grid">
              <span>數量</span>
            </div>
            <div class="grid">
              <span>小計</span>
            </div>
          </div>
        </div>
        <div class="t_body">
          <div
            v-for="prize in selectedPrizes"
            :key="prize.awards_id"
            class="row"
          >
            <div class="grid">
              <p>
                {{ prize.awards_item }} {{ prize.awards_points }} 點
                <span v-if="prize.lottery" class="lottery">※抽獎</span>
              </p>
            </div>
            <div class="grid">
              <p>{{ prize.quantity }}</p>
            </div>
            <div class="grid">
              <p>{{ Number(prize.awards_points) * Number(prize.quantity) }}</p>
            </div>
          </div>
        </div>
        <div class="t_footer">
          <div class="row">
            <div class="grid">
              <span
                >總計<span class="italic">{{ totalPoints }}</span
                >點</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppSubtitle>寄送資料</AppSubtitle>
    <ExchangeConfirmUserForm
      :changePage="changePage"
      :prizes="selectedPrizes"
    />
  </div>
</template>

<script>
import AppSubtitle from '@/components/AppSubtitle';
import ExchangeConfirmUserForm from '@/components/ExchangeConfirmUserForm';

export default {
  components: {
    AppSubtitle,
    ExchangeConfirmUserForm,
  },
  props: {
    changePage: {
      type: Function,
      required: true,
    },
    selectedPrizes: {
      type: Array,
      required: true,
    },
  },
  computed: {
    totalPoints() {
      return this.selectedPrizes.reduce(
        (total, { quantity, awards_points }) =>
          (total += Number(quantity) * Number(awards_points)),
        0
      );
    },
  },
};
</script>

<style lang="scss">
@import './ExchangeConfirm.scss';
</style>
