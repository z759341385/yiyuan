<template>
  <div class="page">
    <Header :title="patient.depName"></Header>
    <div class="flex p_20">
      <div class="left flex1 flex f_warp">
        <div v-for="item in patient.patientlist" :key="item.id" class="card_item">
          <div class="bed_num_box f20 fw_b t_ct">{{ item.bedNum }}</div>
          <div class="flex am_c ju_b">
            <div class="t_ct f20 name_box line_1">{{ item.name }}</div>
            <div class="flex am_c ju_b age_box">
              <img v-if="item.sex == '男'" :src="require('@/assets/images/man.png')" class="sec_icon" alt="" />
              <img v-else-if="item.sex == '女'" :src="require('@/assets/images/woman.png')" class="sec_icon" alt="" />
              <div>{{ item.age }}岁</div>
            </div>
          </div>
          <div class="mt_10 flex am_c">
            <img class="lable_icon" :src="require('@/assets/images/record.png')" alt="" />
            <span class="title">病案号</span>
            <span class="ml_10">{{ item.sickNum }}</span>
          </div>
          <div class="mt_10 flex am_c">
            <img class="lable_icon" :src="require('@/assets/images/doctor.png')" alt="" />
            <span class="title">医生</span>
            <span class="ml_10">{{ item.chargeDoctorName }}</span>
          </div>
          <div class="mt_10 flex am_c">
            <img class="lable_icon" :src="require('@/assets/images/time_record.png')" alt="" />
            <span class="title">入院时间</span>
            <span class="ml_10">{{ item.admissionTime }}</span>
          </div>
          <div class="flex am_c ju_b mt_15 mb_5">
            <div class="flex am_c">
              <img class="lable_icon" :src="require('@/assets/images/id_card.png')" alt="" />
              <img class="lable_icon ml_10" v-if="item.nursingGrade == '一级'" :src="require('@/assets/images/number_1.png')" alt="" />
              <img class="lable_icon ml_10" v-else-if="item.nursingGrade == '二级'" :src="require('@/assets/images/number_2.png')" alt="" />
            </div>
            <div class="insurance_box">
              <div class="insurance_text">{{ item.insuranceType }}</div>
              <img class="insurance_img" :src="require('@/assets/images/seal.png')" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="right"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
const patient = require("@/assets/patient.js").json;

@Component({
  name: "PatientsList",
  components: { Header },
})
export default class extends Vue {
  patient = patient;

  skipView(name: string) {
    this.$router.push({ name: name });
  }
}
</script>
<style lang="less" scoped>
.page {
  color: #bdf0fc;
  .left {
    margin: 0 -10px;
    .card_item {
      position: relative;
      padding: 15px;
      margin: 0 10px 10px;
      border-radius: 8px;
      box-shadow: 0 0 10px #5389e2 inset;
      .sec_icon {
        width: 20px;
        height: 20px;
      }
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
      .name_box {
        width: calc(100% - 140px);
        margin-left: 70px;
      }
      .age_box {
        width: 70px;
      }
      .title {
        font-weight: 600;
        color: #5389e2;
        margin-left: 5px;
      }
      .insurance_box {
        position: absolute;
        overflow: hidden;
        bottom: 0;
        right: 0;
        width: 70px;
        height: 70px;
        .insurance_text {
          position: absolute;
          bottom: -10px;
          right: 0;
          width: 70px;
          height: 70px;
          line-height: 70px;
          text-align: center;
        }
        .insurance_img {
          position: absolute;
          bottom: -10px;
          right: 0;
          width: 70px;
          height: 70px;
        }
      }
    }
  }
  .right {
    width: 480px;
    margin: 0 15px;
    .title {
      font-size: 26px;
      font-weight: bold;
      color: #d94c4c;
      text-align: center;
      padding-bottom: 20px;
    }
  }
}
@media screen and (min-width: 1200px) {
  .card_item {
    width: 25%;
  }
}
@media screen and(min-width: 960px) and (max-width: 1199px) {
  .card_item {
    width: 20%;
  }
}
@media screen and(min-width: 768px) and (max-width: 959px) {
  .card_item {
    width: 20%;
  }
}
@media screen and(min-width: 480px) and (max-width: 767px) {
  .card_item {
    width: 20%;
  }
}
@media screen and (max-width: 479px) {
  .card_item {
    width: 20%;
  }
}
</style>
