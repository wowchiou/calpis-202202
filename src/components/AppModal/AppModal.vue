<template>
  <div class="popup">
    <div class="popup_wrap">
      <div class="content">
        <div class="content_bg">
          <div v-if="close" class="popup_close" @click="close"></div>
          <div v-if="header" class="popup_header">
            <slot name="header" />
          </div>
          <div v-if="body" class="popup_body">
            <slot name="body" />
          </div>
          <div v-if="footer" class="popup_footer">
            <slot name="footer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['header', 'body', 'footer', 'close'],
  unmounted() {
    this.$store.commit('setModal', '');
  },
};
</script>

<style lang="scss">
@import './AppModal.scss';

.popup .content {
  animation: slideUp 0.5s;
}
</style>
