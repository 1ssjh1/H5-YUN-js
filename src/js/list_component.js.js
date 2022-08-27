//  歌单组件



import { get_search } from "./_axios"
customElements.define('list-card', class list_component extends HTMLElement {
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




.list {
    width: 100%;
    height: 2.8073rem;
    display: flex;
    margin-top: 1.0667rem;
    flex-flow: nowrap row;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
}
.list   .img{
 height: 100%;
 border-radius: .2rem;
 flex: 1;
 background: url(${this.getAttribute("img_src")||'https://p2.music.126.net/pcYHpMkdC69VVvWiynNklA==/109951166952713766.jpg'}) 0px  no-repeat;
 background-size: contain;
}
.list .top_list {
    flex: 2.5;
    height: 100%;
    padding: .15rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-evenly;
}

.list p {
    width:3.6rem;
    font-size: .1567rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}


`
        template.innerHTML = `
        <div class="list">
            <div class="img">
            </div>
            <div class="top_list">
                <p>WOAI111111111111111111111111111111NI</p>
                <p>WOAINI</p>
                <p>WOAINI</p>

            </div>
        </div>
           `;

        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this._shadowRoot.appendChild(style);


    }


    //  二次渲染函数
    render_data(data) {

            let dom_tree = this._shadowRoot.querySelector(".list"),
                dom_tree_pList = dom_tree.querySelectorAll("p"),
                dom_tree_img = dom_tree.querySelector(".img");
            [...dom_tree_pList].map((item, index, get) => {
                    item.innerHTML = data[index].first + "--" + data[index].second
                })
                //  设置图片
            dom_tree_img.style.background = `url(${this.getAttribute("img_src")}) 0px  no-repeat`;
            dom_tree_img.style.backgroundSize = "contain";

            //  绑定跳转函数
            dom_tree.addEventListener("click", (e) => {
                this.go_one_list(e)
            })

        }
        // 跳转函数
    go_one_list(e) {
        let tab_cont = document.querySelector(".tab_cont"),
            sml_title = document.querySelector(".sml_title"),
            rank_list = document.querySelector(".rank_list"),
            songs_list = document.querySelector("#songs_list"),
            songlist_card = document.querySelector("songlist-card"),
            sheetList = document.querySelector(".sheetList");


        // 跳转 
        setTimeout(() => {
            rank_list.style.display = "none";
            sml_title.style.display = "none";
            songs_list.style.display = "block";

        }, 400);


        // 第一个then 传头部
        // 第二个then  传center
        get_search("/playlist/detail", { id: this.getAttribute("_id") }).then((res) => {

            const { playlist: { coverImgUrl, playCount, description, name } } = res


            songlist_card.data = { coverImgUrl, playCount, description, name }

            console.log(res);
            return res.playlist.tracks.splice(0, 10)

        }).then((res) => {
            console.log(res);
            res.map((item, index) => {
                const { name, al: { name: artName, picUrl }, cd, id } = item
                let element = document.createElement("sheet-card")
                element.setAttribute("_id", id)
                element.setAttribute("_name", name)
                element.setAttribute("_picUrl", picUrl)


                sheetList.append(element)
                element.data = { name, artName, cd, index: index + 1 }
            })
        })
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