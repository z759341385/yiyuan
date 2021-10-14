import request from "@/utils/request";

// 患者简介
export const interList = (params?: any) =>
  request({
    url: "inter/list",
    method: "post",
    params
  });

// 患者详情
export const interDetail = (params?: any) =>
  request({
    url: "inter/get",
    method: "post",
    params
  });

// 诊疗医嘱
export const getMedicalAdvice = (params?: any) =>
  request({
    url: "inter/getMedicalAdvice",
    method: "post",
    params
  });

// 处方医嘱
export const getDocotorAdvice = (params?: any) =>
  request({
    url: "inter/getDocotorAdvice",
    method: "post",
    params
  });

// 护理运转
export const eventlist = (params?: any) =>
  request({
    url: "inter/eventlist",
    method: "post",
    data: params
  });

// 护理标识
export const nurselist = (params?: any) =>
  request({
    url: "inter/nurselist",
    method: "post",
    data: params
  });

// 排程安排
export const planList = (params?: any) =>
  request({
    url: "inter/planlist",
    method: "post",
    data: params
  });

// 消防信息
export const fireList = (params?: any) =>
  request({
    url: "inter/firelist",
    method: "post",
    data: params
  });

// 信息详情
export const getNews = (params?: any) =>
  request({
    url: "inter/getNews",
    method: "post",
    data: params
  });

// 信息发布
export const newlist = (params?: any) =>
  request({
    url: "inter/newlist",
    method: "post",
    data: params
  });

// 患者风险评估记录
export const risklist = (params?: any) =>
  request({
    url: "inter/risklist",
    method: "post",
    params
  });

// 护理站基本信息
export const userlist = (params?: any) =>
  request({
    url: "inter/userlist",
    method: "post",
    params
  });

// 输液监控中心
export const infusionMonitor = (params?: any) =>
  request({
    url: "dev/screen/infusionMonitor",
    method: "get",
    params
  });
