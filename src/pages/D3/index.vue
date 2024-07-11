<template>
  <div ref="container"></div>
</template>

<script>
import data from './data.json'
// import { createNode, createResource } from '@/pages/D3/D3tree'
import D3Tree from '@/pages/D3/D3tree'
export default {
  name: 'd3_collapsibleTree_test',
  components: {},
  props: {},
  data() {
    return {}
  },
  mounted() {
    new D3Tree(data, this.$refs.container)
  },
  methods: {},
}
</script>

<style scoped lang="scss"></style>
