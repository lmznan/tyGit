$(function(){
    /* 获取localStorage中的信息放到页面中 */
    //获取localStorage
    let storage = window.localStorage;
    let storageStr = storage.carts ? storage.carts : '';
    let storageObj = convertStorageStrToStorageObj(storageStr);






    function convertStorageStrToStorageObj(str){
        if(!str){
            return {};
        }
        return JSON.parse(str);
    }
})