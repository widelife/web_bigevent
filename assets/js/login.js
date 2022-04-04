$(function(){
$('#link_reg').on('click',function(){
    $('.login-box').hide()
    $('.reg-box').show()
})
$('#link_login').on('click',function(){
    $('.reg-box').hide()
    $('.login-box').show()
})
// 从layui获取form对象
let form = layui.form
let layer = layui.layer
// 自定义校验规则
form.verify({
    pwd:[/^[\S]{6,12}$/,'密码6-12位且不能出现空格!'],
    repwd:function(value){
        let pwd = $('.reg-box [name=password]').val()
        if(pwd !== value){
            return '两次密码不一致!'
        }
    }
})
// 监听注册表单提交事件
$('#form_reg').on('submit',function(e){
    let iptMessage = {
        username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val()
    }
    e.preventDefault()
    $.post('http://www.liulongbin.top:3007/api/reguser',iptMessage,function(res){
        console.log(res);
        if(res.status !==0) {
            return layer.msg(res.message)
        }
        layer.msg('success!')
        $('#link_login').click()
    })    
})
// 登录表单
$('#form_login').submit(function(e){
    
    e.preventDefault()
    $.ajax({
        url:'/api/login',
        method:'POST',
        data:$(this).serialize(),
        success:function(res){
            if(res.status !== 0){
                return layer.msg('failed!')
            }
            layer.msg('success!')
            localStorage.setItem('token',res.token)
            location.href = '../../index.html'
        }
    })
})
})