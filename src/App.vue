
<template>
  <div id="app" class="app">
    <router-view />
    <Menus></Menus>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Menus from "@/components/Menus.vue";

@Component({
  name: "App",
  components: { Menus },
})
export default class extends Vue {}
</script>
<style lang="less">
body {
  margin: 0;
  font-size: 16px;
  line-height: 1.2;
}
* {
  box-sizing: border-box;
}
</style>
