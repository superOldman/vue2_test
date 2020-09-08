<template>
  <div>
    <input type="text" v-model="a" />
    <br />
    <input type="text" v-model="a" v-focus2 />
    <br />
    <input type="text" v-model="a" v-focus  />
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 0
    };
  },

  created() {},
  watch: {},
  // 局部自定义指令指令
  directives: {
    focus2: {
      // 指令的定义
      inserted: function(el) {
        el.focus();
      }
    },
    demo: {
      bind: function (el, binding, vnode) {
        el.innerHtml = `name: ${binding.name}
        ${vnode}
        `
      }
    }

  },
  mounted() {},
  methods: {}
};
</script>

<style>
</style>