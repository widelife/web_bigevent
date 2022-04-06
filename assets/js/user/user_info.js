$(function(){
    let form =layui.form
    let layer =layui.layer
    form.verify({
        nickname:function(value){
            if(value.length > 6){
                return '必须在1~6之间!'
            }
        }
    })
    initUserInfo()
    function initUserInfo(){
         $.ajax({
             method:'GET',
             url:'/my/userinfo',
             success:function(res){
                 if(res.status !==0){
                     return layer.msg('failed!')
                 }
                //  console.log(res);
                 form.val('userInfo',res.data)
             }

         })

    }
    $('#reset').on('click',function(e){
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('failed!')
                }
                layer.msg('success!')
                window.parent.getUserInfo()
            }
        })
    })







})