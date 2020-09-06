const getters = {
  userInfo: (state: any) => state.user.userInfo,
  userName: (state: any) => state.user.userInfo.userName,
  userId: (state: any) => state.user.userInfo.userId,
  avatar: (state: any) => state.user.userInfo.avatar,
  role: (state: any) => state.user.userInfo.roleName,
  permissions: (state: any) => state.user.userInfo.permissions,
  sysRouters: (state: any) => state.menu.sysRouters,
  currentRouters: (state: any) => state.menu.currentRouters,
  dict: (state: any) => state.common.dict,
  dictGroup: (state: any) => state.common.dictGroup
};
export default getters
