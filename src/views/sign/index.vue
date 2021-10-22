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
            <span class="info_blue">责任护士：</span>
            <span class="c_ff">{{ info.patientInfo.chargeNurseName }}</span>
          </div>
          <div class="flex flex2 mr_40">
            <span class="info_blue">入院时间：</span>
            <span class="c_ff">{{ info.patientInfo.admissionTime }}</span>
          </div>
        </div>
        <div class="flex mt_20">
          <span class="info_blue">入院诊断：</span>
          <span class="c_ff">{{ info.patientInfo.illnessState }}</span>
        </div>
      </div>
      <div class="tab_box flex am_c pl_20" ref="tabBoxRef">
        <div class="tab_item" v-for="(item, index) in tabList" :key="item.text" :class="{ selected: tab === index }" @click="selectTab(index)">
          {{ item.text }}
        </div>
      </div>
      <div class="card_box flex am_c" :style="{ height: cardHeightStr }">
        <div class="card_item flex1">
          <div class="row_box title_box flex">
            <div v-for="item in tabList[tab].tableHeader" :key="item.label" class="row_item t_ct" :style="item.style">{{ item.label }}</div>
          </div>
          <div class="list_box">
            <div v-for="item in tabList[tab].list" :key="item.label" class="row_box flex am_c">
              <div v-for="header in tabList[tab].tableHeader" :key="header.label" class="row_item t_ct" :style="header.style">
                {{ item[header.eng] }}
              </div>
            </div>
          </div>
        </div>
        <div class="card_item flex2">
          <!-- <ve-line :data="tabList[tab].chartData" :settings="{ yAxisName: tabList[tab].text }"></ve-line> -->
          <ve-line :data="tabList[tab].chartData" :settings="{ yAxisName: [tabList[tab].text] }"></ve-line>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VeLine from "v-charts/lib/line";
import Header from "@/components/Header.vue";
import SwiperView from "@/components/SwiperView.vue";
import { vitalSignsList } from "@/api/index";
// const info = require("@/assets/info.js").json;

@Component({
  name: "SignDetection",
  components: { Header, VeLine, SwiperView },
})
export default class extends Vue {
  info: any = {
    patientInfo: {},
  };
  tab = 0;

  tabList: any = [
    {
      text: "体温",
      pageNo: 1,
      pageSize: 20,
      total: 0,
      list: [],
      tableHeader: [
        { label: "体温", eng: "temperature", style: "flex: 1" },
        { label: "测量时间", eng: "tempDate", style: "flex: 2" },
        { label: "护士", eng: "nurseName", style: "flex: 1" },
      ],
      chartData: {
        columns: ["测量时间", "体温"],
        rows: [],
      },
    },
    {
      text: "脉搏",
      pageNo: 1,
      pageSize: 20,
      total: 0,
      list: [],
      tableHeader: [
        { label: "脉搏", eng: "pulse", style: "flex: 1" },
        { label: "测量时间", eng: "pulseDate", style: "flex: 2" },
        { label: "护士", eng: "nurseName", style: "flex: 1" },
      ],
      chartData: {
        columns: ["测量时间", "脉搏"],
        rows: [],
      },
    },
    {
      text: "呼吸",
      pageNo: 1,
      pageSize: 20,
      total: 0,
      list: [],
      tableHeader: [
        { label: "呼吸", eng: "breatheRate", style: "flex: 1" },
        { label: "测量时间", eng: "breathDate", style: "flex: 2" },
        { label: "护士", eng: "nurseName", style: "flex: 1" },
      ],
      chartData: {
        columns: ["测量时间", "呼吸"],
        rows: [],
      },
    },
    {
      text: "血压",
      pageNo: 1,
      pageSize: 20,
      total: 0,
      list: [],
      tableHeader: [
        { label: "血压", eng: "bloodPressure", style: "flex: 1" },
        { label: "测量时间", eng: "pressureDate", style: "flex: 2" },
        { label: "护士", eng: "nurseName", style: "flex: 1" },
      ],
      chartData: {
        columns: ["测量时间", "高压", "低压"],
        rows: [],
      },
    },
    {
      text: "血氧",
      pageNo: 1,
      pageSize: 20,
      total: 0,
      list: [],
      tableHeader: [
        { label: "血氧", eng: "bloodOxygen", style: "flex: 1" },
        { label: "测量时间", eng: "bloodOxygenDate", style: "flex: 2" },
        { label: "护士", eng: "nurseName", style: "flex: 1" },
      ],
      chartData: {
        columns: ["测量时间", "血氧"],
        rows: [],
      },
    },
    {
      text: "血糖",
      pageNo: 1,
      pageSize: 20,
      total: 0,
      list: [],
      tableHeader: [
        { label: "血糖", eng: "bloodSugar", style: "flex: 1" },
        { label: "测量时间", eng: "bloodSugarDate", style: "flex: 2" },
        { label: "护士", eng: "nurseName", style: "flex: 1" },
      ],
      chartData: {
        columns: ["测量时间", "血糖"],
        rows: [],
      },
    },
    {
      text: "心电监护",
      pageNo: 1,
      pageSize: 20,
      total: 0,
      list: [],
      tableHeader: [
        { label: "状态", eng: "ecgMonitorState", style: "flex: 1" },
        { label: "测量时间", eng: "ecgMonitorDate", style: "flex: 2" },
        { label: "护士", eng: "nurseName", style: "flex: 1" },
      ],
      chartData: {
        columns: ["测量时间", "状态"],
        rows: [],
      },
    },
    {
      text: "核酸检测",
      pageNo: 1,
      pageSize: 20,
      total: 0,
      list: [],
      tableHeader: [
        { label: "检测结果", eng: "natResults", style: "flex: 1" },
        { label: "检测日期", eng: "natDate", style: "flex: 2" },
        { label: "检测机构", eng: "natFacility", style: "flex: 1" },
      ],
      chartData: {
        columns: ["检测日期", "检测结果"],
        rows: [],
      },
    },
  ];

