<template>
  <div class="menu_box flex am_c">
    <router-link
      :to="{ name: item.page }"
      v-for="item in menus"
      :key="item.page"
      class="item_card flex col am_c ju_c"
      :class="{ cur_menu: curPage == item.page }"
    >
      <img :src="require('@/assets/images/' + item.icon + '.png')" class="menu_icon" alt="" />
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
    { title: "患者简介", icon: "man", page: "PatientsList" },
    { title: "护理运转", icon: "man", page: "NursingOperation" },
    { title: "护理标识", icon: "man", page: "NursingInfo" },
    { title: "排程信息", icon: "man", page: "Schedule" },
    { title: "消防信息", icon: "man", page: "FireInfo" },
    { title: "风险评估", icon: "man", page: "RiskRecord" },
    { title: "护理站", icon: "man", page: "NursingStation" },
    { title: "公告信息", icon: "man", page: "AnnouncementHome" },

  ];

  get curPage() {
    return this.$route.name;
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
    color: #a4e9ff;
    background-color: #79a7df;
    & + .item_card {
      margin-left: 10px;
    }
    .menu_icon {
      width: 30px;
      height: 30px;
      object-fit: cover;
      margin-bottom: 5px;
    }
    .title {
      text-decoration: none;
    }
  }
  .cur_menu {
    background-color: #155cb3;
  }
  a:-webkit-any-link {
    text-decoration: none;
  }
}
</style>
