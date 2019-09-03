$(function(){
    //插件
    $.extend({
        /* 大图轮播 */
        banner : function(id){
            class slider{
                constructor(id){
                    //获取轮播盒子
                    this.bannerBox = document.querySelector(id);
                    this.init();
                }
                init(){
                    //获取图片盒子
                    this.imgUl = this.bannerBox.children[0];
                    //获取所有图片li
                    this.ullis = this.imgUl.children;
                    //计算图片数量
                    this.imgnum = this.ullis.length;
                    //获取所有小圆点
                    this.ollis = this.bannerBox.children[1].children;
                    //复制第一张图放在最后
                    this.imgUl.appendChild(this.ullis[0].cloneNode(true));
                    //定义图片盒子初始位置
                    this.initLeft = (this.ullis[0].offsetWidth - 980) / 2;
                    this.imgUl.style.left = -this.initLeft + 'px';
                    //定义大图当前下标
                    this.indexA = 0;
                    //定义小圆点当前下标
                    this.indexB = 0;
                    //定义计时器返回值接收变量
                    this.timer = null;
                    //初始化轮播函数
                    this.slide();
                    this.addEvent();
                    this.autoPlay();
                }
                //获取非行内样式
                getStyle(obj, attr) {
                    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, 1)[attr];
                }
                //轮播
                slide(){
                    //大图。改变存放大图的盒子left值。
                    this.sport(this.imgUl,{left : - (this.initLeft + this.indexA * this.ullis[0].offsetWidth)});
                    //小圆点
                    for(let i = 0;i < this.imgnum;i ++){
                        this.ollis[i].className = '';
                    }
                    this.ollis[this.indexB].className = 'current';
                }
                //事件
                addEvent(){
                    
                    for(let i = 0;i < this.imgnum;i ++){
                        this.ollis[i].onclick = ()=>{
                            this.indexA = i;
                            this.indexB = i;
                            this.slide();
                        }
                    }
                }
                //自动轮播
                autoPlay(){
                    this.timer = setInterval(()=>{
                        this.indexA ++;
                        if(this.indexA > this.imgnum){
                            this.indexA = 1;
                            this.imgUl.style.left = -this.initLeft + 'px';
                        }
                        this.indexB ++;
                        if(this.indexB > this.imgnum - 1){
                            this.indexB = 0;
                        }
                        this.slide();
                    },3000)
                    this.bannerBox.onmouseenter = ()=>{
                        clearInterval(this.timer);
                    }
                    this.bannerBox.onmouseleave = ()=>{
                        this.autoPlay();
                    }
                }
                //运动
                sport(obj, json, fn) {
                    clearInterval(obj.timer);
                    obj.timer = setInterval(() => {
                        let flag = true;
                        for (let attr in json) {
                            let cur = attr === 'opacity' ? Math.floor(parseFloat(this.getStyle(obj, attr)) * 100) : parseInt(this.getStyle(obj, attr));
                            let speed = (json[attr] - cur) / 8;
                            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                            if (cur !== json[attr]) {
                                flag = false;
                            }
                            if (attr === 'opacity') {
                                obj.style.opacity = (cur + speed) / 100;
                                obj.style.filter = 'alpha(opacity=' + (cur + speed) + ')';
                            } else {
                                obj.style[attr] = cur + speed + 'px';
                            }
                        }
                        if (flag) {
                            if (fn instanceof Function) {
                                fn();
                            }
                            clearInterval(obj.timer);
                        }
                    }, 30);
                } 
            }
            new slider(id);
        },
        /* 复杂轮播 */
        banner2 : function(selector){
            //获取大图片盒子
            let oBigBox = document.querySelector(selector);
            //获取所有图片
            let oImgs = oBigBox.children[1].children[0].children;
            //计算图片数量
            let oNum = oImgs.length;
            //获取图片对应内容盒子
            let oConBox = oBigBox.children[2];
            //获取左按钮
            let oLeft = oConBox.firstElementChild;
            //获取右按钮
            let oRight = oConBox.lastElementChild;
            //获取所有对应内容
            let oCons = oConBox.children[1].children;
            //记录公共下标
            let index = 0;
            //添加事件
            //移入图片
            for(let i = 0;i < oNum;i ++){
                oImgs[i].onmouseenter = function(){
                    index = i;
                    for(let j = 0;j < oNum;j ++){
                        $(oImgs[j]).removeClass('cur')
                    }
                    $(this).addClass('cur');
                }
            }
        }
    })
    $.banner('#bannerBox');
    $.banner2('#sweetMoments');
    //为所有商品图片添加移入事件
    //获取所有商品图片
    let $goodImgs = $('.good-img');
    $goodImgs.each(function(index,value){
        $(this).hover(function(){
            $(this).css('border-color','#d7bc7e');
            $(this).find('i').css('display','block');
        },function(){
            $(this).css('border-color','#eceaeb');
            $(this).find('i').css('display','none');
        })
    })
})


