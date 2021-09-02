import request from "@/utils/request";

// 患者简介
export const interList = (params?: any) =>
  request({
    url: "patient/inter/list",
    method: "post",
    data: params
  });

// 排程安排
export const planList = (params?: any) =>
  request({
    url: "patient/inter/planlist",
    method: "post",
    data: params
  });
