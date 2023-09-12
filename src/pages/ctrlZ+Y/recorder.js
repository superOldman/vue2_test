// 用于撤回的记录
let recordList = []
// 用于反撤回的记录
let recordList4ctrlY = []
import { cloneDeep } from 'lodash'
// import indexVersion1 from '@/pages/dragDemo/indexVersion1.vue'
export default {
  name: 'ctrlZ',
  mounted() {
    document.addEventListener('keyup', this.onKeyUp)
    document.addEventListener('keydown', this.onKeyDown)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.onKeyUp)
    document.removeEventListener('keydown', this.onKeyDown)
  },
  methods: {
    onKeyDown(e) {
      e.preventDefault()
      switch (e.key) {
      case 'Shift':
        this.multiable = true
        break
      default:
        break
      }
    },
    onKeyUp(e) {
      e.preventDefault()
      switch (e.key) {
      case 'Shift':
        this.multiable = false
        break
      default:
        break
      }
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
    },
    // 记录list
    record(oldBranch) {
      recordList.push(cloneDeep(this.layout))
      if (!oldBranch) recordList4ctrlY = []
      console.log(recordList)
    },
    // 撤回
    goBack() {
      if (recordList.length === 1) {
        return this.$message.warning('撤回到底了')
      }

      const idx = recordList.length - 2
      if (idx !== -1) {
        this.layout = cloneDeep(recordList[idx])
      }

      const tmp = recordList.pop()
      recordList4ctrlY.push(tmp)
    },
    // 反撤回
    goForward() {
      if (!recordList4ctrlY.length) return
      this.layout = recordList4ctrlY.pop()
      this.record(true)
    },

    getTwoList() { return [recordList, recordList4ctrlY] },
    setTwoList(r, ry) {
      recordList = r
      recordList4ctrlY = ry
    }

  }
}

