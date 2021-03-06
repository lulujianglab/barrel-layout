var barrel = {
    container: document.getElementById('barrel_container'),
    src: "http://cued.xunlei.com/demos/publ/img/P_",
    imgNumber: 0, //每张图的编号
    imgs: [], //图片数组
    loadNumber: 30, //初始水桶数
    height: 300, //水桶的高度
    rows: [],
    getIndex: function(){
        var index = this.imgNumber
        if (index < 10) {
            index = "00" + index
        } else if (index < 100){
            index = '0' + index
        }
        return index
    },

    getImage: function() { // 将首屏加载的30张图片放入数组imgs
        var self = this,
            i = 0,
            timer = 0
        function imgloading() { 
            index = self.getIndex()
            img = document.createElement('img')
            img.src = self.src + index + '.jpg'
            if (img.width > 0 && img.height > 0) {
                self.imgs.push({
                    // width: img.width,
                    // height: img.height,
                    src: img.src,
                    ratio: img.width/img.height //计算宽高比率
                })
                self.imgNumber++
                i++
                if (i > self.loadNumber){
                    barrel.imgNumber = 0
                    clearInterval(setImg)
                    timer = 1
                }
                if (timer == 1){
                    self.getRatioWidth()
                }
            }
        }
        // 可以更高效的判断图片是否已经加载完全
        var setImg = setInterval(imgloading, 0) // 非阻塞操作 setInterval(,0) 有一个最小间隔时间，大概是10ms，不同的浏览器设置不一样，w3c规定的是4ms
    },

    getRatioWidth: function(){
        var self = this,
            imgsWidth = 0,
            tempArr = [] // 暂存每一行的照片
        for (var i = 0; i < self.imgs.length; i++){
            img = new Image() //在生成对象个数较少的时候，用document.createElement('img')
            img.src = self.imgs[i].src

            self.imgs[i].width = self.imgs[i].ratio * self.height // 转换每张图片的宽
            imgsWidth += self.imgs[i].width
            tempArr.push(self.imgs[i])
            if (imgsWidth > self.container.clientWidth) { //判断每行应加载的图片数
                self.rows.push(tempArr)
                self.rows.push(self.height * (self.container.clientWidth / imgsWidth)) //当每行图片总宽度变为浏览器宽度时，高度计算
                imgsWidth = 0
                tempArr = []
            }
        }
        self.render()
    },

    render: function(){ // 将图片渲染到dom上
        var self = this,
            index
        for (var i = 0; i < self.rows.length; i += 2){
            var div = document.createElement('div')
            for (var j = 0; j < self.rows[i].length; j++){
                var img = new Image()
                img.src = self.rows[i][j].src
                div.appendChild(img)
                index = i + 1
                div.style.height = self.rows[index] + 'px'
            } 
            self.container.appendChild(div)
        }
    },

    scroll: function(){ //鼠标滚动事件，若已加载图片在屏幕上方或中间，重新再加载30张
        var self = this
        window.onscroll = function() {
            var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
            if (scrollTop + document.documentElement.clientHeight >= document.documentElement.offsetHeight - 2) {
                self.render() // 循环显示所设置的个数
            }
        }
    },

    init: function() {
        document.getElementById('barrel_container').style.width = document.documentElement.clientWidth - 30 + 'px' //方便后面获取该元素的width
        isReady()
        this.getImage()
        this.scroll()
    }
}
window.onload = function() {
    barrel.init()
}
window.onresize = function() {
    location.reload()
}
function isReady() {
    var content = document.getElementById('barrel_container')
    if (content.childNodes.length == 0) {
        var timeout = setTimeout(isReady,1000)
    }else{
        document.getElementsByClassName('mask')[0].style.display = "none" //隐藏首次加载的loading
        clearTimeout(timeout)
    }
}