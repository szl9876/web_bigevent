$(function () {
    //调用getInfo 获取用户的基本信息
    getuserInfo()
    var layer = layui.layer
    // 点击按钮实现退出功能
    $('#btnLogout').on('click', function () {
        // console.log('ok');
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // console.log('ok');

            //1.清除本地存储的token
            localStorage.removeItem('token')

            //2.重新跳转到登录页面
            location.href = '/login.html'
            layer.close(index);
        });
    })
})


// 获取用户的基本信息
function getuserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            //调用renderAvatar 渲染用户的头像
            renderAvator(res.data)

        },

        // 不论成功还是失败，最终都会调用 complete 回调函数
        // complete: function (res) {
        //     console.log(res);
        //     // 在complete回调函数中 可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //1.清除本地存储的token
        //         localStorage.removeItem('token')

        //         //2.重新跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}

//渲染用户头像的函数
function renderAvator(user) {
    //1.获取用户的名称
    var name = user.nickname || user.username
    //2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //3.按需渲染图片的头像
    if (user.user_pic !== null) {
        //3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 3.2渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}