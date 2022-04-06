$(function(){
    let form = layui.form
    form.verify({
        pwd:[ /^[\S]{6,12}$/,'密码格式不正确必须6-12位'],
        samePwd:function(v){
            if(v === $('[name=oldPwd]').val()){
                return '新旧密码不能相同！'
            }
        },
        rePwd:function(v){
            if(v !== $('[name=newPwd]').val()){
                return '两次输入必须相同！'
            }
        }
    })
    $('.layui-form').submit(function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
if(res.status !==0){
    return layui.layer.msg('更新密码失败！')
}layui.layer.msg('更新密码成功！')
$('.layui-form')[0].reset()

            }
        })
    })
})