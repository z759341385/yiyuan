import { loginByCode, getUserInfo } from "@/api/user";
import {
  saveToken,
  saveLoginStatus,
  saveUserInfo,
  removeToken,
  removeUserInfo,
  removeLoginStatus,
  loadLoginStatus,
  loadToken,
  loadUserInfo
} from "@/utils/cookies";
import { Action, getModule, Module, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";

export interface UserState {
  loginStatus: string;
  token: string;
  userInfo: any;
}
@Module({ dynamic: true, store, name: "user" })
class User extends VuexModule implements UserState {
  loginStatus = loadLoginStatus(); // 登录状态
  token = loadToken(); // token
  userInfo = loadUserInfo(); // 用户登录信息

  @Mutation
  SET_USERINFO(userInfo: any) {
    this.userInfo = userInfo;
  }
  @Mutation
  SET_LOGIN_STATUS(loginStatus: any) {
    this.loginStatus = loginStatus;
  }
  @Mutation
  SET_TOKEN(token: any) {
    this.token = token;
  }

  // 登录相关，通过code获取token和用户信息，用户根据自己的需求对接后台
  @Action
  loginWechatAuth( code: any) {
    const data = {
      code: code
    };
    return new Promise((resolve, reject) => {
      loginByCode(data)
        .then(res => {
          // 存用户信息，token
          this.SET_USERINFO(saveUserInfo(res.data));
          this.SET_TOKEN(saveToken(res.data.token));
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }

  // 获取用户信息
  @Action
  getUserInfo() {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(res => {
          // 存用户信息，token
          const user = this.userInfo;
          user.user_info = res.data;
          user.info = res.data.info;
          this.SET_USERINFO(saveUserInfo(user));
          resolve(res);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  // 设置状态
  @Action
  setLoginStatus(query: any) {
    if (query === 0 || query === 1) {
      // 上线打开注释，本地调试注释掉，保持信息最新
      removeToken();
      removeUserInfo();
    }
    // 设置不同的登录状态
    this.SET_LOGIN_STATUS(saveLoginStatus(query));
  }

  // 登出
  @Action
  fedLogOut() {
    // 删除token，用户信息，登陆状态
    removeToken();
    removeUserInfo();
    removeLoginStatus();
  }
}

export const UserModule = getModule(User);
