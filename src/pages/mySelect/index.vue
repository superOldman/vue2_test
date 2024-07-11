<template>
  <div>
    <el-button type="primary">全部</el-button>
    <SelectBtn />
  </div>
</template>

<script>
// import SelectDropdown from '@/components/selectDropdown/selectDropdown'
import SelectBtn from '@/components/selectDropdown/selectBtn'
export default {
  name: 'MySelect',
  components: {
    SelectBtn,
  },
  props: {},
  data() {
    return {}
  },
  methods: {},
}
</script>

<style scoped lang="less"></style>
