<template>
  <div class="page">
    <!-- <Header secondTitle="输液监控中心" :date="nowDate"></Header> -->
    <Header :logo="info.logo" :title="info.depName" :secondTitle="info.nurseDepName"></Header>
    <div class="content flex f_warp" :style="{ marginLeft: marLR + 'px', marginRight: marLR + 'px' }">
      <div
        class="item"
        v-for="(item, index) in list"
        :key="item.uid + '_' + index"
        :class="[item.status, item.callStatus == '呼叫中' ? 'calling' : '']"
      >
        <!-- @click="clickItem(item.callStatus, item.uid)" -->
        <div class="horn"></div>
        <div class="battery">
          <div class="battery_box">
            <div
              class="bat_num"
              :class="[item.battery / 4.2 <= 0.2 ? 'red_bat' : item.status == 'normal' ? 'green_bat' : 'white_bat']"
              :style="{ width: Math.round((item.battery / 4.2) * 24) + 'px' }"
            ></div>
          </div>
        </div>
        <div class="flex ju_c am_c list_top">
          <div class="f30">{{ item.bedno }}</div>
        </div>
        <div class="flex ju_c c_ff">
          <div>{{ item.devstatus ? item.devstatus : "待机" }}</div>
        </div>
        <div class="flex ju_b am_c list_top">
          <div class="">{{ item.patients }}</div>
          <div class="">{{ item.weightNominal }}ml</div>
        </div>
        <div class="progress_box flex ju_c">
          <svg-progress-bar :value="item.remaining" :item="item" :options="options"></svg-progress-bar>
        </div>
        <div class="flex am_c mt_10"></div>
      </div>
    </div>
    <div class="bottom_box flex ju_c am_c">
      <div class="bot_item">
        <span>输液异常：</span>
        <span>{{ info.syycnum || 0 }}</span>
      </div>
      <div class="bot_item">
        <span>输液中：</span>
        <span>{{ info.synum || 0 }}</span>
      </div>
      <div class="bot_item">
        <span>输液即将结束：</span>
        <span>{{ info.jjjsnum || 0 }}</span>
      </div>
    </div>
    <div id="audioBox" style="display: none"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import svg from "../../../public/svg-progress-bar";
import Header from "@/components/Header.vue";
import { infusionMonitor } from "@/api/index";

@Component({
  name: "Infusion",
  components: { Header, ["svg-progress-bar"]: svg }
})
export default class extends Vue {
  timer: any = null;
  info: any = {};
  marLR = 0;
  audioList: any = [];
  list: any = [];
  history: any = [];

  get options() {
    return {
      radius: 60,
      circleWidth: 6,
      textColor: "white",
      pathColors: ["transparent", "#73E08E"],
      // gradientColor: ['#4DC6C7', '#A0FF4B'],
      duration: 0,
      text: (value: any, item: any) => {
        const yaoping = require("@/assets/images/yaoping_icon.png");
        const dripSpeedLow = require("@/assets/images/drip_speed_low.png");
        const dripSpeedFast = require("@/assets/images/drip_speed_fast.png");
        const batteryLow = require("@/assets/images/battery_low.png");
        const wancheng = require("@/assets/images/wancheng_icon.png");
        let html = "";
        if (item.status === "take_edicine") {
          html += '<div class=""><img class="yaoping_icon" src="' + yaoping + '"></div><div class="f12">' + item.devstatus + "</div>";
        } else if (item.status === "drip_speed_low") {
          html += '<div class=""><img class="drip_speed_low_icon" src="' + dripSpeedLow + '"></div><div class="f12">' + item.devstatus + "</div>";
        } else if (item.status === "drip_speed_fast") {
          html += '<div class=""><img class="drip_speed_fast_icon" src="' + dripSpeedFast + '"></div><div class="f12">' + item.devstatus + "</div>";
        } else if (item.status === "battery_low") {
          html += '<div class=""><img class="battery_low_icon" src="' + batteryLow + '"></div><div class="f12">' + item.devstatus + "</div>";
        } else if (item.status === "complete") {
          html += '<div class="f12">' + item.devstatus + '</div><div><img class="wancheng_icon" src="' + wancheng + '"></div>';
        } else {
          html += '<div class="f12">余量</div><div><span class="f20 fw_b">' + item.weightLiquid + "</span>ml</div>";
        }
        if (item.status !== "take_edicine") {
          html += '<div class="f12 mt_5">' + item.flowRate + "滴/分钟</div>";
        }
        return html;
      }
    };
  }

