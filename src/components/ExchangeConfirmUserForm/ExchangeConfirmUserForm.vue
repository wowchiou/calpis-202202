<template>
  <form>
    <div class="form_input">
      <ExchangeConfirmInput name="姓名">
        <input
          type="text"
          name="form_name"
          placeholder="請輸入中文姓名"
          v-model="formData.form_name"
        />
      </ExchangeConfirmInput>
      <ExchangeConfirmInput name="電子郵件">
        <input
          type="email"
          name="form_email"
          placeholder="請輸入電子信箱"
          v-model="formData.form_email"
        />
      </ExchangeConfirmInput>
      <ExchangeConfirmInput name="寄送地址">
        <input
          type="text"
          name="form_address"
          placeholder="請輸入寄送地址"
          v-model="formData.form_address"
        />
      </ExchangeConfirmInput>
      <ExchangeConfirmInput name="聯絡電話">
        <input
          type="tel"
          name="form_phone"
          maxlength="10"
          placeholder="請輸入聯絡電話"
          v-model="formData.form_phone"
        />
      </ExchangeConfirmInput>
    </div>
    <AgreeChecker v-on:agree="agreeHandler" />
    <div class="btns">
      <AppButton to="false" ga="exchange-confirm-fixed" @click="goBack">
        <span>返回修改</span>
      </AppButton>
      <AppButton to="false" ga="exchange-confirm-submit" @click="submit">
        <span>確認兌換</span>
      </AppButton>
    </div>
  </form>
</template>

<script>
import AgreeChecker from '@/components/AgreeChecker';
import AppButton from '@/components/AppButton';
import ExchangeConfirmInput from '@/components/ExchangeConfirmInput';
import useVuelidate from '@vuelidate/core';
import {
  required,
  helpers,
  email,
  minLength,
  sameAs,
} from '@vuelidate/validators';
import { postAddExchange } from '@/api';

export default {
  components: { AgreeChecker, AppButton, ExchangeConfirmInput },
  setup() {
    return {
      v$: useVuelidate(),
    };
  },
  props: {
    changePage: {
      type: Function,
      required: true,
    },
    prizes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      formData: {
        form_name: this.$store.getters['user/formName'],
        form_email: this.$store.getters['user/formEmail'],
        form_address: this.$store.getters['user/formAddress'],
        form_phone: this.$store.getters['user/formPhone'],
      },
      agree: false,
    };
  },
  validations() {
    const withMessage = helpers.withMessage;
    const regex = helpers.regex;
    return {
      formData: {
        form_name: {
          required: withMessage('請填寫姓名', required),
          chineseName: withMessage(
            '請填寫中文姓名',
            regex(/^[\u4e00-\u9fa5]+$/i)
          ),
        },
        form_email: {
          required: withMessage('請填寫電子郵件', required),
          email: withMessage('電子郵件格式錯誤', email),
        },
        form_address: {
          required: withMessage('請填寫寄送地址', required),
          minLength: withMessage('寄送地址字數最少8個字元', minLength(8)),
        },
        form_phone: {
          required: withMessage('請填寫連絡電話', required),
          telPattern: withMessage(
            '聯絡電話格式錯誤',
            regex(/\d{2,4}-?\d{3,4}-?\d{3,4}#?(\d+)?/g)
          ),
        },
      },
      agree: {
        samAsTrue: withMessage(
          '請閱讀並勾選活動辦法與隱私政策！',
          sameAs(true)
        ),
      },
    };
  },
  methods: {
    goBack() {
      this.changePage('prizes');
      window.scrollTo(0, 0);
    },
    agreeHandler(agreement) {
      this.agree = agreement;
    },
    showModal(modal) {
      this.$store.dispatch('showLoader', false);
      this.$store.dispatch('showModal', modal);
    },
    async submit() {
      const result = await this.v$.$validate();
      if (!result) return alert(this.v$.$errors[0].$message);
      this.$store.dispatch('showLoader', true);
      const data = {
        ...this.formData,
        login_id: this.$store.state.auth.user.login_id,
        event_id: this.$store.state.user.info.event_id,
        device: this.$store.state.auth.user.device,
        exchange_list: this.prizes.map((itm) => {
          return {
            awards_id: itm.awards_id,
            exchange_nu: itm.quantity,
          };
        }),
      };
      const res = await postAddExchange(data);
      // 資料讀取太快,loading太快結束容易造成畫面閃屏,設定計時器解決閃屏問題
      setTimeout(() => {
        // 活動結束
        if (res.end) {
          alert(res.msg);
          this.$store.dispatch('showLoader', false);
          return;
        }
        // 兌換成功
        if (res.result) {
          // 更新store裡的exchange list和寄送資料資訊
          this.$store.commit('user/setExchangeInfo', res);
          this.$store.commit('user/setCommunicateForm', this.formData);
          // 顯示跳窗
          return this.showModal('exchange/success');
        }
        // 點數不足
        if (!res.point_check) {
          return this.showModal('exchange/point');
        }
        // 獎品數量不足(此活動無需此判斷)
        // if (!res.awards_check) {
        //   const shortagePrizes = res.exchange_check.filter(
        //     (itm) => !itm.awards_nu_check
        //   );
        //   this.$store.commit('setShortagePrizes', shortagePrizes);
        //   this.showModal('exchange/shortage');
        // }
      }, 300);
    },
  },
};
</script>

<style lang="scss">
@import './ExchangeConfirmUserForm.scss';
</style>
