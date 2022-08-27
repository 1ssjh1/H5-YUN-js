// 搜索模块

customElements.define('search-card', class search_component extends HTMLElement {
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


:host h2 {
    font-weight: 700;
    font-size: 17px;
}



 h3 {
    font-size: 13px;
    font-weight: 550;
    margin-right:5px;
    margin-left: 0.2rem;
    line-height: 0.44rem;
}
 div {
    display: flex;
}
`
        template.innerHTML =
            `    
            <div>
                <p class="iconfont">&#xe603;</p>
                <h3 class="song_name"></h3>
            </div>
        
           `;

        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._shadowRoot.appendChild(style);


    }
    render_data({ name, artName }) {
        let dom_tree = this._shadowRoot.querySelector("h3")
        dom_tree.innerText = name + "--" + artName


    };
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