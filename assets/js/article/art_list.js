$(function(){
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage
    // 定义一个美化时间的过滤器
    function padZero(n) {
        if (n < 10) {
          return '0' + n
        } else {
          return n
        }
      }
    template.defaults.imports.dateFormat = function (dtStr) {
        var dt = new Date(dtStr)
    
        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())
    
        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())
    
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
      }
    let m = {
        pagenum:1,
        pagesize:2,
        cate_id:'',
        state:''
    }
    initTable()
    initCate()
    // 初始化文章列表
    function initTable(){
        $.ajax({
            method:'get',
            url:'/my/article/list',
            data:m,
            success:function(res){
                if(res.status !==0 ){
                    return layer.msg('获取文章列表失败！')
                }
                layer.msg('获取文章列表成功！')
                console.log(res);
                let htmlStr = template('table',res)
                $('tbody').html(htmlStr)
                renderPage(res.total)

            }
        })
    }
    // 初始化文章分类
    function initCate(){
        $.ajax({
            method:'get',
            url:'/my/article/cates',
           
            success:function(res){
                if(res.status !==0 ){
                    return layer.msg('获取分类数据失败！')
                }
                // layer.msg('获取分类数据成功！')
                // console.log(res);
                let htmlStr = template('cate',res)
                $('[name=cate_id]').html(htmlStr)
                // console.log(htmlStr);
                form.render()
            }
        })
    }
    // 筛选表单
    $('#form-checkout').on('submit',function(e){
        e.preventDefault()
        let cate_id = $('[name=cate_id]').val()
        let state = $('[name=state]').val()
        m.cate_id = cate_id
        m.state = state
        initTable()
    })
    // 渲染分页
    function renderPage(t){
        // console.log(t);
        laypage.render({
            elem:'pageBox',
            count:t,
            limit:m.pagesize,
            curr:m.pagenum,
            limits:[2, 3, 5,10],
            layout:['count','limit','prev', 'page', 'next','skip'],
            jump: function(obj, first){
                //obj包含了当前分页的所有参数，比如：
                // console.log('------------------');
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数
                // console.log(first);

                m.pagenum = obj.curr
                m.pagesize = obj.limit
                if(!first){
                    initTable()
                }
                
            }
        })
    }
    // 通过委托的方式为删除绑定点击事件
    $('tbody').on('click','.btn-delete',function(){
        let len = $('.btn-delete').length
        // console.log(len);
        let id=$(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'get',
                url:'/my/article/delete/' + id,
                success:function(res){
                    if(res.status !==0){
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    if(len === 1){
                        // if(m.pagenum === 1) return m.pagenum
                        // m.pagenum = m.pagenum - 1
                        m.pagenum === 1 ? m.pagenum : m.pagenum = m.pagenum - 1
                    }
                    initTable()
                }
            })
            
            layer.close(index);
          });
    })
})