<template>
  <div class="page">
    <Header :logo="info.logo" :title="info.depName" :secondTitle="info.nurseDepName"></Header>
    <div class="statistics_box c_00 flex f_warp">
      <div v-for="item in info.statisticslist" :key="item.type" class="sta_item flex am_c">
        <div class="sta_left_box" :style="{ backgroundColor: item.bg_color }">
          <img :src="item.icon" class="sta_left_view sta_icon" alt="" />
        </div>
        <div class="flex1 t_ct">{{ item.name }}</div>
        <div class="sta_right_box">
          <div class="sta_value">{{ item.num }}</div>
        </div>
      </div>
    </div>
    <div class="flex am_s p_20">
      <div class="left_box flex1 flex f_warp">
        <div v-for="item in info.patientlist" :key="item.id" class="card_item">
          <div class="bed_num_box f20 fw_b t_ct" :style="{ '--bed-bg-color': item.bedBgColor }">{{ item.bedNum }}</div>
          <div class="flex am_c ju_b">
            <div class="t_ct f20 name_box line_1">{{ item.name }}</div>
            <div class="flex am_c ju_b age_box">
              <img v-if="item.sex == '男'" :src="require('@/assets/images/man.png')" class="sec_icon" alt="" />
              <img v-else-if="item.sex == '女'" :src="require('@/assets/images/woman.png')" class="sec_icon" alt="" />
              <div>{{ item.age }}岁</div>
            </div>
          </div>
          <div class="mt_10 flex am_c ju_b">
            <div class="flex am_c">
              <img class="lable_icon" :src="require('@/assets/images/record.png')" alt="" />
              <span class="title">病案号</span>
              <span class="ml_10">{{ item.sickNum }}</span>
            </div>
            <div class="flex am_c">
              <img class="lable_icon ml_10" v-if="item.allergyFlag" :src="item.allergyFlag" alt="" />
              <img class="lable_icon ml_10" v-if="item.dietType" :src="item.dietType" alt="" />
            </div>
          </div>
          <div class="mt_10 flex am_c" v-if="item.userIdentity">
            <img class="lable_icon" :src="require('@/assets/images/man.png')" alt="" />
            <span class="title">身份</span>
            <span class="ml_10">{{ item.userIdentity }}</span>
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
          <div class="flex am_c ju_b mt_15">
            <div class="flex f_warp am_c icon_box">
              <router-link :to="{ path: `/patients/${item.id}?nurseDepId=${$route.query.nurseDepId}` }" class="flex am_c mr_10 mb_5">
                <img class="lable_icon" :src="require('@/assets/images/id_card.png')" alt="" />
              </router-link>
              <template v-for="icon in item.bottomIcons">
                <img class="lable_icon mr_10 mb_5" :key="icon" :src="icon" alt="" />
              </template>
            </div>
            <div class="insurance_box">
              <img class="insurance_img" :src="item.insuranceType" alt="" />
            </div>
          </div>
        </div>
      </div>
      <div class="right_box">
        <div>
          <div class="right_title">高危及异常提醒</div>
          <SwiperView type="remind" :list="info.remindlist"></SwiperView>
        </div>
        <div class="mt_20">
          <div class="right_title">呼叫动态提醒</div>
          <SwiperView type="call" :list="info.calllist"></SwiperView>
        </div>
      </div>
    </div>
    <div class="illustrate_box flex am_c">
      <!-- <div class="flex am_c mr_30">
        <img :src="require('@/assets/images/total.png')" class="total_icon" alt="" />
        <div class="ml_10">全部{{ total }}</div>
      </div> -->
      <div v-for="item in nursingGrades" :key="item.text" class="flex am_c mr_30">
        <div class="bed_num_box" :style="{ '--bg-color': item.color }"></div>
        <div>{{ item.text }}</div>
        <!-- <div>{{ item.total }}</div> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import SwiperView from "@/components/SwiperView.vue";
import { interList } from "@/api/index";
// const patient = require("@/assets/patient.js").json;

@Component({
  name: "PatientsList",
  components: { Header, SwiperView },
})
export default class extends Vue {
  info: any = {};

  nursingGrades = [
    { color: "#652370", text: "特级", total: "36" },
    { color: "#F64FC0", text: "一级", total: "36" },
    { color: "#66D833", text: "二级", total: "36" },
    { color: "#0A33C3", text: "三级", total: "36" },
    // { color: "#AC2921", text: "病危", total: "36" },
    // { color: "#ED9849", text: "病重", total: "36" },
  ];
  total = 100;

  mounted() {
    this.getData();
  }

  async getData() {
    const pid = this.$route.query.nurseDepId;
    const res: any = await interList({ nurseDepId: pid });
    res.patientlist.map((p: any) => {
      const str = p.nursingType + p.riskType;
      p.bottomIcons = str ? str.split(",") : [];
      const grade: any = this.nursingGrades.find((g: any) => g.text == p.nursingGrade);
      p.bedBgColor = grade ? grade.color : "#0A33C3";
    });
    this.info = res;
  }

