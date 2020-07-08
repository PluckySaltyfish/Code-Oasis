// pages/filling/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        life: 3,
        coin: 3,
        quiz: {},
        getInput: "",
        hint: 3
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var q = JSON.parse(options.quiz)
        var life = options.life
        var coin = options.coin
        this.setData({
            quiz: q,
            life: life,
            coin: coin
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

    },
    getInput: function (e) {
        this.data.getInput = e.detail.value;
    },
    tapAnswer: function () {
        if (this.data.getInput == this.data.quiz.ans) {
            wx.showToast({
                title: '恭喜过关!',
                image: '../../img/smile.png',
                duration: 1000
            })
            wx.cloud.callFunction({
                // 云函数名称
                name: 'level_inc',
                // 传给云函数的参数
                success: function () {
                    wx.navigateBack({
                        complete: (res) => { },
                    })
                    console.log("level inc")
                },
                fail: console.error
            })
        }
        else {
            wx.showToast({
                title: '回答错误!',
                image: '../../img/dead.png',
                duration: 1000
            })
            if (this.data.hint == 0) {
                var life = this.data.life
                life = life - 1
                wx.cloud.callFunction({
                    name: 'update_record',
                    data: {
                        life: life
                    },
                    success: function () {
                        if (life == 0) {
                            wx.redirectTo({
                                url: '../index/index'
                            })
                        }
                    },
                    fail: console.error
                })
                this.setData({
                    life: life
                })
            }
            else{
                var h = this.data.hint
                this.setData({
                    hint: h - 1
                })
            }
        }
    }
})