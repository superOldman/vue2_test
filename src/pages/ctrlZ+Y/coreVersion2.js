


import { cloneDeep } from 'lodash'

class Recorder {
  // 用于撤回的记录
  recordList = []
  // 用于反撤回的记录
  recordList4ctrlY = []
  // 用于抛出的当前状态
  list = []

  constructor() { }
  save() { }
  // 记录list
  record(list, oldBranch) {
    if (!list) return console.log('无记录')
    this.recordList.push(cloneDeep(list))
    if (!oldBranch) this.recordList4ctrlY = []
    console.log(111111, this.recordList)
    console.log(222222, this.recordList4ctrlY)
  }
  // 撤回
  withdraw() {
    if (this.recordList.length === 1) {
      return console.log('撤回到底了')
    }
    const idx = this.recordList.length - 2
    if (idx !== -1) {
      this.list = cloneDeep(this.recordList[idx])
    }
    const tmp = this.recordList.pop()
    this.recordList4ctrlY.push(tmp)

    console.log(111111, this.recordList)
    console.log(222222, this.recordList4ctrlY)
  }
  // 反撤回
  ctrlY() {
    if (!this.recordList4ctrlY.length) return
    this.list = this.recordList4ctrlY.pop()
    this.record(this.list, true)
    console.log(111111, this.recordList)
    console.log(222222, this.recordList4ctrlY)

  }
  getList() {
    return this.list
  }
}

export default class Trigger {
  recorder = null
  setNewList = () => { }
  constructor(setFn) {
    this.recorder = new Recorder()
    this.initEvent()
    if (setFn) this.setNewList = setFn
  }
  initEvent() {
    document.addEventListener('keyup', e => this.onKeyUp(e))
  }
  removeEvent() {
    document.removeEventListener('keyup', e => this.onKeyUp(e))
  }
  onKeyUp(e) {
    e.preventDefault()
    // ctrl + z 撤回
    if (e.ctrlKey && e.key === 'z') {
      this.goBack()
    }
    // ctrl + y 反撤回
    if (e.ctrlKey && e.key === 'y') {
      this.goForward()
    }
    // ctrl + s 保存
    if (e.ctrlKey && e.key === 's') {
      this.save()
    }
  }
  record(v) {
    this.recorder.record(v)
  }
  notice() {
    const list = this.recorder.getList()
    list.length && this.setNewList(list)
  }

  goBack() {
    this.recorder.withdraw()
    this.notice()
  }
  goForward() {
    this.recorder.ctrlY()
    this.notice()
  }
  save() {
    this.recorder.save()
    this.notice()
  }
}

