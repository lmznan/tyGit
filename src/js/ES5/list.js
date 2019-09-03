"use strict";

//为所有商品图片添加移入事件
//获取所有商品图片
var $goodImgs = $('.good-img');
$goodImgs.each(function (index, value) {
  $(this).hover(function () {
    $(this).css('border-color', '#d7bc7e');
    $(this).find('i').css('display', 'block');
  }, function () {
    $(this).css('border-color', '#eceaeb');
    $(this).find('i').css('display', 'none');
  });
});