<template>
  <div class="page">
    <Header :title="operation.depName"></Header>
    <div class="operation_box">
      <div class="title_box flex am_c">

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
const operation = require("@/assets/nursing_operation.js").json;

@Component({
  name: "AnnouncementHome",
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
