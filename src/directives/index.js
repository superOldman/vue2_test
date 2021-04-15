import copy from './copy'
import debounce from './debounce'
// import longpress from './longpress'
// 自定义指令
const directives = {
  copy,
  debounce,
}

export default {
  install(Vue) {
    Object.keys(directives).forEach((key) => {
      Vue.directive(key, directives[key])
    })
  },
}