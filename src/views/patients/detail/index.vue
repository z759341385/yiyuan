<template>
  <div class="page">
    <Header :title="info.depName"></Header>
    <div class="patients_detail_box flex row">
      <div class="flex am_c flex1 card">
        <div class="col">
          <div class="patient_header flex row">
            <img class="type_icon" :src="require('@/assets/images/icon_infomation.png')" alt="" />
            <div class="patient_header_text flex col">
              <div>个人信息</div>
              <div class="english">personal information</div>
            </div>
            <div class="flex row">
              <div class="patient_info_h1 ">张*三</div>
              <div class="patient_info_h1">男</div>
              <div class="patient_info_h1 ">30岁</div>
            </div>
          </div>
          <div class="patient_info_h2 flex row">
          <div>病案号 ：</div>
          <div class="patient_info_text">20000000001</div>
          </div>
          <div class="patient_info_h2 flex row">
          <div>入院时间 ：</div>
          <div class="patient_info_text">2000-12-12 12:20</div>
          </div>
          <div class="patient_info_h2 flex row">
          <div>入院请款 ：</div>
          <div class="patient_info_text">入院情况入院情况入院情况入院情况</div>
          </div>
           <div class="patient_info_h2 flex row">
          <div>医保类型 ：</div>
          <div class="patient_info_text">个人个人</div>
          </div> 
            <div class="flex row">
               <div class="patient_info_h2 flex row" style="width: 50%">
          <div>医生 ：</div>
          <div class="patient_info_text">李四</div>
          </div>
          <div class="patient_info_h2 flex row" style="width: 50%">
          <div>护士 ：</div>
          <div class="patient_info_text">王五</div>
          </div>
            </div>
        </div>
      </div>

      <div class="flex am_c flex2 card ml_40"></div>
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
.patients_detail_box {
  margin: 30px;
  font-size: 20px;
  height: calc(100vh - 160px);
  .title {
    color: #00a3ff;
    font-weight: 600;
    font-size: 28px;
    display: flex;
    align-items: center;
    flex: 1;
  }
  .patient_header{
    align-items: center;

  }
  .patient_header_text {
    margin-left: 12px;
    padding-bottom: 0;
    font-size: 24px;
  }
  .patient_info_h1 {
    margin-left: 30px;
    font-size: 28px;
    width: 150px;
    text-align: center;
    color: #ffffff;
  }
  .patient_info_h2{
   padding: 8px 0px 8px 0px;
        margin-left: 12px;

  }
  .patient_info_text{
        color: #ffffff;

  }
  .card {
    // border: 8px solid #1e47cc;
    box-shadow: 0 0 10px #5389e2 inset;
    border-radius: 12px;
    padding: 20px;
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
    font-size: 14px;
  }
  .type_icon {
    width: 60px;
    height: 60px;
  }
}
</style>
