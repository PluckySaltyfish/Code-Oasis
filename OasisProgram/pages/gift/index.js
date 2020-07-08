// pages/gift/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        coin: 3,
        txt_lst: ["用金币购买你的礼物吧~","用金币购买你的礼物吧~","打败打老虎的猫(T恤)","自走小羊","情书(邮箱查收哦)","恋爱兑换券","金币+1","tyx录制的专属起床铃","什么都没有...","金币变成6个啦","乐高！乐高！","杜蕾斯套餐(嘿嘿嘿)","A2美工垫板"],
        img_lst: ["../../img/normal.png", "../../img/td.png", '../../img/cat.png', '../../img/sheep.png', '../../img/ll.png', '../../img/la.png', '../../img/coin1.png', '../../img/clock.png', '../../img/sk.png', '../../img/coin6.png', '../../img/lego.png', '../../img/durex.png', '../../img/a2.png'],
        src_lst: [3, 4, 5, 6, 7, 8, 2, 9, 10, 11, 12, 13, 14],
        must_3: -1,
        text:"用金币购买你的礼物吧~"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var record = JSON.parse(options.record)
        this.setData({
            coin: Number(record.coin),
            src_lst: record.src_lst,
            must_3: record.must_3
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
    open: function (e) {
        if (this.data.src_lst[Number(e.currentTarget.id)] > 1)
            return
        if ((Number(e.currentTarget.id) != 6 && this.data.coin >= 1) || this.data.coin >= 6 ){
            if (this.data.must_3 > 0) {
                var coin = this.data.coin
                var m3 = this.data.must_3
                var sl = this.data.src_lst
                if (m3 == 1) {
                    sl[Number(e.currentTarget.id)] = 10
                    var text = this.data.txt_lst[10]
                }
                else if (m3 == 2) {
                    sl[Number(e.currentTarget.id)] = 12
                    var text = this.data.txt_lst[12]
                }
                else {
                    sl[Number(e.currentTarget.id)] = 4
                    var text = this.data.txt_lst[4]
                }
                this.setData({
                    must_3: m3 - 1,
                    coin : Number(coin) - 1,
                    src_lst: sl,
                    text: text

                })
                wx.cloud.callFunction({
                    name: 'update_record',
                    data: {
                        must_3: m3 - 1,
                        src_lst: sl,
                        coin: Number(coin) - 1
                    }
                })
            }
            else {
                if (Number(e.currentTarget.id) == 6){
                    var coin = this.data.coin
                    var sl = this.data.src_lst
                    sl[Number(e.currentTarget.id)] = 2
                    var text = this.data.txt_lst[2]
                    this.setData({
                        coin : Number(coin) - 6,
                        src_lst: sl,
                        text:text
                    })
                    wx.cloud.callFunction({
                        name: 'update_record',
                        data: {
                            src_lst: sl,
                            coin: Number(coin) - 6
                        }
                    })
                }
                else{
                    var coin = this.data.coin
                    var lst = [3, 4, 5, 6, 7, 8, 8, 9, 10, 11, 12, 6]
                    for (let i = 0; i < this.data.src_lst.length; i++) {
                        if(this.data.src_lst[i] > 2){
                            var index = lst.indexOf(this.data.src_lst[i])
                            lst.splice(index, 1)
                        }
                    }
                    lst.sort(function () {
                        return 0.5 - Math.random()
                    })
                    var sl = this.data.src_lst
                    sl[Number(e.currentTarget.id)] = lst[0]
                    var text = this.data.txt_lst[lst[0]]
                    if(lst[0] == 6){
                        coin = Number(coin) + 1
                    }
                    else if(lst[0] == 9){
                        coin = 7
                    }
                    this.setData({
                        src_lst:sl,
                        text: text,
                        coin: Number(coin) - 1
                    }) 
                    wx.cloud.callFunction({
                        name: 'update_record',
                        data: {
                            src_lst: sl,
                            coin: Number(coin) - 1
                        }
                    })
                }

            }
        }
        else{
            wx.showToast({
                title: '钱不够哇~',
                image: '../../img/dead.png',
                duration: 1000
            })
        }
    }
})