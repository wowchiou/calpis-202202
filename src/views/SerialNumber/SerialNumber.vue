<template>
  <InnerPageLayout>
    <section class="mycode">
      <div class="wrap inner_page_wrap">
        <div class="code_content">
          <PageTitle>我的序號</PageTitle>
          <PageTabs />
          <div class="content">
            <div class="code_btns page_btns">
              <AppButton
                class="code_btn"
                :class="{ active: hash === 'list' }"
                :to="`${$route.path}#list`"
                ga="serial-number-list"
              >
                <span>登錄序號明細</span>
              </AppButton>
              <AppButton
                class="code_btn"
                :class="{ active: hash === 'exchange' }"
                :to="`${$route.path}#exchange`"
                ga="serial-number-exchange"
              >
                <span>兌換紀錄</span>
              </AppButton>
            </div>
            <UserName :name="$store.getters['auth/username']" />
            <div class="small_text">
              <span>您好</span>
            </div>
            <div class="point_details">
              <div class="text">
                <p>每組成功登錄之序號即為1點</p>
                <p>
                  已登錄點數<span>{{ $store.getters['user/points'] }}</span
                  >點
                </p>
                <p>
                  已使用<span>{{ $store.getters['user/usedPoints'] }}</span
                  >點
                </p>
                <p>
                  剩餘<span>{{ $store.getters['user/lastPoints'] }}</span
                  >點
                </p>
              </div>
            </div>
            <ContentLoader v-if="!$store.getters['user/serialList']" />
            <div v-else>
              <SerialNumberList
                v-if="hash === 'list'"
                :serialNumberList="$store.getters['user/serialList']"
              />
              <SerialNumberExchange
                v-else
                :serialNumberExchange="$store.getters['user/exchangeList']"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </InnerPageLayout>
</template>

<script>
import InnerPageLayout from '@/layouts/InnerPageLayout';
import PageTitle from '@/components/PageTitle';
import PageTabs from '@/components/PageTabs';
import UserName from '@/components/UserName';
import AppButton from '@/components/AppButton';
import SerialNumberList from '@/components/SerialNumberList';
import SerialNumberExchange from '@/components/SerialNumberExchange';
import ContentLoader from '@/components/ContentLoader';

export default {
  components: {
    InnerPageLayout,
    PageTitle,
    PageTabs,
    UserName,
    AppButton,
    SerialNumberList,
    SerialNumberExchange,
    ContentLoader,
  },
  computed: {
    hash() {
      const hash = this.$route.hash.replace('#', '');
      return !hash ? 'list' : hash;
    },
  },
  unmounted() {
    this.$store.dispatch('showLoader', false);
  },
};
</script>

<style lang="scss">
@import './SerialNumber.scss';

.td_wrap .row {
  opacity: 0;
  transform: translateY(10px);
  animation: slideUp 0.5s forwards;
}
</style>
