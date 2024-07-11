<template>
  <div class="select-btn">
    <div class="btn-main fx-s-center">
      <div class="plat-img"></div>
      <div v-if="dropDownSelected.length" class="mid-text">已选：{{ dropDownSelected.length }}</div>
      <div v-else class="mid-text">{{ list.length }}</div>
    </div>
    <SelectDropdown :data="list" class="select-dropdown" @change="changeHandle" />
  </div>
</template>

<script>
import SelectDropdown from '@/components/selectDropdown/selectDropdown'
export default {
  name: 'SelectBtn',
  components: {
    SelectDropdown,
  },
  props: {},
  data() {
    return {
      selected: 0,
      dropDownSelected: [],
      list: [
        { name: '1', text: '都是法师法师法师打发手打' },
        { name: '12', text: '都是法师法师法师打发手打' },
        { name: '23', text: '都是法师法师法师打发手打' },
        { name: '123', text: '都是法师法师法师打发手打' },
        { name: '4', text: '都是法师法师法师打发手打' },
        { name: '5', text: '都是法师法师法师打发手打' },
      ],
    }
  },
  methods: {
    changeHandle(val) {
      this.dropDownSelected = val
    },
  },
}
</script>

<style scoped lang="less">
.select-btn {
  display: inline-flex;
  position: relative;
  padding: 8px;
  background-color: #fff;
  border: 1px solid #d5d5d5;
  border-radius: 4px;
  // line-height: 40px;
  // height: 36px;
  .btn-main {
    line-height: 20px;
    margin-right: 20px;
    .plat-img {
      width: 24px;
      height: 24px;
      background: #425f9b;
      border-radius: 4px;
    }
    .mid-text {
      margin: 0 4px;
    }
  }
  .select-dropdown {
    // width: 20px;
    // height: 20px;
    position: absolute;
    right: 0;
    top: 0;
    height: 40px;
    width: 100%;
  }
}
</style>
