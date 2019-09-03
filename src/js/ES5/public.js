"use strict";

$(function () {
  $.ajaxSetup({
    cache: false //关闭AJAX相应的缓存 

  }); //导入头部

  var $head = $('#headerLink');
  $head.load('public.html #headerWrap', function () {
    var $ClassicSuit = $('.header-nav ul li').eq(1);
    var $HeadSubmenu = $('.header-submenu');
    var $shopping = $('.header-nav ul > li').last();
    var $cart = $('.shop-con');
    $ClassicSuit.hover(function () {
      $HeadSubmenu.css('display', 'block');
    }, function () {
      $HeadSubmenu.css('display', 'none');
    });
    $shopping.hover(function () {
      $cart.css('display', 'block');
    }, function () {
      $cart.css('display', 'none');
    });
  }); //导入脚部

  var $footer = $('#footerLink');
  $footer.load('public.html #footerWrap');
});