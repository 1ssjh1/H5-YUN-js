// songlist-card组件

customElements.define('songlist-card', class search_component extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this.rank_list = document.querySelector(".rank_list");
        this.sml_title = document.querySelector(".sml_title");
        this.songs_list = document.querySelector("#songs_list");

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

.itemMusicTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    color: #000;
  }
  .itemMusicTop .itemLeft,
  .itemMusicTop .itemRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
  }
  .itemMusicTop .itemLeft span,
  .itemMusicTop .itemRight span {
    font-size: 0.4rem;
    color: #fff;
  }
  .itemMusicTop .itemLeft .icon,
  .itemMusicTop .itemRight .icon {
    fill: #fff;
  }
  .itemMusicTop .bgimg {
    width: 100%;
    height: 11rem;
    position: absolute;
    z-index: -1;
    filter: blur(30px);
  }
  .itemTopContent {
    width: 100%;
    height: 3rem;
    padding: 0.2rem;
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-between;
  }
  .itemTopContent .contentLeft {
    width: 36%;
    height: 2.6rem;
    position: relative;
  }
  .itemTopContent .contentLeft img {
    width: 2.6rem;
    height: 2.6rem;
    border-radius: 0.2rem;
    position: absolute;
    z-index: -1;
  }
  .itemTopContent .contentLeft .palyCount {
    position: absolute;
    left: 0.1rem;
    margin-top: 0.1rem;
  }
  .itemTopContent .contentLeft .palyCount .icon {
    width: 0.26rem;
    height: 0.26rem;
    margin-top: -0.02rem;
    vertical-align: middle;
  }
  .itemTopContent .contentLeft .palyCount span {
    font-size: 0.26rem;
    
    color: #fff;
  }
  .itemTopContent .contentRight {
    width: 60%;
    height: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
  }
  .itemTopContent .contentRight .rightP_one {
    width: 100%;
    height: 0.5rem;
    font-size: 0.3rem;
    font-weight: 900;
    color: #fff;
    font-family: "微软雅黑";
  }
  .itemTopContent .contentRight .right_img {
    width: 100%;
    height: 1rem;
    line-height: 0.6rem;
    color: #ccc;
  }
  .itemTopContent .contentRight .right_img .img {
    display: flex;
  }
  .itemTopContent .contentRight .right_img img {
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    vertical-align: middle;
  }
  .itemTopContent .contentRight .right_img span {
    width: 4rem;
    color: black;
    margin-top: 0.4rem;
    height: 1.2rem;
    display: -webkit-box;
    white-space: wrap;
    overflow: hidden;
    -webkit-box-orient: vertical;
    line-clamp: 3;
    -webkit-line-clamp: 3;
  }
  .itemTopFooter {
    width: 100%;
    height: 1.4rem;
  }
  .itemTopFooter div {
    margin: 0.6rem auto;
    width: 4.2933rem;
    height: 0.8667rem;
    border-radius: 0.5333rem;
    border: solid 1px #d8d8d8;
    line-height: 0.8rem;
    text-align: center;
    color: #fff;
  }
  
`
        template.innerHTML =
            `  <div class="itemMusicTop">
                   <img src="./image/p1.jpg" alt="" class="bgimg" />
                    <div class="iconfont go_list">
                    &#xeb15;
                   </div>
               </div>
        <div class="itemTopContent">
            <div class="contentLeft">
                <img src="./image/p1.jpg" alt="" />
                <div class="palyCount">
                    <i class="iconfont">  &#xe644;</i>
                    <span class="number">12312</span>
                </div>
            </div>
            <div class="contentRight">
                <p class="rightP_one">345645646464564646</p>
                <div class="right_img">
                    <div class="img"> <img src="./image/wangyilogo1.jpg" alt="" /><i>网易云音乐</i></div>
                    <span class="description">789789789711111111111111111111111117789789789</span>
                    <!-- <i class="iconfont">&#xe600;</i> -->
                </div>

            </div>
        </div>
        <div class="itemTopFooter">
            <div>分享给喜欢的人听！！！</div>
        </div>

        
           `;

        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._shadowRoot.appendChild(style);


    }
    render_data({ coverImgUrl, playCount, description, name }) {
        let dom_tree = this._shadowRoot,
            dom_tree_img = dom_tree.querySelectorAll("img"),
            dom_tree_description = dom_tree.querySelector(".description"),
            dom_tree_name = dom_tree.querySelector(".rightP_one"),
            dom_tree_number = dom_tree.querySelector(".number"),
            dom_tree_go_list = dom_tree.querySelector(".go_list");


        // 调用改变数字函数
        playCount = this.changeCount(playCount)
        dom_tree_img[0].src = coverImgUrl
        dom_tree_img[1].src = coverImgUrl
        dom_tree_description.innerHTML = description
        dom_tree_name.innerHTML = name
        dom_tree_number.innerHTML = playCount


        dom_tree_go_list.addEventListener("click", (e) => {
            this.go_pre(e)
        })





    };

    // 去上一次函数
    go_pre() {
            this.rank_list.style.display = 'block';
            this.sml_title.style.display = 'flex';
            this.songs_list.style.display = 'none';

        }
        // 改变数字函数

    changeCount(num) {
        if (num >= 100000000) {
            return (num / 100000000).toFixed(1) + "亿";
        } else if (num >= 10000) {
            return (num / 10000).toFixed(1) + "万";
        }
        return num
    }


    // 监听属性并且 渲染 图片 模块
    static get observedAttributes() {
        return ['data'];
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