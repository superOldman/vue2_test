<template>
  <div>
    <div>{{bl}}</div>
    <button class=".sty" @click="fn($event)">收</button>
    <button @click="send('fa')">发</button>
    <button @click="xx">发</button>
  </div>
</template>

<script>
export default {
  props: ["bl", "fn"],
  mounted() {},
  methods: {
      xx(){
          console.log(this)
      },
    send(params) {
        // console.log(params)
        // debugger
      this.$emit("parent",params);

      
      console.log(this.$refs)
     

    }
  }
};
</script>

<style>
</style>