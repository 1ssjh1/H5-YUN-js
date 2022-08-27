// 热搜板块

customElements.define('hot-card', class hot_component extends HTMLElement {
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
    
}
.hot_mod  {
    font-weight: 400;
    width: 95%;
    height: 1.55rem;
    display: flex;
    justify-content: space-between; 
    align-items: center;
}

.hot_mod .index {
    flex: 1;
    height: .7rem;
    line-height: 0.7rem;
    font-size: 0.4rem;
    font-weight: 700;
   text-align: center;

  }
  .hot_mod .name {
    width: 1.4rem;
    flex: 4;
    height: 90%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .hot_mod .name ._title {
    font-weight: 600;
    line-height: 0rem;
    font-size: 0.4rem;
    margin-top: 0.7rem;
  }
  .hot_mod .name  p {
    color: rgba(26, 26, 26, 0.5);

  }
  .hot_mod .name ._title i {
    font-size: 0.3rem;
  }
  .hot_mod .number {
    color: rgba(26, 26, 26, 0.5);
    flex: 1.3;
  }
  .hot_mod  i{
    color:red
  }
  
</style>
`
            template.innerHTML = `
         <div class="hot_mod">
            <div class="index"> 1</div>
            <div class="name">
                <div class="_title">高无人 <i>hot</i></div>
                <p>wokende</p>
            </div>
            <div class="number"> 1234567</div>
        </div>
           `;

            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot.appendChild(style);


        }
        // 这个render和前面不一样咯  它是拿到请求过来的数据才会执行
        // 当你请求改变属性时候 会检测再执行此函数
    render_data({ index, score, searchWord, content }) {


        // 获取并渲染
        let dom_tree = this._shadowRoot.querySelector(".hot_mod"),
            dom_tree_index = dom_tree.querySelector(".index"),

            dom_tree_title = dom_tree.querySelector("._title"),
            dom_tree_number = dom_tree.querySelector(".number"),
            dom_tree_p = dom_tree.querySelector("p")
            // 赋值
        dom_tree_index.innerHTML = index + 1
        dom_tree_title.innerText = searchWord
        dom_tree_number.innerHTML = score
        dom_tree_p.innerHTML = content
        if (index == "0") {
            dom_tree_title.insertAdjacentHTML('beforeend', '<i> HOT</i>')
        }
        if (index <= 2) {
            dom_tree_index.style.color = "red"
        }

    };
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