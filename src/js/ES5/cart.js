"use strict";

$(function () {
  /* 获取localStorage中的信息放到页面中 */
  //获取localStorage
  var storage = window.localStorage;
  var storageStr = storage.carts ? storage.carts : '';
  var storageObj = convertStorageStrToStorageObj(storageStr);

  function convertStorageStrToStorageObj(str) {
    if (!str) {
      return {};
    }

    return JSON.parse(str);
  }
});