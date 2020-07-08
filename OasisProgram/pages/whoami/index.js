const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        life: 3,
        coin: 3,
        response: "让我们开始吧",
        times: 10,
        src: "../../img/start.png",
        model: ['小猪佩奇', '齐白石', '孔子', '小罗伯特唐尼', '工藤优作'],
        ans: [
            [[0, 0, 0, 0, 0, 0, 0, 1], [1, 0], [0, 1], [0, 1, 1, 0], [0, 0, 1, 0, 0, 0, 0], [1, 1, 0], [1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 1, 0, 1, 0]],
            [[0, 0, 1, 0, 0, 0, 0, 0], [0, 1], [1, 0], [1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 0, 0, 1], [0, 1, 1, 0, 0, 0, 0]], 
            [[0, 0, 0, 1, 1, 1, 0, 0], [0, 1], [1, 0], [1, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 1], [0, 1, 0], [0, 0, 1, 0], [1, 0, 0, 0, 0, 0, 0]], 
            [[0, 1, 0, 0, 0, 0, 0, 0], [0, 1], [1, 0], [0, 1, 1, 0], [1, 1, 0, 0, 0, 0, 1], [0, 0, 1], [1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 0, 1, 0, 0]],
            [[0, 0, 0, 0, 0, 0, 1, 0], [0, 1], [0, 1], [0, 1, 0, 1], [0, 0, 1, 0, 1, 0, 0], [0, 0, 1], [1, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0, 0, 0, 1]]
        ],
        multiArray: [['职业', '性别', '属性', '国籍', '作品', '年龄', '状况', '荣誉', '特长'], ['歌手', '演员', '画家', '政治家', '思想家', '哲学家', '推理小说家', '小宝贝']],
        multiIndex: [0, 0, 0],
        chose:0,
        quiz:{},
        hint:3,
        getInput:""
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
            coin: Number(coin),
            times:q.times
        })
        if(q.chose==-1){
            var l_tem = [0,1,2,3,4]
            l_tem.sort(function () {
                return 0.5 - Math.random()
            })
            var chose = l_tem[0]
            console.log(chose)
            this.setData({
                chose: chose
            })
            wx.cloud.callFunction({
                name: 'update_quiz',
                data: {
                    doc: "16",
                    data:{
                        chose:chose
                    }
                },
                success: function () {
                    console.log('go update quiz')
                },
                fail: console.error
            })


        }
        else{
            this.setData({
                chose:q.chose
            })
        }

    },
    bindPickerChange: function (e) {

        this.setData({
            index: e.detail.value
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
    bindMultiPickerChange: function (e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            multiIndex: e.detail.value
        })
    },
    bindMultiPickerColumnChange: function (e) {
        console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
        var data = {
            multiArray: this.data.multiArray,
            multiIndex: this.data.multiIndex
        };
        data.multiIndex[e.detail.column] = e.detail.value;
        switch (e.detail.column) {
            case 0:
                switch (data.multiIndex[0]) {
                    case 0:
                        data.multiArray[1] = ['歌手', '演员', '画家', '政治家', '思想家', '哲学家', '推理小说家', '小宝贝'];
                        break;
                    case 1:
                        data.multiArray[1] = ['女', '男'];
                        break;
                    case 2:
                        data.multiArray[1] = ['真实存在的', '非真实存在的']
                        break;
                    case 3:
                        data.multiArray[1] = ['国内的', '国外的', '欧美', '日本']
                        break;
                    case 4:
                        data.multiArray[1] = ['电影', '电视剧', '动画', '火影', '名侦探柯南', '葫芦娃','复仇者联盟']
                        break;
                    case 5:
                        data.multiArray[1] = ['20以下', '30以下', '30以上']
                        break;
                    case 6:
                        data.multiArray[1] = ['活着','去世','半死不活']
                        break;
                    case 7:
                        data.multiArray[1] = ['奥斯卡提名', '奥斯卡奖', '学派创始人','绘画大师']
                        break;
                    case 8:
                        data.multiArray[1] = ['周游各国', '画青蛙', '画虾米', '跳泥坑','戏剧表演','做游戏','推理']
                        break;
                }
                data.multiIndex[1] = 0;
                data.multiIndex[2] = 0;
                break;
        }
        console.log(data.multiIndex);
        this.setData(data);
    },
    ask:function(){
        var t = this.data.times
        if(t - 1 >= 0){
            this.setData({
                times: t - 1
            })
            wx.cloud.callFunction({
                name: 'update_quiz',
                data: {
                    doc: "16",
                    data: {
                        times: t - 1
                    }
                },
                success: function () {
                    console.log('go update quiz')
                },
                fail: console.error
            })
        }
        if(t - 1 > 0){
            var ans = this.data.ans[this.data.chose]
            if (ans[this.data.multiIndex[0]][this.data.multiIndex[1]] == 1) {
                this.setData({
                    src:'../../img/yes.png',
                    response:'是的'
                })
            }
            else {
                this.setData({
                    src: '../../img/no.png',
                    response: '不是呢'
                })
            }
        }

    },
    getInput: function (e) {
        this.data.getInput = e.detail.value;
    },
    confirm:function() {
        if(this.data.model[this.data.chose] == this.data.getInput){
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
            else {
                var h = this.data.hint
                this.setData({
                    hint: h - 1
                })
            }
        }
    }
})