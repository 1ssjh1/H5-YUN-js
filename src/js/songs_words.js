// // 歌词 组件
customElements.define('words-card', class hot_component extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    }

    connectedCallback() {
        // 只负责 渲染页面的勤恳的render函数
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

            .musicLyric {
                width: 100%;
                height: 2.5rem;
                display: flex;
                margin-top: -0.5rem;
                flex-direction: column;
                align-items: center;
                overflow: scroll;
             
              
              }
              p {
                color: rgb(120, 120, 120);
                margin-bottom: 0.05rem;
              }
              .active {
                color: #fff;
                font-size: 0.5rem;
              }
</style>
`
            template.innerHTML = `
                 <div class="musicLyric" >
                 <p>
                  word
                  </p>
                 </div>
           `;

            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot.appendChild(style);


        }
        // 这个render和前面不一样咯  它是拿到请求过来的数据才会执行
        // 当你请求改变属性时候 会检测再执行此函数
    render_data({ word, time }) {
        let dom_tree = this.shadowRoot.querySelector(".musicLyric");

        word.map((item, index, arr) => {
            let p = document.createElement('p')
            p.innerText = item
            dom_tree.appendChild(p)
        })


    };
    static get observedAttributes() {
        return ['data'];
    };

    // 定时器触发函数 

    updateTime() {
        setInterval(() => {

        }, 1000);
    }



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