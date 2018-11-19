// page/indexManhuaSearch/indexManhuaSearch.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      dataC:{},
      manhua:[],
      value: '',
  },
    // 搜索提交
    search: function () {
        wx.redirectTo({
            url: '../indexManhuaSearch/indexManhuaSearch?key=' + this.data.value,
        })



    },

    input: function (e) {
        this.setData({
            value: e.detail.value
        })
    },

    onclickCon: function (e) {

        var index = e.currentTarget.dataset.index;
        var bookid = e.currentTarget.dataset.bookid;

        wx.navigateTo({
            url: "../contentManhua/contentManhua?index=" + index + "&bookid=" + bookid
        })
        

    },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      wx.setNavigationBarTitle({
          title: '搜索关键词：“'+ options.key+'”'
      })
      
      var _this = this;
      wx.showLoading({
          title: '搜索中...',
      })

      wx.request({
          url: "https://h5.manhua.163.com/search/book/key/data.json?key=" + options.key,
          method: 'GET',
          dataType: 'json',
          success: function (data) {
              var con = data.data.records;
              

              _this.setData({
                  manhua: con,
                  dataC:data
              })
              app.data.manhua = con
              console.log(app.data.manhua)
              wx.hideLoading()

          },
          fail: function () {
              _this.setData({
                  manhua: [{ title: '获取数据失败！', cover: '../../image/re_img1.png' }]
              })
          },


      })
  
  },




    goTop: function () {
        if (wx.pageScrollTo) {
            wx.pageScrollTo({
                scrollTop: 0,
            })
        } else {
            wx.showModal({
                title: '提示',
                content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。',
                showCancel: false
            })
        }
    },

    //监听滚动条
    onPageScroll: function (e) {
        if (e.scrollTop > 300) {
            this.setData({
                floorstatus: true,
                search_fixed: 'search_fixed'
            })
        } else {
            this.setData({
                floorstatus: false,
                search_fixed: ''
            })
        }

    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})