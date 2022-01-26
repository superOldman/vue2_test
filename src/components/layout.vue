<template>
  <div class="wrap">
    <aside class="aside">
      <el-scrollbar>
        <div class="aside_in">
          <div v-for="(item,index) in nav" :key="index">
            <div class="navBtn" @click="$router.push({ name: item.name, params:{ id: 123} })">{{item.name}}</div>
          </div>
        </div>
      </el-scrollbar>
    </aside>
    <div class="main">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nav: {}
    };
  },
  mounted() {
    this.getNav();
  },
  methods: {
    getNav() {
      this.nav = JSON.parse(sessionStorage.getItem('router'));
    }
  }
};
</script>

<style scoped lang="less">
.wrap {
  display: flex;
  width: 100vw;
  height: 100vh;
}
.aside {
  width: 200px;
  
  border-right: 1px solid #ccc;
  flex-grow: 0;
  flex-shrink: 0;
  height: 100%;
  /* overflow: auto; */
}
.aside_in{
  margin: 10px;
}
.main {
  padding: 20px;
  width: 100%;
}
.navBtn {
  border-bottom: 1px solid darkcyan;
  cursor: pointer;
  margin-bottom: 10px;
  line-height: 40px;
}
.navBtn:hover {
  background-color: antiquewhite;
}
/deep/ .el-scrollbar {
  height: 100%;
  .el-scrollbar__wrap {
    overflow-x: hidden;
  }
}
</style>