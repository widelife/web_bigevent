$.ajaxPrefilter(function(o){
    o.url = 'http://www.liulongbin.top:3007' + o.url
    // console.log(o.url);
    // console.log(o);
    if(o.url.indexOf('/my/') !==-1){
        o.headers ={
            Authorization:localStorage.getItem('token') ||''
        }
    }
    o.complete = function(res){
        // console.log(res.responseJSON);
        if(res.responseJSON.status === 1){
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }


})