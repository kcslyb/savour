class StorageUtil {
  static getInstance () {
    if (!StorageUtil.instance) {
      StorageUtil.instance = new StorageUtil()
    }
    return StorageUtil.instance
  }

  getItem (key) {
    return localStorage.getItem(key)
  }

  setItem (key, value) {
    return localStorage.setItem(key, value)
  }

  removeItem (key) {
    return localStorage.removeItem(key)
  }

  clear () {
    return localStorage.clear()
  }
}
export default StorageUtil
