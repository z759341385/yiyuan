<template>
  <div class="page">
    <Header :logo="info.logo" :title="info.depName" :secondTitle="info.nurseDepName"></Header>
    <div class="patients_detail_box flex col">
      <div class="flex flex2">
        <div class="detail_info card">
          <div class="subTitle t_ct">{{ info.newsInfo.title }}</div>
          <div class="mt_20 mb_20">发布时间：{{ info.newsInfo.createDate }}</div>
          <p v-html="info.newsInfo.newsContentFormat"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import { getNews } from "@/api/index";
// const info = require("@/assets/patient_detail.js").json;

@Component({
  name: "AnnouncementDetail",
  components: { Header }
})
export default class extends Vue {
  info: any = {
    newsInfo: {}
  };

  mounted() {
    this.getData();
  }

  async getData() {
    const res: any = await getNews({ id: this.$route.params.id });
    res.newsInfo.newsContentFormat = this.htmlDecode(res.newsInfo.newsContent);
    this.info = res;
  } /*2.用浏览器内部转换器实现html解码（反转义）*/

  htmlDecode(text: string) {
    //1.首先动态创建一个容器标签元素，如DIV
    let temp: any = document.createElement("div"); //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
    temp.innerHTML = text; //3.最后返回这个元素的innerText或者textContent，即得到经过HTML解码的字符串了。
    const output = temp.innerText || temp.textContent;
    temp = null;
    return output;
  }
}
</script>
<style lang="less" scoped>
.subTitle {
  color: #00a3ff;
  font-weight: 600;
  font-size: 28px;
  // display: flex;
  // align-items: center;
}
.patients_detail_box {
  padding: 40px 40px 130px 40px;
  font-size: 20px;
  min-height: calc(100vh - 160px);
  .title {
    color: #00a3ff;
    font-weight: 600;
    font-size: 30px;
    display: flex;
    align-items: center;
    flex: 1;
  }

  .card {
    // border: 8px solid #1e47cc;
    box-shadow: 0 0 10px #5389e2 inset;
    border-radius: 12px;
    padding: 40px;
  }
  .detail_info {
    flex: 5;
    position: relative;
  }
  .operation_box {
    margin: 0px 0px;
    font-size: 18px;
    .title_box {
      .title_item {
        padding: 15px 10px;
      }
    }
    .list_box {
      height: 100%;
      overflow: hidden;
      border: 1px dashed #979797;
      .list_item {
        padding: 15px 0;
        .col_item {
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
