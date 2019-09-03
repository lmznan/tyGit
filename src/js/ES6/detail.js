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
        let left = evt.pageX - $slide.outerWidth() / 2 - $mask.offset().left + $mask.position().left;
        let top = evt.pageY - $slide.outerHeight() / 2 - $mask.offset().top + $mask.position().top;
        if(left <= $mask.position().left){
            left = $mask.position().left;
        }else if(left >= $mask.innerWidth() - $slide.outerWidth() + $mask.position().left){
            left = $mask.innerWidth() - $slide.outerWidth() + $mask.position().left;
        }
        if(top <= $mask.position().top){
            top = $mask.position().top;
        }else if(top >= $mask.innerHeight() - $slide.outerHeight() + $mask.position().top){
            top = $mask.innerHeight() - $slide.outerHeight() + $mask.position().top;
        }
        $slide.css('left',`${left}px`);
        $slide.css('top',`${top}px`);
        //移动比例
        let ProX = left / ($mask.innerWidth() - $slide.outerWidth());
        let ProY = top / ($mask.innerHeight() - $slide.outerHeight());
        $slimg.css('left',`${-ProX * ($slimg.outerWidth() - $slide.innerWidth()- 76) - 64}px`);
        $slimg.css('top',`${-ProY * ($slimg.outerHeight() - $slide.innerHeight()- 76) - 64}px`);
    })
})