import request from "@/utils/request";

// 患者简介
export const interList = (params?: any) =>
  request({
    url: "patient/inter/list",
    method: "post",
    data: params
  });

// 患者详情
export const interDetail = (params?: any) =>
  request({
    url: "patient/inter/get",
    method: "post",
    data: params
  });

// 护理运转
export const eventlist = (params?: any) =>
  request({
    url: "patient/inter/eventlist",
    method: "post",
    data: params
  });

// 护理标识
export const nurselist = (params?: any) =>
  request({
    url: "patient/inter/nurselist",
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

// 消防信息
export const fireList = (params?: any) =>
  request({
    url: "patient/inter/firelist",
    method: "post",
    data: params
  });

// 信息详情
export const getNews = (params?: any) =>
  request({
    url: "patient/inter/getNews",
    method: "post",
    data: params
  });

// 信息发布
export const newlist = (params?: any) =>
  request({
    url: "patient/inter/newlist",
    method: "post",
    data: params
  });

// 患者风险评估记录
export const risklist = (params?: any) =>
  request({
    url: "patient/inter/risklist",
    method: "post",
    data: params
  });

// 护理站基本信息
export const userlist = (params?: any) =>
  request({
    url: "patient/inter/userlist",
    method: "post",
    data: params
  });
