<template>
  <div class="home"></div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import storage from "good-storage";

@Component({
  name: "Home",
  components: {},
})
export default class extends Vue {
  saftPadding = 0;
  curHeight = 0;
  private screenWidth = document.body.clientWidth; // 屏幕宽度
  private screenHeight = document.documentElement.clientHeight; // 屏幕高度

  mounted() {
    this.curHeight = (667 / 375) * this.screenWidth;
    this.saftPadding = Math.abs(this.screenHeight - this.curHeight) / 2;
  }

  start() {
    const cur = storage.get("current");
    const user = storage.get("User-Info");
    if (cur && cur.current > 14) {
      if (user && user.user_info.stu_name) {
        this.$router.push({ path: "/score" });
      } else {
        this.$router.push({ path: "/info" });
      }
    } else {
      this.$router.push({ path: "/subject" });
    }
  }
}
</script>
<style lang="less" scoped>
.home {
  position: relative;
  height: 100vh;
  width: 100vw;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  img {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 50vw;
    // bottom: 5em;
  }
}
</style>
