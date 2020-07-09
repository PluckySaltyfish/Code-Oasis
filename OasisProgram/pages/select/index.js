// pages/select/index.js
const db = wx.cloud.database()
const record = db.collection('record')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        record:{},
        showModal: false,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log('onload')
        var record = JSON.parse(options.record);
        if (record.level_info.level == 25) {
            wx.redirectTo({
                url: '../gift/index?record=' + options.record,
            });
        }
        this.setData({
            record: record
        })
        // const that = this;
    },

    onReady: function () {
        console.log('ready')
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        console.log('show')
        const that = this
        record.doc('1229caae5eea579600073f432bc2398a').get({
            success:function(res){
                if(res.data.level_info.level == 25){
                    var record = JSON.stringify(res.data);
                    wx.redirectTo({
                        url: '../gift/index?record=' + record,
                    });
                }
                that.setData({
                    record:res.data
                })
            }
        })
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
    submit: function () {
        this.setData({
            showModal: true
        })
    },

    preventTouchMove: function () {

    },


    go: function () {
        this.setData({
            showModal: false
        })
    },
    startquiz :function(e){
        if (this.data.record.level_info.level > Number(e.currentTarget.id)){
            wx.showToast({
                title: '已经玩过了哦',
                image: '../../img/smile.png',
                duration: 1000
            })
        }
        else{
            var life = this.data.record.life
            var coin = this.data.record.coin
            var qid = this.data.record.quiz_list[this.data.record.level_info.level-1]
            db.collection('quiz').doc(""+qid).get({
                success:function(res){
                    console.log(res.data)
                    var q = JSON.stringify(res.data)
                    if(res.data.type == 0){
                        console.log(q)
                        console.log('go choice')
                        wx.navigateTo({
                            url: '../choice/index?quiz=' + q + "&life=" + life +"&coin=" + coin
                        })
                    }
                    else if(res.data.type == 1){
                        console.log('go filling')
                        wx.navigateTo({
                            url: '../filling/index?quiz=' + q + "&life=" + life +"&coin=" + coin
                        })
                    }
                    else if(res.data.type == 6){
                        console.log('go who am i')
                        wx.navigateTo({
                            url: '../whoami/index?quiz=' + q + "&life=" + life +"&coin=" + coin
                        })
                    }
                    else{
                        console.log('go color')
                        wx.navigateTo({
                            url: '../torture/index?quiz=' + q + "&life=" + life +"&coin=" + coin
                        })
                    }
                }
            })
        }
    }

})