<template>
  <DefaultLayout>
    <section class="notFound">
      <div class="wrap">
        <div class="content">
          <h2>404</h2>
          <p>Oops! Page Not Found.</p>
          <div class="btns">
            <AppButton :to="{ name: 'home' }" ga="not-found-home">
              <span>回到首頁</span>
            </AppButton>
          </div>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<script>
import DefaultLayout from '@/layouts/DefaultLayout';
import AppButton from '@/components/AppButton';

export default {
  components: { DefaultLayout, AppButton },
};
</script>

<style lang="scss" scoped>
@import './NotFound.scss';
</style>
