<template>
  <div>
    <VueEmoji ref="emoji" @input="onInput" />

  </div>
</template>

<script>
import VueEmoji from 'emoji-vue'
export default {
  name: '',
  components: {
    VueEmoji
  },
  props: {

  },
  data() {
    return {
      myText: '123213'
    }
  },
  methods: {
    onInput({ data }) {
      //事件。数据包含文本区域的值
      // this.myText = data
      console.log(data)
    },
    clearTextarea() {
      this.$refs.emoji.clear()
    },
  }
}
</script>

<style scoped lang="scss">
</style>
