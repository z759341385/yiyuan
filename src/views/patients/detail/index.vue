<template>
  <div class="home flex ju_c am_c">
    123222
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "PatientsDetail",
  components: {}
})
export default class extends Vue {
  skipView(name: string) {
    this.$router.push({ name: name });
  }
}
</script>
<style lang="less" scoped>
.home {
  height: 100vh;
  width: 100vw;
}
</style>
