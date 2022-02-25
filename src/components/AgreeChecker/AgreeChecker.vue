<template>
  <div class="agree">
    <label>
      <input
        type="checkbox"
        name="agree"
        id="agree"
        v-model="agree"
        @change="emitAgreeValue"
      />
      <div class="checkbox_style">
        <i class="far fa-check"></i>
      </div>
      <div class="text">
        <span>我已閱讀並同意</span>
        <a :href="activityPath" target="_blank">
          <span>活動辦法及隱私權規範</span>
        </a>
      </div>
    </label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      agree: false,
    };
  },
  computed: {
    activityPath() {
      const url =
        process.env.NODE_ENV === 'production' ? '/calpishappykid2022/' : '/';
      return window.location.origin + url + 'activity?target=_blank';
    },
  },
  methods: {
    emitAgreeValue() {
      this.$emit('agree', this.agree);
    },
  },
};
</script>

<style lang="scss">
@import './AgreeChecker.scss';
</style>
