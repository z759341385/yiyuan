<template>
  <!-- <div class="home flex ju_c am_c">
    <el-button type="primary" @click="skipView('/?nurseDepId=0d1100db566e4b63a2833391c9c12fce')">患者简介</el-button>
    <el-button type="primary" @click="skipView('/patients/1?nurseDepId=1')">患者详情</el-button>
    <el-button type="primary" @click="skipView('/nursing/operation?nurseDepId=1')">护理运转</el-button>
    <el-button type="primary" @click="skipView('/nursing/info?nurseDepId=1')">护理标识</el-button>
    <el-button type="primary" @click="skipView('/schedule?nurseDepId=1')">排程信息</el-button>
    <el-button type="primary" @click="skipView('/nursing/station?nurseDepId=1')">护理站</el-button>
    <el-button type="primary" @click="skipView('/fire/info?nurseDepId=1')">消防信息</el-button>
    <el-button type="primary" @click="skipView('/announcement/home?nurseDepId=1')">公告信息</el-button>
    <el-button type="primary" @click="skipView('/risk?nurseDepId=1')">风险评估记录</el-button>
  </div> -->
  <div>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import VeLine from "v-charts/lib/line";

@Component({
  name: "Home",
  components: { VeLine },
})
export default class extends Vue {
  chartData = {
    columns: ["日期", "电能1", "电能2", "电能3", "电能4", "电能5", "电能6", "电能7", "电能8"],
    rows: [
      { 日期: "10月1日", 电能1: 0, 电能2: 1, 电能3: 0.5, 电能4: 0.63, 电能5: 0.8, 电能6: 2, 电能7: 2.1, 电能8: 1.7 },
      { 日期: "10月2日", 电能1: 1, 电能2: 2, 电能3: 4, 电能4: 0.9, 电能5: 1.1, 电能6: 2.1, 电能7: 4.3, 电能8: 2.6 },
      { 日期: "10月3日", 电能1: 1.6, 电能2: 2.6, 电能3: 4.5, 电能4: 1.9, 电能5: 2.3, 电能6: 3.5, 电能7: 5.3, 电能8: 3.2 },
      { 日期: "10月4日", 电能1: 2.3, 电能2: 5.2, 电能3: 5.4, 电能4: 2.7, 电能5: 3.2, 电能6: 4.3, 电能7: 6.8, 电能8: 3.5 },
      { 日期: "10月5日", 电能1: 3.8, 电能2: 6.2, 电能3: 6.4, 电能4: 4.5, 电能5: 4.5, 电能6: 6.5, 电能7: 7.1, 电能8: 5.5 },
      { 日期: "10月6日", 电能1: 5.3, 电能2: 6.8, 电能3: 8.4, 电能4: 5.6, 电能5: 6.3, 电能6: 7.8, 电能7: 7.5, 电能8: 7.3 },
    ],
  };
  chartSettings = {
    yAxisName: ["kWh"],
  };
  skipView(path: string) {
    this.$router.push({ path: path });
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  width: 100vw;
}
</style>
