<template>
  <div class="home flex ju_c am_c">
    <el-button type="primary" @click="skipView('/patients')">患者简介</el-button>
    <el-button type="primary" @click="skipView('/patients/1')">患者详情</el-button>
    <el-button type="primary" @click="skipView('/nursing/operation')">护理运转</el-button>
    <el-button type="primary" @click="skipView('/nursing/info')">护理标识</el-button>
    <el-button type="primary" @click="skipView('/schedule')">排程信息</el-button>
    <el-button type="primary" @click="skipView('/nursing/station')">护理站</el-button>
    <el-button type="primary" @click="skipView('/fire/info')">消防信息</el-button>
    <el-button type="primary" @click="skipView('/announcement/home')">公告信息</el-button>

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
