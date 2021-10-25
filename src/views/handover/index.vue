<template>
  <div class="page">
    <Header :logo="info.logo" :title="info.depName" :secondTitle="info.nurseDepName"></Header>
    <div class="page_box">
      <div class="top_box flex" ref="infoBoxRef">
        <div class="top_left_box flex col am_c ju_c">
          <div class="time_title">日期</div>
          <div class="time mt_10">{{ info.reportDay }}</div>
        </div>
        <div class="flex1 right_box">
          <div class="flex am_c">
            <div v-for="(tab, index) in topTitleList" :key="`${tab.label}_${index}`" class="t_ct top_title_item" :style="tab.style">
              {{ tab.label }}
            </div>
          </div>
          <div class="flex am_c top_list_item" v-for="(item, idx) in info.shiftlist" :key="`${item.reportUser}_${idx}`">
            <div v-for="(tab, index) in topTitleList" :key="`${item[tab.eng]}_${tab.label}_${index}`" class="t_ct top_col_item" :style="tab.style">
              {{ item[tab.eng] }}
            </div>
          </div>
        </div>
      </div>
      <div class="content_box">
        <div class="title_box flex am_c">
          <div v-for="(item, index) in titleList" :key="`con_${item.label}_${index}`" class="flex col am_c title_item" :style="item.style">
            <div>{{ item.label }}</div>
          </div>
        </div>
        <div class="list_box" :style="{ height: cardHeightStr }">
          <div v-for="item in page.list" :key="item.label" class="flex am_c list_item">
            <div v-for="(tab, index) in titleList" :key="`${item[tab.eng]}_${tab.label}_${index}`" class="t_ct col_item" :style="tab.style">
              {{ item[tab.eng] }}
            </div>
          </div>
        </div>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="page.pageNo"
          :page-size="page.pageSize"
          :total="page.count"
          layout="total, prev, pager, next, jumper"
        />
      </div>
      <div class="bot_box flex am_c">
        <div class="title">选择日期</div>
        <el-date-picker v-model="selectData" type="date" format="yyyy-MM-dd" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
        <el-button class="ml_30 refer_to" type="primary" :loading="isLoading" @click="referTo()">调阅</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import { shiftList, shiftReportList } from "@/api/index";

@Component({
  name: "Handover",
  components: { Header },
})
export default class extends Vue {
  info: any = {
    reportDay: "",
  };
  selectData: any = "";
  reportlist = [];
  page = {
    pageNo: 1,
    pageSize: 30,
    count: 0,
  };
  otherHeight = 145;
  isLoading = false;

  get cardHeightStr() {
    return `calc(100vh - 416px - ${this.otherHeight}px)`;
  }

  topTitleList = [
    { label: "人员", eng: "reportUser", style: "flex: 1;color: white" },
    { label: "班次", eng: "schedulingType", style: "flex: 1;color: white" },
    { label: "原有", eng: "previousNum", style: "flex: 1" },
    { label: "入院", eng: "enterHosptialNum", style: "flex: 1" },
    { label: "出院", eng: "leaveHosptialNum", style: "flex: 1" },
    { label: "转入", eng: "transferInNum", style: "flex: 1" },
    { label: "转出", eng: "transferOutNum", style: "flex: 1" },
    { label: "病危", eng: "criticallyIllNum", style: "flex: 1" },
    { label: "病重", eng: "seriousIllNum", style: "flex: 1" },
    { label: "手术", eng: "operationNum", style: "flex: 1" },
    { label: "分娩", eng: "childbirthNum", style: "flex: 1" },
    { label: "婴儿", eng: "babyNum", style: "flex: 1" },
    { label: "死亡", eng: "deathNum", style: "flex: 1" },
    { label: "实有", eng: "realNum", style: "flex: 1" },
  ];

  titleList = [
    { label: "类型", eng: "schedulingType", style: "flex: 1" },
    { label: "床号", eng: "bedNo", style: "flex: 1" },
    { label: "姓名", eng: "patientName", style: "flex: 1" },
    { label: "诊断", eng: "diagnosis", style: "flex: 1" },
    { label: "交班内容", eng: "shiftContent", style: "flex: 1" },
  ];

  mounted() {
    this.selectData = this.$route.query.reportDay || "";
    this.getData();
    this.shiftReportList();
  }

  async getData() {
    const pid = this.$route.query.nurseDepId;
    const res = await shiftList({ nurseDepId: pid });
    this.info = res;
  }

  async shiftReportList() {
    const pid = this.$route.query.nurseDepId;
    const res: any = await shiftReportList({ nurseDepId: pid, pageNo: this.page.pageNo, pageSize: this.page.pageSize, reportDay: this.selectData });
    this.page = Object.assign({}, this.page, res.page);
    this.info.reportDay = res.reportDay;
    this.$nextTick(() => {
      this.otherHeight = (this.$refs.infoBoxRef as HTMLFormElement).offsetHeight;
    });
  }

  handleCurrentChange() {
    this.shiftReportList();
  }

  async referTo() {
    try {
      this.isLoading = true;
      await this.shiftReportList();
    } finally {
      this.isLoading = false;
    }
  }
}
</script>
<style lang="less" scoped>
.page {
  padding: 100px 30px 30px 30px;
  .page_box {
    box-shadow: 0 0 10px #5389e2 inset;
    border-radius: 12px;
    .top_box {
      .top_left_box {
        padding: 0 50px;
        .time_title {
          color: #00a3ff;
          font-size: 28px;
        }
        .time {
          color: #ffffff;
          font-size: 28px;
        }
      }
      .right_box {
        .top_title_item {
          padding: 5px 0;
        }
        .top_list_item {
          padding: 5px 0;
          .top_col_item {
            padding: 0 10px;
            color: white;
          }
        }
      }
    }
    .content_box {
      margin: 0px 0px;
      font-size: 18px;
      .title_box {
        padding: 0 30px;
        background: #31558b;
        color: white;
        .title_item {
          padding: 15px 10px;
        }
      }
      .list_box {
        // height: calc(100vh - 68px - 51px - 160px - 61px);
        padding: 0 30px;
        overflow-y: scroll;
        .list_item {
          padding: 15px 0;
          .col_item {
            padding: 0 10px;
          }
        }
      }
      ::v-deep .el-pagination {
        margin: 0;
        border-bottom: 1px solid #79a7df;
      }
    }
    .bot_box {
      padding: 10px 30px 15px;
      .title {
        color: #00a3ff;
        font-size: 26px;
        font-weight: 600;
        margin-right: 30px;
      }
      .refer_to {
        font-size: 22px;
        padding: 0 20px;
        height: 40px;
      }
    }
  }
}
</style>
