<template>
  <div class="tab_page code_details">
    <span v-if="serialNumberList.length === 0" class="zero_text"
      >尚無登錄序號</span
    >

    <div v-else class="table">
      <div class="th">
        <div class="row">
          <div class="grid">
            <span>序號列表</span>
          </div>
          <div class="grid">
            <span>輸入日期</span>
          </div>
        </div>
      </div>
      <div class="td">
        <div class="td_wrap">
          <div
            v-for="(itm, index) in result"
            :key="itm.serial"
            class="row"
            :style="{ animationDelay: `${index * 0.1}s` }"
          >
            <div class="grid">
              <p>{{ itm.serial }}</p>
            </div>
            <div class="grid">
              <p>{{ formateDate(itm.input_date) }}</p>
            </div>
          </div>
        </div>
        <SerialNumberNavigation
          v-if="!!$store.state.user.info.serial_list"
          :prev="prev"
          :next="next"
          :currentPage="currentPage"
          :lastPage="lastPage"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useArrayPagination } from 'vue-composable';
import SerialNumberNavigation from '@/components/SerialNumberNavigation';

export default {
  components: { SerialNumberNavigation },
  props: {
    serialNumberList: {
      type: Array,
    },
  },
  setup(props) {
    const { result, next, prev, currentPage, lastPage } = useArrayPagination(
      props.serialNumberList,
      { pageSize: 8 }
    );
    return { result, next, prev, currentPage, lastPage };
  },
  methods: {
    formateDate(date) {
      return date.replace('年', '/').replace('月', '/').replace('日', '');
    },
  },
};
</script>

<style lang="scss">
@import './SerialNumberList.scss';
</style>
