// sheet 歌单组件
import { get_search } from "./_axios"
customElements.define('sheet-card', class search_component extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this.songs_list = document.querySelector("#songs_list")
        this.one_song = document.querySelector("#one_song");
        this.songimg_card = document.querySelector("songimg-card");
    }



    connectedCallback() {

        this.render();

    };

    render() {



        const template = document.createElement('template');
        const style = document.createElement("style");
        style.innerHTML = `
<style>
* {
    text-decoration: none;
    list-style-type: none;
    
}




@font-face {
    font-family: "iconfont";
    /* Project id 3448352 */
    src: url('../font/iconfont.woff2') format('woff2'), url("../font/iconfont.woff") format('woff'), url('../font/iconfont.ttf') format('truetype');
}
.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}


.sheetList {
    width: 95%;
    height: 2rem;
    display: flex;
    justify-content: start;
    align-items: center;
  }
  .sheetList .left {
    font-size: 0.4rem;
    font-weight: 550;
    width: 1rem;
  }
  .sheetList .center {
    width: 6rem;
  }
  .sheetList .center .songName {
    font-size: 0.4rem;
    font-weight: 550;
    line-height: 0.7rem;
  }
  .sheetList .center .artName {
    color: #999;
  }
  .sheetList .right {
    width: 2rem;
    text-align: right;
    font-size: 0.8rem;
    color: #999;
  }
  
`
        template.innerHTML =
            `   <div class="sheetList">
            <div class="left">1</div>
            <div class="center">
                <div class="songName">受难曲</div>
                <i class="artName">123123131</i>
            </div>

            <div class="right iconfont">&#xea6e;</div>

        </div>
        
           `;

        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._shadowRoot.appendChild(style);


    }
    render_data({ name, artName, cd, index }) {
        let dom_tree = this._shadowRoot.querySelector(".sheetList"),
            dom_tree_index = dom_tree.querySelector(".left"),
            dom_tree_songName = dom_tree.querySelector(".songName"),
            dom_tree_artName = dom_tree.querySelector(".artName");

        dom_tree_index.innerHTML = index
        dom_tree_songName.innerHTML = name
        dom_tree_artName.innerHTML = artName + "--" + cd

        // 点击歌曲跳转到指定地点
        dom_tree.addEventListener("click", (e) => {
            this.go_oneSong(e)
        })

    };
    // 跳转函数

    go_oneSong(e) {

            this.get_comment(this.getAttribute("_id"))
            this.get_like(this.getAttribute("_id"))

            this.songimg_card.data = {
                picUrl: this.getAttribute("_picUrl"),
                name: this.getAttribute("_name"),

            }
            setTimeout(() => {
                this.one_song.style.display = "block"
                this.songs_list.style.display = "none"
            }, 400);


        }
        // 监听属性并且 渲染 图片 模块
    static get observedAttributes() {
            return ['data'];
        }
        // 评论传值
    get_comment(id) {

            let comment = document.querySelector(".comment")
            get_search("comment/hot", { id: id, type: 0 }).then((res) => {
                return res.hotComments
            }).then((res) => {
                res.map(({ content, likedCount, timeStr, user: { nickname, avatarUrl } }) => {
                    let element = document.createElement("comment-card");
                    element.setAttribute("number_zan", likedCount)

                    comment.append(element)
                    element.data = {
                        content,
                        likedCount,
                        timeStr,
                        nickname,
                        avatarUrl
                    }
                })
            })
        }
        // 相似歌曲传值
    get_like(id) {

        let like_card = document.querySelector("like-card")
        let some_obj = { id: id }
        get_search("simi/song", some_obj).then((res) => {
            return res.songs;
        }).then((res) => {
            like_card.data = res
        })
    }

    //  歌曲头部传值
    get_head({}) {

    }
    attributeChangedCallback(name, oldValue, newValue) {
        // switch 做选择  识别到 _data  就将这个属性值 存起来 先别渲染 
        // 渲染操作 应该在connectedCallback 生命周期回调函数里面操作

        switch (name) {
            case 'data':
                this.render_data(this._data)
                break;


        }
    };
    set data(val) {
        this._data = val;
        this.setAttribute("data", true);


    }
    get data() {
        return this._data
    }
});