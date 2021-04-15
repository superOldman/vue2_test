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
  mounted() { },
  methods: {
    async setList() {
      const result = await ajax.getRouter();
      const children = result.data;

      console.log('child', children)
      sessionStorage.setItem("router", JSON.stringify(children));
      children.forEach(e => {
        let cp = e.component;
        e.component = () => import(`./${cp}.vue`);
      });

      let arr = [
        {
          path: "/home",
          name: "wrap",
          component: () => import("./wrap.vue"),
          children
        }
      ];

      if (this.$router.options.routes.length <= 2) {
        this.$router.options.routes.push(arr[0]);
        this.$router.addRoutes(arr);
      }
    },
    turnHome() {
      this.$router.push("/home");
    }
  }
};
</script>
<style>
</style>