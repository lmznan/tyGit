"use strict";

$(function () {
  /* 放大镜 */
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
  }); //运动框架插件

  $.extend({
    sport: function sport(obj, json) {
      clearInterval(obj.timer);
      obj.timer = setInterval(function () {
        //设置开关，假设所有的属性都达到目标时，开关为true
        var flag = true;

        for (var attr in json) {
          //1. 获取当前属性的值
          var cur = attr === 'opacity' ? parseInt(parseFloat($.getStyle(obj, attr)) * 100) : parseInt($.getStyle(obj, attr));
          var speed = (json[attr] - cur) / 4;
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
          clearInterval(obj.timer);
        }
      }, 30);
    },
    getStyle: function getStyle(obj, attr) {
      return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, 1)[attr];
    }
  });
  /* 侧边栏滑入滑出 */
  //获取元素

  var $side = $('.side-box');
  $side.hover(function () {
    $.sport(this, {
      right: 226
    });
  }, function () {
    $.sport(this, {
      right: 0
    });
  });
  /* 更多链接more link */

  var onOff = true;
  var $moreLink = $('.link-more1');
  var $linkbox = $('.buyInfor-a6 .more-con1');
  $moreLink.hover(function () {
    $linkbox.css('display', 'block');
  }, function () {
    setTimeout(function () {
      if (!onOff) {
        $linkbox.css('display', 'none');
      }
    }, 300);
  });
  $linkbox.hover(function () {
    onOff = true;
    $(this).css('display', 'block');
  }, function () {
    onOff = false;
    $(this).css('display', 'none');
  });
  /* 规格点击效果 */

  var $li = $('.buyInfor-a3 ul li');
  $li.each(function () {
    $(this).click(function () {
      $li.attr('class', 'specification-unselect');
      $(this).attr('class', 'specification-select');

      if ($li.first().attr('class') === 'specification-select') {
        $('.buyInfor-a2 span').html(298);
      } else {
        $('.buyInfor-a2 span').html(428);
      }
    });
  });
  /* 数量变化 */

  var $ltBtn = $('.buy-num span').first();
  var $rtBtn = $('.buy-num span').last();
  var $goodsNum = $('.buy-num input');
  $ltBtn.click(function () {
    var goodsNum = $goodsNum.val();

    if (goodsNum > 1) {
      $goodsNum.val(goodsNum - 1);
    }
  });
  $rtBtn.click(function () {
    var goodsNum = parseInt($goodsNum.val());

    if (goodsNum < 50) {
      $goodsNum.val(goodsNum + 1);
    }
  });
  /* 购物车 */

  /*
      carts : {
          "BFF" : {
              "sp1" : {
                  "$gdimg" : goodSrc,
                  "$gdname" : goodName,
                  "$gdsubname" : goodSubname,
                  "$gdspec" : goodSpec,
                  "$gdprice" : goodPrice
                  "$gdnum" : goodNum
              },
              "sp2" : {
                  "gdimg" : $gdimg,
                  "gdname" : $gdname,
                  "gdsubname" : $gdsubname,
                  "gdspec" : $gdspec,
                  "gdprice" : $gdprice
                  "gdnum" : $gdnum
              }
          }
      }
  */
  //获取加入购物车按钮

  var $AddCart = $('.goods-inCar'); //添加事件

  $AddCart.click(function () {
    //获取商品编号
    var $gdId = $('.specification-select').attr('data-gd-id'); //获取图片

    var $gdimg = $('.goods-slide img').attr('src'); //获取商品名

    var $gdname = $('.goods-introduction h2').html(); //获取商品别名

    var $gdsubname = $('.good-introduction span').html(); //获取规格

    var $gdspec = $('.specification-select span').first().html(); //获取价格

    var $gdprice = $('.buyInfor-a2 span').html(); //获取数量

    var $gdnum = parseInt($('.buyInfor-a4 div input').val()); //获取localStorage

    var storage = window.localStorage;
    var storageStr = storage['carts'] ? storage['carts'] : '';
    var storageObj = convertStorageStrTOStorageObj(storageStr);

    if ($gdname in storageObj) {
      var goodObj = JSON.parse(storageObj[$gdname]);

      if ($gdId in goodObj) {
        goodObj[$gdId].gdnum += $gdnum;
      } else {
        goodObj[$gdId] = {
          "gdimg": $gdimg,
          "gdname": $gdname,
          "gdsubname": $gdsubname,
          "gdspec": $gdspec,
          "gdprice": $gdprice,
          "gdnum": $gdnum
        };
      }

      storageObj[$gdname] = JSON.stringify(goodObj);
    } else {
      var goodObj = {};
      goodObj[$gdId] = {
        "gdimg": $gdimg,
        "gdname": $gdname,
        "gdsubname": $gdsubname,
        "gdspec": $gdspec,
        "gdprice": $gdprice,
        "gdnum": $gdnum
      };
      storageObj[$gdname] = JSON.stringify(goodObj);
    }

    storage.carts = JSON.stringify(storageObj);
  });

  function convertStorageStrTOStorageObj(str) {
    if (!str) {
      return {};
    }

    return JSON.parse(str);
  }
});