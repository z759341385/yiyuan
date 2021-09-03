<template>
  <div class="page">
    <Header :title="info.depName"></Header>
    <div class="patients_detail_box flex col">
      <div class="flex flex2">
        <div class="detail_info card">
          <div class="time">发布时间：{{ info.newsInfo.createDate }}</div>
          <div class="subTitle" style="text-align: center">{{ info.newsInfo.title }}</div>
          <div>{{ info.newsInfo.newsContent }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import { getNews } from "@/api/index";
// const info = require("@/assets/patient_detail.js").json;

@Component({
  name: "AnnouncementDetail",
  components: { Header },
})
export default class extends Vue {
  info: any = {};

  mounted() {
    this.getData();
  }

  async getData() {
    const res = await getNews({ id: this.$route.params.id });
    this.info = res;
  }
}
</script>
<style lang="less" scoped>
.subTitle {
  color: #00a3ff;
  font-weight: 600;
  font-size: 28px;
  // display: flex;
  // align-items: center;
}
.patients_detail_box {
  margin: 40px;
  font-size: 20px;
  height: calc(100vh - 160px);
  .title {
    color: #00a3ff;
    font-weight: 600;
    font-size: 30px;
    display: flex;
    align-items: center;
    flex: 1;
  }

  .card {
    // border: 8px solid #1e47cc;
    box-shadow: 0 0 10px #5389e2 inset;
    border-radius: 12px;
    padding: 40px;
  }
  .detail_info {
    flex: 5;
    position: relative;
    .time {
      position: absolute;
      top: 40px;
      right: 40px;
    }
  }
  .operation_box {
    margin: 0px 0px;
    font-size: 18px;
    .title_box {
      .title_item {
        padding: 15px 10px;
      }
    }
    .list_box {
      height: 100%;
      overflow: hidden;
      border: 1px dashed #979797;
      .list_item {
        padding: 15px 0;
        .col_item {
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
