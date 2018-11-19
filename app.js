
App({
    data:{
        // api数据
        api:{
            lieqi: 'https://www.hao123.com/gaoxiao/screen/all/',
            manhua:'',
            shipin:'https://v.hao123.baidu.com/vapi/shortApi?pn=1&area=%E6%90%9E%E7%AC%91%E8%B6%A3%E5%91%B3',
        },
        color:"#fa7b5a",
        csrfToken:[],//漫画令牌
        commend:[], //全局段子数据
        manhua: [],  //全局漫画数据
        shipin:[],  //全局视频数据

        sectionId: [], //全局漫画sectionId
        search_Data:[],
        nav: [  //分类跳转链接
            { ico: '../../image/nav_1.png', url: '../indexPage/indexPage?nav=猎奇段子', text: '猎奇段子' },
            { ico: '../../image/nav_2.png', url: '../indexManhua/indexManhua?nav=暴走漫画', text: '暴走漫画' },
            { ico: '../../image/nav_3.png', url: '../indexShipin/indexShipin?nav=爆笑视频', text: '爆笑视频' },
            { ico: '../../image/nav_4.png', url: '../category/category?nav=分类', text: '分类' }
        ]
    },
    onLaunch: function () {

        // wx.request({
        //     url: 'https://api.douban.com/v2/movie/in_theaters', //仅为示例，并非真实的接口地址
        //     data: {},
        //     header: {
        //         'content-type': 'application/json' // 默认值
        //     },
        //     success: function (res) {
        //         console.log(res.data)
        //     },
        //     fail:function(){
        //         console.log('000')
        //     }
        // })
        
        

        path: "page/index/index"
    }
})
