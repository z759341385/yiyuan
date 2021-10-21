<template>
  <div class="page">
    <Header :logo="info.logo" :title="info.depName" :secondTitle="info.nurseDepName"></Header>
    <div class="flex pl_20 pr_20">
      <div class="card_item flex col am_c">
        <img class="mt_40 img" :src="info.hsz.photo" />
        <div class="mt_40 mb_40">{{ info.hsz.type }}</div>
        <div class="mt_20 mb_60">{{ info.hsz.name }}</div>
      </div>
      <div class="card_item flex col am_c">
        <img class="mt_40 img" :src="info.hlbzr.photo" />
        <div class="mt_40 mb_40">{{ info.hlbzr.type }}</div>
        <div class="mt_20 mb_60">{{ info.hlbzr.name }}</div>
      </div>
    </div>
    <div class="flex f_warp pl_20 pr_20">
      <div v-for="item in info.zbhsArr" :key="item.id" class="card_item flex col am_c">
        <img class="mt_40 img" :src="item.photo" />
        <div class="mt_40 mb_40">{{ item.type }}</div>
        <div class="mt_20 mb_60">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import SwiperView from "@/components/SwiperView.vue";
import { userlist } from "@/api/index";
// const info = require("@/assets/patient.js").json;

@Component({
  name: "NursingStation",
  components: { Header, SwiperView },
})
export default class extends Vue {
  info: any = {};

  mounted() {
    this.getData();
  }

  async getData() {
    const pid = this.$route.query.nurseDepId;
    const res = await userlist({ nurseDepId: pid });
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
  .card_item {
    position: relative;
    padding: 15px;
    height: 300pt;
    margin: 50px 10px 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px #5389e2 inset;
    .img {
      width: 130px;
      height: 160px;
      object-fit: cover;
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
