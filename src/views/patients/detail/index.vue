<template>
  <div class="page">
    <Header :title="info.depName"></Header>
    <div class="patients_detail_box flex">
      <div class="flex1 card">
        <div class="flex am_c mb_20">
          <img class="type_icon" :src="require('@/assets/images/patient_detail/icon_infomation.png')" alt="" />
          <div class="patient_header_text">
            <div>个人信息</div>
            <div class="english">personal information</div>
          </div>
          <div class="flex flex1">
            <div class="patient_info_h1">张*三</div>
            <div class="patient_info_h1">男</div>
            <div class="patient_info_h1">30岁</div>
          </div>
        </div>
        <div class="patient_info_h2 flex">
          <div>病案号 ：</div>
          <div class="patient_info_text">20000000001</div>
        </div>
        <div class="patient_info_h2 flex">
          <div>入院时间 ：</div>
          <div class="patient_info_text">2000-12-12 12:20</div>
        </div>
        <div class="patient_info_h2 flex">
          <div>入院请款 ：</div>
          <div class="patient_info_text">入院情况入院情况入院情况入院情况</div>
        </div>
        <div class="patient_info_h2 flex">
          <div>医保类型 ：</div>
          <div class="patient_info_text">个人个人</div>
        </div>
        <div class="flex">
          <div class="patient_info_h2 flex flex1">
            <div>医生 ：</div>
            <div class="patient_info_text">李四</div>
          </div>
          <div class="patient_info_h2 flex flex1">
            <div>护士 ：</div>
            <div class="patient_info_text">王五</div>
          </div>
        </div>
        <div class="flex am_c mt_30 mb_20">
          <img class="type_icon" :src="require('@/assets/images/patient_detail/nursing_marks.png')" alt="" />
          <div class="patient_header_text">
            <div>护理标识</div>
            <div class="english">nursing marks</div>
          </div>
        </div>
        <div class="flex">
          <div class="patient_info_h2 flex flex1">
            <div>护理等级 ：</div>
            <div class="patient_info_text">A级</div>
          </div>
          <div class="patient_info_h2 flex flex1">
            <div>病情状态 ：</div>
            <div class="patient_info_text">正常</div>
          </div>
        </div>
        <div class="flex">
          <div class="patient_info_h2 flex flex1">
            <div>过敏信息 ：</div>
            <div class="patient_info_text">暂无过敏信息</div>
          </div>
          <div class="patient_info_h2 flex flex1">
            <div>饮食类型 ：</div>
            <div class="patient_info_text">清淡饮食</div>
          </div>
        </div>
        <div class="flex am_c mt_30 mb_20">
          <img class="type_icon" :src="require('@/assets/images/patient_detail/risk_manage.png')" alt="" />
          <div class="patient_header_text">
            <div>风险管理</div>
            <div class="english">risk manage</div>
          </div>
        </div>
        <div class="patient_info_h2 flex flex1">
          <div>风险类型 ：</div>
          <div class="patient_info_text">我是风险类型</div>
        </div>
        <div class="patient_info_h2 flex flex1 ju_e">
          <router-link :to="{ name: 'RiskRecord' }" class="link_text">查看风险评估记录>></router-link>
        </div>
        <div class="flex am_c mb_20">
          <img class="type_icon" :src="require('@/assets/images/patient_detail/sign_detection.png')" alt="" />
          <div class="patient_header_text">
            <div>体征检测</div>
            <div class="english">sign detection</div>
          </div>
        </div>
        <div class="flex">
          <div class="patient_info_h2 flex flex1">
            <div>体温 ：</div>
            <div class="patient_info_text">36.5</div>
          </div>
          <div class="patient_info_h2 flex flex1">
            <div>脉搏 ：</div>
            <div class="patient_info_text">90次/分</div>
          </div>
          <div class="patient_info_h2 flex flex1">
            <div>呼吸 ：</div>
            <div class="patient_info_text">45次/分</div>
          </div>
        </div>
        <div class="flex">
          <div class="patient_info_h2 flex flex1">
            <div>血压 ：</div>
            <div class="patient_info_text">80/120 mmHg</div>
          </div>
          <div class="patient_info_h2 flex flex1">
            <div>血氧 ：</div>
            <div class="patient_info_text">100mmH2O</div>
          </div>
          <div class="patient_info_h2 flex flex1">
            <div>血糖 ：</div>
            <div class="patient_info_text">7.8mmol/L</div>
          </div>
        </div>
        <div class="flex">
          <div class="patient_info_h2 flex flex1">
            <div>心电监护 ：</div>
            <div class="patient_info_text">正常</div>
          </div>
          <div class="patient_info_h2 flex flex1">
            <div>核酸检测 ：</div>
            <div class="patient_info_text">阴性</div>
          </div>
          <div class="patient_info_h2 flex flex1 ju_e">
            <router-link :to="{ name: 'RiskRecord' }" class="link_text">点击查看>></router-link>
          </div>
        </div>
        <div class="flex am_c mt_30 mb_20">
          <img class="type_icon" :src="require('@/assets/images/patient_detail/cost_information.png')" alt="" />
          <div class="patient_header_text">
            <div>费用信息</div>
            <div class="english">cost information</div>
          </div>
        </div>
        <div class="patient_info_h2 flex flex1">
          <div>预交款 ：</div>
          <div class="patient_info_text">362.5</div>
        </div>
        <div class="patient_info_h2 flex flex1">
          <div>总花费 ：</div>
          <div class="patient_info_text">362.5</div>
        </div>
        <div class="patient_info_h2 flex flex1">
          <div>余额 ：</div>
          <div class="patient_info_text">0.0</div>
        </div>
      </div>

      <div class="flex2 card operation_box ml_40">
        <div class="flex am_c tab_box">
          <div class="tab_item" :class="{ selected: tab === 0 }" @click="tab = 0">诊疗医嘱</div>
          <div class="tab_item" :class="{ selected: tab === 1 }" @click="tab = 1">处方医嘱</div>
        </div>
        <div>
          <div class="title_box flex am_c" v-show="tab == 0">
            <div v-for="item in titleList" :key="item.label" class="flex col am_c title_item" :style="item.style">
              <div>{{ item.label }}</div>
              <!-- <div>{{ item.eng }}</div> -->
            </div>
          </div>
          <div class="title_box flex am_c" v-show="tab == 1">
            <div v-for="item in titleList1" :key="item.label" class="flex col am_c title_item" :style="item.style">
              <div>{{ item.label }}</div>
              <!-- <div>{{ item.eng }}</div> -->
            </div>
          </div>
          <div class="list_box" v-show="tab == 0">
            <div v-for="item in info.operatelist" :key="item.label" class="flex am_c list_item">
              <div class="t_ct col_item line1" :style="titleList[0].style">{{ item.id }}</div>
              <div class="t_ct col_item line1" :style="titleList[1].style">{{ item.name }}</div>
              <div class="t_ct col_item line1" :style="titleList[2].style">{{ item.sex }}</div>
              <div class="t_ct col_item line1" :style="titleList[3].style">{{ item.age }}</div>
              <div class="t_ct col_item line1" :style="titleList[4].style">{{ item.operateDate }}</div>
              <div class="t_ct col_item line1" :style="titleList[5].style">{{ item.operateRoom }}</div>
              <div class="t_ct col_item line1" :style="titleList[6].style">{{ item.operateName }}</div>
              <div class="t_ct col_item line1" :style="titleList[7].style">{{ item.anesthesiaMode }}</div>
              <div class="t_ct col_item line1" :style="titleList[8].style">{{ item.chiefSurgeon }}</div>
            </div>
          </div>
          <div class="list_box" v-show="tab == 1">
            <div v-for="item in info.orderlist" :key="item.label" class="flex am_c list_item">
              <div class="t_ct col_item line1" :style="titleList1[0].style">{{ item.id }}</div>
              <div class="t_ct col_item line1" :style="titleList1[1].style">{{ item.name }}</div>
              <div class="t_ct col_item line1" :style="titleList1[2].style">{{ item.orderType }}</div>
              <div class="t_ct col_item line1" :style="titleList1[3].style">{{ item.proName }}</div>
              <div class="t_ct col_item line1" :style="titleList1[4].style">{{ item.orderDate }}</div>
              <div class="t_ct col_item line1" :style="titleList1[5].style">{{ item.proMode }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="patients_detail_box flex col">
      <div class="flex flex2">
        <div class="detail_info card flex col ju_a">
          <div class="title">基本信息</div>
          <div class="flex am_c mt_20 flex1">
            <div class="flex1">姓名：{{ info.patient.name }}</div>
            <div class="flex1">性别：{{ info.patient.sex }}</div>
            <div class="flex1">年龄：{{ info.patient.age }}岁</div>
          </div>
          <div class="flex am_c mt_20 flex1">
            <div class="flex2">病案号：{{ info.patient.sickNum }}</div>
            <div class="flex1">医生：{{ info.patient.chargeDoctorName }}</div>
          </div>
          <div class="flex am_c mt_20 flex1">
            <div class="flex2">入院时间：{{ info.patient.admissionTime }}</div>
            <div class="flex1">医保类型：{{ info.patient.insuranceType }}</div>
          </div>
        </div>
        <div class="flex2 card flex col ml_40">
          <div class="title">费用信息</div>
          <div class="mt_20 flex1 flex am_c">预交款：{{ info.patient.advancePayment }}元</div>
          <div class="mt_20 flex1 flex am_c">总花费：{{ info.patient.totalCost }}元</div>
          <div class="mt_20 flex1 flex am_c">余额：{{ info.patient.surplusMoney }}元</div>
        </div>
      </div>
      <div class="flex flex3 mt_40">
        <div class="flex1 card flex col">
          <div class="title">护理标识</div>
          <div class="mt_20 flex1 flex am_c">护理等级：{{ info.patient.nursingGrade }}</div>
          <div class="mt_20 flex1 flex am_c">病情状态：{{ info.patient.illnessState }}</div>
          <div class="mt_20 flex1 flex am_c">过敏信息：{{ info.patient.allergyInfo }}</div>
          <div class="mt_20 flex1 flex am_c">饮食类型：{{ info.patient.dietType }}</div>
        </div>
        <div class="flex1 card flex col ju_b ml_40">
          <div class="title">风险管理</div>
          <div class="mt_20 flex3">风险类型：{{ info.patient.riskType }}</div>
          <div class="view_risk flex1 flex am_c ju_e">
            <span @click="skipView('/risk')">点击查看评估记录<i class="el-icon-arrow-right"></i></span>
          </div>
        </div>
        <div class="flex1 card flex col ju_b ml_40">
          <div class="title">处方医嘱</div>
          <div class="mt_20 mb_60 flex4">{{ info.patient.docotorAdvice }}</div>
        </div>
        <div class="flex1 card flex col ju_b ml_40">
          <div class="title">诊疗医嘱</div>
          <div class="mt_20 mb_60 flex4">{{ info.patient.medicalAdvice }}</div>
        </div>
        <div class="flex1 card flex col ju_b ml_40">
          <div class="title">嘱托术语</div>
          <div class="mt_20 mb_60 flex4">{{ info.patient.entrustTerms }}</div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import { interDetail } from "@/api/index";
// const info = require("@/assets/patient_detail.js").json;

@Component({
  name: "PatientsDetail",
  components: { Header },
})
export default class extends Vue {
  info: any = {};

  tab = 0;

  titleList = [
    { label: "类型", eng: "adviceType", style: "width: 60px" },
    { label: "项目名称", eng: "adviceName", style: "width: 350px" },
    { label: "执行频率", eng: "adviceRate", style: "width: 180px" },
    { label: "下嘱医生", eng: "doctorName", style: "flex: 1" },
    { label: "下嘱时间", eng: "adviceDate", style: "flex: 1" },
    { label: "医嘱状态", eng: "adviceState", style: "width: 180px" },
    { label: "停止时间", eng: "stopTime", style: "width: 180px" },
  ];
  titleList1 = [
    { label: "编号", eng: "dviceNum", style: "flex: 1" },
    { label: "药品名称", eng: "drugName", style: "flex: 1" },
    { label: "使用方法", eng: "usageMethod", style: "flex: 1" },
    { label: "执行频率", eng: "adviceRate", style: "flex: 1" },
    { label: "执行剂量", eng: "adviceDose", style: "flex: 1.3" },
    { label: "单位", eng: "adviceUnit", style: "flex: 1" },
    { label: "类型", eng: "adviceType", style: "flex: 1" },
    { label: "下嘱医生", eng: "doctorName", style: "flex: 1" },
    { label: "下嘱时间", eng: "adviceDate", style: "flex: 1" },
    { label: "医嘱状态", eng: "adviceState", style: "flex: 1" },
    { label: "组标", eng: "adviceGroup", style: "flex: 1" },
    { label: "停止时间", eng: "stopTime", style: "flex: 1" },
  ];

  mounted() {
    this.getData();
  }

  async getData() {
    const res = await interDetail({ id: this.$route.params.id });
    this.info = res;
  }

  // 跳转评估记录
  skipView(path: string) {
    this.$router.push({ path: path });
  }
}
</script>

<style lang="less" scoped>
.page {
  padding-bottom: 110px;
  .patients_detail_box {
    margin: 30px;
    font-size: 20px;
    min-height: calc(100vh - 160px);
    .title {
      color: #00a3ff;
      font-weight: 600;
      font-size: 28px;
      display: flex;
      align-items: center;
      flex: 1;
    }
    .card {
      // border: 8px solid #1e47cc;
      box-shadow: 0 0 10px #5389e2 inset;
      border-radius: 12px;
      padding: 30px;
    }
    .type_icon {
      width: 50px;
      height: 50px;
    }
    .patient_header {
      align-items: center;
    }
    .patient_header_text {
      margin-left: 12px;
      width: 150px;
      font-size: 24px;
    }
    .patient_info_h1 {
      margin: 0 15px;
      font-size: 28px;
      flex: 1;
      text-align: center;
      color: #ffffff;
    }
    .patient_info_h2 {
      padding: 10px 0px;
    }
    .patient_info_text {
      color: #ffffff;
    }
    .link_text {
      color: #7cb785;
      text-decoration: underline;
    }
    .detail_info {
      flex: 5;
    }
    .view_risk {
      margin-top: 60px;
      color: #9ace9d;
      span {
        cursor: pointer;
      }
    }
    .mb_60 {
      margin-bottom: 60px;
    }
    .english {
      font-size: 16px;
    }
    .tab_box {
      margin-top: -10px;
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
    .title_box {
      .title_item {
        padding: 15px 10px;
      }
    }
    .list_box {
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
