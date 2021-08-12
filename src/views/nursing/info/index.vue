<template>
  <div class="container"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
  name: "SearchPopup",
  components: {},
})
export default class extends Vue {
  @Prop() info!: any;
}
</script>
<style lang="less" scoped>
.content_left {
}
</style>
