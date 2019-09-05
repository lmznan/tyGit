"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(function () {
  //插件
  $.extend({
    /* 大图轮播 */
    banner: function banner(id) {
      var slider =
      /*#__PURE__*/
      function () {
        function slider(id) {
          _classCallCheck(this, slider);

          //获取轮播盒子
          this.bannerBox = document.querySelector(id);
          this.init();
        }

        _createClass(slider, [{
          key: "init",
          value: function init() {
            //获取图片盒子
            this.imgUl = this.bannerBox.children[0]; //获取所有图片li

            this.ullis = this.imgUl.children; //计算图片数量

            this.imgnum = this.ullis.length; //获取所有小圆点

            this.ollis = this.bannerBox.children[1].children; //复制第一张图放在最后

            this.imgUl.appendChild(this.ullis[0].cloneNode(true)); //定义图片盒子初始位置

            this.initLeft = (this.ullis[0].offsetWidth - 980) / 2;
            this.imgUl.style.left = -this.initLeft + 'px'; //定义大图当前下标

            this.indexA = 0; //定义小圆点当前下标

            this.indexB = 0; //定义计时器返回值接收变量

            this.timer = null; //初始化轮播函数

            this.slide();
            this.addEvent();
            this.autoPlay();
          } //获取非行内样式

        }, {
          key: "getStyle",
          value: function getStyle(obj, attr) {
            return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj, 1)[attr];
          } //轮播

        }, {
          key: "slide",
          value: function slide() {
            //大图。改变存放大图的盒子left值。
            this.sport(this.imgUl, {
              left: -(this.initLeft + this.indexA * this.ullis[0].offsetWidth)
            }); //小圆点

            for (var i = 0; i < this.imgnum; i++) {
              this.ollis[i].className = '';
            }

            this.ollis[this.indexB].className = 'current';
          } //事件

        }, {
          key: "addEvent",
          value: function addEvent() {
            var _this = this;

            var _loop = function _loop(i) {
              _this.ollis[i].onclick = function () {
                _this.indexA = i;
                _this.indexB = i;

                _this.slide();
              };
            };

            for (var i = 0; i < this.imgnum; i++) {
              _loop(i);
            }
          } //自动轮播

        }, {
          key: "autoPlay",
          value: function autoPlay() {
            var _this2 = this;

            this.timer = setInterval(function () {
              _this2.indexA++;

              if (_this2.indexA > _this2.imgnum) {
                _this2.indexA = 1;
                _this2.imgUl.style.left = -_this2.initLeft + 'px';
              }

              _this2.indexB++;

              if (_this2.indexB > _this2.imgnum - 1) {
                _this2.indexB = 0;
              }

              _this2.slide();
            }, 3000);

            this.bannerBox.onmouseenter = function () {
              clearInterval(_this2.timer);
            };

            this.bannerBox.onmouseleave = function () {
              _this2.autoPlay();
            };
          } //运动

        }, {
          key: "sport",
          value: function sport(obj, json, fn) {
            var _this3 = this;

            clearInterval(obj.timer);
            obj.timer = setInterval(function () {
              var flag = true;

              for (var attr in json) {
                var cur = attr === 'opacity' ? Math.floor(parseFloat(_this3.getStyle(obj, attr)) * 100) : parseInt(_this3.getStyle(obj, attr));
                var speed = (json[attr] - cur) / 8;
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
        }]);

        return slider;
      }();

      new slider(id);
    },

    /* 复杂轮播 */
    banner2: function banner2(selector) {
      //获取大图片盒子
      var oBigBox = document.querySelector(selector); //获取所有图片

      var oImgs = oBigBox.children[1].children[0].children; //计算图片数量

      var oNum = oImgs.length; //获取图片对应内容盒子

      var oConBox = oBigBox.children[2]; //获取左按钮

      var oLeft = oConBox.firstElementChild; //获取右按钮

      var oRight = oConBox.lastElementChild; //获取所有对应内容

      var oCons = oConBox.children[1].children; //记录公共下标

      var index = 0; //添加事件
      //移入图片

      var _loop2 = function _loop2(i) {
        oImgs[i].onmouseenter = function () {
          index = i;

          for (var j = 0; j < oNum; j++) {
            $(oImgs[j]).removeClass('cur');
          }

          $(this).addClass('cur');
        };
      };

      for (var i = 0; i < oNum; i++) {
        _loop2(i);
      }
    }
  });
  $.banner('#bannerBox');
  $.banner2('#sweetMoments'); //为所有商品图片添加移入事件
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
  }); //滚动事件 回到顶部出现

  var $goTop = $('.go-top');
  var $scroll = $('.go-top p');
  $goTop.hide();
  $(window).scroll(function () {
    if ($(window).scrollTop() > 10) {
      $goTop.show();
    } else {
      $goTop.hide();
    }

    $scroll.click(function () {
      // $("html,body").animate({scrollTop : 0},500);
      $('body').scrollTop(0);
      $('html').scrollTop(0);
    });
  });
});