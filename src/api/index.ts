import request from "@/utils/request";

export const build = (params?: any) =>
  request({
    url: "build",
    method: "get",
    params,
  });

