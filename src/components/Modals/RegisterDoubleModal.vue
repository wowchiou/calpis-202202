<template>
  <AppModal :header="true" :body="true" :footer="true" :close="closeModal">
    <template #header>
      <span>序號重複</span>
    </template>

    <template #body>
      <span>序號已輸入過</span>
      <span>請重新確認序號</span>
    </template>

    <template #footer>
      <div class="btns">
        <AppButton to="false" ga="register-double" @click="closeModal">
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