  get nowDate() {
    if (this.list && this.list.length > 0) {
      return this.list[0].nowTime;
    } else {
      return "";
    }
  }

  mounted() {
    this.$nextTick(() => {
      this.onresize();
    });
    window.onresize = () => {
      this.onresize();
    };
    this.getData();

    this.timer = setInterval(() => {
      this.getData();
    }, 5000);
  }

  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  // 屏幕宽度监听
  onresize() {
    const clientWidth = document.body.clientWidth;
    const ml = (clientWidth - Math.floor(clientWidth / 240) * 240) / 2;
    this.marLR = ml;
  }

  // 获取页面参数
  getQueryString(name: any) {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) {
      return decodeURIComponent(r[2]);
    }
    return "";
  }

  async getData() {
    const pid = this.$route.query.nurseDepId;
    const res: any = await infusionMonitor({ nurseDepId: pid });
    this.info = res;
    const data = res.list;
    const arr = [];
    const his = [];
    // data[0].devstatus = "开始输液异常";
    // data[0].remaining = 60;
    // data[2].devstatus = "输液结束";
    // data[0].remaining = 60;
    // data[0].devstatus = "滴速过快";
    // data[3].devstatus = "滴速过慢";
    // data[4].devstatus = "低电离线";
    // data[0].devstatus = "输液结束";
    // data[5].callStatus = "呼叫中";
    for (const i in data) {
      const findItem: any = this.list.find((v: any) => v.uid == data[i].uid);
      switch (data[i].devstatus) {
        case "滴速过快":
        case "滴速过慢":
        case "低电离线":
        case "输液结束":
        case "输液强制结束":
          if (!findItem || findItem.devstatus != data[i].devstatus) {
            let bedno = data[i].bedno;
            bedno = bedno.replace("床", "");
            if (bedno.indexOf("加") != -1) {
              bedno = bedno.replace("加", "");
              const addMp3 = require("@/assets/mp3/add.mp3");
              arr.push(addMp3);
            }
            for (let k = 0; k < bedno.length; k++) {
              if (bedno.length > 1 && k == 0) {
                if (bedno[k] == 1) {
                  const tenMp3 = require("@/assets/mp3/10.mp3");
                  arr.push(tenMp3);
                } else {
                  const bednoMp3 = require("@/assets/mp3/" + bedno[k] + ".mp3");
                  const tenMp3 = require("@/assets/mp3/10.mp3");
                  arr.push(bednoMp3);
                  arr.push(tenMp3);
                }
              } else if (bedno[k] != 0) {
                const bednoMp3 = require("@/assets/mp3/" + bedno[k] + ".mp3");
                arr.push(bednoMp3);
                // arr.push("assets/mp3/" + bedno[k] + ".mp3");
              }
            }
          }
          break;
      }
      switch (data[i].devstatus) {
        case "开始输液异常":
          data[i].status = "abnormal";
          data[i].statusText = "异常";
          break;
        case "药瓶已取走":
          data[i].status = "take_edicine";
          data[i].statusText = "取药";
          break;
        case "滴速过快":
          data[i].status = "drip_speed_fast";
          if (!findItem || findItem.devstatus != data[i].devstatus) {
            const fastMp3 = require("@/assets/mp3/drip_speed_fast.mp3");
            arr.push(fastMp3);
            // arr.push("assets/mp3/drip_speed_fast.mp3");
          }
          his.push(data[i].uid + data[i].status);
          break;
        case "滴速过慢":
          data[i].status = "drip_speed_low";
          if (!findItem || findItem.devstatus != data[i].devstatus) {
            const lowMp3 = require("@/assets/mp3/drip_speed_low.mp3");
            arr.push(lowMp3);
            // arr.push("assets/mp3/drip_speed_low.mp3");
          }
          his.push(data[i].uid + data[i].status);
          break;
        case "低电离线":
          data[i].status = "battery_low";
          if (!findItem || findItem.devstatus != data[i].devstatus) {
            const batMp3 = require("@/assets/mp3/battery_low.mp3");
            arr.push(batMp3);
            // arr.push("assets/mp3/battery_low.mp3");
          }
          his.push(data[i].uid + data[i].status);
          break;
        case "输液结束":
        case "输液强制结束":
          data[i].status = "complete";
          data[i].statusText = "完成";
          if (!findItem || findItem.devstatus != data[i].devstatus) {
            const endMp3 = require("@/assets/mp3/end.mp3");
            arr.push(endMp3);
            // arr.push("assets/mp3/end.mp3");
          }
          his.push(data[i].uid + data[i].status);
          break;
        default:
          data[i].status = "normal";
          data[i].statusText = "正常";
          break;
      }
      if ((!findItem || findItem.devstatus != data[i].devstatus) && data[i].callStatus == "呼叫中") {
        let bedno = data[i].bedno;
        bedno = bedno.replace("床", "");
        if (bedno.indexOf("加") != -1) {
          bedno = bedno.replace("加", "");
          const addMp3 = require("@/assets/mp3/add.mp3");
          arr.push(addMp3);
          // arr.push("assets/mp3/add.mp3");
        }
        for (let k = 0; k < bedno.length; k++) {
          if (bedno.length > 1 && k == 0) {
            if (bedno[k] == 1) {
              const tenMp3 = require("@/assets/mp3/10.mp3");
              arr.push(tenMp3);
              // arr.push("assets/mp3/10.mp3");
            } else {
              const bednoMp3 = require("@/assets/mp3/" + bedno[k] + ".mp3");
              const tenMp3 = require("@/assets/mp3/10.mp3");
              arr.push(bednoMp3);
              arr.push(tenMp3);
              // arr.push("assets/mp3/" + bedno[k] + ".mp3");
              // arr.push("assets/mp3/10.mp3");
            }
          } else if (bedno[k] != 0) {
            const bednoMp3 = require("@/assets/mp3/" + bedno[k] + ".mp3");
            arr.push(bednoMp3);
            // arr.push("assets/mp3/" + bedno[k] + ".mp3");
          }
        }
        const callMp3 = require("@/assets/mp3/call.mp3");
        arr.push(callMp3);
        // arr.push("assets/mp3/call.mp3");
        his.push(data[i].uid + "calling");
      }
    }
    // console.log(arr, this.audioList.length)
    // if (this.audioList.length == 0 && this.arrayDeal(his)) {
    // this.history = his;
    if (arr.length > 0) {
      if (this.audioList.length == 0) {
        this.audioList = arr;
        this.audioAutoPlay();
      } else {
        this.audioList = this.audioList.concat(arr);
      }
    }
    this.list = data;
  }

  audioAutoPlay() {
    const myAudio: any = new Audio();
    myAudio.loop = false; //禁止循环，否则无法触发ended事件
    myAudio.preload = true;
    myAudio.controls = true;
    const playEndedHandler = () => {
      myAudio.src = this.audioList.shift();
      myAudio.play();
      if (!this.audioList.length) {
        myAudio.removeEventListener("ended", playEndedHandler, false); //只有一个元素时解除绑定
      }
    };
    myAudio.src = this.audioList.shift();
    (document as any).getElementById("audioBox").appendChild(myAudio);
    myAudio.addEventListener("ended", playEndedHandler, false);
    myAudio.play();
  }

  // 呼叫响应
  // clickItem(callStatus: any, uid: any) {
  //   if (callStatus != "呼叫中") return;
  //   this.$axios
  //     .get("http://ddgh.sdxhznkj.com/a/dev/screen/callResponse?devuid=" + uid)
  //     .then((res) => {
  //       console.log(res);
  //       if (res.status == 200 && res.statusText == "OK") {
  //         console.log("响应呼叫成功");
  //       } else {
  //         console.log("响应呼叫失败");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("响应呼叫接口请求失败", err);
  //     });
  // }
}
</script>
<style lang="less" scoped>
.page {
  position: relative;
  background-color: #0f0f10;
  min-height: 100vh;
  .content {
    padding-top: 20px;
    .item {
      position: relative;
      width: 210px;
      /* height: 100%; */
      padding: 10px 20px;
      margin: 0 15px 30px 15px;
    }
    .calling {
      animation: slidein 1.5s ease-in infinite;
    }
  }

  .bottom_box {
    padding-bottom: 140px;
    .bot_item {
      padding: 0 20px;
    }
  }
}

