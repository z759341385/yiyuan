<template>
  <div class="page">
    <Header :title="info.depName"></Header>
    <div class="patients_detail_box flex">
      <div class="flex5 flex col">
        <div class="card img_box flex col">
          <div class="title t_ct">消防消散平面图</div>
          <img class="mt_20 img" :src="info.fireControl.contorlPic" />
        </div>
        <div class="add_record flex am_c">
          <div class="title">巡检记录新增</div>
          <div class="flex am_c">
            <div class="mr_20">选择设备</div>
            <el-select v-model="equipment" placeholder="请选择">
              <el-option v-for="item in equipments" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <div class="flex am_c ml_40">
            <div class="mr_20">检查人</div>
            <el-select v-model="checker" placeholder="请选择">
              <el-option v-for="item in checkers" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </div>
          <el-button class="ml_40" type="primary">确定</el-button>
        </div>
      </div>
      <div class="flex2 card flex col ml_40">
        <div class="operation_box">
          <div class="title" style="text-align: center">消防器材巡检记录</div>
          <div class="title_box flex am_c">
            <div v-for="item in titleList" :key="item.label" class="flex col am_c title_item" :style="item.style">
              <div>{{ item.label }}</div>
              <!-- <div>{{ item.eng }}</div> -->
            </div>
          </div>
          <div class="list_box">
            <div v-for="item in info.checklist" :key="item.label" class="flex am_c list_item">
              <div class="t_ct" :style="titleList[1].style">{{ item.explain }}</div>
              <div class="t_ct" :style="titleList[2].style">{{ item.checkUserName }}</div>
              <div class="t_ct" :style="titleList[2].style">{{ item.checkDate }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import { fireList } from "@/api/index";
// const info = require("@/assets/patient_detail.js").json;

@Component({
  name: "FireInfo",
  components: { Header },
})
export default class extends Vue {
  info: any = {};

  titleList = [
    { label: "检查内容", eng: "name", style: "flex: 1" },
    { label: "检查人", eng: "sex", style: "flex: 1" },
    { label: "检查时间", eng: "sex", style: "flex: 2" },
  ];

  equipment = "";
  equipments = [
    { value: "选项1", label: "黄金糕" },
    { value: "选项2", label: "双皮奶" },
    { value: "选项3", label: "蚵仔煎" },
    { value: "选项4", label: "龙须面" },
    { value: "选项5", label: "北京烤鸭" },
  ];

  checker = "";
  checkers = [
    { value: "选项1", label: "黄金糕" },
    { value: "选项2", label: "双皮奶" },
    { value: "选项3", label: "蚵仔煎" },
    { value: "选项4", label: "龙须面" },
    { value: "选项5", label: "北京烤鸭" },
  ];

  mounted() {
    this.getData();
  }

  async getData() {
    const pid = this.$route.query.depid;
    const res = await fireList({ depid: pid });
    this.info = res;
  }

  // 跳转评估记录
  navigate() {
    // this.$router.push({ name: name });
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
  }

  .card {
    // border: 8px solid #1e47cc;
    box-shadow: 0 0 10px #5389e2 inset;
    border-radius: 12px;
    padding: 40px;
    .img {
      width: 100%;
      height: calc(100% - 48px);
      object-fit: contain;
    }
  }
  .img_box {
    height: calc(100% - 240px);
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
      background-color: #0f0f10;
    }
  }
  .operation_box {
    margin: 0px 0px;
    font-size: 18px;
    .title_box {
      .title_item {
        padding: 15px 10px;
      }
    }
    .list_box {
      height: 100%;
      overflow: hidden;
      border: 1px dashed #979797;
      .list_item {
        padding: 15px 0;
        .col_item {
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
