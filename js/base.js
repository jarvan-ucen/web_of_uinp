/**
 * Created by wujiao on 2018/7/17.
 */
$(function(){

    //鼠标移入移出button按钮
    $(".sub-button").mouseover(function(){
        $(".sub-button").css('background','rgba(0,17, 188,0.67)');
    }).mouseout(function(){
        $(".sub-button").css('background','rgba(0,17, 188,1)');
    })

    /*---------------------Full Name----------------------------*/
    var fullName = document.getElementById("Fullname");
    fullName.onfocus = checkuserName;
    fullName.onblur = checkuserName;
    fullName.onkeyup = checkuserName;

    function checkuserName(e) {
        var _e = window.event || e;
        var v = fullName.value;
        var span = fullName.parentElement.nextElementSibling.firstElementChild;

        if(_e.type == 'focus') {
            if(v.length == 0) {
                span.innerHTML = 'Only letters、number and white space allowed of 3 to 20';
            }
        }
        else if(_e.type == 'blur') {
            if(v.length == 0) {
                span.innerHTML = 'You cannot leave this field empty';
            }
        }
        else {
            if(v.length == 0) {
                span.innerHTML = 'Please enter your full name';
            }
            else {
                var reg = /^[\da-zA-Z]+$/;
                if(reg.test(v)) {
                    if(v.length >= 3 && v.length <= 20) {
                        span.innerHTML="";
                        return true;
                    } else {
                        span.innerHTML = 'Only letters、number and white space allowed of 3 to 20';
                    }
                } else {
                    span.innerHTML = 'Only letters、number and white space allowed of 3 to 20';
                }
            }
        }
    }

    /*---------------------Email----------------------------*/
    var email = document.getElementById("Email");
    email.onfocus = checkEmail;
    email.onblur = checkEmail;
    email.onkeyup = checkEmail;

    function checkEmail(e) {
        var _e = window.event || e;
        var v = email.value;
        var span = email.parentElement.nextElementSibling.firstElementChild;

        if(_e.type == 'focus') {
            if(v.length == 0) {
                span.innerHTML = 'Please enter your email';
            }
        }
        else if(_e.type == 'blur') {
            if(v.length == 0) {
                span.innerHTML = 'You cannot leave this field empty';
            }else {
                var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(reg.test(v)) {
                    span.innerHTML="";
                    return true;
                } else {
                    span.innerHTML = 'Invalid email format';
                }
            }
        }
        else {
            if(v.length == 0) {
                span.innerHTML = 'Please enter your email';
            }
            else {
                var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(reg.test(v)) {
                    span.innerHTML="";
                    return true;
                } else {
                    span.innerHTML = 'Invalid email format';
                }
            }
        }
    }

    /*---------------------phoneNumber----------------------------*/
    var phone = document.getElementById("phone");
    phone.onfocus = checkPhone;
    phone.onblur = checkPhone;
    phone.onkeyup = checkPhone;

    function checkPhone(e) {
        var _e = window.event || e;
        var phoneNumber = phone.value;
        var countryCode=$(".active").attr("data-country-code");
        var span = phone.parentElement.parentElement.nextElementSibling.firstElementChild;

        if(_e.type == 'focus') {
            if(phoneNumber.length == 0) {
                span.innerHTML = 'Please enter your phone number';
            }
        }
        else if(_e.type == 'blur') {
            if(phoneNumber.length == 0) {
                span.innerHTML = '';
            }else {
                console.log(countryCode);
                checkPhoneLength(countryCode,phoneNumber,span);
            }
        }
        else{
            if(phoneNumber.length == 0) {
                span.innerHTML = '';
                return true;
            }else{
                //checkPhoneLength(prefix,phoneNumber,span).then(function (res) {
                //    if (res.code == 500) {
                //        span.innerHTML = 'Invalid phone number format';
                //        return false;
                //    }else{
                //        span.innerHTML="";
                //        return true;
                //    }
                //});
                checkPhoneLength(countryCode,phoneNumber,span);
                if(span.innerText==''){
                    return true;
                }
            }
        }
    }

    function checkPhoneLength(countryCode,phoneNumber,span){
        return $.ajax({
            type: "POST",
            async:false,
            cache:false,
            url:'http://47.75.128.177:8000/UinpIsPhone',
            data:{
                "iso":countryCode,
                "phone":phoneNumber
            },
            dataType: "json",
            success:function (res){
                if(res.code == 500){
                    span.innerHTML = 'Invalid phone number format';
                }else{
                    span.innerHTML="";
                }
            }
        })
    }

    /*---------------------subscribeBtn----------------------------*/
    //点击提交
    var isAllowPop=1;
    $(".sub-button").click(function(){
        if(isAllowPop==1){
            isAllowPop=0;
            if(checkuserName()&&checkEmail()&&checkPhone()){
                var fullName=$(".fullName").val();
                var email=$(".email").val();
                var phoneNumber=$(".phoneNumber").val();
                if(phoneNumber==''){
                    var countryCode='';
                }else{
                    var countryCode=$(".active").attr("data-country-code");
                }
                $.ajax({
                    type: "POST",
                    url:'http://47.75.128.177:8000/UinpGetInfo',
                    data:{
                        "name":fullName,
                        "email":email,
                        "iso":countryCode,
                        "phone":phoneNumber
                    },
                    dataType: "json",
                    success:function (res){
                        if(res.code == 500){
                            $(".form").hide();
                            $(".fail").toggle();
                            isAllowPop=1;
                        }else{
                            $(".form").hide();
                            $(".success").toggle();
                            isAllowPop=1;
                        }
                    },
                    error:function (error){
                        $(".form").hide();
                        $(".fail").toggle();
                        isAllowPop=1;
                    }
                });
            }else {
                isAllowPop=1;
            }
        }
    })

    //邮件发送失败点击REFRESH返回表单
    $(".refresh").on('click',function(){
        $(".form").toggle();
        $(".fail").hide();
    })


    //Describe描述
    //鼠标滑入滑出点击事件
    //$("#Compatibility").mouseover(function(){
    //    $("#des-Compatibility").toggle();
    //}).mouseout(function(){
    //    $("#des-Compatibility").hide();
    //}).on('click',function(){
    //    var des=$("#des-Compatibility").css('display');
    //    if(des=='none'){
    //        $("#des-Compatibility").toggle();
    //    }else{
    //        $("#des-Compatibility").hide();
    //    }
    //})
    //$("#Simple-connect").mouseover(function(){
    //    $("#des-Simple-connect").toggle();
    //}).mouseout(function(){
    //    $("#des-Simple-connect").hide();
    //}).on('click',function(){
    //    var des=$("#des-Simple-connect").css('display');
    //    if(des=='none'){
    //        $("#des-Simple-connect").toggle();
    //    }else{
    //        $("#des-Simple-connect").hide();
    //    }
    //})
    //$("#Speed-up").mouseover(function(){
    //    $("#des-Speed-up").toggle();
    //}).mouseout(function(){
    //    $("#des-Speed-up").hide();
    //}).on('click',function(){
    //    var des=$("#des-Speed-up").css('display');
    //    if(des=='none'){
    //        $("#des-Speed-up").toggle();
    //    }else{
    //        $("#des-Speed-up").hide();
    //    }
    //})
    //$("#Transferability").mouseover(function(){
    //    $("#des-Transferability").toggle();
    //}).mouseout(function(){
    //    $("#des-Transferability").hide();
    //}).on('click',function(){
    //    var des=$("#des-Transferability").css('display');
    //    if(des=='none'){
    //        $("#des-Transferability").toggle();
    //    }else{
    //        $("#des-Transferability").hide();
    //    }
    //})

})