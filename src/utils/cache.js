let queryParamsKeys = [] // 用于匿藏页面跳转信息key
let queryParamsObj = {} // 用于匿藏页面跳转信息
const QUERY_PARAMS_KEYS = 'QUERY_PARAMS_KEYS'
const QUERY_PARAMS_OBJ = 'QUERY_PARAMS_OBJ'
const sessionCache = {
  set(key, value) {
    if (!sessionStorage) {
      return
    }
    if (key != null && value != null) {
      sessionStorage.setItem(key, value)
    }
  },
  get(key) {
    if (!sessionStorage) {
      return null
    }
    if (key == null) {
      return null
    }
    return sessionStorage.getItem(key)
  },
  setJSON(key, jsonValue) {
    if (jsonValue != null) {
      this.set(key, JSON.stringify(jsonValue))
    }
  },
  getJSON(key) {
    const value = this.get(key)
    if (value != null) {
      return JSON.parse(value)
    }
  },
  remove(key) {
    sessionStorage.removeItem(key)
  },
}
const localCache = {
  set(key, value) {
    if (!localStorage) {
      return
    }
    if (key != null && value != null) {
      localStorage.setItem(key, value)
    }
  },
  get(key) {
    if (!localStorage) {
      return null
    }
    if (key == null) {
      return null
    }
    return localStorage.getItem(key)
  },
  setJSON(key, jsonValue) {
    if (jsonValue != null) {
      this.set(key, JSON.stringify(jsonValue))
    }
  },
  getJSON(key) {
    const value = this.get(key)
    if (value != null) {
      return JSON.parse(value)
    }
  },
  remove(key) {
    localStorage.removeItem(key)
  },
  // 目前暂存5个
  saveQueryParams(params) {
    // 获取
    let key = (window.history.state || {}).key
    if (!key) return
    key = `key_${key}`
    let keys = this.getJSON(QUERY_PARAMS_KEYS) || []
    const obj = this.getJSON(QUERY_PARAMS_OBJ) || {}
    if (obj[key]) {
      // 如果key已经有值了 就更新这个值 更新在keys的位置
      keys = [...keys.filter(v => v != key), key]
    } else {
      // 如果key没有值
      if (keys.length >= 5) {
        const firstKey = keys.shift()
        delete obj[firstKey]
      }
      keys.push(key)
    }
    obj[key] = params
    this.setJSON(QUERY_PARAMS_KEYS, keys)
    this.setJSON(QUERY_PARAMS_OBJ, obj)
  },
  getQueryParams() {
    // 获取
    let key = (window.history.state || {}).key
    if (!key) return
    key = `key_${key}`
    const obj = this.getJSON(QUERY_PARAMS_OBJ) || {}
    return obj[key]
  },
  removeQueryParams() {
    this.remove(QUERY_PARAMS_OBJ)
    this.remove(QUERY_PARAMS_KEYS)
  },
}

export default {
  /**
   * 会话级缓存
   */
  session: sessionCache,
  /**
   * 本地缓存
   */
  local: localCache,
}
