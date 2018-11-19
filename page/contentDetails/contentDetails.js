// page/contentDetails/contentDetails.js
const app = getApp()
Page({


  data: {
      fiexd_text:false,
      bookid:'',
      num:0,
      images:[],
      style:[],
      Statistical_height:[0],
      End:false,


    animationData:{}, //动画
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.setNavigationBarTitle({
          title: app.data.manhua[options.index].title
      })
      this.setData({
          bookid: options.bookid,
          num: options.an

      })

      this.titleUrl(options, this.data.num);


      

  },
    titleUrl: function (options,num) {
        var _this = this;
        wx.showLoading({
            title: '加载数据中...',
        })

        
        wx.setStorageSync("_ch5.us.c.v.online", "_ch5.us.c.v.online=SDE4JVo1biwwNRkRbDJ4CFpSBUdPRExRbA5UeVRfXxdIdlwRUBpQe1BYUQNDf8ff73c6")
        wx.request({
            url: 'https://h5.manhua.163.com/reader/section/' + _this.data.bookid + '/' + app.data.sectionId[num].sectionId + '.json?csrfToken=b774800c78c2a22c4cc88f9e1c3048eb',
            method: 'POST',

            header: {
                'Cookie': wx.getStorageSync('_ch5.us.c.v.online')
            },
            dataType:'json',
            success: function (req) {
                var con = req.data.images;
                // console.log(req)
                _this.setData({
                    images: _this.data.images.concat(con),
                })

                // 获取设备宽度
                wx.getSystemInfo({
                    success: function(res) {
                        for (var i = 0; i < con.length; i++) {
                            var json = {};

                            
                            json.width = res.windowWidth;
                            json.height = parseInt(res.windowWidth * con[i].height / con[i].width);

                            _this.setData({
                                style: _this.data.style.concat(json),
                            })

                        }
                    },
                })
                
                // console.log(app.data.sectionId[num].sectionId)
                // console.log(_this.data.bookid)
                // console.log(_this.data.images)

                wx.hideLoading()

                


            },
            fail: function () {
                console.log('获取数据失败！')
            }
        })
    },

    //End完结提示器
    End:function(){
        var _this = this;
        // this.animate.opacity(0);

        setTimeout(function () {
            _this.setData({
                End: false,
                // animationData: _this.animate.export()
            })
        }, 5000)
    },

    //监听滚动条
    onPageScroll:function(e){


    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      this.animate=wx.createAnimation({
          duration:'5000'
      })
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
        
        ++this.data.num;
        if (this.data.num >= app.data.sectionId.length){
                      
            this.setData({
                num: app.data.sectionId.length-1
                
            })
            this.setData({
                End: true

            })
            this.End() 
            
      }else{
            this.titleUrl(this.data.bookid, this.data.num)
            
      }
      
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})