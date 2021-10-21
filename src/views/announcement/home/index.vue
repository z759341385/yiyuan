<template>
  <div class="page">
    <Header :logo="info.logo" :title="info.depName" :secondTitle="info.nurseDepName"></Header>
    <div class="operation_box">
      <div class="flex am_c">
        <div
          v-for="(item, index) in tabList"
          :key="item.title"
          class="tab_item flex am_c"
          :class="{ selected: tab === index }"
          @click="selectTab(index)"
        >
          <div>{{ item.title }}</div>
          <!-- <img class="icon_top ml_5" :src="item.icon" alt="" /> -->
          <i :class="[item.icon, 'f28 ml_5']" />
        </div>
      </div>
      <div v-for="(tabItem, index) in tabList" :key="tabItem.title" class="card_box">
        <div v-if="tab == index" class="list_box">
          <router-link
            :to="{ path: `/announcement/detail/${item.id}?nurseDepId=${$route.query.nurseDepId}` }"
            v-for="item in tabItem.list"
            :key="item.id"
            class="list_item flex am_c"
          >
            <div v-if="item.newsType == '医院公告'" class="hos-yiyuan f24 mr_10"></div>
            <div v-else-if="item.newsType == '病区公告'" class="hos-keshi f24 mr_10"></div>
            <div v-else-if="item.newsType == '宣教信息'" class="hos-yisheng f24 mr_10"></div>
            <div>{{ item.title }}</div>
          </router-link>
        </div>
        <el-pagination
          v-if="tab == index"
          background
          @current-change="handleCurrentChange"
          :current-page.sync="tabList[tab].pageNo"
          :page-size="tabList[tab].pageSize"
          :total="tabList[tab].total"
          layout="total, prev, pager, next, jumper"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import vueSeamlessScroll from "vue-seamless-scroll";
import { newInfo, hospitalList, depList, xxList } from "@/api/index";
// const info = require("@/assets/notice.js").json;

@Component({
  name: "AnnouncementHome",
  components: { Header, vueSeamlessScroll },
})
export default class extends Vue {
  info: any = {};

  tab = 0;

  tabList = [
    { title: "全院公告", icon: "hos-yiyuan", pageNo: 1, pageSize: 20, total: 0, list: [] },
    { title: "病区公告", icon: "hos-keshi", pageNo: 1, pageSize: 20, total: 0, list: [] },
    { title: "宣教信息", icon: "hos-yisheng", pageNo: 1, pageSize: 20, total: 0, list: [] },
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
    this.getList();
  }

  async getData() {
    const pid = this.$route.query.nurseDepId;
    const res = await newInfo({ nurseDepId: pid });
    this.info = res;
  }

  async getList() {
    const pid = this.$route.query.nurseDepId;
    const params = {
      nurseDepId: pid,
      pageNo: this.tabList[this.tab].pageNo,
      pageSize: this.tabList[this.tab].pageSize,
    };
    let res: any = null;
    if (this.tab == 0) {
      res = await hospitalList(params);
    } else if (this.tab == 1) {
      res = await depList(params);
    } else {
      res = await xxList(params);
    }
    const cur = this.tabList[this.tab];
    cur.list = res.page.list;
    cur.total = res.page.count;
    this.tabList.splice(this.tab, 1, cur);
  }

  selectTab(tab: number) {
    this.tab = tab;
    this.getList();
  }

  handleCurrentChange() {
    this.getList();
  }
}
</script>
<style lang="less" scoped>
.operation_box {
  margin: 10px 20px;
  font-size: 18px;
  .tab_item {
    padding: 10px 0;
    margin-right: 30px;
    cursor: pointer;
    font-size: 24px;
    .icon_top {
      width: 30px;
      height: 30px;
      object-fit: contain;
    }
  }
  .selected {
    color: #0073ff;
    font-weight: bold;
  }
  .title_item {
    padding: 15px 10px;
  }
  .card_box {
    box-shadow: 0 0 10px #5389e2 inset;
    border-radius: 8px;
    .list_box {
      height: calc(100vh - 340px);
      overflow-y: scroll;
      .list_item {
        margin: 30px 30px 0px 30px;
        font-size: 20px;
        text-overflow: ellipsis;
        height: 60px;
        background: #19448e;
        border-radius: 8px;
        padding: 20px 15px;
        padding-top: 50;
        padding-bottom: 50;
        text-decoration: unset;
        color: #fff;
      }
    }
    ::v-deep .el-pagination {
      margin: 0 0 5px;
    }
  }
}
</style>
