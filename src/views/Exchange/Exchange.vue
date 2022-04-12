<template>
  <InnerPageLayout>
    <section class="gift">
      <div class="wrap inner_page_wrap">
        <div class="code_content">
          <PageTitle>贈品兌換</PageTitle>
          <PageTabs />
          <transition-group name="fade" tag="div" class="content">
            <ExchangePrizes
              v-if="showPage === 'prizes'"
              :changePage="changePage"
              :prizes="prizes"
              :selectedPrizes="selectedPrizes"
            />
            <ExchangeConfirm
              v-else-if="showPage === 'confirm'"
              :changePage="changePage"
              :selectedPrizes="selectedPrizes"
            />
          </transition-group>
        </div>
      </div>
    </section>
    <teleport to="#portal-popup">
      <SuccessModal
        v-if="$store.state.modal === 'exchange/success'"
        :changePage="changePage"
        :resetPrizes="resetPrizes"
      />
      <PointModal v-else-if="$store.state.modal === 'exchange/point'" />
      <ShortageModal v-else-if="$store.state.modal === 'exchange/shortage'" />
    </teleport>
  </InnerPageLayout>
</template>

<script>
import InnerPageLayout from '@/layouts/InnerPageLayout';
import PageTitle from '@/components/PageTitle';
import PageTabs from '@/components/PageTabs';
import ExchangePrizes from '@/components/ExchangePrizes';
import ExchangeConfirm from '@/components/ExchangeConfirm';
import Modals from '@/components/Modals';

import { getAwardsData } from '@/api';
import helper from '@/helpers/Exchange.helper.js';

export default {
  components: {
    InnerPageLayout,
    PageTitle,
    PageTabs,
    ExchangePrizes,
    ExchangeConfirm,
    SuccessModal: Modals.ExchangeSuccessModal,
    PointModal: Modals.ExchangePointModal,
    ShortageModal: Modals.ExchangeShortageModal,
  },
  data() {
    return {
      showPage: 'prizes',
      prizes: [],
    };
  },
  methods: {
    changePage(page) {
      this.showPage = page;
    },

    async getPrizes() {
      const { result, awards_list, msg } = await getAwardsData();
      if (!result) return console.log(msg);
      this.prizes = helper.formatePrizesData(awards_list);
    },

    resetPrizes() {
      this.prizes = [];
      this.getPrizes();
    },
  },
  computed: {
    selectedPrizes() {
      return this.prizes.filter((itm) => !!itm.quantity);
    },
  },
  created() {
    this.showPage = 'prizes';
  },
  async mounted() {
    this.getPrizes();
  },
  unmounted() {
    this.$store.dispatch('showModal', '');
  },
};
</script>

<style lang="scss">
@import './Exchange.scss';
</style>
