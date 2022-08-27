//  img 通用 组件  包含了 一张图片 和两段介绍
// 当然 你也可以只传一段介绍...

// 设置 锁头 解决 问题  webcomponent 生命周期导致其 一直被调用 
let body = document.querySelector("body")
let key = 0;
body.setAttribute("key", key++)

customElements.define('img-card', class img_component extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    }



    connectedCallback() {};
    // 这里的render 不能再connectCallback 执行
    // 应为 再后面调用 拖拽库的时候  会出现位置移动 原生组件会重新执行生命周期 
    // 会再次渲染 导致得不到信息而报错
    render() {
            const template = document.createElement('template');
            const style = document.createElement("style");
            // css渲染须知      transform: scale(${this.getAttribute("number")});
            // 再html中写入 图片需要放大倍数  
            style.innerHTML = `
<style>
* {
    text-decoration: none;
    list-style-type: none;
    box-sizing: border-box;
    
}



 .image_list {
    width: 2.353rem;
    height:2.353rem;
    position: relative;
    /* background: url(../image/p1.jpg) center center no-repeat;
    background-size: contain; */
}

 

 .image_list div {
    width: 100%;
    height: 100%;
    margin: 0 auto;

    transform: scale(${this.getAttribute("number")});
    border-radius: .2933rem;
    background: url(http://124.221.249.219:8000/images/covers/1.jpg) center center no-repeat;
    background-size: 100% 100%;
}

 .image_list p {
    bottom: -0.2193rem;
    right: .0;
    font-size: .3467rem;
    border-radius: 9px;
    height: 0.4533rem;
    width: 2rem;
    background: rgba(0, 0, 0, .4);
    color: #fff;
    text-align: center;
    position: absolute;
    white-space: nowrap;
   text-overflow: ellipsis;
   -o-text-overflow:ellipsis;
}
.image_list h5{

    width: 90%;
    
    line-height: 0.4rem;
    margin-top: 0.25rem;
    font-weight: 400;
    color: rgba(26,26,26,1);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
   
    
}
`
                // html渲染须知  对于有副标题的就传 没有就算了  通过哟thing属性
            template.innerHTML = `
  
        <div class="image_list">
            <div class="image_div">
            </div>
            <p>>1940.0万</p>
            <h5>${this.getAttribute("thing")||""}</h5>
        </div>
    
           `;

            this._shadowRoot.appendChild(template.content.cloneNode(true));
            this._shadowRoot.appendChild(style);


        }
        // 主要是渲染图片和标题  
    render_data(newValue) {
        let _this = this._shadowRoot.querySelector(".image_list")
        _this.children[0].setAttribute("data-src", newValue.cover)
        this.lazy_render(_this.children[0]);
        // 识别标题  为数字加万  不为数字不加万
        _this.children[1].innerText = typeof(newValue.views) == "number" ? ">" + newValue.views + "万" : newValue.views;


    };
    // 懒加载渲染
    lazy_render(_this) {
            const callback = entries => {
                // 没用 foreach 因为每个组件 的数组长度就是 1  所以直接写【0】就行
                if (entries[0].isIntersecting) {
                    const target = entries[0].target
                    const data_src = target.getAttribute("data-src");
                    target.style.background = `url(${data_src}) center center no-repeat`;
                    target.style.backgroundSize = "100% 100%";
                    observer.unobserve(target)
                }

            }

            const observer = new IntersectionObserver(callback);



            observer.observe(_this)




        }
        // 渲染组件宽高函数 
    render_size(newValue) {
            let image_list = this._shadowRoot.querySelector(".image_list")
            image_list.style.width = newValue[0] + "rem";
            image_list.style.height = newValue[1] + "rem";
        }
        // 监听属性并且 渲染 图片 模块
    static get observedAttributes() {
        return ['data', "width_height"];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // switch 做选择  识别到 _data  就将这个属性值 存起来 先别渲染 
        // 渲染操作 应该在connectedCallback 生命周期回调函数里面操作

        switch (name) {
            case 'data':
                // 通过全局监控 监视 渲染组件个数 不准多渲染了 不然要报错
                // 原生组件不足之处八
                body.setAttribute("key", key++)
                if (body.getAttribute("key") > 31) {
                    return
                }
                // 感觉可以合并
                this.render();
                this.render_data(this._data)
                break;
            case 'width_height':

                this.render_size(newValue)

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