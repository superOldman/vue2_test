(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a9ab3418"],{"7c8d":function(e,t,r){
/*!
 * Compressor.js v1.0.7
 * https://fengyuanchen.github.io/compressorjs
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2020-11-28T07:13:17.754Z
 */
(function(t,r){e.exports=r()})(0,(function(){"use strict";function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var r=0;r<t.length;r++){var i=t[r];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function r(e,r,i){return r&&t(e.prototype,r),i&&t(e,i),e}function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(){return n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e},n.apply(this,arguments)}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,i)}return r}function o(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function s(e,t,r){return r={path:t,exports:{},require:function(e,t){return c(e,void 0===t||null===t?r.path:t)}},e(r,r.exports),r.exports}function c(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}var l=s((function(e){"undefined"!==typeof window&&function(t){var r=t.HTMLCanvasElement&&t.HTMLCanvasElement.prototype,i=t.Blob&&function(){try{return Boolean(new Blob)}catch(e){return!1}}(),n=i&&t.Uint8Array&&function(){try{return 100===new Blob([new Uint8Array(100)]).size}catch(e){return!1}}(),a=t.BlobBuilder||t.WebKitBlobBuilder||t.MozBlobBuilder||t.MSBlobBuilder,o=/^data:((.*?)(;charset=.*?)?)(;base64)?,/,s=(i||a)&&t.atob&&t.ArrayBuffer&&t.Uint8Array&&function(e){var t,r,s,c,l,u,h,f,p;if(t=e.match(o),!t)throw new Error("invalid data URI");for(r=t[2]?t[1]:"text/plain"+(t[3]||";charset=US-ASCII"),s=!!t[4],c=e.slice(t[0].length),l=s?atob(c):decodeURIComponent(c),u=new ArrayBuffer(l.length),h=new Uint8Array(u),f=0;f<l.length;f+=1)h[f]=l.charCodeAt(f);return i?new Blob([n?h:u],{type:r}):(p=new a,p.append(u),p.getBlob(r))};t.HTMLCanvasElement&&!r.toBlob&&(r.mozGetAsFile?r.toBlob=function(e,t,i){var n=this;setTimeout((function(){i&&r.toDataURL&&s?e(s(n.toDataURL(t,i))):e(n.mozGetAsFile("blob",t))}))}:r.toDataURL&&s&&(r.msToBlob?r.toBlob=function(e,t,i){var n=this;setTimeout((function(){(t&&"image/png"!==t||i)&&r.toDataURL&&s?e(s(n.toDataURL(t,i))):e(n.msToBlob(t))}))}:r.toBlob=function(e,t,r){var i=this;setTimeout((function(){e(s(i.toDataURL(t,r)))}))})),e.exports?e.exports=s:t.dataURLtoBlob=s}(window)})),u=function(e){return"undefined"!==typeof Blob&&(e instanceof Blob||"[object Blob]"===Object.prototype.toString.call(e))},h={strict:!0,checkOrientation:!0,maxWidth:1/0,maxHeight:1/0,minWidth:0,minHeight:0,width:void 0,height:void 0,quality:.8,mimeType:"auto",convertSize:5e6,beforeDraw:null,drew:null,success:null,error:null},f="undefined"!==typeof window&&"undefined"!==typeof window.document,p=f?window:{},d=Array.prototype.slice;function m(e){return Array.from?Array.from(e):d.call(e)}var g=/^image\/.+$/;function b(e){return g.test(e)}function w(e){var t=b(e)?e.substr(6):"";return"jpeg"===t&&(t="jpg"),".".concat(t)}var v=String.fromCharCode;function y(e,t,r){var i,n="";for(r+=t,i=t;i<r;i+=1)n+=v(e.getUint8(i));return n}var U=p.btoa;function O(e,t){var r=[],i=8192,n=new Uint8Array(e);while(n.length>0)r.push(v.apply(null,m(n.subarray(0,i)))),n=n.subarray(i);return"data:".concat(t,";base64,").concat(U(r.join("")))}function k(e){var t,r=new DataView(e);try{var i,n,a;if(255===r.getUint8(0)&&216===r.getUint8(1)){var o=r.byteLength,s=2;while(s+1<o){if(255===r.getUint8(s)&&225===r.getUint8(s+1)){n=s;break}s+=1}}if(n){var c=n+4,l=n+10;if("Exif"===y(r,c,4)){var u=r.getUint16(l);if(i=18761===u,(i||19789===u)&&42===r.getUint16(l+2,i)){var h=r.getUint32(l+4,i);h>=8&&(a=l+h)}}}if(a){var f,p,d=r.getUint16(a,i);for(p=0;p<d;p+=1)if(f=a+12*p+2,274===r.getUint16(f,i)){f+=8,t=r.getUint16(f,i),r.setUint16(f,1,i);break}}}catch(m){t=1}return t}function j(e){var t=0,r=1,i=1;switch(e){case 2:r=-1;break;case 3:t=-180;break;case 4:i=-1;break;case 5:t=90,i=-1;break;case 6:t=90;break;case 7:t=90,r=-1;break;case 8:t=-90;break}return{rotate:t,scaleX:r,scaleY:i}}var B=/\.\d*(?:0|9){12}\d*$/;function S(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:1e11;return B.test(e)?Math.round(e*t)/t:e}var L=p.ArrayBuffer,x=p.FileReader,A=p.URL||p.webkitURL,C=/\.\w+$/,T=p.Compressor,M=function(){function t(r,i){e(this,t),this.file=r,this.image=new Image,this.options=o(o({},h),i),this.aborted=!1,this.result=null,this.init()}return r(t,[{key:"init",value:function(){var e=this,t=this.file,r=this.options;if(u(t)){var i=t.type;if(b(i))if(A&&x)if(L||(r.checkOrientation=!1),A&&!r.checkOrientation)this.load({url:A.createObjectURL(t)});else{var a=new x,o=r.checkOrientation&&"image/jpeg"===i;this.reader=a,a.onload=function(r){var a=r.target,s=a.result,c={};if(o){var l=k(s);l>1||!A?(c.url=O(s,i),l>1&&n(c,j(l))):c.url=A.createObjectURL(t)}else c.url=s;e.load(c)},a.onabort=function(){e.fail(new Error("Aborted to read the image with FileReader."))},a.onerror=function(){e.fail(new Error("Failed to read the image with FileReader."))},a.onloadend=function(){e.reader=null},o?a.readAsArrayBuffer(t):a.readAsDataURL(t)}else this.fail(new Error("The current browser does not support image compression."));else this.fail(new Error("The first argument must be an image File or Blob object."))}else this.fail(new Error("The first argument must be a File or Blob object."))}},{key:"load",value:function(e){var t=this,r=this.file,i=this.image;i.onload=function(){t.draw(o(o({},e),{},{naturalWidth:i.naturalWidth,naturalHeight:i.naturalHeight}))},i.onabort=function(){t.fail(new Error("Aborted to load the image."))},i.onerror=function(){t.fail(new Error("Failed to load the image."))},p.navigator&&/(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(p.navigator.userAgent)&&(i.crossOrigin="anonymous"),i.alt=r.name,i.src=e.url}},{key:"draw",value:function(e){var t=this,r=e.naturalWidth,i=e.naturalHeight,n=e.rotate,a=void 0===n?0:n,o=e.scaleX,s=void 0===o?1:o,c=e.scaleY,u=void 0===c?1:c,h=this.file,f=this.image,p=this.options,d=document.createElement("canvas"),m=d.getContext("2d"),g=r/i,w=Math.abs(a)%180===90,v=Math.max(p.maxWidth,0)||1/0,y=Math.max(p.maxHeight,0)||1/0,U=Math.max(p.minWidth,0)||0,O=Math.max(p.minHeight,0)||0,k=Math.max(p.width,0)||r,j=Math.max(p.height,0)||i;if(w){var B=[y,v];v=B[0],y=B[1];var L=[O,U];U=L[0],O=L[1];var x=[j,k];k=x[0],j=x[1]}v<1/0&&y<1/0?y*g>v?y=v/g:v=y*g:v<1/0?y=v/g:y<1/0&&(v=y*g),U>0&&O>0?O*g>U?O=U/g:U=O*g:U>0?O=U/g:O>0&&(U=O*g),j*g>k?j=k/g:k=j*g,k=Math.floor(S(Math.min(Math.max(k,U),v))),j=Math.floor(S(Math.min(Math.max(j,O),y)));var A=-k/2,C=-j/2,T=k,M=j;if(w){var R=[j,k];k=R[0],j=R[1]}d.width=k,d.height=j,b(p.mimeType)||(p.mimeType=h.type);var E="transparent";if(h.size>p.convertSize&&"image/png"===p.mimeType&&(E="#fff",p.mimeType="image/jpeg"),m.fillStyle=E,m.fillRect(0,0,k,j),p.beforeDraw&&p.beforeDraw.call(this,m,d),!this.aborted&&(m.save(),m.translate(k/2,j/2),m.rotate(a*Math.PI/180),m.scale(s,u),m.drawImage(f,A,C,T,M),m.restore(),p.drew&&p.drew.call(this,m,d),!this.aborted)){var D=function(e){t.aborted||t.done({naturalWidth:r,naturalHeight:i,result:e})};d.toBlob?d.toBlob(D,p.mimeType,p.quality):D(l(d.toDataURL(p.mimeType,p.quality)))}}},{key:"done",value:function(e){var t=e.naturalWidth,r=e.naturalHeight,i=e.result,n=this.file,a=this.image,o=this.options;if(A&&!o.checkOrientation&&A.revokeObjectURL(a.src),i)if(o.strict&&i.size>n.size&&o.mimeType===n.type&&!(o.width>t||o.height>r||o.minWidth>t||o.minHeight>r))i=n;else{var s=new Date;i.lastModified=s.getTime(),i.lastModifiedDate=s,i.name=n.name,i.name&&i.type!==n.type&&(i.name=i.name.replace(C,w(i.type)))}else i=n;this.result=i,o.success&&o.success.call(this,i)}},{key:"fail",value:function(e){var t=this.options;if(!t.error)throw e;t.error.call(this,e)}},{key:"abort",value:function(){this.aborted||(this.aborted=!0,this.reader?this.reader.abort():this.image.complete?this.fail(new Error("The compression process has been aborted.")):(this.image.onload=null,this.image.onabort()))}}],[{key:"noConflict",value:function(){return window.Compressor=T,t}},{key:"setDefaults",value:function(e){n(h,e)}}]),t}();return M}))},"866d":function(e,t,r){"use strict";r("a80d")},a80d:function(e,t,r){},afd6:function(e,t,r){"use strict";r.r(t);var i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{directives:[{name:"show",rawName:"v-show",value:e.tipShow,expression:"tipShow"}]},[e._v(" 以下图片超过了5M，是否同意进行压缩？ 若拒绝，图片将取消发送；若压缩，图片的清晰度会被降低。 "),r("el-button",{on:{click:e.confirm}},[e._v("确定")]),r("el-button",{on:{click:e.cancel}},[e._v("拒绝")])],1),r("div",{staticClass:"imgList"},[e._l(e.imageList,(function(t,i){return[r("transition",{key:i,attrs:{name:"el-fade-in"}},[r("div",{staticClass:"el-upload--picture-card pc"},[r("div",{staticClass:"imgWrap"},[r("img",{directives:[{name:"show",rawName:"v-show",value:t.src,expression:"img.src"}],attrs:{src:t.src,alt:"",srcset:""}})]),r("el-progress",{directives:[{name:"show",rawName:"v-show",value:e.percentageShow&&i===e.imageList.length-1,expression:"percentageShow && i===imageList.length-1"}],attrs:{type:"circle",percentage:e.percentage}}),r("div",{staticClass:"icon",on:{click:function(r){return e.showCrop(t.file)}}},[e._v("开")])],1)])]})),r("el-upload",{ref:"upload",staticClass:"avatar-uploader",attrs:{"before-upload":e.beforeAvatarUpload,"on-progress":e.uploadOnProgress,"on-success":e.onSuccess,"show-file-list":!1,"on-error":e.onError,action:"https://jsonplaceholder.typicode.com/posts/","list-type":"picture-card"}},[r("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],2),r("up-cropper",{ref:"upCropper"})],1)},n=[],a=(r("d3b7"),r("3ca3"),r("ddb0"),r("2b3d"),r("b0c0"),r("7c8d")),o=r.n(a),s=r("2823"),c={components:{upCropper:s["default"]},data:function(){return{imageList:[],tipShow:!1,file:"",percentage:0,percentageShow:!1,loadSuccess:!1}},watch:{percentageShow:function(e){e||(this.percentage=0)}},mounted:function(){var e=this;this.$nextTick((function(t){console.log(e.$refs.upload.submit)}))},methods:{handleAvatarSuccess:function(e,t){},uploadOnProgress:function(e){console.log(arguments),this.percentage=e.percent},onSuccess:function(e,t){console.log("1111111",arguments),this.imageList.pop(),this.imageList.push({file:t.raw,src:URL.createObjectURL(t.raw)}),(t.status="success")&&(this.percentageShow=!1),this.$message.success("11111111")},onError:function(e,t,r){console.log(e),this.imageList.pop(),this.percentageShow=!1,this.$message.warning("2222")},onChange:function(e){console.log(arguments)},beforeAvatarUpload:function(e){return console.log(e),!this.judgeSize(e)&&(this.imageList.push({}),this.percentageShow=!0,!0)},judgeSize:function(e){if(e.size>5e5){this.tipShow=!0;var t=this;return new o.a(e,{quality:.8,convertSize:5e5,success:function(r){var i=new File([r],r.name,{type:r.type});t.file=i,t.file.uid=e.uid},error:function(e){console.log(e)}}),!0}},cancel:function(){this.tipShow=!1},confirm:function(){var e=this;this.tipShow=!1,this.imageList.push({}),this.percentageShow=!0,this.$nextTick((function(t){e.$refs.upload.uploadFiles.push(e.file),e.$refs.upload.$children[0].post(e.file)}))},showCrop:function(e){this.$refs.upCropper.show(e)}}},l=c,u=(r("866d"),r("2877")),h=Object(u["a"])(l,i,n,!1,null,"25621dba",null);t["default"]=h.exports}}]);
//# sourceMappingURL=chunk-a9ab3418.09fb7ca7.js.map