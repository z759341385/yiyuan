<template>
  <div class="page">
    <Header :title="operation.depName"></Header>
    <div class="operation_box">
      <div class="title_box flex am_c">
        <div v-for="item in titleList" :key="item.label" class="flex col am_c title_item" :style="item.style">
          <div>{{ item.label }}</div>
          <!-- <div>{{ item.eng }}</div> -->
        </div>
      </div>
      <vue-seamless-scroll :data="operation.list" class="list_box" :class-option="classOption">
        <div>
          <div v-for="item in operation.list" :key="item.label" class="flex am_c list_item">
            <div class="t_ct col_item" :style="titleList[0].style">{{ item.id }}</div>
            <div class="t_ct col_item" :style="titleList[1].style">{{ item.name }}</div>
            <div class="t_ct col_item" :style="titleList[2].style">{{ item.sex }}</div>
            <div class="t_ct col_item" :style="titleList[3].style">{{ item.age }}</div>
            <div class="t_ct col_item" :style="titleList[4].style">{{ item.eventName }}</div>
            <div class="t_ct col_item" :style="titleList[5].style">{{ item.eventDate }}</div>
          </div>
        </div>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import vueSeamlessScroll from "vue-seamless-scroll";
const operation = require("@/assets/nursing_operation.js").json;

@Component({
  name: "NursingOperation",
  components: { Header, vueSeamlessScroll },
})
export default class extends Vue {
  operation = operation;

  titleList = [
    { label: "序号", eng: "num", style: "flex: 1" },
    { label: "姓名", eng: "name", style: "flex: 1" },
    { label: "性别", eng: "sex", style: "flex: 1" },
    { label: "年龄", eng: "age", style: "flex: 1" },
    { label: "事件名称", eng: "eventName", style: "flex: 5" },
    { label: "时间", eng: "eventDate", style: "flex: 2" },
  ];

  classOption = {
    step: 1, // 数值越大速度滚动越快
    limitMoveNum: 10, // 开始无缝滚动的数据量 this.dataList.length
    hoverStop: true, // 是否开启鼠标悬停stop
    direction: 1, // 0向下 1向上 2向左 3向右
    openWatch: true, // 开启数据实时监控刷新dom
    singleHeight: 51, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
    singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
    waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
  };
}
</script>
<style lang="less" scoped>
.operation_box {
  margin: 20px 30px;
  font-size: 18px;
  .title_box {
    .title_item {
      padding: 15px 10px;
    }
  }
  .list_box {
    height: calc(100vh - 171px);
    overflow: hidden;
    box-shadow: 0 0 10px #5389e2 inset;
    border-radius: 8px;
    .list_item {
      padding: 15px 0;
      .col_item {
        padding: 0 10px;
      }
    }
  }
}
</style>
