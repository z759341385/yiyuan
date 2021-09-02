<template>
  <div class="page">
    <Header :title="info.depName"></Header>
    <div class="flex am_s p_20">
      <div class="left_box flex1 flex f_warp">
        <div v-for="item in info.patientlist" :key="item.id" class="card_item">
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
              <router-link :to="{ name: 'PatientsDetail', params: { id: item.id } }">
                <img class="lable_icon" :src="require('@/assets/images/id_card.png')" alt="" />
              </router-link>
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import SwiperView from "@/components/SwiperView.vue";
import { interList } from "@/api";
// const patient = require("@/assets/patient.js").json;

@Component({
  name: "PatientsList",
  components: { Header, SwiperView },
})
export default class extends Vue {
  info: any = {};

  mounted() {
    this.getData();
  }

  async getData() {
    const res = await interList({ depid: 1 });
    this.info = res;
    console.log(res);
  }

  skipView(name: string) {
    this.$router.push({ name: name });
  }
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
      margin: 0 10px 20px;
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
}
@media screen and (min-width: 2650px) {
  .card_item {
    width: calc(16.6% - 20px);
  }
}
@media screen and (min-width: 2040px) and (max-width: 2650px) {
  .card_item {
    width: calc(20% - 20px);
  }
}
@media screen and (min-width: 1440px) and (max-width: 2040px) {
  .card_item {
    width: calc(25% - 20px);
  }
}
@media screen and (min-width: 1240px) and (max-width: 1660px) {
  .card_item {
    width: calc(33.3% - 20px);
  }
}
@media screen and (max-width: 1240px) {
  .card_item {
    width: calc(50% - 20px);
  }
}
</style>
