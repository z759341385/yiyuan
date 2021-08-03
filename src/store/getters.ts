const getters = {
  // user
  token: (state: any) => state.user.token,
  userInfo: (state: any) => state.user.userInfo,
  loginStatus: (state: any) => state.user.loginStatus,
};
export default getters;
