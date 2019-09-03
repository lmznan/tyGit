$(function(){
    /* 获取页面元素 */
    //手机
    let $tel = $('.del-eml dd input');
    //密码
    let $pwd = $('.log-pwd dd input');
    //验证码
    let $logCode = $('.log-code dd input');
    //验证码生成框
    let $getCode = $('.ven-code');
    //登录按钮
    let $logBtn = $('.login-sub input');
    /* 获取错误提示框 */
    let $ts1 = $('.del-eml dd span');
    let $ts2 = $('.log-pwd dd span');
    let $ts3 = $('.code-ts');
    let $ts4 = $('.error-ts span');
    /* 正则 */
    let re = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
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
    /* 验证账号密码 */
    $logBtn.click(function(){
        //判断手机号是否为空
        if($tel.val() === ''){
            $ts1.html('邮箱手机不能为空！');
        }else{
            $ts1.html('');
            //判断手机是否符合格式
            if(!re.test($tel.val())){
                $ts1.html('请输入正确的邮箱手机！');
            }else{
                //判断密码是否为空
                if($pwd.val() === ''){
                    $ts2.html('密码不能为空！');
                }else{
                    $ts2.html('');
                    //判断验证码是否为空
                    if($logCode.val() === ''){
                        $ts3.html('验证码不能为空！');
                    }else{
                        $ts3.html('');
                        //判断验证码是否正确
                        if($logCode.val() !== $getCode.html()){
                            $pwd.val('');
                            $ts4.html('验证码输入错误');
                            $getCode.html($.random());
                            $ts2.html('');
                        }else{
                            if($pwd.val() === ''){
                                $ts2.html('密码不能为空！');
                            }else{
                                //查找cookie中是否存在用户名
                                let $cookieStr = $.cookie('registors') ? $.cookie('registors') : '';
                                let $cookieObj = $.convertCookieStrToCookieObj($cookieStr);
                                console.log($cookieObj);
                                if($tel.val() in $cookieObj){
                                    if($cookieObj[$tel.val()] === $pwd.val()){
                                        alert('登录成功！');
                                        location.href = 'index.html';
                                    }else{
                                        $ts4.html('您输入的注册邮箱/手机与密码不匹配，请重新输入！');
                                        $pwd.val('');
                                        $getCode.html($.random());
                                        $ts2.html('');
                                    }
                                }else{
                                    $ts4.html('您输入的注册邮箱/手机与密码不匹配，请重新输入！');
                                    $pwd.val('');
                                    $getCode.html($.random());
                                    $ts2.html('');
                                }
                            }
                        }  
                    }
                }
            }
        }
        return false;
    })
    $(document).click(function(){
        if($ts4.html() !== ''){
            $ts4.html('');
        }
    })
})