<template>
  <!-- https://blog.csdn.net/weixin_33734785/article/details/88926982 -->
  <div>
    <div v-show="tipShow">
      以下图片超过了5M，是否同意进行压缩？
      若拒绝，图片将取消发送；若压缩，图片的清晰度会被降低。
      <el-button @click="confirm">确定</el-button>
      <el-button @click="cancel">拒绝</el-button>
    </div>
    <div class="imgList">
      <template v-for="(img,i) in imageList">
        <transition name="el-fade-in" :key="i">
          <div class="el-upload--picture-card pc">
            <div class="imgWrap"><img v-show="img.src" :src="img.src" alt="" srcset=""></div>
            <el-progress v-show="percentageShow && i===imageList.length-1" type="circle" :percentage="percentage"></el-progress>
            <div class="icon" @click="showCrop(img.file)">开</div>
          </div>
        </transition>
      </template>
      <!-- <transition name="el-fade-in">
        <div v-for="(img,i) in imageList" :key="i" class="el-upload--picture-card pc">
          <div class="imgWrap"><img v-show="img.src" :src="img.src" alt="" srcset=""></div>
          <el-progress v-show="percentageShow && i===imageList.length-1" type="circle" :percentage="percentage"></el-progress>
          <div class="icon" @click="showCrop(img.file)">开</div>
        </div>
      </transition> -->
      <el-upload class="avatar-uploader" ref="upload" :http-request="ajaxUpload" :before-upload="beforeAvatarUpload" :on-progress="uploadOnProgress" :on-success="onSuccess" :show-file-list="false"
        :on-error="onError" action="localhost/upload" list-type="picture-card">
        <img v-if="false" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </div>
    <up-cropper ref="upCropper"></up-cropper>
  </div>
</template>

<script>
function ajaxUpload(option) {
  if (typeof XMLHttpRequest === 'undefined') {
    return;
  }

  const xhr = new XMLHttpRequest();
  const action = option.action;

  if (xhr.upload) {
    xhr.upload.onprogress = function progress(e) {
      if (e.total > 0) {
        e.percent = e.loaded / e.total * 100;
      }
      console.log(e)
      option.onProgress(e);
    };
  }

  const formData = new FormData();

  if (option.data) {
    Object.keys(option.data).forEach(key => {
      formData.append(key, option.data[key]);
    });
  }

  formData.append(option.filename, option.file, option.file.name);

  xhr.onerror = function error(e) {
    option.onError(e);
  };

  xhr.onload = function onload() {
    if (xhr.status < 200 || xhr.status >= 300) {
      return option.onError(getError(action, option, xhr));
    }

    option.onSuccess(getBody(xhr));
  };

  xhr.open('post', action, true);

  if (option.withCredentials && 'withCredentials' in xhr) {
    xhr.withCredentials = true;
  }

  const headers = option.headers || {};

  for (let item in headers) {
    if (headers.hasOwnProperty(item) && headers[item] !== null) {
      xhr.setRequestHeader(item, headers[item]);
    }
  }
  xhr.send(formData);
  return xhr;
}
function getError(action, option, xhr) {
  let msg;
  if (xhr.response) {
    msg = `${xhr.response.error || xhr.response}`;
  } else if (xhr.responseText) {
    msg = `${xhr.responseText}`;
  } else {
    msg = `fail to post ${action} ${xhr.status}`;
  }

  const err = new Error(msg);
  err.status = xhr.status;
  err.method = 'post';
  err.url = action;
  return err;
}

function getBody(xhr) {
  const text = xhr.responseText || xhr.response;
  if (!text) {
    return text;
  } 

  try {
    return JSON.parse(text);
  } catch (e) {
    return text;
  }
}

import Compressor from 'compressorjs';
import upCropper from './upCropper';
export default {
  components: {
    upCropper
  },
  data() {
    return {
      imageList: [],
      tipShow: false,
      file: '',
      percentage: 0,
      percentageShow: false,
      loadSuccess: false,

      test: {
        a: 1,
        b: 2
      }
    };
  },
  watch: {
    percentageShow(bool) {
      if (!bool) this.percentage = 0;
    },
    test: {
      deep: true,
      immediate: true,
      handler() {

      }
    }
  },
  provide() {
    return {
      a: {
        a: this.file,
        b: this.percentage
      }
    }
  },
  mounted() {
    this.$nextTick(e => {
      console.log(this.$refs.upload.submit);
    });
  },
  methods: {
    ajaxUpload,

    handleAvatarSuccess(res, file) {
    },
    uploadOnProgress(progressEvent, file, arr) {
      // console.log(arguments);
      this.percentage = progressEvent.percent;
    },
    onSuccess(res, file) {
      console.log('res', res);
      console.log('file', file);
      this.imageList.pop();
      this.imageList.push({
        file: file.raw,
        src: URL.createObjectURL(file.raw || file)
        // src: file.raw
      });
      if (file.status = 'success') {
        this.percentageShow = false;
      }
      this.$message.success('11111111');
    },
    onError(err, file, fileList) {
      console.log(err);
      this.imageList.pop();
      this.percentageShow = false;
      this.$message.warning('2222');
    },
    onChange(e) {
      console.log(arguments);
    },
    beforeAvatarUpload(file) {
      console.log(file);

      // this.$refs.upload;
      // 

      // if (this.judgeSize(file)) {
      //   return false;
      // }
      this.imageList.push({});
      this.percentageShow = true;
      return true;
    },
    // 判断大小
    judgeSize(file) {
      if (file.size > 500000) {
        this.tipShow = true;
        const self = this;
        new Compressor(file, {
          quality: 0.8,
          convertSize: 500000,
          success(result) {
            const files = new File([result], result.name, { type: result.type });
            self.file = files;
            self.file.uid = file.uid;
          },
          error(err) {
            console.log(err);
          }
        });
        return true;
      }
    },
    cancel() {
      this.tipShow = false;
      // this.$nextTick(e => {
      //   this.$refs.upload.handleRemove(this.file) // 移除
      // });

    },
    confirm() {
      this.tipShow = false;
      this.imageList.push({});
      this.percentageShow = true;
      this.$nextTick(e => {
        // this.$refs.upload.submit(this.file);
        // debugger;

        this.$refs.upload.uploadFiles.push(this.file);
        this.$refs.upload.$children[0].post(this.file);
        // this.$refs.upload.handleRemove(this.file) // 移除
      });
    },
    showCrop(img) {
      this.$refs.upCropper.show(img);
    }
  }
};
</script>

<style scoped lang="less">
.imgList {
  display: flex;
  .imgWrap {
    width: 100%;
    height: 100%;
    > img {
      width: 100%;
      height: 100%;
    }
  }

  .pc {
    position: relative;
    /deep/ .el-progress {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
    .icon {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 20px;
      height: 20px;
      line-height: 20px;
    }
  }
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
// .avatar-uploader-icon {
//   font-size: 28px;
//   color: #8c939d;
//   width: 178px;
//   height: 178px;
//   line-height: 178px;
//   text-align: center;
// }
// .avatar {
//   width: 178px;
//   height: 178px;
//   display: block;
// }
</style>
