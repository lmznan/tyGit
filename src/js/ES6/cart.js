$(function(){
    //
    //获取页面响应信息
    let $tab = $('#productTab tbody');
    let $noGood = $('.no-goods');
    let $goBack = $('.go-back');
    let $delivery = $('.delivery-tit');
    let $settle = $('.cart-settlement');
    $('.go-back input').click(function(){
        location.href = 'index.html';
    })
    /* 获取localStorage中的信息放到页面中 */
    //获取localStorage
    let storage = window.localStorage;
    let storageStr = storage.carts ? storage.carts : '';
    let storageObj = convertStorageStrToStorageObj(storageStr);
    let numSum = 0;
    let moneySum = 0;
    //循环遍历
    for(let key in storageObj){
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
        let good = JSON.parse(storageObj[key]);
        //取出每一类商品中不同规格的信息
        for(let keys in good){
            let subGood = good[keys];
            //创建tr放页面
            $tab.append(` <tr id="${subGood.gdsubname}${keys}" class="goods-show">
            <td>
                <input type="checkbox">
            </td>
            <td>
                <dl>
                    <dt>
                        <img src="${subGood.gdimg}" alt="">
                    </dt>
                    <dd>
                        <p>
                            <a href="#">${subGood.gdname}</a><br>
                            <span>${subGood.gdsubname}</span><br>
                            <span class="${keys}">规格：${subGood.gdspec}</span>
                        </p>
                    </dd>
                </dl>
            </td>
            <td>
                <b>
                    <i>￥</i>
                    ${subGood.gdprice}.00
                </b>
            </td>
            <td>
                <div class="goods-num">
                    <input type="button" value="-" class="num-minus">
                    <input type="text" value="${subGood.gdnum}" class="goods-number">
                    <input type="button" value="+" class="num-plus">
                </div>
            </td>
            <td class="price-sum">
                <b>
                    <i>￥</i>
                    <span>${subGood.gdprice * subGood.gdnum}.00</span>
                </b>
            </td>
            <td>
                <a href="javascript:;" class="goods-del">删除</a>
            </td>
        </tr> `);
        numSum += subGood.gdnum;
        moneySum += subGood.gdnum * subGood.gdprice;
        }
    }
    //判断购物车中有没有商品
    if($('.goods-show').length == 0){
        $noGood.css('display','block');
        $goBack.css('display','block');
        $settle.css('display','none');
        $delivery.css('display','none');
    }else{
        $noGood.css('display','none');
        $goBack.css('display','none');
        $settle.css('display','block');
        $delivery.css('display','table-row');
    }
    //总计
    let $numSum = $('.cart-settlement p span');
    let $moneySum = $('.cart-settlement p em');
    $numSum.html(numSum);
    $moneySum.html(moneySum.toFixed(2));
    //减号
    let $minus = $('.goods-num .num-minus');
    $minus.each(function(){
        $(this).click(function(){
            //获取商品名
            let $name = $(this).parent().parent().prev().prev().children().children('dd').children().children(':eq(0)').html();
            //获取商品规格
            let $spId = $(this).parent().parent().prev().prev().children().children('dd').children().children(':eq(4)').attr('class');
            //获取localStorage
            let storage = window.localStorage;
            let storageStr = storage.carts ? storage.carts : '';
            let storageObj = convertStorageStrToStorageObj(storageStr);
            let subObj = JSON.parse(storageObj[$name]);
            if(subObj[$spId].gdnum > 1){
                subObj[$spId].gdnum --;
            }
            //重新存入localStorage
            storageObj[$name] = JSON.stringify(subObj);
            storage.carts = JSON.stringify(storageObj);
            //改变页面中的数量和小计
            $(this).next().val(JSON.parse(storageObj[$name])[$spId].gdnum);
            $(this).parent().parent().next().children().children(':eq(1)').html(JSON.parse(storageObj[$name])[$spId].gdprice * JSON.parse(storageObj[$name])[$spId].gdnum + '.00');
            //改变总数量和总价格
            let number = 0;
            let priceSum = 0;
            $('.goods-num .goods-number').each(function(){
                number += parseInt($(this).val());
            })
            $('.price-sum b span').each(function(){
                priceSum += parseInt($(this).html());
            })
            $numSum.html(number);
            $moneySum.html(priceSum.toFixed(2));
        })
    })
    //加号
    let $plusSign = $('.goods-num .num-plus');
    $plusSign.each(function(){
        $(this).click(function(){
            //获取商品名
            let $name = $(this).parent().parent().prev().prev().children().children('dd').children().children(':eq(0)').html();
            //获取商品规格
            let $spId = $(this).parent().parent().prev().prev().children().children('dd').children().children(':eq(4)').attr('class');
            //获取localStorage
            let storage = window.localStorage;
            let storageStr = storage.carts ? storage.carts : '';
            let storageObj = convertStorageStrToStorageObj(storageStr);
            let subObj = JSON.parse(storageObj[$name]);
            if(subObj[$spId].gdnum < 50){
                subObj[$spId].gdnum ++;
            }
            //重新存入localStorage
            storageObj[$name] = JSON.stringify(subObj);
            storage.carts = JSON.stringify(storageObj);
            //改变页面中的数量和小计
            $(this).prev().val(JSON.parse(storageObj[$name])[$spId].gdnum);
            $(this).parent().parent().next().children().children(':eq(1)').html(JSON.parse(storageObj[$name])[$spId].gdprice * JSON.parse(storageObj[$name])[$spId].gdnum + '.00');
            //改变总数量和总价格
            let number = 0;
            let priceSum = 0;
            $('.goods-num .goods-number').each(function(){
                number += parseInt($(this).val());
            })
            $('.price-sum b span').each(function(){
                priceSum += parseInt($(this).html());
            })
            $numSum.html(number);
            $moneySum.html(priceSum.toFixed(2));
        })
    })
    //删除
    let $del = $('.goods-del');
    $del.each(function(){
        $(this).click(function(){
            //获取商品名
            let $name = $(this).parent().prev().prev().prev().prev().children().children('dd').children().children(':eq(0)').html();
            //获取商品规格
            let $spId = $(this).parent().prev().prev().prev().prev().children().children('dd').children().children(':eq(4)').attr('class');
            //获取localStorage
            let storage = window.localStorage;
            let storageStr = storage.carts ? storage.carts : '';
            let storageObj = convertStorageStrToStorageObj(storageStr);
            //删除对象中的指定属性
            let subObj = JSON.parse(storageObj[$name]);
            delete subObj[$spId];
            storageObj[$name] = JSON.stringify(subObj);
            storage.carts = JSON.stringify(storageObj);
            $(this).parent().parent().remove();
            //改变总数量和总价格
            let number = 0;
            let priceSum = 0;
            $('.goods-num .goods-number').each(function(){
                number += parseInt($(this).val());
            })
            $('.price-sum b span').each(function(){
                priceSum += parseInt($(this).html());
            })
            $numSum.html(number);
            $moneySum.html(priceSum.toFixed(2));
            //全部删掉后页面样式改变
            if($('.goods-show').length == 0){
                $noGood.css('display','block');
                $goBack.css('display','block');
                $settle.css('display','none');
                $delivery.css('display','none');
            }else{
                $noGood.css('display','none');
                $goBack.css('display','none');
                $settle.css('display','block');
                $delivery.css('display','table-row');
            }
        })
    })
    //继续购物
    $('.continue-buy').click(function(){
        window.location = "index.html";
    })

    function convertStorageStrToStorageObj(str){
        if(!str){
            return {};
        }
        return JSON.parse(str);
    }
})