@keyframes slidein {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
    background-color: #fd6363;
  }

  100% {
    transform: scale(1);
  }
}

/* .content .complete {
    background-color: #158764;
} */

.content .complete {
  background-color: #d94c4c;
}

.content .abnormal {
  background-color: #d94c4c;
}

.content .take_edicine {
  background-color: #d6b460;
}

.content .drip_speed_low {
  background-color: #d6b460;
}

.content .drip_speed_fast {
  background-color: #d6b460;
}

.content .battery_low {
  background-color: #d6b460;
}

.content .normal {
  background-color: #003a8c;
}

.content .item .list_top {
  color: white;
}

.content .item .horn {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.03);
  background: linear-gradient(#52a4ff, #52a4ff) left top, linear-gradient(#52a4ff, #52a4ff) left top, linear-gradient(#52a4ff, #52a4ff) right top,
    linear-gradient(#52a4ff, #52a4ff) right top, linear-gradient(#52a4ff, #52a4ff) left bottom, linear-gradient(#52a4ff, #52a4ff) left bottom,
    linear-gradient(#52a4ff, #52a4ff) right bottom, linear-gradient(#52a4ff, #52a4ff) right bottom;
  background-repeat: no-repeat;
  background-size: 1px 10px, 10px 1px;
}

.battery {
  position: absolute;
  top: 10px;
  right: 10px;
}

.battery_box {
  width: 26px;
  height: 14px;
  position: absolute;
  top: 0;
  right: 0;
  border: 1px solid white;
  border-radius: 2px;
}

.battery_box::before {
  position: absolute;
  content: "";
  top: 50%;
  right: -3px;
  width: 2px;
  height: 7px;
  border-radius: 2px;
  transform: translateY(-50%);
  background-color: white;
}

/* .battery_box .bat_num {
        width: 18px;
    } */

.battery_box .battery_text {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 12px;
  font-weight: bold;
  line-height: 1;
  transform: translate(-50%, -50%) scale(0.9);
}

.white_bat {
  position: absolute;
  content: "";
  top: 1px;
  left: 1px;
  /* width: 10px; */
  height: 10px;
  background-color: white;
}

.green_bat {
  position: absolute;
  content: "";
  top: 1px;
  left: 1px;
  /* width: 10px; */
  height: 10px;
  background-color: #78c59d;
}

.red_bat {
  position: absolute;
  content: "";
  top: 1px;
  left: 1px;
  /* width: 10px; */
  height: 10px;
  background-color: #f34343;
}

.progress_box {
  margin-top: 10px;
  padding-top: 15px;
  border-top: 1px dotted #eeeeee;
}

body {
  font-family: PingFangSC-Regular, PingFang SC, "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial,
    sans-serif;
  font-size: 14px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  margin: 0 auto;
}

*,
*::after,
*::before {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.flex {
  display: flex;
}

.flex1 {
  flex: 1;
}

.f_shk {
  flex-shrink: 0;
}

.ju_c {
  justify-content: center;
}

.ju_a {
  justify-content: space-around;
}

.ju_b {
  justify-content: space-between;
}

.ju_e {
  justify-content: flex-end;
}

.ju_eve {
  justify-content: space-evenly;
}

.am_s {
  align-items: flex-start;
}

.am_c {
  align-items: center;
}

.am_e {
  align-items: flex-end;
}

.col {
  flex-direction: column;
}

.col_r {
  flex-direction: column-reverse;
}

.row {
  flex-direction: row;
}

.row_r {
  flex-direction: row-reverse;
}

.f_warp {
  flex-wrap: wrap;
}

.c_ff {
  color: white;
}

.t_rt {
  text-align: right;
}

.f12 {
  font-size: 12px;
}

.f20 {
  font-size: 20px;
}

.fw_b {
  font-weight: bold;
}

.f22 {
  font-size: 22px;
}

.f30 {
  font-size: 30px;
}

.mt_10 {
  margin-top: 10px;
}

.mt_5 {
  margin-top: 5px;
}

.op0 {
  opacity: 0;
}

::v-deep .white_border {
  border: 1px solid white;
  border-radius: 200px;
}

::v-deep .color_border {
  border: 1px solid #73e08e;
  border-radius: 200px;
}

::v-deep .circles-text {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .wancheng_icon {
    margin-top: 5px;
    width: 27px;
    height: 27px;
    object-fit: fill;
  }

  .yaoping_icon {
    width: 25px;
  }

  .drip_speed_low_icon {
    width: 25px;
  }

  .drip_speed_fast_icon {
    width: 40px;
  }

  .battery_low_icon {
    width: 25px;
  }
}

.hujiao_icon img {
  width: 22px;
}

.hujiao {
  color: #3bf6ad;
}
</style>
