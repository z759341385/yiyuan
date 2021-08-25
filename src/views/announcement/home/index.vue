<template>
  <div class="page">
    <Header :title="公告信息"></Header>
    <div class="operation_box">
      <div class="flex am_c">
        <div class="tab_item" :class="{ selected: tab === 0 }" @click="selectTab(0)">全院公告</div>
        <div class="tab_item" :class="{ selected: tab === 1 }" @click="selectTab(1)">病区公告</div>
        <div class="tab_item" :class="{ selected: tab === 2 }" @click="selectTab(2)">宣教信息</div>
      </div>

      <div class="list_box">
        <div class="title_box" v-show="tab == 0">
          <vue-seamless-scroll :data="operation.list" :class-option="classOption">
            <div v-for="item in operation.list" :key="item.label" class="list_item">
              <div class="list_item" @click="skipView('/announcement/detail')">{{ item.content }}</div>

            </div>
          </vue-seamless-scroll>
        </div>
        <div class="title_box" v-show="tab == 1">
          <vue-seamless-scroll :data="operation.list1" :class-option="classOption">
            <div v-for="item in operation.list1" :key="item.label" class="list_item">
              <div class="list_item">{{ item.content }}</div>
              
            </div>
          </vue-seamless-scroll>
        </div>

        <div class="title_box" v-show="tab == 2">
          <vue-seamless-scroll :data="operation.list2" :class-option="classOption">
            <div v-for="item in operation.list2" :key="item.label" class="list_item">
              <div class="list_item">{{ item.content }}</div>
            </div>
          </vue-seamless-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import vueSeamlessScroll from "vue-seamless-scroll";
const operation = require("@/assets/notice.js").json;

@Component({
  name: "AnnouncementHome",
  components: { Header, vueSeamlessScroll },
})
export default class extends Vue {
  operation = operation;
  skipView(path: string) {
    this.$router.push({ path: path });
  }
  tab = 0;

  selectTab(tab: number) {
    this.tab = tab;
  }
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
      margin: 30px 30px 0px 30px;
      font-size: 20px;
      text-overflow: ellipsis;
      height:60px;
      background-color: #0073ff;
      // padding: 0px 15px 10px 15px;
     padding-top: 50 ;
          padding-bottom: 50 ;


    }
  }
}
</style>
