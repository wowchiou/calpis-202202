<template>
  <InnerPageLayout>
    <section class="winner">
      <div class="wrap">
        <PageTitle>得獎名單</PageTitle>
        <div class="content">
          <div v-if="!isDrown">
            <WinningNotYet title="Peace兒童相機" />
            <WinningNotYet title="全家福寫真" />
          </div>
          <WinningList v-else />
          <div class="btns">
            <AppButton :to="{ name: 'home' }" ga="winning-back-to-home">
              <span>返回首頁</span>
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  </InnerPageLayout>
</template>

<script>
import InnerPageLayout from '@/layouts/InnerPageLayout';
import PageTitle from '@/components/PageTitle';
import AppButton from '@/components/AppButton';
import WinningNotYet from '@/components/WinningNotYet';
import WinningList from '@/components/WinningList';

export default {
  components: {
    InnerPageLayout,
    PageTitle,
    AppButton,
    WinningNotYet,
    WinningList,
  },
  data() {
    return {
      isDrown: false,
    };
  },
};
</script>

<style lang="scss">
@import './Winning.scss';
</style>
