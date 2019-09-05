"use strict";

$(function () {
  //
  //获取页面响应信息
  var $tab = $('#productTab tbody');
  var $noGood = $('.no-goods');
  var $goBack = $('.go-back');
  var $delivery = $('.delivery-tit');
  var $settle = $('.cart-settlement');
  $('.go-back input').click(function () {
    location.href = 'index.html';
  });
  /* 获取localStorage中的信息放到页面中 */
  //获取localStorage

  var storage = window.localStorage;
  var storageStr = storage.carts ? storage.carts : '';
  var storageObj = convertStorageStrToStorageObj(storageStr);
  var numSum = 0;
  var moneySum = 0; //循环遍历

  for (var key in storageObj) {
    /*
        carts : {
            "Line在一起" : {
                "sp1" : {
                     "gdimg" : $gdimg,
                    "gdname" : $gdname,
                    "gdsubname" : $gdsubname,
                    "gdspec" : $gdspec,
                    "gdprice" : $gdprice
                    "gdnum" : $gdnum
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
    //取出每一类商品的信息
    var good = JSON.parse(storageObj[key]); //取出每一类商品中不同规格的信息

    for (var keys in good) {
      var subGood = good[keys]; //创建tr放页面

      $tab.append(" <tr id=\"".concat(subGood.gdsubname).concat(keys, "\" class=\"goods-show\">\n            <td>\n                <input type=\"checkbox\">\n            </td>\n            <td>\n                <dl>\n                    <dt>\n                        <img src=\"").concat(subGood.gdimg, "\" alt=\"\">\n                    </dt>\n                    <dd>\n                        <p>\n                            <a href=\"#\">").concat(subGood.gdname, "</a><br>\n                            <span>").concat(subGood.gdsubname, "</span><br>\n                            <span class=\"").concat(keys, "\">\u89C4\u683C\uFF1A").concat(subGood.gdspec, "</span>\n                        </p>\n                    </dd>\n                </dl>\n            </td>\n            <td>\n                <b>\n                    <i>\uFFE5</i>\n                    ").concat(subGood.gdprice, ".00\n                </b>\n            </td>\n            <td>\n                <div class=\"goods-num\">\n                    <input type=\"button\" value=\"-\" class=\"num-minus\">\n                    <input type=\"text\" value=\"").concat(subGood.gdnum, "\" class=\"goods-number\">\n                    <input type=\"button\" value=\"+\" class=\"num-plus\">\n                </div>\n            </td>\n            <td class=\"price-sum\">\n                <b>\n                    <i>\uFFE5</i>\n                    <span>").concat(subGood.gdprice * subGood.gdnum, ".00</span>\n                </b>\n            </td>\n            <td>\n                <a href=\"javascript:;\" class=\"goods-del\">\u5220\u9664</a>\n            </td>\n        </tr> "));
      numSum += subGood.gdnum;
      moneySum += subGood.gdnum * subGood.gdprice;
    }
  } //判断购物车中有没有商品


  if ($('.goods-show').length == 0) {
    $noGood.css('display', 'block');
    $goBack.css('display', 'block');
    $settle.css('display', 'none');
    $delivery.css('display', 'none');
  } else {
    $noGood.css('display', 'none');
    $goBack.css('display', 'none');
    $settle.css('display', 'block');
    $delivery.css('display', 'table-row');
  } //总计


  var $numSum = $('.cart-settlement p span');
  var $moneySum = $('.cart-settlement p em');
  $numSum.html(numSum);
  $moneySum.html(moneySum.toFixed(2)); //减号

  var $minus = $('.goods-num .num-minus');
  $minus.each(function () {
    $(this).click(function () {
      //获取商品名
      var $name = $(this).parent().parent().prev().prev().children().children('dd').children().children(':eq(0)').html(); //获取商品规格

      var $spId = $(this).parent().parent().prev().prev().children().children('dd').children().children(':eq(4)').attr('class'); //获取localStorage

      var storage = window.localStorage;
      var storageStr = storage.carts ? storage.carts : '';
      var storageObj = convertStorageStrToStorageObj(storageStr);
      var subObj = JSON.parse(storageObj[$name]);

      if (subObj[$spId].gdnum > 1) {
        subObj[$spId].gdnum--;
      } //重新存入localStorage


      storageObj[$name] = JSON.stringify(subObj);
      storage.carts = JSON.stringify(storageObj); //改变页面中的数量和小计

      $(this).next().val(JSON.parse(storageObj[$name])[$spId].gdnum);
      $(this).parent().parent().next().children().children(':eq(1)').html(JSON.parse(storageObj[$name])[$spId].gdprice * JSON.parse(storageObj[$name])[$spId].gdnum + '.00'); //改变总数量和总价格

      var number = 0;
      var priceSum = 0;
      $('.goods-num .goods-number').each(function () {
        number += parseInt($(this).val());
      });
      $('.price-sum b span').each(function () {
        priceSum += parseInt($(this).html());
      });
      $numSum.html(number);
      $moneySum.html(priceSum.toFixed(2));
    });
  }); //加号

  var $plusSign = $('.goods-num .num-plus');
  $plusSign.each(function () {
    $(this).click(function () {
      //获取商品名
      var $name = $(this).parent().parent().prev().prev().children().children('dd').children().children(':eq(0)').html(); //获取商品规格

      var $spId = $(this).parent().parent().prev().prev().children().children('dd').children().children(':eq(4)').attr('class'); //获取localStorage

      var storage = window.localStorage;
      var storageStr = storage.carts ? storage.carts : '';
      var storageObj = convertStorageStrToStorageObj(storageStr);
      var subObj = JSON.parse(storageObj[$name]);

      if (subObj[$spId].gdnum < 50) {
        subObj[$spId].gdnum++;
      } //重新存入localStorage


      storageObj[$name] = JSON.stringify(subObj);
      storage.carts = JSON.stringify(storageObj); //改变页面中的数量和小计

      $(this).prev().val(JSON.parse(storageObj[$name])[$spId].gdnum);
      $(this).parent().parent().next().children().children(':eq(1)').html(JSON.parse(storageObj[$name])[$spId].gdprice * JSON.parse(storageObj[$name])[$spId].gdnum + '.00'); //改变总数量和总价格

      var number = 0;
      var priceSum = 0;
      $('.goods-num .goods-number').each(function () {
        number += parseInt($(this).val());
      });
      $('.price-sum b span').each(function () {
        priceSum += parseInt($(this).html());
      });
      $numSum.html(number);
      $moneySum.html(priceSum.toFixed(2));
    });
  }); //删除

  var $del = $('.goods-del');
  $del.each(function () {
    $(this).click(function () {
      //获取商品名
      var $name = $(this).parent().prev().prev().prev().prev().children().children('dd').children().children(':eq(0)').html(); //获取商品规格

      var $spId = $(this).parent().prev().prev().prev().prev().children().children('dd').children().children(':eq(4)').attr('class'); //获取localStorage

      var storage = window.localStorage;
      var storageStr = storage.carts ? storage.carts : '';
      var storageObj = convertStorageStrToStorageObj(storageStr); //删除对象中的指定属性

      var subObj = JSON.parse(storageObj[$name]);
      delete subObj[$spId];
      storageObj[$name] = JSON.stringify(subObj);
      storage.carts = JSON.stringify(storageObj);
      $(this).parent().parent().remove(); //改变总数量和总价格

      var number = 0;
      var priceSum = 0;
      $('.goods-num .goods-number').each(function () {
        number += parseInt($(this).val());
      });
      $('.price-sum b span').each(function () {
        priceSum += parseInt($(this).html());
      });
      $numSum.html(number);
      $moneySum.html(priceSum.toFixed(2)); //全部删掉后页面样式改变

      if ($('.goods-show').length == 0) {
        $noGood.css('display', 'block');
        $goBack.css('display', 'block');
        $settle.css('display', 'none');
        $delivery.css('display', 'none');
      } else {
        $noGood.css('display', 'none');
        $goBack.css('display', 'none');
        $settle.css('display', 'block');
        $delivery.css('display', 'table-row');
      }
    });
  }); //继续购物

  $('.continue-buy').click(function () {
    window.location = "index.html";
  });

  function convertStorageStrToStorageObj(str) {
    if (!str) {
      return {};
    }

    return JSON.parse(str);
  }
});