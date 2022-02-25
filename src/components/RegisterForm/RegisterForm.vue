<template>
  <form id="register-form">
    <div
      v-for="(itm, idx) in currentSerialNumbers"
      :key="idx"
      class="input_wrap"
    >
      <label>
        <span>{{ idx + 1 }}</span>
      </label>
      <div class="group">
        <input
          class="code"
          type="text"
          :name="`code${{ idx }}`"
          maxlength="8"
          placeholder="請輸入序號"
          :value="serialNumbers[idx]['value'].toUpperCase()"
          @input="
            serialNumbers[idx]['value'] = $event.target.value.toUpperCase()
          "
        />
      </div>
      <div class="status" :class="{ active: serialNumbers[idx]['error'] }">
        <i class="far fa-times"></i>
      </div>
    </div>
    <AgreeChecker v-on:agree="agreeHandler" />
    <div class="btns">
      <AppButton to="false" ga="register-submit" @click="submit">
        <span>送出</span>
      </AppButton>
    </div>
  </form>
</template>

<script>
import AgreeChecker from '@/components/AgreeChecker';
import AppButton from '@/components/AppButton';
import { postAddSerial } from '@/api';

export default {
  components: {
    AgreeChecker,
    AppButton,
  },
  data() {
    return {
      serialNumbers: [
        { value: '', error: false },
        { value: '', error: false },
        { value: '', error: false },
        { value: '', error: false },
        { value: '', error: false },
        { value: '', error: false },
      ],
      agree: false,
    };
  },
  computed: {
    isSerialEmpty() {
      return this.serialNumbers.filter((itm) => itm.value === '').length === 6;
    },
    currentSerialNumbers() {
      return this.serialNumbers.map((itm) => {
        if (itm.value === '') {
          itm.error = false;
        }
        return itm;
      });
    },
  },
  methods: {
    agreeHandler(agreement) {
      this.agree = agreement;
    },
    async submit() {
      if (this.isSerialEmpty) {
        return this.$store.dispatch('showModal', 'register/empty');
      }
      if (!this.agree) {
        return alert('請閱讀並勾選活動辦法與隱私政策！');
      }
      this.$store.dispatch('showLoader', true);
      const formData = {
        login_id: this.$store.state.auth.user.login_id,
        event_id: this.$store.state.user.info.event_id,
        serial: this.serialNumbers.map((itm) => itm.value),
        device: this.$store.state.auth.user.device,
      };
      // 清空錯誤icon
      this.serialNumbers.forEach((itm) => {
        itm.error = false;
      });
      const res = await postAddSerial(formData);
      // 資料讀取太快,loading太快結束容易造成畫面閃屏,設定計時器解決閃屏問題
      setTimeout(() => {
        // 活動結束顯示訊息
        if (res.end) {
          this.$store.dispatch('showLoader', false);
          return alert(res.msg);
        }
        // 序號註冊成功
        if (res.result) {
          document.querySelector('#register-form').reset();
          this.$store.commit('user/setSerialInfo', res);
          this.$store.dispatch('showLoader', false);
          this.$store.dispatch('showModal', 'register/success');
          this.serialNumbers.forEach((itm) => {
            itm.value = '';
          });
          this.agree = false;
          return;
        }
        // 顯示錯誤icon
        res.serial_ck.forEach((itm, idx) => {
          if (itm !== 2) return;
          this.serialNumbers[idx].error = true;
        });
        // 顯示錯誤跳窗
        this.$store.dispatch('showLoader', false);
        switch (res.error_status) {
          case '1':
            return this.$store.dispatch('showModal', 'register/double');
          case '3':
            return this.$store.dispatch('showModal', 'register/repeat');
          default:
            return this.$store.dispatch('showModal', 'register/error');
        }
      }, 300);
    },
  },
};
</script>

<style lang="scss">
@import './RegisterForm.scss';
</style>
