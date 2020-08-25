<template>
  <layout>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </layout>
</template>

<script>
import layout from "../components/layout.vue";
export default {
  components: {
    layout
  },

};
</script>

<style>
</style>