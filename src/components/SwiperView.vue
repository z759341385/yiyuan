<template>
  <swiper :key="type" class="swiper" :options="swiperOption">
    <swiper-slide v-for="item in list" :key="item.id" :class="[isRemind ? 'warning' : 'calling', 't_ct']">
      <div class="f28 fw_b">{{ item.bedNum }}</div>
      <div class="f18 mt_10">{{ isRemind ? item.remindName : item.callName }}</div>
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import SwiperCore, { Autoplay } from "swiper";
SwiperCore.use([Autoplay]);
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";

@Component({
  name: "SwiperView",
  components: {
    Swiper,
    SwiperSlide
  }
})
export default class extends Vue {
  @Prop() type!: string;
  @Prop() list!: any;

  get isRemind() {
    return this.type == "remind";
  }

  swiperOption = {
    slidesPerView: 3,
    slidesPerColumn: 2,
    spaceBetween: 20,
    autoplay: {
      delay: 2000,
      stopOnLastSlide: false,
      disableOnInteraction: true
    }
  };
}
</script>

<style lang="less" scoped>
.swiper {
  height: 320px;
  margin-left: auto;
  margin-right: auto;

  .swiper-slide {
    height: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    box-shadow: 0 0 10px #5389e2 inset;
    padding: 15px;
  }
  .warning {
    animation: flashing_warning 1s infinite linear;
  }
  .calling {
    animation: flashing_calling 1s infinite linear;
  }
  @keyframes flashing_warning {
    0% {
      box-shadow: 0 0 10px #5389e2 inset;
      border: 3px solid #5389e2;
    }
    50% {
      color: #ef561f;
      box-shadow: 0 0 10px #ef561f inset;
      border: 3px solid #ef561f;
    }
    100% {
      box-shadow: 0 0 10px #5389e2 inset;
      border: 3px solid #5389e2;
    }
  }
  @keyframes flashing_calling {
    0% {
      box-shadow: 0 0 10px #5389e2 inset;
      border: 3px solid #5389e2;
    }
    50% {
      color: #dfcc79;
      box-shadow: 0 0 10px #dfcc79 inset;
      border: 3px solid #dfcc79;
    }
    100% {
      box-shadow: 0 0 10px #5389e2 inset;
      border: 3px solid #5389e2;
    }
  }
}
</style>
