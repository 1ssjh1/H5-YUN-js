import { index_get, search_get, common_get, get_search } from "./_axios.js"
import the_data from "./data/songs"

// 请求数据处理和传递模块

// 轮播图组件传值

let swiper = document.querySelectorAll("swiper-card");
index_get("/recommendations").then(res => {
    swiper[0].data = res.offical
    swiper[1].data = res.tatsujin
    swiper[2].data = res.column
})




// 热榜模块传值
let hot = document.querySelector(".hot")


common_get("/search/hot/detail").then((res) => {
    return res.data
}).then((res) => {

    res.map(({ score, searchWord, content }, index) => {

        let card = document.createElement("hot-card")
        hot.appendChild(card)
        card.data = { index, score, searchWord, content }




    })

})





//模糊搜索模块传值

let search_mod = document.querySelector("search-card"),
    search_btn = document.querySelector(".search_btn"),
    search_something = document.querySelector(".search_something");





// 热搜模块切换与传值同步 所以写在这里没有放在 search_btn 文件里面
// window.addEventListener("keydown", (e) => {
//         if (e.keyCode === 13 && search_btn == document.activeElement && search_btn.value) {
//             search_get("/search?keyword", search_btn.value).then((res) => {
//                 hot.style.display = "none";
//                 search_something.style.display = "block"
//                 search_mod.data = res;

//             })
//         }
//     }

// );
// 重构后 加入 了防抖板块



// 历史组件函数
function history_data(value) {
    document.querySelector("history-card").data = value;
}



// 搜索传值+页面跳转   

// 获取搜索 的div
let your_search = document.querySelector(".your_search");

// 跳转搜索页面
function out(e) {
    if (e.keyCode === 13 && this == document.activeElement && this.value) {

        //  历史搜素组件传值
        history_data(this.value);
        // 请求数据 给 搜索
        get_search("/search", { keywords: search_btn.value }).then((res) => {
                hot.style.display = "none";
                search_something.style.display = "block"
                return res.result.songs

            })
            .then((res) => {
                // 给搜索组件传值
                res.forEach((item, index) => {
                    let { name, artists: [{ name: artName }] } = item

                    let element = document.createElement("search-card")
                    your_search.appendChild(element)
                    element.data = {
                            name,
                            artName
                        }
                        // dom_tree_list[index].children[1].innerText = name + "--" + artName
                })

            })
            .then((res) => {
                // 给搜索组件绑定事件代理
                your_search.addEventListener("click", ({ target }) => {
                    //  执行跳转函数 并且传入value值
                    to_song()

                })



            })
    }
}
search_btn.addEventListener("keydown", debounce(500, out)())



// 等会提取到公共部分
//防抖函数
function debounce(time, fn) {
    let t = null
    return function() {
        let rest = [...arguments]
        return function(e) {
            if (t) {
                clearTimeout(t)
            }
            t = setTimeout(() => {
                //任务回调函数

                fn.call(this, e)
            }, time);
        }

    }

}
let sml_title = document.querySelector(".sml_title"),
    tab_cont = document.querySelector(".tab_cont"),
    footers = document.querySelector(".footers"),
    footer = document.querySelector("footer")




// 跳转函数
function to_song() {
    sml_title.style.display = "none";
    tab_cont.style.display = "none";
    footers.style.display = "none";
    footer.style.display = "none";

}








// 排行榜组件传值  (处理数组  给两个组件都要传值)
//  重构
// 因为改了组件 导致这个传值 十分不优雅  建议有时间重构
let list_card = document.querySelectorAll("list-card")


common_get("/toplist/detail").then((res) => {
    return res
}).then(({ list }) => {
    let new_list = list.splice(0, 4)
    new_list.map(({ coverImgUrl, tracks, id }, index) => {
        list_card[index].setAttribute("img_src", coverImgUrl)
        list_card[index].setAttribute("_id", id)

        list_card[index].data = tracks
    })
})




// 歌词组件传值

let words_complete = document.querySelector("words-card");

setTimeout(() => {
    words_complete.data = the_data
}, 0);