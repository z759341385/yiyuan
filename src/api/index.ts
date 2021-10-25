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

// 体征监测
export const vitalSignsList = (params?: any) =>
  request({
    url: "inter/vitalSignsList",
    method: "post",
    params
  });

// 护理运转
export const eventlist = (params?: any) =>
  request({
    url: "inter/eventlist",
    method: "post",
    params
  });

// 护理标识
export const nurselist = (params?: any) =>
  request({
    url: "inter/nurselist",
    method: "post",
    params
  });

// 排程安排
export const planList = (params?: any) =>
  request({
    url: "inter/planlist",
    method: "post",
    params
  });

// 手术排程
export const operateList = (params?: any) =>
  request({
    url: "inter/operatelist",
    method: "post",
    params
  });

// 检查预约
export const checkList = (params?: any) =>
  request({
    url: "inter/checklist",
    method: "post",
    params
  });

// 消防信息
export const fireList = (params?: any) =>
  request({
    url: "inter/firelist",
    method: "post",
    params
  });

// 消防器材巡检记录
export const fireChecklist = (params?: any) =>
  request({
    url: "inter/fireChecklist",
    method: "post",
    params
  });

// 消防设备
export const fireDevlist = (params?: any) =>
  request({
    url: "inter/fireDevlist",
    method: "post",
    params
  });

// 消防巡检人
export const fireUserlist = (params?: any) =>
  request({
    url: "inter/fireUserlist",
    method: "post",
    params
  });

// 添加消防巡查记录
export const addFireCheck = (params?: any) =>
  request({
    url: "inter/addFireCheck",
    method: "post",
    params
  });

// 信息详情
export const getNews = (params?: any) =>
  request({
    url: "inter/getNews",
    method: "post",
    params
  });

// 信息发布
export const newInfo = (params?: any) =>
  request({
    url: "inter/newlist",
    method: "post",
    params
  });

// 医院公告
export const hospitalList = (params?: any) =>
  request({
    url: "inter/hlist",
    method: "post",
    params
  });

// 病区公告
export const depList = (params?: any) =>
  request({
    url: "inter/deplist",
    method: "post",
    params
  });

// 宣教信息
export const xxList = (params?: any) =>
  request({
    url: "inter/xxlist",
    method: "post",
    params
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
    url: "inter/infusionMonitor",
    method: "post",
    params
  });

// 交班信息
export const shiftList = (params?: any) =>
  request({
    url: "inter/shiftlist",
    method: "post",
    params
  });

// 交班内容
export const shiftReportList = (params?: any) =>
  request({
    url: "inter/shiftReportlist",
    method: "post",
    params
  });
