// page/contentManhua/contentManhua.js
const app=getApp()
Page({
  data: {

      active:0,
      index:0,
      bookid:'',
      manhua:[],
      sectionId:[],
      book_button:-1,
      loadMore: false,
      loadMoreText: [ '戳我查看更多目录','点我收起目录'],
  
  },


    tabList0:function(){

        if (this.data.active == 1){  

            this.setData({
                active:0
            })
        }
    },
    tabList1: function () {

        if (this.data.active == 0) {

            this.setData({
                active: 1
            })
        }
    },

  

  /**
   * 生命周期函数--监听页面加载
   */
    onLoad: function (options) {
        var _this = this;
        wx.setNavigationBarTitle({
            title: app.data.manhua[options.index].title
        })

        this.setData({
            index: options.index,
            bookid: options.bookid
        })

        var con = app.data.manhua[options.index];

        this.setData({
            manhua: con
        })

        this.titleOrder()
        // console.log(app.data.manhua)
        

        
  },
    loadMore:function(){
        if(this.data.loadMore) {
            this.setData({
                loadMore: false,
            })
        }else {
            this.setData({
                loadMore: true
            })
        }

    },

    titleOrder: function (){
    var _this = this;
      wx.showLoading({
          title: '加载数据中...',
      })

      wx.request({
          url: 'https://h5.manhua.163.com/book/catalog/' + _this.data.bookid + '.json',
          method: 'GET',
          dataType: 'json',
          success: function (req) {
              var con = req.data.catalog.sections[0].sections
              _this.setData({
                  sectionId: con
              })
             
              app.data.sectionId = con;
              wx.hideLoading()  
              // console.log(_this.data.bookid)
          },
          fail: function () {
              _this.setData({
                  sectionId: [{titleOrder:'获取目录数据出错了！'}]
              })
          }
      })
  },
    onUrl_one:function(){
        this.setData({
            book_button: 0
        })

        wx.navigateTo({
            url: '../contentDetails/contentDetails?bookid=' + this.data.bookid + '&sectionId=' + app.data.sectionId[0] + '&index=' + this.data.index + '&an=0',
        })
    },

    onUrl:function(e){

        var sectionId = e.currentTarget.dataset.sectionid;
        var an = e.currentTarget.dataset.an;

        this.setData({
            book_button: an
        })
  

        wx.navigateTo({
            url: '../contentDetails/contentDetails?bookid=' + this.data.bookid + '&sectionId=' + sectionId+ '&index=' + this.data.index+'&an='+an,
        })
    
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