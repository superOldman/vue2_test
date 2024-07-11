<template>
  <div>
    <cptest :options="options">
      <template slot="b" slot-scope="{ row }">
        <div @click="fn">{{ row }}3213</div>
      </template>
    </cptest>
  </div>
</template>

<script>
import cptest from './cptest.vue'
export default {
  name: '',
  components: {
    cptest,
  },
  props: {},
  data() {
    return {
      options: [],
    }
  },
  mounted() {
    this.options = [
      { key: 'a', com: '' },
      { key: 'b', com: true },
    ]
  },
  methods: {
    fn() {
      alert('fuck')
    },
  },
}
</script>

<style scoped lang="less"></style>