  skipView(name: string) {
    this.$router.push({ name: name });
  }
}
</script>
<style lang="less" scoped>
.page {
  color: #bdf0fc;
  padding-bottom: 120px;
  .statistics_box {
    font-size: 20px;
    margin: 0 -5px;
    padding: 20px 20px 0 20px;
    .sta_item {
      margin: 0 5px 8px;
      background-color: #cbdffc;
      border-radius: 4px;
      overflow: hidden;
      .sta_left_box {
        position: relative;
        width: 17.5%;
        padding-bottom: 25%;
        height: 0;
        .sta_left_view {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
        }
        .sta_icon {
          // width: 30px;
          height: 100%;
        }
        .bed {
          transform: translate(-50%, -50%) scale(1.5);
        }
        .old_man {
          transform: translate(-50%, -60%);
        }
      }
      .sta_right_box {
        position: relative;
        width: 25%;
        padding-bottom: 25%;
        height: 0;
        border-left: 1px solid #79a7df;
        .sta_value {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -40%);
          text-align: center;
        }
      }
    }
  }
  .left_box {
    margin: 0 -10px;
    .card_item {
      position: relative;
      padding: 15px;
      margin: 0 10px 20px;
      border-radius: 8px;
      // box-shadow: 0 0 10px #5389e2 inset;
      background: #05126c;
      border: 1px solid #79a7df;
      .bed_num_box {
        position: absolute;
        top: -10px;
        left: -5px;
        width: 60px;
        height: 32px;
        line-height: 32px;
        border-radius: 4px 4px 0 0;
        background-color: var(--bed-bg-color);
        // background-color: #1e47cc;
        // box-shadow: 0 2px 5px #1e47cc;
        &::before {
          content: "";
          position: absolute;
          left: -5px;
          top: 10px;
          height: 26px;
          width: 5px;
          background-color: var(--bed-bg-color);
          border-radius: 4px 0 4px 4px;
          // box-shadow: 0 2px 5px #1e47cc;
        }
        &::after {
          content: "";
          position: absolute;
          right: -5px;
          top: 10px;
          height: 26px;
          width: 5px;
          background-color: var(--bed-bg-color);
          border-radius: 0 4px 4px 4px;
          // box-shadow: 0 2px 5px #1e47cc;
        }
      }
      .sec_icon {
        width: 20px;
        height: 20px;
      }
      .lable_icon {
        width: 18px;
        height: 18px;
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
      .icon_box {
        width: calc(100% - 40px);
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
          right: -10px;
          width: 70px;
          height: 70px;
        }
      }
    }
  }
  .right_box {
    width: 26%;
    margin-left: 20px;
    .right_title {
      font-size: 26px;
      font-weight: bold;
      color: #d94c4c;
      text-align: center;
      padding-bottom: 20px;
    }
  }
  .illustrate_box {
    padding: 25px;
    .total_icon {
      width: 25px;
      height: 25px;
    }
    .bed_num_box {
      position: relative;
      margin-right: 20px;
      width: 60px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px 4px 0 0;
      background-color: var(--bg-color);
      transform: translateY(-2px);
      // box-shadow: 0 2px 5px #1e47cc;
      &::before {
        content: "";
        position: absolute;
        left: -5px;
        top: 8px;
        height: 26px;
        width: 5px;
        background-color: var(--bg-color);
        border-radius: 4px 0 4px 4px;
        // box-shadow: 0 2px 5px #1e47cc;
      }
      &::after {
        content: "";
        position: absolute;
        right: -5px;
        top: 8px;
        height: 26px;
        width: 5px;
        background-color: var(--bg-color);
        border-radius: 0 4px 4px 4px;
        // box-shadow: 0 2px 5px #1e47cc;
      }
    }
  }
}
@media screen and (min-width: 2650px) {
  .card_item {
    width: calc(16.6% - 20px);
  }
  .sta_item {
    width: calc(6% - 10px);
  }
}
@media screen and (min-width: 2040px) and (max-width: 2650px) {
  .card_item {
    width: calc(20% - 20px);
  }
  .sta_item {
    width: calc(8% - 10px);
  }
}
@media screen and (min-width: 1440px) and (max-width: 2040px) {
  .card_item {
    width: calc(25% - 20px);
  }
  .sta_item {
    width: calc(10% - 10px);
  }
}
@media screen and (min-width: 1240px) and (max-width: 1660px) {
  .card_item {
    width: calc(33.3% - 20px);
  }
  .sta_item {
    width: calc(10% - 10px);
  }
}
@media screen and (max-width: 1240px) {
  .card_item {
    width: calc(50% - 20px);
  }
  .sta_item {
    width: calc(10% - 10px);
  }
}
</style>
