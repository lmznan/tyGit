$(function(){
    /* 获取页面元素 */
    //手机
    let $tel = $('.reg-tel input');
    //验证码生成
    let $getCode = $('.ven-code');
    //验证码输入
    let $code = $('.reg-code input');
    //短信验证码 输入
    let $msg = $('.txt-msg');
    //短信验证码获取按钮
    let $getmsg = $('.get-msg');
    //密码
    let $pwd = $('.reg-pwd dd input');
    //确认密码
    let $subPwd = $('.reg-subPwd dd input');
    //提交按钮
    let $form = $('form');
    /* 获取错误提示框 */
    let $ts1 = $('.reg-tel dd span');
    let $ts2 = $('.msg-ts');
    let $ts3 = $('.reg-pwd dd span');
    let $ts4 = $('.reg-subPwd dd span');
    /* 设置正则表达式 */
    //tel正则
    let re1 = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
    //密码
    let re2 = /^\w{6,12}$/
    /* 封装随机验证码插件、cookieStr转cookieObj插件 */
    $.extend({
        random : function(){
            var str = '0123456789';
			var verificationCode = '';
			for(var i = 1;i < 5;i ++){
				verificationCode += str.charAt(Math.floor(Math.random() * str.length))
			}
			return verificationCode;
        },
        convertCookieStrToCookieObj : function(str){
            if(!str){
                return {};
            }
            return JSON.parse(str);
        }
    })
    $getCode.html($.random());
    $getCode.click(function(){
        $(this).html($.random());
    })
    /* 正则验证表单 */
    //表单提交时验证
    $form.submit(function(){
        let arr = [false,false,false,false,false];
        //验证手机号
        if($tel.val() === ''){
            $ts1.html('请填写手机号');
            arr[0] = false;
        }else{
             if(re1.test($tel.val())){
                $ts1.html('');
                arr[0] = true;
                //验证短信验证码是否为空
                if($msg.val() === ''){
                    $msg.focus();
                    $ts2.html('请输入手机验证码');
                    arr[1] = false;
                }else{
                    //判断密码
                    if($pwd.val() === ''){
                        $pwd.focus();
                        $ts3.html('请输入密码！');
                        arr[2] = false;
                    }else{
                        if(re2.test($pwd.val())){
                            $ts3.html('');
                            arr[2] = true;
                            //确认密码
                            if($subPwd.val() === ''){
                                $subPwd.focus();
                                $ts4.html('请再次输入密码！');
                                arr[3] = false;
                            }else{
                                if($subPwd.val() !== $pwd.val()){
                                    $ts4.html('两次输入的密码不匹配！');
                                    arr[3] = false;
                                }else{
                                    $ts4.html('');
                                    arr[3] = true;
                                    //判断是否获取过验证码
                                    if($ts2.html() === ''){
                                        $('body').append('<div class="mask"><div class="mask-con clear_fix"><span></span><p>请点击获取验证码！</p><input type="button" name="" id="" value="确定"></div></div>');
                                        $('.mask-con span').click(function(){
                                            $('.mask').remove();
                                        })
                                        $('.mask-con input').click(function(){
                                            $('.mask').remove();
                                        })
                                    }else{
                                        //判断短信验证码是否等于接收到的
                                        if($msg.val() !== $ts2.html() || $msg === ''){
                                            arr[1] = false;
                                            $('body').append('<div class="mask"><div class="mask-con clear_fix"><span></span><p>验证码输入错误！</p><input type="button" name="" id="" value="确定"></div></div>');
                                            $('.mask-con span').click(function(){
                                                $('.mask').remove();
                                            })
                                            $('.mask-con input').click(function(){
                                                $('.mask').remove();
                                            })
                                        }else{
                                            arr[4] = true;
                                            arr[1] = true;
                                            //判断手机号是否已被注册
                                            let $cookieStr = $.cookie('registors') ? $.cookie('registors') : '';
                                            let $cookieObj = $.convertCookieStrToCookieObj($cookieStr);
                                            if($tel.val() in $cookieObj){
                                                //存在，该手机号已被注册！
                                                arr[0] = flase;
                                                $('body').append('<div class="mask"><div class="mask-con clear_fix"><span></span><p>该手机号已被注册！</p><input type="button" name="" id="" value="确定"></div></div>');
                                                $('.mask-con span').click(function(){
                                                    $('.mask').remove();
                                                })
                                                $('.mask-con input').click(function(){
                                                    $('.mask').remove();
                                                })
                                            }else{
                                                $cookieObj[$tel.val()] = $pwd.val();
                                                $.cookie('registors',JSON.stringify($cookieObj),{expires : 7});
                                                alert('注册成功');
                                                arr[0] = true;
                                            }
                                        }
                                    }   
                                }
                            }
                        }else{
                            $ts3.html('密码长度在6-12位之间');
                            arr[2] = false;
                        }
                    }  
                }
            }else{
                $ts1.html('请输入正确的手机号码！');
                arr[0] = false;
            }
        }
        if(arr.indexOf(false) != -1){
            return false;
        }
        return true;
    })
    //点击获取验证码
    $getmsg.click(function(){
         //验证手机号
         if($tel.val() === ''){
            $ts1.html('请填写手机号');
        }else{
            if(!re1.test($tel.val())){
                $ts1.html('请输入正确的手机号码！');
            }else{
                $ts1.html('');
                //判断验证码
                if($code.val() === ''){
                    $('body').append('<div class="mask"><div class="mask-con clear_fix"><span></span><p>请先填写验证码！</p><input type="button" name="" id="" value="确定"></div></div>');
                    $('.mask-con span').click(function(){
                        $('.mask').remove();
                    })
                    $('.mask-con input').click(function(){
                        $('.mask').remove();
                    })
                }else{
                    if($code.val() !== $getCode.html()){
                        $('body').append('<div class="mask"><div class="mask-con clear_fix"><span></span><p>输入的验证码不正确，请重新输入！</p><input type="button" name="" id="" value="确定"></div></div>');
                        $('.mask-con span').click(function(){
                            $('.mask').remove();
                        })
                        $('.mask-con input').click(function(){
                            $('.mask').remove();
                        })
                    }else{
                        //判断存储中是否已存在该手机号
                        let $cookieStr = $.cookie('registors') ? $.cookie('registors') : '';
                        let $cookieObj = $.convertCookieStrToCookieObj($cookieStr);
                        if($tel.val() in $cookieObj){
                            //存在，该手机号已被注册！
                            $('body').append('<div class="mask"><div class="mask-con clear_fix"><span></span><p>该手机号已被注册！</p><input type="button" name="" id="" value="确定"></div></div>');
                            $('.mask-con span').click(function(){
                                $('.mask').remove();
                            })
                            $('.mask-con input').click(function(){
                                $('.mask').remove();
                            })
                            return;
                        }else{
                            //不存在，短信验证码已发送至您的手机，请输入验证码！$getmsg不能点击，20秒后可以点击
                            $('body').append('<div class="mask"><div class="mask-con clear_fix"><span></span><p>短信验证码已发送至您的手机，请输入验证码！</p><input type="button" name="" id="" value="确定"></div></div>');
                            $('.mask-con span').click(function(){
                                $('.mask').remove();
                            })
                            $('.mask-con input').click(function(){
                                $('.mask').remove();
                            })
                            $ts2.html($.random());
                            $getmsg.css('background','#dddfde');
                            let second = 20;
                            $getmsg.attr("disabled",true);
                            let time = setInterval(()=>{
                                $getmsg.val(`${-- second}秒后可重新获取`);
                            },1000);
                            setTimeout(()=>{
                                $getmsg.css('background','#fae0bb');
                                $getmsg.val('点击获取验证码');
                                clearInterval(time);
                                $getmsg.attr("disabled",false);
                            },10000)
                        }
                    }
                }
            }
        }
    })
})