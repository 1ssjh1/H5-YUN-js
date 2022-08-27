// 一首 sheet歌单组件
customElements.define('songimg-card', class search_component extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
        this.songs_list = document.querySelector("#songs_list");
        this.one_song = document.querySelector("#one_song");



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


.bgimg {
    width: 99%;
    height: 300%;
    position: absolute;
    z-index: -1;
    filter: blur(70px);
  }
  .detailTop {
    width: 90%;
    height: 1rem;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    align-items: center;
    fill: #fff;
  }
  .detailTop .detailTopLeft {
    display: flex;
    align-items: center;
  }
  .detailTop .detailTopLeft .leftMarquee {
    width: 3rem;
    height: 100%;
    margin-left: 0.4rem;
  }
  .detailTop .detailTopLeft .leftMarquee span {
    color: #999;
  }
  .detailTop .detailTopLeft .leftMarquee .icon {
    width: 0.3rem;
    height: 0.3rem;
    fill: #999;
  }
  .detailContent {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }
  .detailContent .img_needle {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-13deg);
    transition: all 2s;
  }
  .detailContent .img_needle_active {
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .detailContent .img_cd {
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .detailContent .img_ar {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_ar 10s linear infinite;
  }
  .detailContent .img_ar_active {
    animation-play-state: running;
  }
  .detailContent .img_ar_pauesd {
    animation-play-state: paused;
  }
  @keyframes rotate_ar {
    0% {
      transform: rotateZ(0deg);
    }
    100% {
      transform: rotateZ(360deg);
    }
  }
  .centerWords {
    width: 100%;
    height: 4rem;
  }
  .centerWords div {
    margin: 0.6rem auto;
    width: 4.2933rem;
    height: 0.8667rem;
    border-radius: 0.5333rem;
    border: solid 1px #d8d8d8;
    line-height: 0.8rem;
    text-align: center;
  }
  .detailFooter {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .detailFooter .footerTop {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .detailFooter .footerTop .icon {
    width: 0.36rem;
    height: 0.36rem;
    fill: #f5eaea;
  }
  .detailFooter .footerTop .icon {
    width: 0.6rem;
    height: 0.6rem;
  }
  .detailFooter .range {
    width: 100%;
    height: 0.06rem;
  }
  .detailFooter .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .detailFooter .footer .icon {
    fill: #f5eaea;
  }
  .detailFooter .footer .bofang {
    width: 1rem;
    height: 1rem;
  }
 .play {
    font-size:0.8rem;
  position: absolute;
  color: black;
  bottom: 4.3rem;
  z-index: 1000;
  }
`
        template.innerHTML =
            ` 
            <img src="./image/p1.jpg" alt="" class="bgimg pjpg" />
            <div class="detailTop">
                <div class="detailTopLeft  iconfont">
                    <i class="iconfont go_pre"> &#xeb15;</i>
                    <div class="leftMarquee">
                        <p class="name">sjh</p>
                        <span> love </span>
                        </span>
                    </div>
                </div>
                <div class="detailTopRight iconfont">
                    &#xe604;
                </div>
            </div>
            <div class="detailContent iconfont">
                <img src="../image/needle-ab.png" alt="" class="img_needle" />
                <img src="../image/cd.png" alt="" class="img_cd" />
                <i class="iconfont play">&#xea6e;</i>
                <img src="../image/p1.jpg" alt="" class="img_ar pjpg img_ar_active" />
            </div>
        
           `;

        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._shadowRoot.appendChild(style);







    }
    render_data({ picUrl, name }) {
        let dom_tree = this._shadowRoot,
            dom_tree_jpg = dom_tree.querySelectorAll(".pjpg"),
            dom_tree_name = dom_tree.querySelector(".name"),
            play = dom_tree.querySelector(".play"),
            go_pre = dom_tree.querySelector(".go_pre")
        dom_tree_jpg[0].src = picUrl
        dom_tree_jpg[1].src = picUrl
        dom_tree_name.innerHTML = name

        console.log(play);
        // 为play 绑定事件  
        play.addEventListener("click", (e) => {
            let img_ar = dom_tree.querySelector(".img_ar")
            switch (img_ar.className) {
                case "img_ar pjpg img_ar_active":
                    img_ar.className = "img_ar pjpg img_ar_pauesd"
                    break;
                case "img_ar pjpg img_ar_pauesd":
                    img_ar.className = "img_ar pjpg img_ar_active"
                    break;
                default:
                    break;
            }
        })

        // 返回函数
        go_pre.addEventListener("click", () => {
            this.go_pre()
        })
    };
    // 返回函数
    go_pre() {
            this.one_song.style.display = "none"
            this.songs_list.style.display = "block"

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