<template>
  <div class="menu_box flex am_c">
    <router-link
      :to="{ path: `${item.path}${query}` }"
      v-for="item in menus"
      :key="item.page"
      class="item_card flex col am_c ju_c"
      :class="{ cur_menu: curPage == item.page }"
    >
      <!-- <img :src="require('@/assets/images/' + item.icon + '.png')" class="menu_icon" alt="" /> -->
      <div :class="item.icon" class="menu_icon"></div>
      <div class="title">{{ item.title }}</div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "Menus",
  components: {},
})
export default class extends Vue {
  menus = [
    { title: "输液监控", icon: "hos-shuye", page: "Infusion", path: "/infusion" },
    { title: "患者简介", icon: "hos-geren", page: "PatientsList", path: "/" },
    { title: "护理运转", icon: "hos-fanzhuan", page: "NursingOperation", path: "/nursing/operation" },
    { title: "护理标识", icon: "hos-huli", page: "NursingInfo", path: "/nursing/info" },
    { title: "排程信息", icon: "hos-rili", page: "Schedule", path: "/schedule" },
    { title: "消防信息", icon: "hos-shaoshang", page: "FireInfo", path: "/fire/info" },
    { title: "风险评估", icon: "hos-bingli", page: "RiskRecord", path: "/risk" },
    { title: "护理站", icon: "hos-hushi", page: "NursingStation", path: "/nursing/station" },
    { title: "公告信息", icon: "hos-jihua", page: "AnnouncementHome", path: "/announcement/home" },
  ];

  get curPage() {
    return this.$route.name;
  }

  get query() {
    const nurseDepId = this.$route.query.nurseDepId;
    return nurseDepId ? "?nurseDepId=" + nurseDepId : "";
  }
}
</script>
<style lang="less" scoped>
.menu_box {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  .item_card {
    height: 80px;
    width: 80px;
    color: #0c376b;
    background-color: #92bbec;
    border-radius: 4px;
    & + .item_card {
      margin-left: 10px;
    }
    .menu_icon {
      font-size: 30px;
      margin-bottom: 5px;
    }
    .title {
      text-decoration: none;
    }
  }
  .cur_menu {
    color: #fff;
    background-color: #0c376b;
  }
  a:-webkit-any-link {
    text-decoration: none;
  }
}
</style>
