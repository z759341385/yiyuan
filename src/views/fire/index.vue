<template>
  <div class="page">
    <Header :logo="info.logo" :title="info.depName" :secondTitle="info.nurseDepName"></Header>
    <div class="patients_detail_box flex">
      <div class="flex5 flex col">
        <div class="card img_box flex col">
          <div class="title t_ct">消防消散平面图</div>
          <img class="img mt_20" :src="info.fireControl.contorlPic" />
        </div>
        <div class="add_record flex am_c">
          <div class="title">巡检记录新增</div>
          <div class="flex am_c">
            <div class="mr_20">选择设备</div>
            <el-select v-model="equipment" placeholder="请选择">
              <el-option v-for="item in equipments" :key="item.key" :label="item.value" :value="item.key"> </el-option>
            </el-select>
          </div>
          <div class="flex am_c ml_40">
            <div class="mr_20">检查人</div>
            <el-select v-model="checker" placeholder="请选择">
              <el-option v-for="item in checkers" :key="item.key" :label="item.value" :value="item.key"> </el-option>
            </el-select>
          </div>
          <el-button class="ml_40" type="primary" :loading="isLoading" @click="commit()">提交</el-button>
        </div>
      </div>
      <div class="flex2 card flex col ml_40">
        <div class="operation_box">
          <div class="title t_ct">消防器材巡检记录</div>
          <div class="title_box flex am_c">
            <div v-for="item in titleList" :key="item.label" class="flex col am_c title_item" :style="item.style">
              <div>{{ item.label }}</div>
            </div>
          </div>
          <div class="list_box">
            <div v-for="item in chickpage.list" :key="item.label" class="flex am_c list_item">
              <div class="t_ct col_item" :style="titleList[0].style">{{ item.fireDevName }}</div>
              <div class="t_ct col_item" :style="titleList[1].style">{{ item.checkUserName }}</div>
              <div class="t_ct col_item" :style="titleList[2].style">{{ item.checkDate }}</div>
            </div>
          </div>
          <el-pagination
            background
            @current-change="handleCurrentChange"
            :current-page.sync="chickpage.pageNo"
            :page-size="chickpage.pageSize"
            :total="chickpage.count"
            layout="total, prev, pager, next, jumper"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import { fireList, fireChecklist, fireDevlist, fireUserlist, addFireCheck } from "@/api/index";

@Component({
  name: "FireInfo",
  components: { Header },
})
export default class extends Vue {
  info: any = {
    fireControl: {
      contorlPic: "",
    },
  };
  chickpage: any = {
    pageNo: 1,
    pageSize: 30,
  };

  titleList = [
    { label: "检查内容", eng: "name", style: "flex: 1" },
    { label: "检查人", eng: "sex", style: "flex: 1" },
    { label: "检查时间", eng: "sex", style: "flex: 2" },
  ];

  equipment = "";
  equipments = [];

  checker = "";
  checkers = [];
  isLoading = false;

  mounted() {
    this.getData();
    this.getFireChecklist();
    this.getFireDevlist();
    this.getFireUserlist();
  }

  async getData() {
    const pid = this.$route.query.nurseDepId;
    const res = await fireList({ nurseDepId: pid });
    this.info = res;
  }

  async getFireChecklist() {
    const pid = this.$route.query.nurseDepId;
    const res: any = await fireChecklist({ nurseDepId: pid, pageNo: this.chickpage.pageNo, pageSize: this.chickpage.pageSize });
    this.chickpage = Object.assign({}, this.chickpage, res.chickpage);
  }

  async getFireDevlist() {
    const pid = this.$route.query.nurseDepId;
    const res: any = await fireDevlist({ nurseDepId: pid });
    this.equipments = res;
  }

  async getFireUserlist() {
    const pid = this.$route.query.nurseDepId;
    const res: any = await fireUserlist({ nurseDepId: pid });
    this.checkers = res;
  }

  async commit() {
    if (!this.equipment) {
      this.$message.error("请选择设备");
      return;
    }
    if (!this.checker) {
      this.$message.error("请选择检查人");
      return;
    }
    try {
      this.isLoading = true;
      const pid = this.$route.query.nurseDepId;
      await addFireCheck({ nurseDepId: pid, devId: this.equipment, userId: this.checker });
      this.$message.success("添加成功");
    } finally {
      this.isLoading = false;
    }
  }

  handleCurrentChange() {
    this.getFireChecklist();
  }
}
</script>
<style lang="less" scoped>
.patients_detail_box {
  margin: 40px;
  font-size: 20px;
  height: calc(100vh - 160px);
  .title {
    color: #00a3ff;
    font-weight: 600;
    font-size: 24px;
    padding: 20px;
  }

  .card {
    box-shadow: 0 0 10px #5389e2 inset;
    border-radius: 12px;
    // padding: 40px;
  }
  .img_box {
    height: calc(100% - 240px);
    padding: 0 40px 40px 40px;
    .img {
      width: 100%;
      height: calc(100% - 88px);
      object-fit: contain;
    }
  }
  .add_record {
    position: relative;
    margin-top: 40px;
    margin-bottom: 80px;
    box-shadow: 0 0 10px #5389e2 inset;
    border-radius: 12px;
    padding: 40px;
    .title {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #01004a;
    }
  }
  .operation_box {
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
      height: calc(100vh - 68px - 51px - 160px - 61px);
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
      margin: 0 0 5px;
    }
  }
}
</style>
