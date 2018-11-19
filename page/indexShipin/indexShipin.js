const app = getApp();

Page({
    data: {
        floorstatus: false,


        options1: '',
        num: 1,
        dataDistinct: true, //防止
        shipin:[]
    },
    


    onclickCon: function (e) {

        var index = e.currentTarget.dataset.index;

        wx.navigateTo({
            url: "../contentShipin/contentShipin?index=" + index
        })

    },



    //调取视频列表
    reque_shipin: function (num, fun) {

        if (!this.data.dataDistinct) {
            return
        }

        var _this = this;
        wx.showLoading({
            title: '加载中...',
        })
        // console.log(_this.data.shipin)
        wx.request({
            url:"https://v.hao123.baidu.com/vapi/shortApi?pn="+num+"&area=%E6%90%9E%E7%AC%91%E8%B6%A3%E5%91%B3",
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                var con = _this.data.shipin.concat(data.data.data.data)
                if (con == '') {
                    _this.reque_shipin(num);
                }else{

                _this.setData({
                    shipin: con,
                })
                app.data.shipin = con
                
                // console.log(_this.data.shipin)
                fun && fun();//回调
                wx.hideLoading()
                }

            },
            fail: function () {
                _this.setData({
                    shipin: [{ title: '获取数据失败！', hao_vimg: { gif: '../../image/re_img1.png' }, mode: true }]
                })
            },


        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var _this = this;

        wx.setNavigationBarTitle({
            title: options.nav
        })
        this.setData({
            options1: options.nav
        })
        // 判断路径跳转
        switch (options.nav) {
            case app.data.nav[2].text:
                this.reque_shipin(this.data.num);
                break;

        }




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
                floorstatus: true
            })
        } else {
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
        this.reque_shipin(this.data.num)



    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})