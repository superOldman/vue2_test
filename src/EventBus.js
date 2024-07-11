import Vue from 'vue'
const Bus = new Vue()

export default class EventBus {
  static fire(eventName, msg) {
    Bus.$emit(eventName, msg)
  }
  static on(eventName, cb) {
    Bus.$on(eventName, cb)
  }
}
