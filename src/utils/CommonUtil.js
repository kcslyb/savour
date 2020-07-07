import moment from 'moment'

const commonUtil = {
  /**
   * 格式化日期时间函数
   *
   * @param formatString
   * @returns {String}
   */
  formatStringToDateTime: (formatString) => {
    if (formatString) {
      return moment(parseInt(formatString)).format('YYYY-MM-DD HH:mm:ss')
    }
    return ''
  },

  /**
   * 格式化日期函数
   *
   * @param formatString
   * @returns {String}
   */
  formatStringToDate: (formatString) => {
    if (formatString) {
      return moment(parseInt(formatString)).format('YYYY-MM-DD')
    }
    return ''
  },

  timeInterval: (dateStart = +new Date(), dataEnd = +new Date()) => {
    const tempStart = new Date(parseInt(dateStart + ''))
    const tempEnd = new Date(dataEnd)
    const number = tempStart.getTime() - tempEnd.getTime()
    const interval = number / (24 * 3600 * 1000)
    return number > 0 ? Math.floor(interval) : Math.ceil(interval)
  },

  /**
   * 从指定数组中生成指定位数随机数
   * @param arr 指定数组
   * @param n 指定位数
   * @returns {*}
   */
  sampleRandomNumber: (arr = [], n = 10) => {
    const tempNmb = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    const tempStr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't']
    const temp = arr.length > 0 ? arr : tempNmb.concat(tempStr)
    const tempLength = temp.length
    const str = []
    for (let i = 0; i < n; i++) {
      const s = Math.floor(Math.random() * tempLength - 1)
      str.push(temp[s])
    }
    return str.join('')
  },

  // 定义检测数据类型的功能函数
  checkedType: (target) => {
    return Object.prototype.toString.call(target).slice(8, -1)
  },
  // 实现深度克隆---对象/数组
  cloneDeep: (target) => {
    // 判断拷贝的数据类型
    // 初始化变量result 成为最终克隆的数据
    let result
    const targetType = commonUtil.checkedType(target)
    if (targetType === 'Object') {
      result = {}
    } else if (targetType === 'Array') {
      result = []
    } else {
      return target
    }
    // 遍历目标数据
    for (const i in target) {
      // 获取遍历数据结构的每一项值。
      const value = target[i]
      // 判断目标结构里的每一值是否存在对象/数组
      if (commonUtil.checkedType(value) === 'Object' ||
        commonUtil.checkedType(value) === 'Array') { // 对象/数组里嵌套了对象/数组
        // 继续遍历获取到value值
        result[i] = commonUtil.cloneDeep(value)
      } else { // 获取到value值是基本的数据类型或者是函数。
        result[i] = value
      }
    }
    return result
  },

  /**
   * 转换对象字段
   * @param obj 需要转换的对象
   * @param propObj 字段关联对象
   */
  convertObjectField: (obj, propObj) => {
    const flag1 = commonUtil.checkedType(obj) !== 'Object'
    const flag2 = commonUtil.checkedType(propObj) !== 'Object'
    if (flag1 || flag2) {
      return obj
    }
    const resultObj = {}
    const keys = Object.keys(obj)
    keys.forEach(value => {
      if (commonUtil.objHasOwnProperty(propObj, value)) {
        resultObj[propObj[value]] = obj[value]
      } else {
        resultObj[value] = obj[value]
      }
    })
    return resultObj
  },

  getDateByWeek (year, weeks, weekDay = 0) {
    const date = new Date(year, 0, 1)
    // 取得这个日期对象 date 的长整形时间 time
    let time = date.getTime()
    // 将这个长整形时间加上第N周的时间偏移
    // 因为第一周就是当前周,所以有:weeks-1,以此类推
    // 7*24*3600000 是一星期的时间毫秒数,(JS中的日期精确到毫秒)
    time += (weeks - 1) * 7 * 24 * 3600000
    // 为日期对象 date 重新设置成时间 time
    date.setTime(time)
    weekDay %= 7
    const day = date.getDay()
    let times = date.getTime()
    let sub = weekDay - day
    if (sub <= 0) {
      sub += 7
    }
    times += sub * 24 * 3600000
    date.setTime(times)
    return date
  },

  /**
   * 文件下载可改文件名
   * @param url
   * @param fileName
   * @return {Promise<any | never>}
   */
  fieldDownload (url, fileName) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.responseType = 'blob'
      xhr.onload = () => {
        resolve(xhr)
      }
      xhr.onerror = reject
      xhr.open('GET', url)
      xhr.send()
    }).then((xhr) => {
      const a = document.createElement('a')
      a.href = window.URL.createObjectURL(xhr.response)
      a.download = fileName // Set the file name.
      a.style.display = 'none'
      document.body.appendChild(a)
      a.click()
      return xhr
    })
  },

  streamFileDownload (data, fileName) {
    if (!data) {
      return
    }
    const url = window.URL.createObjectURL(new Blob([data],
      { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }))
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
    link.remove()
  },

  /**
   * 去除对象中的空字段
   * @param obj
   * @returns {{}|*}
   */
  removeObjEmptyKey: (obj) => {
    const keys = Object.keys(obj)
    const resultObj = {}
    if (keys) {
      keys.forEach(value => {
        if (obj[value]) {
          resultObj[value] = obj[value]
        }
      })
      return resultObj
    }
    return obj
  },

  /**
   * 置空简单对象中的属性
   * @param obj
   * @returns {{}|*}
   */
  resetObj: (obj) => {
    const keys = Object.keys(obj)
    if (keys.length) {
      keys.forEach(value => {
        obj[value] = ''
      })
    }
    return obj
  },

  /**
   * 判断对象中是否含有指定字段
   * @param obj 需要校验的对象
   * @param prop 需要校验的字段
   * @returns {boolean}
   */
  objHasOwnProperty: (obj, prop) => {
    return Object.prototype.hasOwnProperty.call(obj, prop)
  },
  /**
   * 提取对象中的指定字段属性作为新对象的字段
   * @param obj
   * @param propList
   * @returns {{}}
   */
  assignHasOwnProperty: (obj, propList) => {
    const resultObj = {}
    const process = {
      Id: 'Name',
      Name: 'Id',
      Names: 'Ids',
      Ids: 'Names'
    }
    const regexp = /Name$|Id$|Names$|Ids$/
    propList.forEach(value => {
      if (commonUtil.objHasOwnProperty(obj, value)) {
        resultObj[value] = obj[value] ? obj[value] : ''
      }
      if (regexp.test(value)) {
        const prop = value.match(regexp)[0]
        const propName = value.replace(prop, process[prop])
        if (commonUtil.objHasOwnProperty(obj, propName)) {
          resultObj[propName] = obj[propName] ? obj[propName] : ''
        }
      }
    })
    if (commonUtil.objHasOwnProperty(obj, 'id')) {
      resultObj.id = obj.id
    }
    return resultObj
  },
  /**
   * 从数组对象中提取指定字段属性值
   * @param objList
   * @param prop
   * @returns {{}} 返回属性值组成的新数组
   */
  extractHasOwnProperty: (objList, prop = 'name') => {
    const resultPropList = []
    objList.forEach(value => {
      resultPropList.push(value[prop])
    })
    return resultPropList
  },

  objAssign (formItems, responseObj, props = []) {
    const temp = props.concat(this.extractHasOwnProperty(formItems))
    return this.assignHasOwnProperty(responseObj, temp)
  },

  changeItemsDisabled (items = [], flag = true) {
    items.map(value => {
      value.disabled = flag
      value.placeholder = flag ? ' ' : ''
    })
    return items
  },

  /**
   * 根据下标删除数组中的多个元素
   * @param array
   * @param indexList
   */
  deleteArrayElement: (array, indexList) => {
    if (indexList.length === 0) {
      return array
    }
    const resultList = array.filter((item, index) => !indexList.includes(index))
    // eslint-disable-next-line no-return-assign
    resultList.map((val, index) => val.index = index)
    return resultList
  }
}
export default commonUtil
