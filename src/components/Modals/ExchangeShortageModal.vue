<template>
  <AppModal :header="true" :body="true" :footer="true" :close="closeModal">
    <template #header>
      <span v-for="itm in $store.state.shortagePrizes" :key="itm.awards_id"
        >【{{ itm.awards_item }}】</span
      >
    </template>

    <template #body>
      <span>獎品剩餘數量不足</span>
      <span>請重新選取欲兌換項目</span>
    </template>

    <template #footer>
      <div class="btns">
        <AppButton to="false" ga="exchange-shortage" @click="closeModal">
          <span>確定</span>
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
  methods: {
    closeModal() {
      this.$store.dispatch('showModal', '');
    },
  },
};
</script>
