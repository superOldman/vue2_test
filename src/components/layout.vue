<template>
  <div class="wrap">
    <aside class="aside">
      <div v-for="(item,index) in nav" :key="index">
        <div class="navBtn" @click="$router.push({ name: item.name })">{{item.name}}</div>
      </div>
    </aside>
    <div class="main">
      <slot />
    </div>
  </div>
</template>

<script>
import nav from "../nav/nav";
export default {
  data() {
    return {
      nav
    };
  }
};
</script>

<style>
.wrap{
  display: flex;
}
.aside{
  width: 200px;
  padding: 10px;
  border-right: 1px solid #ccc; 
}
.main{
  padding: 20px;
}
.navBtn{
  border-bottom: 1px solid darkcyan;
  cursor: pointer; 
  margin-bottom: 10px;
  line-height: 40px;
}
.navBtn:hover{
  background-color: antiquewhite
}
</style>