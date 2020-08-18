function emptyAction (...args: any[]) {
  console.warn(`Current execute action is empty!${args}`)
}

class Actions {
  // 默认值为空 Action
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction
  };

  /**
   * 设置 actions
   */
  setActions (actions: any) {
    this.actions = actions
  }

  /**
   * 在 globalState 发生改变时触发
   */
  onGlobalStateChange (...args: any[]) {
    return this.actions.onGlobalStateChange(...args)
  }

  /**
   * 设置新的值
   */
  setGlobalState (...args: any[]) {
    return this.actions.setGlobalState(...args)
  }
}

const actions = new Actions()
export default actions
