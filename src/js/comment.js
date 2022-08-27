//  评论组件



customElements.define('comment-card', class list_component extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
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
    box-sizing: border-box;

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



.comment {
    width: 100%;
  }
  
  .comment section {
    width: 90%;
    margin: 0.1rem auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.3rem;
  }
  .comment section .left {
    width: 0.8rem;
    height: 0.8rem;
    background: url("../image/p3.jpg") no-repeat;
    background-size: contain;
    border-radius: 0.4rem;
    margin-top: -0.3rem;
    margin-right: -0.8rem;
  }
  .comment section .center {
    width: 5.5rem;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }
  .comment section .center .top {
    width: 100%;
    height: 25%;
  }
  .comment section .center .time {
    width: 100%;
    height: 15%;
  }
  .comment section .center .contain {
    width: 100%;
    height: 60%;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  section .active{
    color: red;
  }

`
        template.innerHTML = `
        <div class="comment">
        <section>
            <div class="left"></div>
            <div class="center">
                <div class="top">wzizzzz-</div>
                <div class="time">1999年9月32日</div>
                <div class="contain">面不改色的想你 迫不及待的想见到你</div>
            </div>
            <div class="right">
                <p>
                    <i class="number">${this.getAttribute("number_zan")}</i>
                    <i id="dianzan" class="iconfont">&#xe601;</i>
                    </p>
            </div>

        </section>
    </div> 



           `;

        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._shadowRoot.appendChild(style);


    }


    //  二次渲染函数
    render_data({
        content,
        timeStr,
        nickname,
        avatarUrl
    }) {
        let dom_tree = this._shadowRoot.querySelector("section"),
            dom_tree_img = dom_tree.querySelector(".left"),
            dom_tree_name = dom_tree.querySelector(".top"),
            dom_tree_time = dom_tree.querySelector(".time"),
            dom_tree_zan = dom_tree.querySelector(".number"),
            dom_tree_contain = dom_tree.querySelector(".contain");

        dom_tree_name.innerHTML = nickname
        dom_tree_time.innerHTML = timeStr
        dom_tree_contain.innerHTML = content



        dom_tree_img.style.background = `url(${avatarUrl}) no-repeat`;
        dom_tree_img.style.backgroundSize = "contain";
        // 为点赞绑定点赞函数
        dom_tree_zan.addEventListener("click", () => {
            this.change_number()
        })
    }



    // 改变点赞函数
    change_number() {
        let dom_tree = this._shadowRoot.querySelector("section"),
            dom_tree_zan = dom_tree.querySelector(".number"),
            dom_tree_dianzan = dom_tree.querySelector("#dianzan")

        switch (dom_tree_dianzan.className) {
            case "iconfont":
                dom_tree_zan.innerHTML = Number(this.getAttribute("number_zan")) + 1
                dom_tree_zan.nextElementSibling.className = "iconfont active"
                break;
            case "iconfont active":
                dom_tree_zan.innerHTML = Number(this.getAttribute("number_zan"))
                dom_tree_zan.nextElementSibling.className = "iconfont"
                break;
            default:
                break;
        }


    }





    static get observedAttributes() {
        return ['data'];
    };

    attributeChangedCallback(name, oldValue, newValue) {
        // switch 做选择  识别到 _data  就将这个属性值 存起来 先别渲染 
        switch (name) {
            case 'data':
                this.render_data(this._data)
                break;



        }
    };

    set data(val) {
        this._data = val;
        this.setAttribute("data", val);
    }
    get data() {
        return this._data
    }

});