$(function(){
    getUserInfo()
let layer = layui.layer
    $('#logout').click(function(){
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token')
            location.href = '../../login.html'
            layer.close(index);
          });
    })
})

function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // 请求头还不能大写
        // headers:{Authorization:localStorage.getItem('token') ||''},
        success:function(res){
            if(res.status !==0){
                return layui.layer.msg('failed!')
            }
            console.log(res);
            renderAvatar(res.data)
        },
        // complete:function(res){
        //     // console.log(res.responseJSON);
        //     if(res.responseJSON.status === 1){
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }

    })
}
function renderAvatar(u){
    let name = u.nickname || u.username
    $('#welcome').html(`欢迎 ${name}`)
    if(u.user_pic){
        $('.layui-nav-img').attr('src',u.user_pic).show()
        $('.text-avatar').hide()
    }else{
        $('.layui-nav-img').hide()
        let first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}