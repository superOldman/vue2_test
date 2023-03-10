<template>
  <layout>
    <router-view></router-view>
  </layout>
</template>

<script>
import layout from "../components/layout.vue"


export default {
  name: 'wrap',
  components: {
    layout
  },
  created() {
  },
  methods: {


  }
}
</script>

<style>
</style>