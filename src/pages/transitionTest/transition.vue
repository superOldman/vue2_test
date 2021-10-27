<template>
  <div>
    <el-button @click="change">切换</el-button>
    <transition>
      <el-table v-if="table.length > 0" :data="table">
        <el-table-column label="name" prop="name" />
        <el-table-column label="sex" prop="sex" />
      </el-table>
      <p v-else>Sorry, no items found.</p>
    </transition>
    <animated-integer :value="number"/>
    <el-button @click="number=Math.random()*100">切换</el-button>


    <!-- <animated-integer  /> -->
  </div>
</template>

<script>
import animateNum from './animateNum.js'
export default {
  name: '',
  // components:{
  //   animateNum
  // },
  data() {
    return {
      number: 0,
      btnchange: true,
      table: [
        // { name: '1', sex: 'man' },
        // { name: '2', sex: 'woman' },
      ]
    }
  },
  methods: {
    change() {
      if (this.btnchange) {
        this.table = [
          { name: '1', sex: 'man' },
          { name: '2', sex: 'woman' },
        ]
      } else {
        this.table = []
      }
      this.btnchange = !this.btnchange

    }
  },
};
</script>

<style scoped lang="less">
</style>
