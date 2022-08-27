//  歌单界面



customElements.define('like-card', class list_component extends HTMLElement {
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




.likeSongs {

height: 10rem;
}
  .likeSongs ._title {
    width: 90%;
    margin: 0.4rem auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .likeSongs ._title .left {
    font-size: 0.4rem;
    font-weight: 700;
    color: black;
  }
  .likeSongs ._title .right {
    width: 2.1933rem;
    height: 0.6667rem;
    display: flex;
    padding: 0.2rem;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.5333rem;
    border: solid 1px #d8d8d8;
  }
  .likeSongs section {
    width: 90%;
    margin: 0.4rem auto;
    height: 6rem;
    vertical-align: top;
  }
  .likeSongs section .contain {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.1rem;
  }
  .likeSongs section .left {
    flex: 1.5;
    width: 1.2rem;
    height: 1.2rem;
  
   
    border-radius: 0.2rem;
  }
  .likeSongs section .center {
    flex: 5;
  }
  .likeSongs section .center p {
    font-weight: 600;
    line-height: 0.5rem;
  }
  .likeSongs section .right {
    font-size: 26px;
    flex: 1;
  }

`
        template.innerHTML = `
        <div class="likeSongs">
        <div class="_title">
            <div class="left">喜欢这首歌的人也喜欢</div>
            <div class="right">
                <i class="iconfont"> &#xea6e;</i>
                <p>一键收听</p>
            </div>
        </div>
        <section>
            <div class="contain">
                <div class="left img"></div>
                <div class="center">
                    <p>银河与星斗</p>
                    <i>yihuik亦会-银河与♥斗</i>
                </div>
                <div class="right iconfont"> &#xea6e;</div>
            </div>
            <div class="contain">
                <div class="left img"></div>
                <div class="center">
                    <p>银河与星斗</p>
                    <i>yihuik亦会-银河与♥斗</i>
                </div>
                <div class="right iconfont"> &#xea6e;</div>
            </div>
            <div class="contain">
                <div class="left img"></div>
                <div class="center">
                    <p>银河与星斗</p>
                    <i>yihuik亦会-银河与♥斗</i>
                </div>
                <div class="right iconfont"> &#xea6e;</div>
            </div>
            <div class="contain">
                <div class="left img"></div>
                <div class="center">
                    <p>银河与星斗</p>
                    <i>yihuik亦会-银河与♥斗</i>
                </div>
                <div class="right iconfont"> &#xea6e;</div>
            </div>
            <div class="contain">
                <div class="left img"></div>
                <div class="center">
                    <p>银河与星斗</p>
                    <i>yihuik亦会-银河与♥斗</i>
                </div>
                <div class="right iconfont"> &#xea6e;</div>
            </div>
        </section>
    </div>

           `;

        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._shadowRoot.appendChild(style);


    }


    //  二次渲染函数
    render_data(data) {

        let dom_tree = this._shadowRoot.querySelector("section"),
            dom_tree_pList = dom_tree.querySelectorAll("p"),
            dom_tree_iList = dom_tree.querySelectorAll("i"),
            dom_tree_imgList = dom_tree.querySelectorAll(".img");
        data.map((item, index) => {
                const { name, album: { blurPicUrl, name: atrName, company } } = item
                dom_tree_pList[index].innerText = name
                dom_tree_iList[index].innerText = atrName + "--" + company
                dom_tree_imgList[index].style.background = `url(${blurPicUrl})   no-repeat`;
                dom_tree_imgList[index].style.backgroundSize = "contain";
            })
            //  设置图片
            // dom_tree_img.style.background = `url(${this.getAttribute("img_src")}) 0px  no-repeat`;
            // dom_tree_img.style.backgroundSize = "contain";
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