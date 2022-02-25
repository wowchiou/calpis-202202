<template>
  <AppModal :header="true" :footer="true" :close="closeModal">
    <template #header>
      <span>點數不足</span>
    </template>

    <template #footer>
      <div class="btns">
        <AppButton to="false" ga="exchange-point-back" @click="closeModal">
          <span>返回確認</span>
        </AppButton>
        <AppButton :to="{ name: 'register' }" ga="exchange-register">
          <span>輸入序號</span>
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
