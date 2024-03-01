function FlexibleNavigationBar() {
    let oMenu = document.getElementsByClassName("menu"); // 返回值为collection
    let imgs = oMenu[0].getElementsByTagName("img"); // [0]后才能调用函数
    let originalWidth = []; // 原宽度

    // 获取原宽度、设置当前宽度
    for (let i = 0; i < imgs.length; i++) {
        originalWidth.push(imgs[i].offsetWidth);
        imgs[i].width = parseInt(imgs[i].offsetWidth) / 2;
    }
    // 鼠标移动事件
    oMenu[0].onmousemove = function (event) {
        for (let i = 0; i < imgs.length; i++) {
            // 鼠标和图片中心点的水平距离
            let a = event.clientX - imgs[i].offsetLeft - imgs[i].offsetWidth / 2;

            // 鼠标和图片中心点的垂直距离
            let b = event.clientY - imgs[i].offsetHeight / 2 - oMenu[0].getBoundingClientRect().top; // offset并不包含上面的空白，减去的是空白大小

            // 鼠标和图片中心点的距离（数值/500进行转换，方便图片大小规定）
            let iScale = 1 - Math.sqrt(a * a + b * b) / 500;

            if (iScale < 0.5) iScale = 0.5;
            imgs[i].width = originalWidth[i] * iScale; // 更新图片大小
        }
    };
}