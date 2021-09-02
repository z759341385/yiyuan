<template>
  <div class="page">
    <Header :title="info.depName"></Header>
    <div class="operation_box">
      <div class="flex am_c">
        <div class="tab_item" :class="{ selected: tab === 0 }" @click="selectTab(0)">手术排程</div>
        <div class="tab_item" :class="{ selected: tab === 1 }" @click="selectTab(1)">检查预约</div>
      </div>
      <div>
        <div class="title_box flex am_c" v-show="tab == 0">
          <div v-for="item in titleList" :key="item.label" class="flex col am_c title_item" :style="item.style">
            <div>{{ item.label }}</div>
            <!-- <div>{{ item.eng }}</div> -->
          </div>
        </div>
        <div class="title_box flex am_c" v-show="tab == 1">
          <div v-for="item in titleList1" :key="item.label" class="flex col am_c title_item" :style="item.style">
            <div>{{ item.label }}</div>
            <!-- <div>{{ item.eng }}</div> -->
          </div>
        </div>
        <vue-seamless-scroll :data="info.operatelist" class="list_box" :class-option="classOption" v-show="tab == 0">
          <div>
            <div v-for="item in info.operatelist" :key="item.label" class="flex am_c list_item">
              <div class="t_ct col_item line1" :style="titleList[0].style">{{ item.id }}</div>
              <div class="t_ct col_item line1" :style="titleList[1].style">{{ item.name }}</div>
              <div class="t_ct col_item line1" :style="titleList[2].style">{{ item.sex }}</div>
              <div class="t_ct col_item line1" :style="titleList[3].style">{{ item.age }}</div>
              <div class="t_ct col_item line1" :style="titleList[4].style">{{ item.operateDate }}</div>
              <div class="t_ct col_item line1" :style="titleList[5].style">{{ item.operateRoom }}</div>
              <div class="t_ct col_item line1" :style="titleList[6].style">{{ item.operateName }}</div>
              <div class="t_ct col_item line1" :style="titleList[7].style">{{ item.anesthesiaMode }}</div>
              <div class="t_ct col_item line1" :style="titleList[8].style">{{ item.chiefSurgeon }}</div>
            </div>
          </div>
        </vue-seamless-scroll>
        <vue-seamless-scroll :data="info.orderlist" class="list_box" :class-option="classOption" v-show="tab == 1">
          <div>
            <div v-for="item in info.orderlist" :key="item.label" class="flex am_c list_item">
              <div class="t_ct col_item line1" :style="titleList1[0].style">{{ item.id }}</div>
              <div class="t_ct col_item line1" :style="titleList1[1].style">{{ item.name }}</div>
              <div class="t_ct col_item line1" :style="titleList1[2].style">{{ item.orderType }}</div>
              <div class="t_ct col_item line1" :style="titleList1[3].style">{{ item.proName }}</div>
              <div class="t_ct col_item line1" :style="titleList1[4].style">{{ item.orderDate }}</div>
              <div class="t_ct col_item line1" :style="titleList1[5].style">{{ item.proMode }}</div>
            </div>
          </div>
        </vue-seamless-scroll>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import vueSeamlessScroll from "vue-seamless-scroll";
import { planList } from "@/api/index";
// const info = require("@/assets/nursing_operation.js").json;

@Component({
  name: "NursingOperation",
  components: { Header, vueSeamlessScroll },
})
export default class extends Vue {
  info: any = {};

  tab = 0;

  titleList = [
    { label: "序号", eng: "num", style: "flex: 1" },
    { label: "姓名", eng: "name", style: "flex: 1" },
    { label: "性别", eng: "sex", style: "flex: 1" },
    { label: "年龄", eng: "age", style: "flex: 1" },
    { label: "手术日期", eng: "operateDate", style: "flex: 1.3" },
    { label: "手术间", eng: "operateRoom", style: "flex: 1" },
    { label: "手术名称", eng: "operateName", style: "flex: 1" },
    { label: "麻醉方式", eng: "anesthesiaMode", style: "flex: 1" },
    { label: "主刀医生", eng: "chiefSurgeon", style: "flex: 1" },
  ];
  titleList1 = [
    { label: "序号", eng: "num", style: "width: 180px" },
    { label: "姓名", eng: "name", style: "width: 180px" },
    { label: "类型", eng: "orderType", style: "width: 180px" },
    { label: "项目名称", eng: "proName", style: "flex: 1" },
    { label: "预约时间", eng: "orderDate", style: "flex: 1" },
    { label: "状态", eng: "proMode", style: "width: 180px" },
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

  mounted() {
    this.getData();
  }

  async getData() {
    const pid = this.$route.query.depid;
    const res = await planList({ depid: pid });
    this.info = res;
  }

  selectTab(tab: number) {
    this.tab = tab;
  }
}
</script>
<style lang="less" scoped>
.operation_box {
  margin: 20px 30px;
  font-size: 18px;
  .tab_item {
    padding: 10px 0;
    margin-right: 30px;
    cursor: pointer;
  }
  .selected {
    color: #0073ff;
    font-weight: bold;
  }
  .title_box {
    .title_item {
      padding: 15px 10px;
    }
  }
  .list_box {
    height: calc(100vh - 212px);
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
