import router from "@/router";

const whiteList = ["/404", "/", "/wx_face", "/wx_open"];

router.beforeEach(async (to, from, next) => {
  // 在白名单，直接进入
  if (whiteList.indexOf(to.path) !== -1) {
    return next();
  }
  next();
});
