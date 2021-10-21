<template>
  <div class="page">
    <Header :logo="info.logo" :title="info.depName" :secondTitle="info.nurseDepName"></Header>
    <div class="operation_box card">
      <div class="flex am_c tab_box">
        <div class="tab_item" :class="{ selected: tab === 0 }" @click="selectTab(0)">手术排程</div>
        <div class="tab_item" :class="{ selected: tab === 1 }" @click="selectTab(1)">检查预约</div>
      </div>
      <div class="title_box flex am_c" v-show="tab == 0">
        <div v-for="item in titleList" :key="item.label" class="flex col am_c title_item" :style="item.style">
          <div>{{ item.label }}</div>
        </div>
      </div>
      <div class="title_box flex am_c" v-show="tab == 1">
        <div v-for="item in titleList1" :key="item.label" class="flex col am_c title_item" :style="item.style">
          <div>{{ item.label }}</div>
        </div>
      </div>
      <template v-if="tab == 0">
        <div class="list_box">
          <div v-for="item in tabList[0].list" :key="item.label" class="flex am_c list_item">
            <div class="t_ct col_item" :style="titleList[0].style">{{ item.id }}</div>
            <div class="t_ct col_item" :style="titleList[1].style">{{ item.name }}</div>
            <div class="t_ct col_item" :style="titleList[2].style">{{ item.sex }}</div>
            <div class="t_ct col_item" :style="titleList[3].style">{{ item.age }}</div>
            <div class="t_ct col_item" :style="titleList[4].style">{{ item.operateDate }}</div>
            <div class="t_ct col_item" :style="titleList[5].style">{{ item.operateRoom }}</div>
            <div class="t_ct col_item" :style="titleList[6].style">{{ item.operateName }}</div>
            <div class="t_ct col_item" :style="titleList[7].style">{{ item.anesthesiaMode }}</div>
            <div class="t_ct col_item" :style="titleList[8].style">{{ item.chiefSurgeon }}</div>
          </div>
        </div>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="tabList[tab].pageNo"
          :page-size="tabList[tab].pageSize"
          :total="tabList[tab].total"
          layout="total, prev, pager, next, jumper"
        />
      </template>
      <template v-else>
        <div class="list_box">
          <div v-for="item in tabList[1].list" :key="item.label" class="flex am_c list_item">
            <div class="t_ct col_item" :style="titleList1[0].style">{{ item.id }}</div>
            <div class="t_ct col_item" :style="titleList1[1].style">{{ item.name }}</div>
            <div class="t_ct col_item" :style="titleList1[2].style">{{ item.orderType }}</div>
            <div class="t_ct col_item" :style="titleList1[3].style">{{ item.proName }}</div>
            <div class="t_ct col_item" :style="titleList1[4].style">{{ item.orderDate }}</div>
            <div class="t_ct col_item" :style="titleList1[5].style">{{ item.proMode }}</div>
          </div>
        </div>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="tabList[tab].pageNo"
          :page-size="tabList[tab].pageSize"
          :total="tabList[tab].total"
          layout="total, prev, pager, next, jumper"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import vueSeamlessScroll from "vue-seamless-scroll";
import { planList, operateList, checkList } from "@/api/index";

@Component({
  name: "NursingOperation",
  components: { Header, vueSeamlessScroll },
})
export default class extends Vue {
  info: any = {};

  tab = 0;

  tabList = [
    { pageNo: 1, pageSize: 20, total: 0, list: [] },
    { pageNo: 1, pageSize: 20, total: 0, list: [] },
  ];

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

  // classOption = {
  //   step: 1, // 数值越大速度滚动越快
  //   limitMoveNum: 10, // 开始无缝滚动的数据量 this.dataList.length
  //   hoverStop: true, // 是否开启鼠标悬停stop
  //   direction: 1, // 0向下 1向上 2向左 3向右
  //   openWatch: true, // 开启数据实时监控刷新dom
  //   singleHeight: 51, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
  //   singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
  //   waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
  // };

  mounted() {
    this.getData();
    this.getOperatelist();
  }

  async getData() {
    const pid = this.$route.query.nurseDepId;
    const res = await planList({ nurseDepId: pid });
    this.info = res;
  }

  async getOperatelist() {
    const pid = this.$route.query.nurseDepId;
    const res: any = await operateList({
      nurseDepId: pid,
      pageNo: this.tabList[this.tab].pageNo,
      pageSize: this.tabList[this.tab].pageSize,
    });
    const cur = this.tabList[this.tab];
    cur.list = res.operatepage.list;
    cur.total = res.operatepage.count;
    this.tabList.splice(this.tab, 1, cur);
  }

  async getChecklist() {
    const pid = this.$route.query.nurseDepId;
    const res: any = await checkList({
      nurseDepId: pid,
      pageNo: this.tabList[this.tab].pageNo,
      pageSize: this.tabList[this.tab].pageSize,
    });
    const cur = this.tabList[this.tab];
    cur.list = res.orderpage.list;
    cur.total = res.orderpage.count;
    this.tabList.splice(this.tab, 1, cur);
  }

  selectTab(tab: number) {
    this.tab = tab;
    if (tab == 0) {
      this.getOperatelist();
    } else {
      this.getChecklist();
    }
  }

  handleCurrentChange() {
    if (this.tab == 0) {
      this.getOperatelist();
    } else {
      this.getChecklist();
    }
  }
}
</script>
<style lang="less" scoped>
.page {
  padding-bottom: 110px;
  .card {
    // border: 8px solid #1e47cc;
    box-shadow: 0 0 10px #5389e2 inset;
    border-radius: 12px;
    // padding: 15px;
  }
  .operation_box {
    margin: 20px;
    font-size: 20px;
    height: calc(100vh - 230px);
    .tab_box {
      padding: 10px 15px;
      .tab_item {
        padding: 10px 15px;
        cursor: pointer;
        font-size: 28px;
        color: #79a7df;
      }
      .selected {
        color: #ffffff;
      }
    }
    .selected {
      color: #0073ff;
      font-weight: bold;
    }
    .title_box {
      padding: 0 30px;
      background: #31558b;
      color: white;
      .title_item {
        padding: 15px 10px;
      }
    }
    .list_box {
      height: calc(100% - 190px);
      padding: 0 15px;
      overflow-y: scroll;
      .list_item {
        padding: 15px 0;
        .col_item {
          word-break: break-all;
          padding: 0 10px;
        }
      }
    }
    ::v-deep .el-pagination {
      margin: 0 0 5px;
    }
  }
}
</style>
