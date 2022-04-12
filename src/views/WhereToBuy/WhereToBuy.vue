<template>
  <InnerPageLayout>
    <section class="channels">
      <div class="wrap">
        <PageTitle>購買通路</PageTitle>
        <div class="content">
          <AppSubtitle>網購通路</AppSubtitle>
          <div class="text">
            <WhereToBuyAccess title="開心成長原味">
              <div class="btns cannels_btns">
                <AppButton
                  to="https://24h.pchome.com.tw/prod/DBAB04-A9008IMTD"
                  ga="whereToBuy-PChome-origin"
                  :icon="true"
                >
                  <span>PChome</span>
                </AppButton>
                <AppButton
                  to="https://www.momoshop.com.tw/goods/GoodsDetail.jsp?i_code=4091386&osm=Ad07&utm_source=googleshop&utm_medium=traffic_pla&utm_content=bn&gclid=Cj0KCQiAxoiQBhCRARIsAPsvo-zN2BkXcEN2fGujR8dtgjE-mTcOovHNDpBzmf0k6SC7NxBzybXl75EaAnlpEALw_wcB"
                  ga="whereToBuy-momo-origin"
                  :icon="true"
                >
                  <span>momo購物網</span>
                </AppButton>
              </div>
            </WhereToBuyAccess>
            <WhereToBuyAccess title="開心成長蘋果">
              <div class="btns cannels_btns">
                <AppButton
                  to="https://24h.pchome.com.tw/prod/DBABAV-A9008O4UT?_gl=1*25eg4o*_ga*MTk1MzkzNDM4NS4xNjMyOTkxMTY2*_ga_9CE1X6J1FG*MTY0NDMyNDc4NS43OS4xLjE2NDQzMjQ4NjMuNDU.*_fplc*OUZXY2RjcEU5dEZQdCUyQlJPM2VZMXpHd1pwaExpJTJCJTJCbnR0TEVsSDNLdTFjeDNQMlhnR050cThvODZvU2hiVk8yZkMyTWJrd05nMFBZZktqZiUyRlZ1Nk1RRVozUk0zSUVMUm1PYVlMWFdNJTJCZWFhQ2VIOFVLMUw0b0R0cVZCTUslMkJ3JTNEJTNE"
                  ga="whereToBuy-PChome-apple"
                  :icon="true"
                >
                  <span>PChome</span>
                </AppButton>
              </div>
            </WhereToBuyAccess>
          </div>
          <AppSubtitle>實體通路</AppSubtitle>
          <div class="text">
            <WhereToBuyAccess title="開心成長原味">
              <div class="store">
                <span
                  >全聯社、楓康、寶雅、美華泰、唐吉軻德、家樂福、大潤發、愛買</span
                >
              </div></WhereToBuyAccess
            >
            <WhereToBuyAccess title="開心成長蘋果">
              <div class="store">
                <span
                  >全聯社、楓康、寶雅、美華泰、唐吉軻德、家樂福、大潤發、愛買</span
                >
              </div>
            </WhereToBuyAccess>
          </div>
          <div class="btns">
            <AppButton :to="{ name: 'home' }" ga="whereToBuy-back-to-home">
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
import AppSubtitle from '@/components/AppSubtitle';
import AppButton from '@/components/AppButton';
import WhereToBuyAccess from '@/components/WhereToBuyAccess';

export default {
  components: {
    InnerPageLayout,
    PageTitle,
    AppSubtitle,
    AppButton,
    WhereToBuyAccess,
  },
};
</script>

<style lang="scss">
@import './WhereToBuy.scss';
</style>
