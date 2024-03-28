<template>
  <el-dropdown ref="elDropdown" trigger="click" :hide-on-click="false" placement="bottom-start" @visible-change="visibleChange">
    <div class="el-select" @click="packup">
      <div class="el-select__tags" v-if="multiple" ref="tags" :style="{ 'max-width': inputWidth - 32 + 'px', width: '100%', zIndex: 9 }">
        <span v-if="collapseTags && selected.length">
          <el-tag :closable="!selectDisabled" :size="collapseTagSize" :hit="selected[0].hitState" type="info" @close="deleteTag($event, selected[0])" disable-transitions>
            <span class="el-select__tags-text">{{ selected[0].currentLabel }}</span>
          </el-tag>
          <el-tag v-if="selected.length > 1" :closable="false" :size="collapseTagSize" type="info" disable-transitions>
            <span class="el-select__tags-text">+ {{ selected.length - 1 }}</span>
          </el-tag>
        </span>
        <transition-group @after-leave="resetInputHeight" v-if="!collapseTags">
          <el-tag v-for="item in selected" :key="getValueKey(item)" :closable="!selectDisabled" :size="collapseTagSize" :hit="item.hitState" type="info" @close="deleteTag($event, item)"
            disable-transitions>
            <span class="el-select__tags-text">{{ item.currentLabel }}</span>
          </el-tag>
        </transition-group>

        <input type="text" class="el-select__input" :class="[selectSize ? `is-${ selectSize }` : '']" :disabled="selectDisabled" :autocomplete="autoComplete || autocomplete" @focus="handleFocus"
          @blur="softFocus = false" @keyup="managePlaceholder" @keydown="resetInputState" @keydown.down.prevent="handleNavigate('next')" @keydown.up.prevent="handleNavigate('prev')"
          @keydown.enter.prevent="selectOption" @keydown.esc.stop.prevent="visible = false" @keydown.delete="deletePrevTag" @keydown.tab="visible = false" @compositionstart="handleComposition"
          @compositionupdate="handleComposition" @compositionend="handleComposition" v-model="query" @input="debouncedQueryChange" v-if="filterable"
          :style="{ 'flex-grow': '1', width: inputLength / (inputWidth - 32) + '%', 'max-width': inputWidth - 42 + 'px' }" ref="input">
      </div>

      <el-input v-model="selectedLabel" :placeholder="placeholder" size="large" readonly></el-input>

      <div class="control fx-none fx-p-center">
        <div :class="['packup',{'is-opened':isOpen}]">
          <slot v-if="$slots.hideBtn" name="hideBtn" />
          <i v-else class="el-select__caret el-input__icon el-icon-arrow-down"></i>
        </div>
      </div>
    </div>

    <el-dropdown-menu slot="dropdown">
      <div class="my-dropdown">
        <el-scrollbar ref="scrollbar" wrap-class="scrollbar-wrapper scrollbar-wrapper-maxheight">
          <el-tree ref="tree" :data="data" :props="defaultProps" :show-checkbox="showCheckbox" :check-strictly="checkStrictly" :nodeKey="nodeKey" :expand-on-click-node="false" @check="treeCheck">

            <!-- <el-tree :data="data" :props="defaultProps" :show-checkbox="showCheckbox" :check-strictly="checkStrictly" :expand-on-click-node="false" highlight-current @check="treeCheck"> -->
            <!-- <span slot-scope="{ data }" class="custom-tree-node">
              <span>{{ data }}</span>
            </span> -->
          </el-tree>
        </el-scrollbar>
      </div>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
