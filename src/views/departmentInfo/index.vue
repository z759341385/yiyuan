<!--
 * @Author: your name
 * @Date: 2021-10-26 09:14:49
 * @LastEditTime: 2021-11-03 16:52:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /yiyuan/src/views/departmentInfo/index.vue
-->
<template>
  <div class="page">
    <Header :logo="info.logo" :title="info.depName" :secondTitle="info.nurseDepName"></Header>
    <div class="patients_detail_box flex">
      <div class="flex5 flex col">
        <div class="card img_box flex col">
          <div class="title t_ct">荣誉照片</div>
          <div class="img am_c">
            <el-carousel :interval="4000" type="card" :height="carouselHeight">
              <el-carousel-item v-for="(item, index) in honorarylist" :key="index">
                <img width="100%" :src="item.picUrl" alt="" @click="openVideo(item)" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="card img_box flex col">
          <div class="title t_ct">日常记录</div>
          <div class="img am_c">
            <el-carousel :interval="4000" type="card" :height="carouselHeight">
              <el-carousel-item v-for="(item, index) in dailyRecordlist" :key="index">
                <!-- <h3 class="medium">{{ item }}</h3> -->
                <img :src="item.picUrl" width="100%" @click="openVideo(item)" />
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
      <div class="flex2 card flex col ml_40">
        <div class="operation_box">
          <div class="title t_ct">留言板</div>
          <div class="list_box">
            <div class=""></div>
            <ul class="infinite-list" style="overflow:auto">
              <li v-for="(item, index) in messageList" :key="index" class="infinite-list-item">
                <p v-html="item.contents"></p>
                <p class="message-time" v-text="item.createDate"></p>
              </li>
              <li v-if="messageList.length === 0" class="message-list-null"><el-empty description="暂无数据"></el-empty></li>
            </ul>

            <el-pagination
              background
              @current-change="handleCurrentChange"
              :current-page.sync="messageObj.pageNo"
              :page-size="messageObj.pageSize"
              :total="messageObj.count"
              layout="total, prev, pager, next, jumper"
            />
          </div>
          <div class="message-bottom">
            <div class="message-bottom-input">
              <el-input size="medium" v-model="addMessageContext" />
            </div>
            <div class="message-bottom-button">
              <el-button @click="addMessageBoard" size="medium">发送</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="850px" :before-close="handleClose" class="department-info-dialog">
      <video
        v-if="dialogVisible"
        :poster="dialogVideoInfo.picUrl"
        :src="dialogVideoInfo.videoUrl"
        width="800"
        height="600"
        id="js_dialogVideo"
        autoplay
      ></video>
    </el-dialog>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import { getXyyInfo, getHonorarylist, getDailyRecordlist, getMessageBoardlist, addMessageBoard } from "@/api/index";
