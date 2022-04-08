$(function(){
    let layer = layui.layer
    let form = layui.form
    initArtCateList()
    function initArtCateList(){
        $.ajax({
            method:'GET',
            url:'/my/article/cates',
            success:function(res){
                // console.log(res);
                let htmlStr = template('tpl-table',res)
                $('#art_cate').html(htmlStr)
            }
        })
    }
    let indexAdd = null
    $('#addCate').on('click',function(){
        indexAdd = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '添加文章分类'
            ,content: $('#dialog-add').html()
          }); 
    })
    // 通过代理委托的方式位表单绑定提交事件
    $('body').on('submit','#form-add',function(e){
        e.preventDefault()
        // console.log(11);
        $.ajax({
            method:'POST',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('新增分类失败！')
                }
                layer.msg('新增分类成功！')
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })
    let indexEdit = null
    $('#art_cate').on('click','.btn-edit',function(){
        indexEdit = layer.open({
            type:1,
            area: ['500px', '250px'],
            title: '修改文章分类'
            ,content: $('#dialog-edit').html()
        }); 
        let id = $(this).attr('data-id')
          $.ajax({
              method:'GET',
              url:'/my/article/cates/' + id,
              success:function(res){
                  form.val('form-edit',res.data)
              }
          })
    })
    $('body').on('submit','#form-edit',function(e){
        e.preventDefault()
        $.ajax({
            method:'POST',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })
    $('body').on('click','.bnt-delete',function(){
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
            $.ajax({
                method:'GET',
                url:'/my/article/deletecate/' + id,
                success:function(res){
                    if(res.status !==0){
                        return layer.msg('删除分类失败！')
                    }
                    layer.msg('删除分类成功！')
                    initArtCateList()
                    layer.close(index);
                }
            })
            
            
          });

    })
})