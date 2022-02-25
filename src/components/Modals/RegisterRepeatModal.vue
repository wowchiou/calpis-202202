<template>
  <AppModal :header="true" :footer="true" :close="closeModal">
    <template #header>
      <span>輸入序號重複</span>
    </template>

    <template #footer>
      <div class="btns">
        <AppButton to="false" ga="register-repeat" @click="closeModal">
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
