// 注意：每次调用$.get()  或$.post() 或$.ajax()的时候会先
//调用ajaxPrefilter  这个函数
//在这个函数中。可以拿到我们给的Ajax提供的配置对象


$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    console.log(options.url);
    
})