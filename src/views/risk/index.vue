<template>
  <div class="page">
    <Header :title="info.depName"></Header>
    <div class="flex flex1 col p_20">
      <div class="card_item col f_warp">
        <div class="flex row">
          <div class="flex1 info_h1 pl_20">张三</div>
          <div class="flex flex1 info_h1 row">
            <img :src="require('@/assets/images/man.png')" class="sec_icon" alt="" />
            <!-- <img v-if="item.sex == '男'" :src="require('@/assets/images/man.png')" class="sec_icon" alt="" />
              <img v-else-if="item.sex == '女'" :src="require('@/assets/images/woman.png')" class="sec_icon" alt="" /> -->
            <div>男</div>
          </div>
          <div class="flex1 info_h1">23岁</div>
          <div class="flex flex2 info_h2_blue row">
            病案号：
            <div class="info_h2">00000001</div>
          </div>
          <div class="flex flex2 info_h2_blue row">
            入院时间：
            <div class="info_h2">00000002</div>
          </div>
          <div class="flex flex2 info_h2_blue row">
            主治医生：
            <div class="info_h2">00000003</div>
          </div>
          <div class="flex flex2 info_h2_blue row">
            责任护士：
            <div class="info_h2">00000004</div>
          </div>
        </div>
        <div class="flex info_h2_blue row pl_20 mt_20 row">
          <div style="min-width: 90px">入院诊断：</div>
          <div class="info_h2" style="word-break: break-all">
            000555000555000555000555000555000555000555000555000555000555000555000555000555000555000055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500055500555000555000555000555000555000555000555000555000555000555000555000555000555000555000555000555
          </div>
        </div>
      </div>
      <div class="list_card flex3">23111111</div>

      <!-- 
        <div v-for="item in info.riskArr" :key="item.id" class="card_item flex col am_c">
          <div class="mt_20 mb_20">{{ item.name }}</div>
          <div class="mt_10" v-for="log in item.logArr" :key="log.logDate">{{ log.logUser }} {{ log.logDate }}</div>
          <div class="mt_30">预计下次评估时间:</div>
          <div class="mt_10">2020-12-12</div>
        </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import SwiperView from "@/components/SwiperView.vue";
import { risklist } from "@/api/index";
// const info = require("@/assets/info.js").json;

@Component({
  name: "RiskRecord",
  components: { Header, SwiperView },
})
export default class extends Vue {
  info: any = {};

  mounted() {
    this.getData();
  }

  async getData() {
    const pid = this.$route.query.depid;
    const res = await risklist({ depid: pid });
    this.info = res;
  }
}
</script>
<style lang="less" scoped>
.page {
  color: #bdf0fc;
  .list_card{
    position: relative;
    padding: 20px;
    min-height: 500pt;
    margin: 0px 0px 20px 0px;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 0 10px #5389e2 inset;

  }
  .card_item {
    position: relative;
    padding: 30px 30px 30px 20px;
    min-height: 100pt;
    margin: 0px 0px 20px 0px;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 0 10px #5389e2 inset;


    .lable_icon {
      width: 18px;
      height: 18px;
    }
    .bed_num_box {
      position: absolute;
      top: -10px;
      left: -5px;
      width: 50px;
      height: 26px;
      line-height: 26px;
      border-radius: 4px 4px 0 0;
      background-color: #1e47cc;
      box-shadow: 0 2px 5px #1e47cc;
      &::before {
        content: "";
        position: absolute;
        left: -5px;
        top: 10px;
        height: 20px;
        width: 5px;
        background-color: #1e47cc;
        border-radius: 4px 0 4px 4px;
        box-shadow: 0 2px 5px #1e47cc;
      }
      &::after {
        content: "";
        position: absolute;
        right: -5px;
        top: 10px;
        height: 20px;
        width: 5px;
        background-color: #1e47cc;
        border-radius: 0 4px 4px 4px;
        box-shadow: 0 2px 5px #1e47cc;
      }
    }
    .top_box {
      min-height: 100px;
      width: 100%;
    }
    .info_h1 {
      font-size: 20px;
      color: #ffffff;
    }
    .info_h2 {
      font-size: 18px;
      color: #ffffff;
    }
    .info_h2_blue {
      font-size: 18px;
      color: #5389e2;
    }
    .title {
      font-weight: 600;
      color: #5389e2;
      margin-left: 5px;
    }
    .mb_60 {
      margin-bottom: 60px;
    }
    .sec_icon {
      width: 20px;
      height: 20px;
    }
  }
}

@media screen and (min-width: 2440px) {
  .card_item {
    width: calc(10% - 20px);
  }
}
@media screen and (min-width: 1500px) and (max-width: 2440px) {
  .card_item {
    width: calc(16% - 20px);
  }
}
@media screen and (min-width: 1200px) and (max-width: 1500px) {
  .card_item {
    width: calc(20% - 20px);
  }
}
@media screen and (min-width: 900px) and (max-width: 1200px) {
  .card_item {
    width: calc(25% - 20px);
  }
}
@media screen and (max-width: 900px) {
  .card_item {
    width: calc(33.3% - 20px);
  }
}
</style>
