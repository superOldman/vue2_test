<template>
  <div>
    <el-input type="textarea" v-model="textarea" @keydown.native="keydownHandle" />
  </div>
</template>

<script>
export default {
  name: 'InputInsert',
  components: {},
  props: {},
  data() {
    return {
      textarea: '多撒发大水东方大厦发[$EmpID$]阿斯蒂芬大[$CompName$]师傅徐师傅很尬[$CompName$]说法搭嘎干哈',
      options: [
        { holderName: '雇员姓名', holderValue: '[$EmpID$]' },
        { holderName: '公司名称', holderValue: '[$CompName$]' },
      ],
      matchMap: {},
      holderValueMap: {},
      maxLoop: 0,
    }
  },
  mounted() {
    this.setMap()
  },
  methods: {
    setMap() {
      this.options.forEach(e => {
        const val = e.holderValue
        const len = val.length
        this.matchMap[val[len - 1]] = val[0]
        this.holderValueMap[val] = true
        this.maxLoop = Math.max(len, this.maxLoop)
      })
    },
    keydownHandle(e) {
      if (e.key === 'Backspace') {
        if (e.target.selectionStart !== e.target.selectionEnd) return
        const idx = e.srcElement.selectionStart - 1
        const frontFirst = this.textarea[idx]
        const keys = Object.keys(this.matchMap)

        if (keys.includes(frontFirst)) {
          const endIdx = idx + 1
          let startIdx
          let str = ''
          for (let index = idx; index >= 0; index--) {
            if ((idx - index) >= this.maxLoop) break
            str = this.textarea[index] + str
            if (this.textarea[index] === this.matchMap[frontFirst]) {
              startIdx = index
              break
            }
          }
          if (startIdx !== undefined && this.holderValueMap[str]) {
            e.target.setSelectionRange(startIdx, endIdx)
            e.preventDefault()
          }
        }
      }
    },

    blurHandle(e) {
      console.log('blur', e)
    },
  },
}
</script>

<style scoped lang="scss"></style>