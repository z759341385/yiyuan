<template>
  <div class="container">
    <div class="content_box flex am_s">
      <div class="content_left">
        <div class=""></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({
  name: 'SearchPopup',
  components: {}
})
export default class extends Vue {
  @Prop() info!: any;
}
</script>
<style lang="less" scoped>
.content_left {
}
</style>
