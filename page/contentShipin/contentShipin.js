// page/contentShipin/contentShipin.js
const app = getApp();

Page({

    data: {
        index: 0,
        shipin: []
    },
    con_prev: function () {
        --this.data.index;
        if (this.data.index < 0) {
            this.setData({
                index: app.data.shipin.length - 1
            })
        }

        wx.setNavigationBarTitle({
            title: app.data.shipin[this.data.index].title
        })
        this.setData({
            shipin: app.data.shipin[this.data.index]
        })

    },

    con_next: function (options) {
        ++this.data.index;
        if (this.data.index > app.data.shipin.length - 1) {
            this.setData({
                index: 0
            })
        }

        wx.setNavigationBarTitle({
            title: app.data.shipin[this.data.index].title
        })
        this.setData({
            shipin: app.data.shipin[this.data.index]
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;
        wx.setNavigationBarTitle({
            title: app.data.shipin[options.index].title
        })

        this.setData({
            index: options.index
        })

        var con = app.data.shipin[options.index];

        this.setData({
            shipin: con
        })
        // console.log(this.data.shipin)

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.videoContext = wx.createVideoContext('myVideo')
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