<template>
  <div>
    <input type="text" v-model="a" />
    <input type="text" v-model="b" />
    <input type="text" v-model="c" />
    <input type="text" v-model="d" />
    <input type="text" v-model="e" />
    <br />
    <input type="text" v-model="text.name" />

    <div>{{all}}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      e: 0,
      text: {},
      arr: [
        { name: "小明", age: 13 },
        { name: "小红", age: 14 }
      ]
    };
  },
  computed: {
    all: function() {
      return (
        Number(this.a) +
        Number(this.b) +
        Number(this.c) +
        Number(this.d) +
        Number(this.e)
      );
    }
  },
  created() {
    // this.$set(this.text, "name", "12312");
    this.text = {
      name : '123131'
    }
  },
  watch: {
    text: {
      deep: true,
      handler(val) {
        console.log("监听", val);
      }
    }
  },
  mounted() {
    this.fn();
  },
  methods: {
    fn() {
      var a = this.arr.map(a => a.name);
      console.log(a);
    }
  }
};
</script>

<style>
</style>