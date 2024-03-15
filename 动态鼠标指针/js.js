class Cursor {
    lerp = (a, b, n) => (1 - n) * a + n * b;   // 线性插值函数

    constructor() {
        this.pos = { curr: null, prev: null }; // 坐标
        this.pt = new Set()  // 可点击元素
        this.create();
        this.init();
        this.render();
    }

    init() { // 给事件处理器属性设置函数
        document.onmouseover = event => {
            // 测试用 console.log(event.target.outerHTML)
            return this.pt.has(event.target.outerHTML) /* 该元素的源码存在可点击元素里 */ && this.cursor.classList.add("hover");  // 指针浮在可点击元素上     
        }

        document.onmouseout = event => this.pt.has(event.target.outerHTML) && this.cursor.classList.remove("hover");

        document.onmousedown = event => this.cursor.classList.add("active");     // 点击的时候添加active 
        document.onmouseup = event => this.cursor.classList.remove("active");    // 移除active

        document.onmouseenter = event => this.cursor.classList.remove("hidden"); // 鼠标进页面
        document.onmouseleave = event => this.cursor.classList.add("hidden");    // 鼠标出页面隐藏圈

        document.onmousemove = event => {
            this.cursor.classList.remove("hidden");  // 防穿帮
            if (this.pos.curr === null) // 如果没坐标，定位到鼠标现在的坐标，减8是因为设置的坐标是图片左上角坐标，图片本省是16*16
                this.move(event.clientX - 8, event.clientY - 8); // e.clientX 和 e.clientY 是事件对象的属性，分别表示鼠标指针在触发事件时相对于浏览器窗口的水平和垂直坐标。
            this.pos.curr = { // 设置现在的前驱坐标
                x: event.clientX - 8,
                y: event.clientY - 8
            };
        }
    }

    create() {
        if (!this.cursor) {
            this.cursor = document.createElement("div");  // 创建div节点
            this.cursor.id = "cursor";                    // 指定指针id
            this.cursor.classList.add("hidden");          // 不加这个语句可能会穿帮
            document.body.append(this.cursor);            // 添加cursor到dom里
        }

        var element = document.getElementsByTagName('*'); // 遍历网页所有元素
        for (let i = 0; i < element.length; i++) {
            // 测试用 console.log(element[i]);
            if (
                window.getComputedStyle(element[i], "cursor") == "pointer" || // 有可点击属性（cursor:pointer）， getComputedStyle解析网页元素的CSS属性
                (element[i].tagName.toLowerCase() === 'a' && element[i].hasAttribute('href')) // 有实际链接的超链接
            )
                this.pt.add(element[i].outerHTML);  // 该元素源码放入数组 outerHTML为元素源码
        }

    }

    move(left, top) {  // 设置左上角的坐标
        this.cursor.style["left"] = `${left}px`;
        this.cursor.style["top"] = `${top}px`;
    }

    render() {  // 核心动画函数
        if (this.pos.prev) {
            this.pos.prev.x = this.lerp(this.pos.prev.x, this.pos.curr.x, 0.15);
            this.pos.prev.y = this.lerp(this.pos.prev.y, this.pos.curr.y, 0.15);

            // 后继坐标根据线性插值函数更新，从而达到动画效果
            this.move(this.pos.prev.x, this.pos.prev.y);
        } else {
            this.pos.prev = this.pos.curr;
        }
        requestAnimationFrame(() => this.render());  // 每次重绘动画的时候都回调render函数
    }
}

let CURSOR;
function create_cursor() {
    CURSOR = new Cursor();
}


/*  init()
    1.移上元素：用 document.onmouseover 实现
    2.移出元素：用 document.onmouseout 实现
    3.移动鼠标：用 document.onmousemove 实现
    4.移入页面：用 document.onmouseenter 实现
    5.移出页面：用 document.onmouseleave 实现
    6.按下左键：用 document.onmousedown 实现
    7.松开左键：用 document.onmouseup 实现
*/