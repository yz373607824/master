const app=getApp();
const random = require('../random.js');   //随机数

Page({
  data: {
      floorstatus: false,
      random:0,  //随机数

    options1:'',  
    num:1,
    dataDistinct:true,
    commend:[],
    active:0
  },
    tabList0: function () {
        this.setData({
            num:1,
            commend:[],
            active:0
        })
        this.reque_duanzi('https://www.hao123.com/gaoxiao/screen/all/',this.data.num);
        

        
    },
    tabList1: function () {
        var ran = random.random(1, 50);
        this.setData({
            commend: [],
            active: 1,
            random: ran ,    //随机区间1~200
            num: ran,
        })

        this.reque_duanzi('https://www.hao123.com/gaoxiao/screen/all/', this.data.random);
    },


    onclickCon:function(e){

        var index = e.currentTarget.dataset.index;

        wx.navigateTo({
            url: "../contentPage/contentPage?index=" + index
        })
        
    },


    // 调取段子列表
    reque_duanzi: function (url,num, fun) {

        if( !this.data.dataDistinct ){
            return
        }

        var _this = this;
        wx.showLoading({
            title: '加载中...',
        })
       
        wx.request({
            url: url + num,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                var con = _this.data.commend.concat(data.data)
                
                _this.setData({
                    commend: con,
                    
                })
                app.data.commend=con
                // console.log(con)
                fun && fun();//回调
                wx.hideLoading()

            },
            fail: function () {
                _this.setData({
                    commend: [{ title: '获取数据失败！', picurl: { gif: '../../image/re_img1.png' }, mode: true }]
                })
            },


        })

    },

    //调取视频列表
    // reque_shipin: function (num, fun) {

    //     if (!this.data.dataDistinct) {
    //         return
    //     }

    //     var _this = this;
    //     wx.showLoading({
    //         title: '加载中...',
    //     })

    //     wx.request({
    //         url:"http://v.hao123.baidu.com/vapi/shortApi?pn="+num+"&pn_size=8&area=%E6%90%9E%E7%AC%91%E8%B6%A3%E5%91%B3",
    //         method: 'GET',
    //         dataType: 'json',
    //         success: function (data) {
    //             var con = _this.data.shipin.concat(data.data.data.data)

    //             _this.setData({
    //                 shipin: con
    //             })

    //             fun && fun();//回调
    //             wx.hideLoading()

    //         },
    //         fail: function () {
    //             _this.setData({
    //                 commend: [{ title: '获取数据失败！', picurl: { gif: '../../image/re_img1.png' }, mode: true }]
    //             })
    //         },


    //     })

    // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;

    wx.setNavigationBarTitle({
        title: options.nav
    })
    this.setData({
        options1: options.nav
    })
    // 判断路径跳转
      switch (options.nav){
          case app.data.nav[0].text:
              _this.reque_duanzi('https://www.hao123.com/gaoxiao/screen/all/', this.data.num);             
          break;

      }




  },
    goTop: function () {
        if (wx.pageScrollTo ){
            wx.pageScrollTo({
                scrollTop: 0,
            })
        }else{
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
                showCancel:false
            })
        }
    },

    //监听滚动条
    onPageScroll:function(e){
        if( e.scrollTop>300 ){
            this.setData({
                floorstatus:true
            })
        }else{
            this.setData({
                floorstatus: false
            })
        }

    },






  /**
   * 生命周期函数--监听页面初次渲染完成
   */
    onReady: function (parame) {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

      this.data.num++;    
      this.reque_duanzi('https://www.hao123.com/gaoxiao/screen/all/', this.data.num)


      
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})