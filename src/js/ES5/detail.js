"use strict";

$(function () {
  /* 放大镜 */

  /* 获取页面元素 */
  //获取大盒子
  var $magBox = $('.goods-magnifier'); //获取图片

  var $img = $('.goods-img'); //获取滑块

  var $slide = $('.goods-slide'); //获取滑块中的图片

  var $slimg = $('.goods-slide img'); //获取遮罩层

  var $mask = $('.goods-mask');
  /* 添加事件 */

  $img.mouseenter(function () {
    $slide.css('display', 'block');
    $mask.css('display', 'block');
  });
  $mask.mouseleave(function () {
    $slide.css('display', 'none');
    $mask.css('display', 'none');
  });
  $mask.mousemove(function (evt) {
    //滑块移动边界
    var left = evt.pageX - $slide.outerWidth() / 2 - $mask.offset().left + $mask.position().left;
    var top = evt.pageY - $slide.outerHeight() / 2 - $mask.offset().top + $mask.position().top;

    if (left <= $mask.position().left) {
      left = $mask.position().left;
    } else if (left >= $mask.innerWidth() - $slide.outerWidth() + $mask.position().left) {
      left = $mask.innerWidth() - $slide.outerWidth() + $mask.position().left;
    }

    if (top <= $mask.position().top) {
      top = $mask.position().top;
    } else if (top >= $mask.innerHeight() - $slide.outerHeight() + $mask.position().top) {
      top = $mask.innerHeight() - $slide.outerHeight() + $mask.position().top;
    }

    $slide.css('left', "".concat(left, "px"));
    $slide.css('top', "".concat(top, "px")); //移动比例

    var ProX = left / ($mask.innerWidth() - $slide.outerWidth());
    var ProY = top / ($mask.innerHeight() - $slide.outerHeight());
    $slimg.css('left', "".concat(-ProX * ($slimg.outerWidth() - $slide.innerWidth() - 76) - 64, "px"));
    $slimg.css('top', "".concat(-ProY * ($slimg.outerHeight() - $slide.innerHeight() - 76) - 64, "px"));
  });
});