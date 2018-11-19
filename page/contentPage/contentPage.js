// page/contentPage/contentPage.js
const app=getApp();

Page({

  data: {
      full:true,
      index:0,
      commend:[]
  },
    con_prev:function(){
        --this.data.index;
        if (this.data.index < 0 ) {
            this.setData({
                index: app.data.commend.length-1
            })
        }
        
        wx.setNavigationBarTitle({
            title: app.data.commend[this.data.index].title
        })
        this.setData({
            commend: app.data.commend[this.data.index]
        })

    },
    full:function(){
        if (this.data.full){
            this.setData({
                full:false
            })
        }else{
            this.setData({
                full: true
            })
        }
    },

    con_next: function (options){
        ++this.data.index;
        if ( this.data.index > app.data.commend.length-1 ){
            this.setData({
                index:0
            })
        }
        
        wx.setNavigationBarTitle({
            title: app.data.commend[this.data.index].title
        })
        this.setData({
            commend: app.data.commend[this.data.index]
        })

    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var _this=this;
      wx.setNavigationBarTitle({
          title: app.data.commend[options.index].title
      })

      this.setData({
          index: options.index
      })

      var con = app.data.commend[options.index];
      
        this.setData({
            commend:con
        })
    //   console.log(this.data.commend)

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