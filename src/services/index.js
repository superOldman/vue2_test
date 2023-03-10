import axios from 'axios';
// import qs from 'qs';


// 让ajax携带cookie
axios.defaults.withCredentials = true;

// 请求超时
axios.defaults.timeout = 10000;

// 默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 请求拦截
axios.interceptors.request.use(
    config => {

        return config;
    },
    error => {
        return Promise.error(error);
    }
);

// 响应拦截
axios.interceptors.response.use(
    response => {
        // 如果状态码是 200， 说明请求成功了， 可以拿到数据
        // 否则抛出错误
        if (response.status === 200) {

            return Promise.resolve(response);
        } else {
            return Promise.reject(response);
        }
    },
    error => {

        if (error && error.response && error.response.status) {
            return Promise.reject(error.response);

        }
    }
);

export { axios }

export function http_post(config) {
    const _data = config.params;
    // if (config.format) {
    //     return new Promise((resolve, reject) => {
    //         axios.post(config.api, qs.stringify(_data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }))
    //             .then((res) => {
    //                 resolve(res);
    //             }).catch((err) => {
    //                 reject(err);
    //             });
    //     });
    // } else {
    return new Promise((resolve, reject) => {
        axios.post(config.api, _data).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err);
        });
    });
    // }
}


export function http_get(config) {
    let _data = null;
    if (config.params) {
        _data = config.params;
    }
    return new Promise((resolve, reject) => {
        axios.get(config.api, _data)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(err);
            });
    });
}
