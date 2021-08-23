<template>
  <div class="page">
    <Header :title="patient.depName"></Header>
    <div class="flex am_s p_20">
      <div class="left_box flex1 flex f_warp">
        <div v-for="item in patient.patientlist" :key="item.id" class="card_item" style="text-align:center">
          <div class="mt_20 mb_20 flex4" style="text-align:center;">风险项1</div>
          <div class="mt_20 mb_20 flex4" style="text-align:center;">①风险评估记录：.......................</div>
          <div class="mt_10 mb_20 flex4" style="text-align:center;">②风险评估记录：.......................</div>
          <div class="mt_10 mb_20 flex4" style="text-align:center;">③风险评估记录：.......................</div>
          <div class="mt_10 mb_20 flex4" style="text-align:center;">④风险评估记录：.......................</div>
          <div class="mt_10 mb_20 flex4" style="text-align:center;">⑤风险评估记录：.......................</div>
          <div class="mt_10 mb_20 flex4" style="text-align:center;">⑥风险评估记录：.......................</div>

          <div class="mt_30 mb_10 flex4" style="text-align:center;">预计下次评估时间:</div>
          <div class="mt_10 mb_10 flex1" style="text-align:center;">2020-12-12</div>

        </div>
      </div>
    
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import SwiperView from "@/components/SwiperView.vue";
const patient = require("@/assets/patient.js").json;

@Component({
  name: "RiskRecord",
  components: { Header, SwiperView },
})
export default class extends Vue {
  patient = patient;

}
</script>
<style lang="less" scoped>
.page {
  color: #bdf0fc;
  .left_box {
    margin: 0 -10px;
    .card_item {
      position: relative;
      padding: 15px;
      height: 300pt;
      margin: 50px 10px 20px;
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
   
      .title {
        font-weight: 600;
        color: #5389e2;
        margin-left: 5px;
      }
       .mb_60 {
    margin-bottom: 60px;
  }
       
      
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
