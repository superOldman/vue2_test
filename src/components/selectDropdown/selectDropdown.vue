<template>
  <el-dropdown ref="elDropdown" trigger="click" :hide-on-click="false" placement="bottom-start" @visible-change="visibleChange">
    <slot v-if="$slots.dropBtn" name="dropBtn" />
    <div v-else class="control fx-none fx-p-center">
      <div :class="['packUp',{'is-opened':isOpen}]">
        <i class="el-select__caret el-input__icon el-icon-arrow-down"></i>
      </div>
    </div>

    <el-dropdown-menu>
      <div class="my-dropdown">
        <div class="select-item">
          <el-input v-model="value" clearable placeholder="请输入" @change="inputChange"></el-input>
        </div>
        <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper scrollbar-wrapper-maxheight">
          <ul>
            <li v-for="(item,i) in realList" :key="i" class="select-item">
              <div>
                <el-checkbox v-model="item.selected" style="margin-right: 8px;"></el-checkbox>
                <ImgAndName class="fx-full" :text="item.name" :textScond="item.text" />
              </div>
            </li>
          </ul>
        </el-scrollbar>
        <div class="fx select-item" style="border-top:1px solid #f2f2f2;">

          <div class="fx fx-full">
            <div>已选：</div>
            <div>{{selectedList.length}}个</div>
          </div>
          <el-button type="primary" size="mini" :disabled="!selectedList.length" @click="clickHandle">确定</el-button>
        </div>
      </div>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import ImgAndName from './ImgAndName.vue'
import { cloneDeep } from 'lodash'

export default {
  name: 'SelectDropdown',
  components: {
    ImgAndName
  },
  mixins: [],
  // model: {
  //   prop: 'selectValue',
  //   event: 'selectChange'
  // },
  props: {
    showCheckbox: {
      type: Boolean,
      default: false
    },
    checkStrictly: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array,
      default: () => []
    },
    defaultProps: {
      type: Object,
      default: () => ({
        children: 'children',
        label: 'label'
      })
    },
    multiple: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    },
    nodeKey: {
      type: String,
      default: "",
    },
  },
  watch: {
    data: {
      deep: true,
      immediate: true,
      handler: function (val) {
        this.list = cloneDeep(val).map(e => ({ ...e, selected: false }))
      }
    },
  },
  data() {
    return {
      isOpen: false,
      value: '',
      list: []
      // selectedList: []
    }
  },
  computed: {
    selectedList() {
      return this.list.filter(e => e.selected)
    },
    realList() {
      if (!this.value) return this.list
      return this.list.filter(e => e.name.indexOf(this.value) !== -1)
    }
  },
  mounted() {
    // const self = this.$refs.elDropdown
    // this.$refs.elDropdown.handleClick = function () {
    //   if (self.triggerElm.disabled) return
    //   self.show()
    // }
    // this.$refs.elDropdown.initDomOperation()
    // this.searchTagGroup()
  },
  methods: {
    inputChange() {
      this.value
    },
    visibleChange(val) {
      this.isOpen = val
    },
    clickHandle() {
      this.$emit('change', this.selectedList)
      this.$refs.elDropdown.hide()
    }
  }
}
</script>

<style scoped lang="less">
.fx-wrap {
  flex-wrap: wrap;
}
/deep/ .scrollbar-wrapper-maxheight {
  max-height: 308px;
  padding-bottom: 10px;
}
.custom-tree-node {
  // width: 158px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.small-select {
  width: 200px;
  position: relative;
  cursor: pointer;
}
.my-dropdown {
  ::v-deep .el-select {
    width: 100%;
  }
  /deep/ .el-tree {
    width: 100%;
    padding: 0 16px;
  }
}
.select-item {
  padding: 0px 16px;
  > div {
    padding: 8px 4px;
    display: flex;
    border-radius: 4px;
    align-items: center;
    &:hover {
      background: rgba(49, 129, 255, 0.1);
    }
  }
}
.control {
  width: 20px;
  height: 100%;
  position: absolute;
  right: 0;
  top: 0;
  .el-select__caret {
    right: 10px;
    height: 40px;
    position: relative;
    color: rgb(134, 144, 156) !important;
  }

  .packUp {
    user-select: none;
    // color: #2f4bdd;
    position: relative;
    // width: 100%;
    cursor: pointer;
    &.is-opened .el-select__caret {
      transform: rotate(180deg);
    }
  }
}
// ::v-deep .el-input__inner {
//   border-top-left-radius: 0;
//   border-bottom-left-radius: 0;
//   cursor: pointer;
//   position: relative;
//   margin-left: -1px;
//   &:hover,
//   &:focus,
//   &:active {
//     z-index: 1;
//   }
// }
.control .el-select__caret {
  z-index: 2;
}
::v-deep .el-tree-node__content {
  height: 40px;
  &:hover {
    background: transparent;
  }
}

::v-deep .el-tree-node:focus > .el-tree-node__content {
  background-color: transparent !important;
}
</style>
