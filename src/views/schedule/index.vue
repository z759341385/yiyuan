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
      <div class="list_box">
        <div v-for="item in operation.list" :key="item.label" class="flex am_c list_item">
          <div class="t_ct" :style="titleList[0].style">{{ item.id }}</div>
          <div class="t_ct" :style="titleList[1].style">{{ item.name }}</div>
          <div class="t_ct" :style="titleList[2].style">{{ item.sex }}</div>
          <div class="t_ct" :style="titleList[3].style">{{ item.age }}</div>
          <div class="t_ct" :style="titleList[4].style">{{ item.eventName }}</div>
          <div class="t_ct" :style="titleList[5].style">{{ item.eventDate }}</div>
          <div class="t_ct" :style="titleList[5].style">{{ item.eventDate }}</div>
          <div class="t_ct" :style="titleList[5].style">{{ item.eventDate }}</div>
          <div class="t_ct" :style="titleList[5].style">{{ item.eventDate }}</div>
          <div class="t_ct" :style="titleList[5].style">{{ item.eventDate }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
const operation = require("@/assets/nursing_operation.js").json;

@Component({
  name: "Schedule",
  components: { Header },
})
export default class extends Vue {
  operation = operation;

  titleList = [
    { label: "序号", eng: "num", style: "width: 180px" },
    { label: "姓名", eng: "name", style: "width: 180px" },
    { label: "性别", eng: "sex", style: "width: 180px" },
    { label: "年龄", eng: "age", style: "width: 180px" },
    { label: "事件名称", eng: "eventName", style: "flex: 1" },
    { label: "时间", eng: "eventDate", style: "flex: 1" },
    { label: "手术间", eng: "operateRoom", style: "flex: 1" },
    { label: "手术名称", eng: "operateName", style: "flex: 1" },
    { label: "麻醉方式", eng: "anesthesiaMode", style: "flex: 1" },
    { label: "主刀医生", eng: "chiefSurgeon", style: "flex: 1" },
  ];
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
    .list_item {
      padding: 15px 0;
    }
  }
}
</style>
