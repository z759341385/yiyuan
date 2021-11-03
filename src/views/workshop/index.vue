<template>
  <div class="page">
    <Header :logo="info.logo" :title="info.depName" :secondTitle="info.nurseDepName"></Header>
    <div class="top_box">
      <FullCalendar ref="fullCalendar" :options="calendarOptions" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Header from "@/components/Header.vue";
import { scheduling, updatePlan } from "@/api/index";
import "@fullcalendar/core/vdom"; // solves problem with Vite
import FullCalendar from "@fullcalendar/vue";
import interactionPlugin from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";

@Component({
  name: "Workshop",
  components: { Header, FullCalendar }
})
export default class extends Vue {
  info: any = {
    userlist: []
  };

  get calendarOptions() {
    return {
      //设置产品密钥不设置左下角会出现链接
      schedulerLicenseKey: "GPL-My-Project-Is-Open-Source",
      //'interaction'：拖动事件
      plugins: [interactionPlugin, resourceTimelinePlugin],
      //设置utc时间格式
      timeZone: "UTC",
      //设置默认显示年resourceTimelineDay,月resourceTimelineWeek,日resourceTimelineMonth
      initialView: "resourceTimelineWeek",
      //设置中文
      locale: "zh-cn",
      //设置初始年月
      //defaultDate: '2019-06-12',
      editable: true, //Event是否可被拖动或者拖拽
      height: "100%", //高度根据父元素
      slotDuration: { day: 1 }, // 一天为单位
      firstDay: 1,
      weekNumbers: true, //左上角显示第几总周数
      navLinks: true, //周视图可点击并跳转
      resourceAreaWidth: "10%", //设置资源宽度
      // resourceLabelText: "人员",
      resourceAreaColumns: [
        {
          field: "title",
          headerContent: "人员"
        }
      ],
      resources: this.info.userlist,
      //切换年月按钮
      headerToolbar: {
        //左边按钮
        start: "prev,next", // will normally be on the left. if RTL, will be on the right
        center: "title",
        //控制年月日  resourceTimelineMonth
        end: "resourceTimelineDay,resourceTimelineWeek" // will normally be on the right. if RTL, will be on the left
      },
      buttonText: {
        today: "今天",
        month: "月",
        week: "周",
        day: "日"
      },
      eventDrop: async (info: any) => {
        // if (!confirm("确定要调整排班计划吗?")) {
        //   info.revert();
        //   return;
        // }
        console.log(info);
        const day = (this as any).$moment(info.event.start).format("YYYY-MM-DD");
        const userId = info.newResource ? info.newResource?.id : info.event.extendedProps?.userId;
        const res: any = await updatePlan({
          planid: info.event.id,
          userId: userId,
          schedulingTypeId: info.event.extendedProps?.schedulingTypeId,
          day: day
        });
        if (res == 1) {
          this.$message.success("人员调整成功");
        } else {
          this.$message.error(res);
          info.revert();
        }
      },
      events: this.info.list
    };
  }
  mounted() {
    this.getData();
  }

  async getData() {
    const pid = this.$route.query.nurseDepId;
    const res: any = await scheduling({ nurseDepId: pid });
    res.userlist = res.userlist.map((u: any) => {
      u.title = u.name;
      return u;
    });
    res.list = res.list.map((l: any) => {
      l.userId = l.resourceId;
      return l;
    });
    this.info = res;
    const calendarApi: any = (this.$refs.fullCalendar as any).getApi();
    calendarApi.render();
  }
}
</script>
<style lang="less" scoped>
.page {
  padding: 100px 30px 30px 30px;
  .top_box {
    height: calc(100vh - 230px);
  }
}
</style>
