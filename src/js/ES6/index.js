$(function(){
    //导入头部
    var $head = $('#headerLink');
    $head.load('public.html #headerWrap',function(){
        var $ClassicSuit = $('.header-nav ul li').eq(1);
        var $HeadSubmenu = $('.header-submenu');
        var $shopping = $('.header-nav ul > li').last();
        var $cart = $('.shop-con');
        $ClassicSuit.hover(function(){
            $HeadSubmenu.css('display','block');
        },function(){
            $HeadSubmenu.css('display','none');
        })
        $shopping.hover(function(){
            $cart.css('display','block');
        },function(){
            $cart.css('display','none');
        })
    });
    //导入脚部
    var $footer = $('#footerLink');
    $footer.load('public.html #footerWrap');
 
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
                    //获取图片数量
                    this.imgnum = this.ullis.length;
                    //获取所有小圆点
                    this.ollis = this.bannerBox.children[1].children;
                    //复制第一张图放在最后
                    this.imgUl.appendChild(this.ullis[0].cloneNode(true));
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
                //轮播
                slide(){
                    //大图。改变存放大图的盒子left值。
                    this.imgUl.style.left = - (300 + this.indexA * this.ullis[0].offsetWidth) + 'px';
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
                            this.imgUl.style.left = -300 + 'px';
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
})


