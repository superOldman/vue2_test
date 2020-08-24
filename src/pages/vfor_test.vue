<template>
  <div>
    <button @click="show = !show">toggle</button>
    <div v-if="show">
        <div v-for="(item,index) in list" :key="index">{{item}}</div>
    </div>
    <button @click="toRoute">跳转</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      list: [1,2,3,4,5,6]
    };
  },
  mounted(){
    console.log(this.$route.name)
    console.log(this.$router)
  },
  methods:{
      toRoute(){
        //   this.$router.push({name:'home',params:{ id: '123'}})
          this.$router.push({ name: 'home', query: { id: '12312313' } });
      }
  }

};
</script>

<style>
</style>