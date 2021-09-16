<template>
  <div class="top flex ju_b">
    <div class="left flex am_e">
      <img :src="require('../assets/images/logo.png')" class="logo" alt="" />
      <img :src="require('@/assets/images/zuobhuadong.png')" alt="" />
    </div>
    <div class="flex ju_c am_s middle">
      <img :src="require('@/assets/images/zhuangshi_l.png')" alt="" />
      <img :src="require('../assets/images/biaoti_bg.png')" class="biaoti_bg" alt="" />
      <img :src="require('@/assets/images/zhuangshi_r.png')" alt="" />
      <div class="title">{{ title }}</div>
    </div>
    <div class="right flex am_e">
      <img :src="require('@/assets/images/zuobhuadong.png')" alt="" />
      <div class="date flex am_c">{{ formatDate }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "Header",
  components: {},
})
export default class extends Vue {
  @Prop() title!: any;
  @Prop() date!: any;

  timer: any = null;
  localTime = (this as any).$moment().locale("zh-cn");

  get formatDate() {
    if (this.date) {
      return this.date;
    } else {
      return this.localTime.format("YYYY-MM-DD dddd HH:mm");
    }
  }

  mounted() {
    if (!this.date && !this.timer) {
      this.timer = setInterval(() => {
        this.localTime = (this as any).$moment().locale("zh-cn");
      }, 1000);
    }
  }
}
</script>
<style lang="less" scoped>
.top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  .left {
    width: 23%;
    .logo {
      position: absolute;
      top: 0;
      left: 20px;
      width: 300px;
      height: 70px;
      object-fit: cover;
    }
    img {
      width: 100%;
    }
  }
  .middle {
    position: relative;
    width: 56%;
    padding: 0 40px;
    .title {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -60%);
      font-size: 32px;
      color: white;
    }
    .biaoti_bg {
      height: 110%;
    }
  }
  .right {
    width: 23%;
    img {
      width: 100%;
    }
    .date {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-55%);
      color: #72b0fd;
      font-size: 22px;
      font-weight: bold;
      margin-left: 10px;
      span {
        color: #72b0fd;
        font-size: 22px;
        font-weight: bold;
        margin-left: 10px;
        p {
          color: #72b0fd;
          font-size: 24px;
          font-weight: bold;
          margin-left: 20px;
        }
      }
    }
  }
}
</style>
