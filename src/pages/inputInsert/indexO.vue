<template>
  <div>
    <el-input type="textarea"  v-model="textarea" @keydown.native="keydownHandle" />

  </div>
</template>

<script>

export default {
  name: 'InputInsert',
  components: {

  },
  props: {

  },
  data() {
    return {
      textarea: '1231[$test$]33',

    }
  },
  methods: {
    blurHandle(e) {
      console.log('blur', e)
    },
    keydownHandle(e) {
      if (e.key === 'Backspace') {
        const idx = e.srcElement.selectionStart - 1
        const frontFirst = this.textarea[idx]
        const 匹配字典 = {
          ']': '[',
          '}': '{',
        }
        const keys = Object.keys(匹配字典)

        if (keys.includes(frontFirst)) {
          const endIdx = idx + 1
          let startIdx
          for (let index = idx; index >= 0; index--) {
            if (this.textarea[index] === 匹配字典[frontFirst]) {
              startIdx = index
              break
            }
          }
          if (startIdx !== undefined) {
              e.target.setSelectionRange(startIdx, endIdx)
              e.preventDefault()
          }
        }
      }
    },
  }
}
</script>

<style scoped lang="scss"></style>