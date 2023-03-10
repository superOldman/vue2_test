

// 用于撤回的记录
const recordList = []
// 用于反撤回的记录
const recordList4ctrlY = []
import { cloneDeep } from 'lodash'
// import indexVersion1 from '@/pages/dragDemo/indexVersion1.vue'
export default {
  name: 'ctrlZ',
  // mixins: [indexVersion1],
  components: {

  },
  props: {

  },
  data() {
    return {

    }
  },
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
        this.withdraw()
      }
      // ctrl + y 反撤回
      if (e.ctrlKey && e.key === 'y') {
        this.ctrlY()
      }
      // ctrl + s 保存
      if (e.ctrlKey && e.key === 's') {
        this.save()
      }
    },
    // 记录list
    record(rect) {
      if (rect) {
        // 更新list
        const current = this.list.find(item => item.focused)
        current.x = rect.left
        current.y = rect.top
        current.w = rect.width
        current.h = rect.height
      }
      recordList.push(cloneDeep(this.list))
      console.log(recordList)
    },
    // 撤回
    withdraw() {
      if (recordList.length === 1) {
        alert('撤回到底了')
        return
      }
      const idx = recordList.length - 2 // -1
      if (idx !== -1) {
        this.setNewList(recordList[idx])
      }
      const tmp = recordList.pop()
      recordList4ctrlY.push(tmp)

      console.log(recordList)
      console.log(recordList4ctrlY);
    },
    // 反撤回
    ctrlY() {
      this.list = recordList4ctrlY.pop()
      this.record()
    },
    setNewList(list) {
      this.list = list
    }
  }
}

