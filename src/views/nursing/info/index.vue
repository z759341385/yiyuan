<template>
  <div class="page">
    <Header :title="operation.depName"></Header>
    <div class="operation_box">
      <div class="title_box flex am_c">
        <div v-for="item in titleList" :key="item.label" class="flex col am_c title_item" :style="item.style">
          <div>{{ item.label }}</div>
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
  name: "SearchPopup",
  components: {Header},
})

export default class extends Vue {
  operation = operation;

  titleList = [
    { label: "序号", eng: "num", style: "width: 180px" },
    { label: "姓名", eng: "name", style: "width: 180px" },
    { label: "性别", eng: "sex", style: "width: 180px" },
    { label: "年龄", eng: "age", style: "width: 180px" },
    { label: "护理等级", eng: "nursingGrade", style: "width: 240px" },
    { label: "病情状态", eng: "illnessState", style: "flex: 1" },
    { label: "过敏信息", eng: "allergyInfo", style: "flex: 1" },
    { label: "饮食类型", eng: "dietType", style: "flex: 1" },
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
