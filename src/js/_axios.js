import axios from "axios";
// 默认配置 
// 全局配置项目根url和超时设置为5000ms
axios.defaults.baseURL = "http://124.221.249.219:8000/api";
axios.defaults.timeout = 5000;



// 每一个都配置又拦截器

// 只传  url的get请求d
let axios_common_get = axios.create({
    method: "GET",
    baseURL: "http://121.40.19.111:3000"
});

axios_common_get.interceptors.response.use((res) => {
        return res.data || res
    },
    // 套路的  错误处理  识别错误代码 但是这个项目好像没有错误代码返回
    (err) => {
        let { response } = err;
        if (response) {
            switch (response.status) {
                case 401:

                    console.log(response);
                    break;
                case 403:
                    console.log("也许是token");
                    break;
                case 404:
                    console.log("找不到页面");
                    // window.location.reload("www.baidu.com");
                    break;
            }

        } else {
            if (!window.navigator.onLine) {
                console.log("网络有问题");
                return;
            }
        }
        return Promise.reject(err)
    });
export function common_get(url) {



    return axios_common_get(url)
};


// 传参的get请求

export function get_search(url, data = {}) {
    // console.log(JSON.stringify(data));
    return axios_common_get({
        url: url,
        params: data
    })
};




















// 主题页面请求  创建实例 默认get请求
let axios_get = axios.create({
    method: "GET",
});


export function index_get(url) {
    // 主题页面拦截器
    // 有data 就返回data 无就返回 res
    axios_get.interceptors.response.use((res) => {
            return res.data || res
        },
        // 套路的  错误处理  识别错误代码 但是这个项目好像没有错误代码返回
        (err) => {
            let { response } = err;
            if (response) {
                switch (response.status) {
                    case 401:

                        console.log(response);
                        break;
                    case 403:
                        console.log("也许是token");
                        break;
                    case 404:
                        console.log("找不到页面");
                        // window.location.reload("www.baidu.com");
                        break;
                }

            } else {
                if (!window.navigator.onLine) {
                    console.log("网络有问题");
                    return;
                }
            }
            return Promise.reject(err)
        });
    // 拦截器必须返回 不然 下面拿不到 哦
    return axios_get(url)
};






















// 模糊搜索请求
let axios_search = axios.create({
    method: "GET",
});
// 默认拦截器
// 感觉该和上面合并的  合并成全局拦截器  
axios_search.interceptors.response.use(
    (res) => {
        return res.data
    }, (err) => {

        return new Promise.reject(err)
    });

export function search_get(url, data) {
    return axios_search({
        url: url,
        params: {
            keyword: data,
        },
    })
}




// 排行榜请求
let axios_rank = axios.create({
    method: "GET",
});

export function rank_get(url, number) {

    axios_rank.interceptors.response.use((res) => {
            // 请求拦截器 输入数字几就返回对应数据
            return res.data[number]
        },

        (err) => {
            let { response } = err;
            if (response) {
                switch (response.status) {
                    case 401:
                        console.log(response);
                        break;
                    case 403:
                        console.log("也许是token");
                        break;
                    case 404:
                        console.log("找不到页面");
                        // window.location.reload("www.baidu.com");
                        break;
                }

            } else {
                if (!window.navigator.onLine) {
                    console.log("网络有问题");
                    return;
                }
            }
            return Promise.reject(err)
        });
    return axios_rank(url)
}