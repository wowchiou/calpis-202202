<template>
  <AppModal :header="true" :body="true" :footer="true" :close="closeModal">
    <template #header>
      <span>請輸入序號</span>
    </template>

    <template #footer>
      <div class="btns">
        <AppButton to="false" ga="register-error" @click="closeModal">
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
