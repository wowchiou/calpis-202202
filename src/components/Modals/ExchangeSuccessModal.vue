<template>
  <AppModal :header="true" :body="true" :footer="true">
    <template #header>
      <span>兌換申請已送出</span>
    </template>

    <template #body>
      <span>請耐心等候1-2個工作天</span>
      <span>待兌換審查無誤後</span>
      <span>系統將會寄出通知信函</span>
      <span>再請依步驟完成兌獎程序即可</span>
      <span class="light">※抽獎名單將於2022/04/15公布</span>
    </template>

    <template #footer>
      <div class="btns">
        <AppButton
          :to="`${baseURL}serial-number#exchange`"
          ga="exchange-finish"
        >
          <span>完成</span>
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>

<script>
import AppModal from '@/components/AppModal';
import AppButton from '@/components/AppButton';

export default {
  components: {
    AppModal,
    AppButton,
  },
  props: ['resetPrizes', 'changePage'],
  computed: {
    baseURL() {
      return process.env.NODE_ENV === 'production'
        ? '/calpishappykid2022/'
        : '/';
    },
  },
  methods: {
    closeModal() {
      // this.changePage('prizes');
      // this.resetPrizes();
      // this.$store.dispatch('showModal', '');
      this.$router.push(`${this.baseURL}serial-number#exchange`);
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/vars/index.scss';

.light {
  color: map-get($color, 'light');
}
</style>
