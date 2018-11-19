const app = getApp();

Page({
    data: {
        floorstatus: false,

        value:'',
        search_fixed:'', //无效


        options1: '',
        num: 1,
        dataDistinct: true, //防止
        manhua: []
    },



    onclickCon: function (e) {

        var index = e.currentTarget.dataset.index;
        var bookid = e.currentTarget.dataset.bookid;

        wx.navigateTo({
            url: "../contentManhua/contentManhua?index=" + index + "&bookid=" + bookid
        })

    },
    input:function(e){
        this.setData({
            value: e.detail.value
        })
    },

    // 搜索提交
    search: function (){
        wx.redirectTo({
            url: '../indexManhuaSearch/indexManhuaSearch?key='+this.data.value,
        })

        
        
    },



    //调取漫画列表
    reque_manhua: function (num, fun) {

        if (!this.data.dataDistinct) {
            return
        }

        var _this = this;
        wx.showLoading({
            title: '加载中...',
        })

        wx.request({
            url: "https://manhua.163.com/category/getData.json?csrfToken=f923bcf4f0e8ee388acbc5726e71aaa8&sort=2&sf=1&pageSize=30&page="+num,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                var con = _this.data.manhua.concat(data.data.books)

                _this.setData({
                    manhua: con,
                })
                app.data.csrfToken = data.data.arr_params.csrfToken[0]
                // console.log(data.data.arr_params.csrfToken[0])
                app.data.manhua = con
                // console.log(app.data.manhua)
                fun && fun();//回调
                wx.hideLoading()

            },
            fail: function () {
                _this.setData({
                    manhua: [{ title: '获取数据失败！', cover: '../../image/re_img1.png' }]
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
            case app.data.nav[1].text:
                _this.reque_manhua(this.num);
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
                floorstatus: true,
                search_fixed:'search_fixed'
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
    onReady: function (parame) {
        this.animate=wx.createAnimation({
            duration:'1000',
            timingFunction:'ease-in'
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

        this.data.num++;
        this.reque_manhua(this.data.num)



    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})