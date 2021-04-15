<template>
  <div>
    <input type="text" v-model="text" :placeholder="'请输入内容'">
    {{text}}
    <el-button v-copy="text">复制</el-button>
    <button v-debounce="debounceClick">fangddfs</button>

    <arrows />
  </div>
</template>

<script> 
import arrows from '../../components/arrows'
export default {
  components: {
    arrows
  },
  data() {
    return {
      text: '',
    }
  },
  mounted() {


  },
  methods: {
    debounceClick() {
      console.log(123123)
    }

  }
}
</script>

<style lang="css" scoped>
</style>