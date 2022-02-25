<template>
  <InnerPageLayout>
    <section class="registered">
      <div class="wrap inner_page_wrap">
        <div class="code_content">
          <PageTitle>輸入序號</PageTitle>
          <PageTabs />
          <div class="content">
            <UserName :name="$store.getters['auth/username']" />
            <div class="msg">
              <span>※1組序號可兌換1點</span>
            </div>
            <RegisterForm />
          </div>
        </div>
      </div>
    </section>
    <teleport to="#portal-popup">
      <!-- <transition-group name="fade"> -->
      <SuccessModal v-if="$store.state.modal === 'register/success'" />
      <ErrorModal v-else-if="$store.state.modal === 'register/error'" />
      <DoubleModal v-else-if="$store.state.modal === 'register/double'" />
      <RepeatModal v-else-if="$store.state.modal === 'register/repeat'" />
      <EmptyModal v-else-if="$store.state.modal === 'register/empty'" />
      <!-- </transition-group> -->
    </teleport>
  </InnerPageLayout>
</template>

<script>
import InnerPageLayout from '@/layouts/InnerPageLayout';
import PageTitle from '@/components/PageTitle';
import PageTabs from '@/components/PageTabs';
import UserName from '@/components/UserName';
import RegisterForm from '@/components/RegisterForm';
import Modals from '@/components/Modals';

export default {
  components: {
    InnerPageLayout,
    PageTitle,
    PageTabs,
    UserName,
    RegisterForm,
    SuccessModal: Modals.RegisterSuccessModal,
    ErrorModal: Modals.RegisterErrorModal,
    DoubleModal: Modals.RegisterDoubleModal,
    RepeatModal: Modals.RegisterRepeatModal,
    EmptyModal: Modals.RegisterEmptyModal,
  },
  unmounted() {
    this.$store.dispatch('showModal', '');
  },
};
</script>

<style lang="scss">
@import './Register.scss';
</style>
