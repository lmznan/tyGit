$(function(){
    /* 放大镜 */
    /* 获取页面元素 */
    //获取大盒子
    let $magBox = $('.goods-magnifier');
    //获取图片
    let $img = $('.goods-img');
    //获取滑块
     let $slide = $('.goods-slide');
    //获取滑块中的图片
    let $slimg = $('.goods-slide img');
    //获取遮罩层
    let $mask = $('.goods-mask');  
    /* 添加事件 */
    $img.mouseenter(function(){
        $slide.css('display','block');
        $mask.css('display','block');
    })
    $mask.mouseleave(function(){
        $slide.css('display','none');
        $mask.css('display','none');
    })
    $mask.mousemove(function(evt){
        //滑块移动边界
        let $left = e.pageX - oSlider.offsetWidth / 2 - oDiv.offsetLeft - oSmallPic.offsetLeft;
            let top = e.pageY - oSlider.offsetHeight / 2 - oDiv.offsetTop - oSmallPic.offsetTop;
    })
})