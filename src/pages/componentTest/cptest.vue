<template>
  <div>
    <div v-for="(item,i) in options" :key="i">
      <slot v-if="item.com" :name="item.key" :row="item" />
      <template v-else>{{item.key}}</template>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  components: {

  },
  props: {
    options: Array
  },
  data() {
    return {

    };
  },
  methods: {

  }
};
</script>

<style scoped lang="less">
</style>
