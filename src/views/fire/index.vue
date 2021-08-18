<template>
  <div class="page">
    <Header :title="info.depName"></Header>
    <div class="patients_detail_box flex col">
      <div class="flex flex2 ">
        <div class="detail_info card flex col ju_a">
            <div class ='subTitle' style="text-align:center">消防消散平面图</div>

         <img class ='mt_20 flex4' url="https://img-home.csdnimg.cn/images/20210817020654.png"  style="width:100%; height:160px;">
        </div>
    
        <div class="flex2 card flex col ml_40">
            
       <div class="operation_box">
           <div class ='subTitle' style="text-align:center">消防器材巡检记录</div>
      <div class="title_box flex am_c">
        <div v-for="item in titleList" :key="item.label" class="flex col am_c title_item" :style="item.style">
          <div>{{ item.label }}</div>
          <!-- <div>{{ item.eng }}</div> -->
        </div>
      </div>
      <div class="list_box">
        <div v-for="item in info.list" :key="item.label" class="flex am_c list_item">
          <div class="t_ct" :style="titleList[0].style">{{ item.id }}</div>
          <div class="t_ct" :style="titleList[1].style">{{ item.name }}</div>
          <div class="t_ct" :style="titleList[2].style">{{ item.sex }}</div>
          <div class="t_ct" :style="titleList[2].style">{{ item.eventDate }}</div>
        </div>
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
const info = require("@/assets/patient_detail.js").json;

@Component({
  name: "FireInfo",
  components: { Header },
})
export default class extends Vue {
  info = info;
  titleList = [
    { label: "编号", eng: "num", style: "flex: 1" },
    { label: "检查内容", eng: "name", style: "flex: 1" },
    { label: "检查人", eng: "sex", style: "flex: 1" },
    { label: "检查时间", eng: "sex", style: "flex: 1" },

  ];

  // 跳转评估记录
  navigate() {
    // this.$router.push({ name: name });
  }
}
</script>
<style lang="less" scoped>
 .subTitle {
    color: #00a3ff;
    font-weight: 600;
    font-size: 22px;
    // display: flex;
    // align-items: center;
  }
.patients_detail_box {
  margin: 40px;
  font-size: 20px;
  height: calc(100vh - 160px);
  .title {
    color: #00a3ff;
    font-weight: 600;
    font-size: 28px;
    display: flex;
    align-items: center;
    flex: 1;
  }
   
  .card {
    // border: 8px solid #1e47cc;
    box-shadow: 0 0 10px #5389e2 inset;
    border-radius: 12px;
    padding: 40px;
  }
  .detail_info {
    flex: 5;
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
