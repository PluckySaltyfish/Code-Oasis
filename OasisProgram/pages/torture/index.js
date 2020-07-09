// pages/torture/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        life: 3,
        coin: 3,
        title: "色彩天堂",
        content: "请选出和下方颜色相同的颜色",
        quiz:{},
        hint:3
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
            life: Number(life),
            coin: Number(coin)
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
    tapAnswer:function (e) {
        var t_ans = this.data.quiz.content[this.data.quiz.step].given
        var m_ans = this.data.quiz.content[this.data.quiz.step].choice[Number(e.currentTarget.id)]
        if(t_ans == m_ans){
            var q = this.data.quiz
            if (q.step == q.content.length - 1) {
                wx.showToast({
                    title: '恭喜过关!',
                    image: '../../img/smile.png',
                    duration: 1000
                })
                var coin = this.data.coin
                if (this.data.life >= 2 && coin < 5) {
                    coin = Number(coin) + 1
                }
                wx.cloud.callFunction({
                    // 云函数名称
                    name: 'update_record',
                    // 传给云函数的参数
                    data: {
                        coin: Number(coin)
                    },
                    success: function () {
                        console.log("update coin") // 3
                    },
                    fail: console.error
                })
                wx.cloud.callFunction({
                    // 云函数名称
                    name: 'level_inc',
                    // 传给云函数的参数
                    success: function () {
                        wx.navigateBack({
                            complete: (res) => { },
                        })
                        console.log("level inc") // 3
                    },
                    fail: console.error
                })

            }
            else {
                q.step = q.step + 1
                this.setData({
                    quiz: q
                })
                wx.cloud.callFunction({
                    name: 'quiz_inc',
                    data: {
                        id: q._id
                    },
                    success: function () {
                        console.log("quiz inc")
                    },
                    fail: console.error
                })
            }
        }
        else{
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
            else {
                var h = this.data.hint
                this.setData({
                    hint: h - 1
                })

            }
        }
    }
})