  otherHeight = 226;

  get cardHeightStr() {
    return `calc(100vh - 250px - ${this.otherHeight}px)`;
  }

  mounted() {
    this.getData();
  }

  async getData() {
    const id = this.$route.params.id;
    const pid = this.$route.query.nurseDepId;
    const res: any = await vitalSignsList({ patientId: id, nurseDepId: pid });
    this.info = res;
    this.tabList[0].list = res.temperature;
    this.tabList[1].list = res.pulse;
    this.tabList[2].list = res.breathe;
    this.tabList[3].list = res.bloodPressure;
    this.tabList[4].list = res.bloodOxygen;
    this.tabList[5].list = res.bloodSugar;
    this.tabList[6].list = res.ecgMonitoring;
    this.tabList[7].list = res.nat;
    this.tabList[0].chartData.rows = res.temperature.map((d: any) => {
      return { 测量时间: d.tempDate, 体温: d.temperature };
    });
    this.tabList[1].chartData.rows = res.pulse.map((d: any) => {
      return { 测量时间: d.pulseDate, 脉搏: d.pulse };
    });
    this.tabList[2].chartData.rows = res.breathe.map((d: any) => {
      return { 测量时间: d.breatheDate, 呼吸: d.breatheRate };
    });
    this.tabList[3].chartData.rows = res.bloodPressure.map((d: any) => {
      const blood = d.bloodPressure.split("-");
      return { 测量时间: d.pressureDate, 高压: blood[1], 低压: blood[0] };
    });
    this.tabList[4].chartData.rows = res.bloodOxygen.map((d: any) => {
      return { 测量时间: d.bloodOxygenDate, 血氧: d.bloodOxygen };
    });
    this.tabList[5].chartData.rows = res.bloodSugar.map((d: any) => {
      return { 测量时间: d.bloodSugarDate, 血糖: d.bloodSugar };
    });
    this.tabList[6].chartData.rows = res.ecgMonitoring.map((d: any) => {
      return { 测量时间: d.ecgMonitorDate, 心电监护: d.ecgMonitorState };
    });
    this.tabList[7].chartData.rows = res.nat.map((d: any) => {
      return { 检测日期: d.natDate, 核酸检测: d.natResults };
    });
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
    padding: 20px;
    margin-bottom: 10px;
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
  .tab_box {
    .tab_item {
      padding: 10px 0;
      margin-right: 30px;
      cursor: pointer;
      font-size: 28px;
      color: #79a7df;
    }
    .selected {
      color: #ffffff;
    }
  }
  .card_box {
    .card_item {
      height: 100%;
      margin: 10px;
      border-radius: 8px;
      box-shadow: 0 0 10px #5389e2 inset;
      .title_box {
        border-radius: 8px 8px 0 0;
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
}
</style>
