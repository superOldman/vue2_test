<template>
  <div class="childWarp">
    <div class="title">{{title}}模块</div>
    <textarea name="" id="" cols="30" rows="10" v-model="text"></textarea>
    <!-- <input type="textarea" v-model="blockContent.text" cols="30" rows="10">
    <input type="tel" name="a" id="a"> -->
    <!-- <button class=".sty" @click="fn($event)">收</button>
    <button @click="send('fa')">发</button>
    <button @click="xx">发</button> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    title: {
      type: String,
      default: '未命名'
    },
    text: {
      type: String,
      default: '...'
    },

  },
  mounted() {
    console.log("block fuqin", this.$parent);
  },
  methods: {
    xx() {
      console.log(this);
    },
    send(params) {
      // console.log(params)
      // debugger
      this.$emit("parent", params);
      console.log(this.$refs);
    }
  }
};
</script>
<style lang="less" scoped>
.childWarp{
  // width: 100px;  
  // border: 1px solid #000;
  box-shadow: 1px 1px 7px 0 rgba(1,2,3,0.3);
  padding: 20px;
  .title{
    text-align: left
  }
}
</style>
