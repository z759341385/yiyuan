import request from "@/utils/request";

/**
 * 登录接口请求token与userinfo
 * @param params {code: code}
 */
export function loginByCode(params: any) {
  return request({
    url: "/web_wxlogin",
    method: "post",
    data: params,
  });
}
/**
 * 获取登录用户信息
 * @param params
 */
export function getUserInfo(params?: any) {
  return request({
    url: "/userinfo",
    method: "post",
    data: params,
  });
}

/**
 * 设置登录用户信息
 * @param params
 */
export const setUserInfo = (params: any) =>
  request({
    url: "/setinfo",
    method: "post",
    data: params,
  });

/**
 * 提交分数
 * @param params
 */
export const finishTest = (params: any) =>
  request({
    url: "/finishTest",
    method: "post",
    data: params,
  });
