<template>
  <div class="page">
    <Header :logo="info.logo" :title="info.depName" :secondTitle="info.nurseDepName"></Header>
    <div class="p_20">
      <div class="info_box" ref="infoBoxRef">
        <div class="flex wth_60p">
          <div class="flex flex1 mr_20">
            <span class="info_blue">姓名：</span>
            <span class="c_ff">{{ info.patientInfo.name }}</span>
          </div>
          <div class="flex am_c flex1 mr_20">
            <span class="info_blue">性别：</span>
            <div class="c_ff mr_10">{{ info.patientInfo.sex }}</div>
            <img v-if="info.patientInfo.sex == '男'" :src="require('@/assets/images/man.png')" class="sec_icon" alt="" />
            <img v-else-if="info.patientInfo.sex == '女'" :src="require('@/assets/images/woman.png')" class="sec_icon" alt="" />
          </div>
          <div class="flex flex1 mr_20">
            <span class="info_blue">年龄：</span>
            <span class="c_ff">{{ info.patientInfo.age }}岁</span>
          </div>
          <div class="flex flex1 mr_20">
            <span class="info_blue">病案号：</span>
            <span class="c_ff">{{ info.patientInfo.sickNum }}</span>
          </div>
        </div>
        <div class="flex wth_60p mt_20">
          <div class="flex flex1 mr_20">
            <span class="info_blue">主治医生：</span>
            <span class="c_ff">{{ info.patientInfo.chargeDoctorName }}</span>
          </div>
          <div class="flex flex1 mr_20">
            <span class="info_blue">主管护士：</span>
            <span class="c_ff">{{ info.patientInfo.chargeNurseName }}</span>
          </div>
          <div class="flex flex2 mr_40">
            <span class="info_blue">入院时间：</span>
            <span class="c_ff">{{ info.patientInfo.admissionTime }}</span>
          </div>
        </div>
        <div class="flex mt_20">
          <span class="info_blue">诊断情况：</span>
          <span class="c_ff">{{ info.patientInfo.illnessState }}</span>
        </div>
      </div>
      <div class="list_card flex3">
        <div class="tab_box flex am_c pl_20" ref="tabBoxRef">
          <div
            class="tab_item"
            v-for="(item, index) in info.riskArr"
            :key="`${item.name}_${index}`"
            :class="{ selected: tab === index }"
            @click="selectTab(index)"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="row_box title_box flex">
          <div v-for="item in tableHeader" :key="item.label" class="row_item t_ct" :style="item.style">{{ item.label }}</div>
        </div>
        <div class="list_box" :style="{ height: cardHeightStr }">
          <template v-if="info.riskArr.length > 0">
            <div v-for="(item, index) in info.riskArr[tab].logArr" :key="`${item.logDate}_${index}`" class="row_box flex am_c">
              <div v-for="header in tableHeader" :key="header.label" class="row_item t_ct" :style="header.style">
                {{ item[header.eng] }}
              </div>
            </div>
          </template>
        </div>
      </div>
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
  components: { Header, SwiperView }
})
export default class extends Vue {
  info: any = {
    patientInfo: {},
    riskArr: []
  };

  tab = 0;
  tableHeader = [
    { label: "时间", eng: "logDate", style: "flex: 2" },
    { label: "评分", eng: "riskScore", style: "flex: 1" },
    { label: "护理措施", eng: "nursingMeasures", style: "flex: 2" },
    { label: "护理结果", eng: "evaluateResults", style: "flex: 2" },
    { label: "评估人员", eng: "logUserName", style: "flex: 1" },
    { label: "再评估时间", eng: "expectNextDate", style: "flex: 2" }
  ];

  otherHeight = 231;

  get cardHeightStr() {
    return `calc(100vh - 260px - 50px - ${this.otherHeight}px)`;
  }

  mounted() {
    this.getData();
  }

  async getData() {
    const id = this.$route.params.id;
    const pid = this.$route.query.nurseDepId;
    const res: any = await risklist({ patientId: id, nurseDepId: pid });
    this.info = res;
    this.$nextTick(() => {
      const heightInfo = (this.$refs.infoBoxRef as HTMLFormElement).offsetHeight;
      const heightTab = (this.$refs.tabBoxRef as HTMLFormElement).offsetHeight;
      this.otherHeight = heightInfo + heightTab;
    });
  }

  selectTab(tab: number) {
    this.tab = tab;
  }
}
</script>
<style lang="less" scoped>
.page {
  color: #bdf0fc;
  .info_box {
    border-radius: 8px;
    box-shadow: 0 0 10px #5389e2 inset;
    padding: 20px;
    margin-bottom: 20px;
    font-size: 26px;
    .wth_60p {
      width: 60%;
    }
    .info_blue {
      color: #5389e2;
    }
    .sec_icon {
      width: 30px;
      height: 30px;
    }
  }
  .list_card {
    position: relative;
    margin: 0px 0px 20px 0px;
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 0 10px #5389e2 inset;
    .tab_box {
      .tab_item {
        padding: 15px 20px;
        cursor: pointer;
        font-size: 24px;
        color: #79a7df;
      }
      .selected {
        color: #ffffff;
      }
    }
    .title_box {
      background: #31558b;
    }
    .row_box {
      padding: 0 15px;
      color: white;
      .row_item {
        font-size: 20px;
        height: 50px;
        line-height: 50px;
      }
    }
    .list_box {
      height: calc(100% - 50px);
      overflow-y: scroll;
    }
  }
}
</style>