const valueEquals = (a, b) => {
  // see: https://stackoverflow.com/questions/3115982/how-to-check-if-two-arrays-are-equal-with-javascript
  if (a === b) return true;
  if (!(a instanceof Array)) return false;
  if (!(b instanceof Array)) return false;
  if (a.length !== b.length) return false;
  for (let i = 0; i !== a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
};
// import { getTagList, searchTagGroup } from '@/views/labelManagement/api/index.js'
import { Select } from 'element-ui'

export default {
  name: 'TreeDropdown',
  components: {

  },
  mixins: [Select],
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
    value(val, oldVal) {
      if (this.multiple) {
        this.resetInputHeight();
        if ((val && val.length > 0) || (this.$refs.input && this.query !== '')) {
          this.currentPlaceholder = '';
        } else {
          this.currentPlaceholder = this.cachedPlaceHolder;
        }
        if (this.filterable && !this.reserveKeyword) {
          this.query = ''
          this.handleQueryChange(this.query)
        }
      }
      this.setSelected()
      if (this.filterable && !this.multiple) {
        this.inputLength = 20
      }
      if (!valueEquals(val, oldVal)) {
        this.dispatch('ElFormItem', 'el.form.change', val)
      }

      this.$refs.tree.setCheckedNodes(val)
    },
  },
  data() {
    return {
      isOpen: false,
      selected: this.multiple ? [] : {},
    }
  },
  computed: {

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
    getOption(value) {
      let option;
      const isObject = Object.prototype.toString.call(value).toLowerCase() === '[object object]';
      const isNull = Object.prototype.toString.call(value).toLowerCase() === '[object null]';
      const isUndefined = Object.prototype.toString.call(value).toLowerCase() === '[object undefined]';

      for (let i = this.cachedOptions.length - 1; i >= 0; i--) {
        const cachedOption = this.cachedOptions[i];
        const isEqual = isObject
          ? getValueByPath(cachedOption.value, this.valueKey) === getValueByPath(value, this.valueKey)
          : cachedOption.value === value;
        if (isEqual) {
          option = cachedOption;
          break;
        }
      }
      if (option) return option;
      let label = (!isObject && !isNull && !isUndefined)
        ? String(value) : '';

      if (isObject) {
        label = value[this.defaultProps.label]
      }
      let newOption = {
        value: value,
        currentLabel: label
      };
      if (this.multiple) {
        newOption.hitState = false;
      }
      return newOption;
    },
    deleteTag(event, tag) {
      let index = this.selected.indexOf(tag);
      if (index > -1 && !this.selectDisabled) {
        const value = this.value.slice();
        value.splice(index, 1);
        this.$emit('input', value);
        this.emitChange(value);
        this.$emit('remove-tag', tag.value);
      }
      event.stopPropagation();
    },
    async searchTagGroup() {
      const [err, res] = await this.$reqFn(searchTagGroup, {})
      if (res && res.code === 200) {
        this.tagGroupData = (res.data.voList || []).map(e => {
          let newChild = []
          if (e.type !== 'TAG') {
            newChild = (e.childList || []).filter(e => !e.type)
            console.log('newChild', newChild)
            return { ...e, childList: newChild.map(c => ({ ...c, childList: [] })) }
          }
          return e
        })
      }
    },
    treeCheck(data, { checkedNodes, checkedKeys }) {

      this.$emit('input', checkedNodes);


      // this.$refs.elDropdown.visible = false
      // this.$emit('selectChange', val.id)
      // this.$emit('change', val)
    },
    handleNodeClick(val) {
      this.$refs.elDropdown.visible = false
      this.$emit('selectChange', val.id)
      this.$emit('change', val)
    },


    packup() {
      this.isOpen = true
    },
    changeHandle(item) {
      console.log(item)
    },
    visibleChange(val) {

      this.isOpen = val
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
  ::v-deep .el-select{
    width: 100%;
  }
  /deep/ .el-tree {
    width: 100%;
    padding: 0 16px;
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
    height: 36px;
    position: relative;
    color: rgb(134, 144, 156) !important;
  }

  .packup {
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
  height: 36px;
  &:hover {
    background: transparent;
  }
}

::v-deep .el-tree-node:focus > .el-tree-node__content {
  background-color: transparent !important;
}
</style>
