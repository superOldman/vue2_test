var http = require('https');
var fs = require('fs');
var path = require('path'); const baseUrl = 'https://geo.datav.aliyun.com/areas_v3/bound/';
const levels = ['province', 'city'];	//district区县级不带full
const loseList = [];
let loseTotal = 0;


// 获取当前工作目录下的所有 .json 文件
const files = fs.readdirSync(path.resolve('./area_data')).filter(file => path.extname(file) === '.json');

// 打印所有 .json 文件的名字
console.log(files);

function RequestInfo(_url) {
  return new Promise((resolve, reject) => { http.get(_url, res => { const { statusCode } = res; let error; if (statusCode !== 200) { error = new Error("请求失败. \n 状态码：" + statusCode); } if (error) { res.resume(); res.on('end', () => { reject(error); }); } else { res.setEncoding('utf8'); let rawData = ''; res.on('data', chunk => { rawData += chunk; }); res.on('end', () => { resolve(rawData); }); } }).on('error', e => { reject(e); }); });
}
function downloadJson(_url, _code, _name) {
 
  RequestInfo(_url).then(res => {
    sleep(1000);
    console.log(_name, _code, _url);
    try {
      let writeInfo = `//${_name} \r\n ${res}`;
      fs.writeFile('./area_data/' + _code + '.json', writeInfo, function (e) { });
      let _data = JSON.parse(res), _features = _data['features'], _tmp = '';
      if (Array.isArray(_features)) {
        if (_features.length > 1) {

          for (let i = 0; i < _features.length; i++) {
            const item = _features[i]
              if (item.properties.name) {
                _tmp = levels.indexOf(item.properties.level) != -1 ? '_full' : '';
                if (files.includes(item.properties.adcode + '.json')) continue
                setTimeout(downloadJson, 50 * i, `${baseUrl}${item.properties.adcode}${_tmp}.json`, item.properties.adcode, item.properties.name);
              }
          }

          // _features.forEach((item, i) => {
          //   if (item.properties.name) {
          //     _tmp = levels.indexOf(item.properties.level) != -1 ? '_full' : '';
          //     setTimeout(downloadJson, 50 * i, `${baseUrl}${item.properties.adcode}${_tmp}.json`, item.properties.adcode, item.properties.name);
          //   }
          // });
        }
      }
    } catch (e) { console.log('catch url:', _name, _code, _url); }
  }).catch((e) => { loseTotal++; let _data = { name: _name, code: _code, url: _url.replace('_full', '') }; console.log(JSON.stringify(_data) + ','); });
}
function sleep(time) {
  var timeStamp = new Date().getTime();
  var endTime = timeStamp + time;
  while (true) {
    if (new Date().getTime() > endTime) {
      return;
    }
  }
}


//开始下载澳门特别行政区，以及下级区域地图数据
//downloadJson(baseUrl + '140000_full.json', 140000, '山西省');
// downloadJson(baseUrl + '150000_full.json', 150000, '内蒙古自治区');
console.log('3');


// E:\new-git-work\ai-business-web\src\views\industryChainNew\page\node.js
// /src/views/industryChainNew/page/node.js