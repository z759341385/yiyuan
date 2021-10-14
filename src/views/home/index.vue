<template>
  <div class="home flex ju_c am_c">
    <el-button type="primary" @click="skipView('/?nurseDepId=0d1100db566e4b63a2833391c9c12fce')">患者简介</el-button>
    <el-button type="primary" @click="skipView('/patients/1?nurseDepId=1')">患者详情</el-button>
    <el-button type="primary" @click="skipView('/nursing/operation?nurseDepId=1')">护理运转</el-button>
    <el-button type="primary" @click="skipView('/nursing/info?nurseDepId=1')">护理标识</el-button>
    <el-button type="primary" @click="skipView('/schedule?nurseDepId=1')">排程信息</el-button>
    <el-button type="primary" @click="skipView('/nursing/station?nurseDepId=1')">护理站</el-button>
    <el-button type="primary" @click="skipView('/fire/info?nurseDepId=1')">消防信息</el-button>
    <el-button type="primary" @click="skipView('/announcement/home?nurseDepId=1')">公告信息</el-button>
    <el-button type="primary" @click="skipView('/risk?nurseDepId=1')">风险评估记录</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Home",
  components: {},
})
export default class extends Vue {
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
