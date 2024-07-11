<template>
  <div>
    <div class="computeBlock">
      <h4>计算属性求和</h4>
      <div class="inputs">
        <input type="text" v-model="a" />
        <input type="text" v-model="b" />
        <input type="text" v-model="c" />
        <input type="text" v-model="d" />
        <input type="text" v-model="e" />
      </div>

      <div class="output">总和：{{ all }}</div>
    </div>

    <div class="watchBlock">
      <h4>监听机制</h4>
      <div>
        <h5>对象 添加属性 赋值监听</h5>
        <input type="text" v-model="text.name" />
        <div>监听到：{{ text }}</div>
      </div>
      <div>
        <h5>对象 $set 赋值监听</h5>
        <input type="text" v-model="text2.name" />
        <div>监听到：{{ text2 }}</div>
      </div>
      <div>
        <h5>对象 整个重新赋值 监听</h5>
        <input type="text" v-model="text3.name" />
        <div>监听到：{{ text3 }}</div>
      </div>
    </div>
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
      text2: {},
      text3: {},
      arr: [
        { name: '小明', age: 13 },
        { name: '小红', age: 14 },
      ],
    }
  },
  computed: {
    all: function() {
      return Number(this.a) + Number(this.b) + Number(this.c) + Number(this.d) + Number(this.e)
    },
  },
  created() {
    // this.$set(this.text, "name", "12312");

    this.text.name = 1231
    this.$set(this.text2, 'name', '12312')
    this.text3 = {
      name: '123131',
    }
  },
  watch: {
    text: {
      deep: true,
      handler(val) {
        console.log('监听', val)
      },
    },
  },
  mounted() {
    this.fn()
  },
  methods: {
    fn() {
      var a = this.arr.map(a => a.name)
      console.log(a)
    },
  },
}
</script>

<style lang="less" scoped>
.computeBlock {
  box-shadow: 1px 1px 5px 0 rgba(1, 1, 1, 0.3);
  padding: 10px;
  .inputs {
    display: flex;
  }
  .output {
    text-align: right;
  }
}
.watchBlock {
  margin-top: 10px;
  text-align: left;
  box-shadow: 1px 1px 5px 0 rgba(1, 1, 1, 0.3);
  padding: 10px;
}
</style>
