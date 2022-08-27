// 入口文件  
import "../css/css.css"
import "../css/index.css"
import "../css/normalize.css"
import "../font/iconfont.woff"
import "../font/iconfont.woff2"
import "./lunbo.js"
import "./history_component.js"
import "./img_component.js"
import "./list_component.js"
import './search_component.js'
import "./index_data.js"
import "./search_btn"
import "./songs_words.js"
import "./likeSongs"
import "./comment"
import "./one_LIst"
import "./songs_sheet"
import "./oneSong_img"
import "../image/needle-ab.png"
import "../image/cd.png"
import "../image/p1.jpg"
import "../image/wangyilogo1.jpg"
import "./hot_component"


// import { common_get } from "./_axios.js"
import Sortable from 'sortablejs';
// console.log(common_get("/toplist/detail"));



// 有时间 提取出来   
// 拖拽功能的实现 
// 引用 拖动 库
let element = document.querySelector('.rank_list');
let option = {
    animation: 1000,
    onEnd: function(evt) {
        let arr = sortable.toArray();
        console.log(arr);
    },
};
//初始化
let sortable = Sortable.create(element, option);