import "swiper/swiper-bundle.css";
export default {
  name: "DepartmentInfo",
  components: { Header },
  data() {
    return {
      info: {},
      remindlist: [],
      honorarylist: [],
      dailyRecordlist: [],
      dialogVideoInfo: {},
      messageList: [],
      messageObj: {},
      dialogVisible: false,
      addMessageContext: "",
      page: {
        pageNo: 1,
        pageSize: 10
      },
      loadding: false,
      nurseDepId: ""
    };
  },
  computed: {
    carouselHeight() {
      const innerHeight = Number(window.innerHeight);
      const height = (innerHeight - 160 - 15) / 2 - 68 - 80;

      return `${height}px`;
    }
  },
  created() {
    this.getData();
    this.getHonorarylist();
    this.getDailyRecordlist();
    this.getMessageBoardlist();
  },
  mounted() {
    this.nurseDepId = this.$route.query.nurseDepId || "0d1100db566e4b63a2833391c9c12fce";
  },
  methods: {
    getData() {
      const pid = this.$route.query.nurseDepId || "0d1100db566e4b63a2833391c9c12fce";
      getXyyInfo({ nurseDepId: pid }).then(res => {
        this.info = res;
      });
    },
    // 获取荣誉
    getHonorarylist() {
      const pid = this.$route.query.nurseDepId || "0d1100db566e4b63a2833391c9c12fce";
      const params = {
        nurseDepId: pid
      };
      getHonorarylist(params)
        .then(res => {
          if (res && res.list) {
            this.honorarylist = res.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 获取日常
    getDailyRecordlist() {
      const pid = this.$route.query.nurseDepId || "0d1100db566e4b63a2833391c9c12fce";
      const params = {
        nurseDepId: pid
      };
      getDailyRecordlist(params)
        .then(res => {
          if (res && res.list) {
            this.dailyRecordlist = res.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 留言板
    getMessageBoardlist() {
      const pid = this.$route.query.nurseDepId || "0d1100db566e4b63a2833391c9c12fce";
      const params = {
        nurseDepId: pid,
        ...this.page
      };
      getMessageBoardlist(params)
        .then(res => {
          if (res.page.list) {
            this.messageObj = res.page;
            this.messageList = res.page.list;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    openVideo(item) {
      if (item.videoUrl) this.dialogVisible = true;
      this.dialogVideoInfo = item;
    },
    handleClose() {
      this.dialogVisible = false;
    },
    addMessageBoard() {
      if (this.addMessageContext) {
        const pid = this.$route.query.nurseDepId || "0d1100db566e4b63a2833391c9c12fce";
        const params = {
          nurseDepId: pid,
          contents: this.addMessageContext
        };
        addMessageBoard(params)
          .then(res => {
            if (res) {
              this.$message.success("留言成功");
              this.page.pageNo = 1;
              this.addMessageContext = "";
              this.getMessageBoardlist();
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    handleCurrentChange(current) {
      this.page.pageNo = current;
      this.getMessageBoardlist();
    }
  }
};
</script>
<style lang="less">
.department-info-dialog {
  .el-dialog {
    background: #1e3162;
  }
}
</style>
<style lang="less" scoped>
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.patients_detail_box {
  margin: 40px;
  font-size: 20px;
  height: calc(100vh - 160px);
  .title {
    color: #00a3ff;
    font-weight: 600;
    font-size: 24px;
    padding: 20px;
  }

  .card {
    box-shadow: 0 0 10px #5389e2 inset;
    border-radius: 12px;
    // padding: 40px;
  }
  .img_box {
    height: calc(100% - 240px);
    padding: 0 40px 40px 40px;
    margin-bottom: 15px;
    .img {
      width: 100%;
      height: calc(100% - 88px);
      object-fit: contain;
    }
  }
  .add_record {
    position: relative;
    margin-top: 40px;
    margin-bottom: 80px;
    box-shadow: 0 0 10px #5389e2 inset;
    border-radius: 12px;
    padding: 40px;
    .title {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #01004a;
    }
  }
  .operation_box {
    margin: 0px 0px;
    font-size: 18px;
    .title_box {
      padding: 0 30px;
      background: #31558b;
      color: white;
      .title_item {
        padding: 15px 10px;
      }
    }
    .list_box {
      height: calc(100vh - 68px - 51px - 180px);
      padding: 0 30px;
      // overflow-y: scroll;
      .list_item {
        padding: 15px 0;
        .col_item {
          padding: 0 10px;
        }
      }
      .infinite-list {
        scrollbar-width: none; /* Firefox */

        height: calc(100vh - 68px - 51px - 160px - 110px);
        .message-list-null {
          list-style: none;
        }
        li {
          padding-bottom: 10px;
        }
      }
      .message-time {
        text-align: right;
        padding-right: 15px;
      }
    }
    ::v-deep .el-pagination {
      margin: 0 0 5px;
    }
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .message-bottom {
    width: 100%;
    padding: 0 20px 0 80px;
    text-align: center;
    .message-bottom-input {
      display: inline-block;
      width: calc(100% - 80px);
      text-align: left;
    }
    .message-bottom-button {
      display: inline-block;
      width: 80px;
      text-align: right;
    }
  }
}
</style>
