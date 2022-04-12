<template>
  <AppModal :header="true" :body="true" :footer="true" id="browser_blocker">
    <template #header>
      <span>為確保活動順暢進行</span>
      <span>請使用Chrome或其他瀏覽器</span>
    </template>
    <template #body>
      <div class="pic">
        <img src="@/assets/images/browser-alert.png" alt="" />
      </div>
    </template>
    <template #footer>
      <div class="btns">
        <AppButton to="false" ga="copy-link" @click="copy">
          <span>{{ copyText }}</span>
        </AppButton>
      </div>
    </template>
  </AppModal>
</template>

<script>
import AppModal from '@/components/AppModal';
import AppButton from '@/components/AppButton';
import { getBrowserVersion, copyValue } from '@/utils';

export default {
  components: {
    AppModal,
    AppButton,
  },
  data() {
    return {
      copyText: '複製連結',
    };
  },
  methods: {
    copy() {
      const device = getBrowserVersion().versions.ios;
      const url = window.location.href;
      const copyResult = copyValue(url, device);
      if (copyResult) return (this.copyText = '複製成功');
      this.copyText = '複製連結';
    },
  },
};
</script>

<style lang="scss">
@import '@/assets/scss/vars/index.scss';

#browser_blocker {
  z-index: 999;
  .popup_header {
    color: map-get($color, 'primary');
    font-weight: 400;
    font-size: 2.6rem;
    @media (max-width: 23.15em) {
      font-size: 2.2rem;
    }
    span {
      display: block;
    }
  }
  .popup_footer {
    .btn {
      background: map-get($color, 'primary');
      border-radius: 0.5rem;
      a {
        padding: 0.3rem 0;
        background-color: map-get($color, 'primary');
        &:active {
          opacity: 0.7;
        }
      }
    }
  }
}
</style>
