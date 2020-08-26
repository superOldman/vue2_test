<template>
  <div>
    <h4>login</h4>
    <button @click="turnHome">跳转</button>
  </div>
</template>

<script>

import ajax from "../services/api";

export default {

  created() {
    this.setList();
  },
  mounted(){

    
  },
  methods: {
    async setList() {
      const result = await ajax.getRouter();
      const children = result.data;
      children.forEach(e => {
        let cp = e.component;
        console.log(`./${cp}.vue`)
        e.component = () => require(`./${cp}.vue`);
      });

      let arr = [{
          path: "/home",
          name: "wrap",
          component: () => require("./wrap.vue"),
          children
        }]
      
      console.log(children);
      console.log(arr);
      this.$router.addRoutes(arr);
      console.log(this.$router);
      console.log(this.$route);

    },
    turnHome() {
      console.log(123)
      this.$router.push('/home');
    }
  }
};
</script>

<style>
</style>