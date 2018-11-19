const app = getApp();
const random = require('../random.js');   //引入module
Page({
  data: {
      commend:[],//段子数据
      shipin:[], //视频数据
      manhua:[],//漫画数据
      num:6, //首页显示6条数据
      nav:[],

      random:0,

      index:0,  //传递参数
    //轮播开始
      imgs: [
      '../../image/0.jpg',
      '../../image/0.jpg',
      '../../image/0.jpg'
    ],
    // indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    indicatorActiveColor:app.data.color,
    circular:true,
      currentSwiper:0
    
  },
    swiperChange: function (e) {
        this.setData({
            currentSwiper: e.detail.current
        })

    },
    //轮播结束

    //请求首页段子数据
    requse:function(url,num,fun){
        var _this = this;
        wx.request({
            url: url+num,
            method: 'GET',
            dataType: 'json',
            header: {
                'Content-Type': 'json' // 使用这个能正常获取数据
            },
            success: function (data) {
                var con = _this.data.commend.concat(data.data)
                fun && fun(data)
                app.data.commend = con
                // console.log(con)
            },
            fail: function () {
                _this.setData({
                    commend: [{ title: '获取数据失败！', picurl: { gif: '../../image/re_img1.png' }, mode: true }]
                })
            },


        })
    },

    //请求首页漫画数据
    reque_manhua: function (fun) {

        var _this = this;


        wx.request({
            url: "https://manhua.163.com/category/getData.json?csrfToken=f923bcf4f0e8ee388acbc5726e71aaa8&sort=2&sf=1&pageSize=6&page=1",
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                var con = _this.data.manhua.concat(data.data.books)

                _this.setData({
                    manhua: con,
                })
                app.data.manhua = con
                // console.log(app.data.manhua)
                fun && fun();//回调
                

            },
            fail: function () {
                _this.setData({
                    manhua: [{ title: '获取数据失败！', cover: '../../image/re_img1.png' }]
                })
            },


        })

    },

    //请求首页视频列表
    reque_shipin: function (fun) {


        var _this = this;
        wx.showLoading({
            title: '加载中...',
        })

        wx.request({
            url: app.data.api.shipin,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                var con = _this.data.shipin.concat(data.data.data.data)
                // console.log(con.slice(0, 6))
                if (con==''){
                    _this.reque_shipin();
                }else{

                _this.setData({
                    shipin: con.slice(0,6),
                })
                app.data.shipin = con
                fun && fun();//回调
                wx.hideLoading()
                }

            },
            fail: function () {
                console.log('0')
                _this.setData({
                    shipin: [{ title: '获取数据失败！', hao_vimg: { gif: '../../image/re_img1.png' }}]
                })
            },


        })

    },

    //首页跳猎奇内页
    onclickCon: function (e) {

        var index = e.currentTarget.dataset.index;

        wx.navigateTo({
            url: "../contentPage/contentPage?index=" + index
        })


    },
    //首页跳漫画内页
    onManhuaCon: function (e) {

        var index = e.currentTarget.dataset.index;
        var bookid = e.currentTarget.dataset.bookid;

        wx.navigateTo({
            url: "../contentManhua/contentManhua?index=" + index + "&bookid=" + bookid
        })


    },


    //首页跳视频内页
    onShipinCon: function (e) {

        var index = e.currentTarget.dataset.index;

        wx.navigateTo({
            url: "../contentShipin/contentShipin?index=" + index
        })


    },

  onLoad: function (parame) {
      this.setData({
          nav:app.data.nav,
          random: random.random(1,10)  //随机区间1~30
      })
      var _this=this;

    //调用首页猎奇
      this.requse(app.data.api.lieqi,this.data.random, function (data){
          _this.setData({
              commend: data.data.slice(0, _this.data.num)
            })
      });
      
    //调用首页漫画
      this.reque_manhua()

    //调用首页视频
      
      this.reque_shipin();

      
  },

  bindGetUserInfo: function (e) {
    console.log(e.detail.userInfo)
  },
  
})
