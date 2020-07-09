//index.js
//获取应用实例
const app = getApp()
wx.cloud.init({
    env: 'codeoasis-2f992'
  })
const db = wx.cloud.database()
const record = db.collection('record')

Page({
    data: {
        record:{}
    },
    onLoad: function () {
    },
    startGame: function () {
        db.collection('record').doc('1229caae5eea579600073f432bc2398a').get({
            success: function(res) {
                if(res.data["life"] == 0){
                    wx.showToast({
                        title: '你死啦~',
                        image: '../../img/dead.png',
                        duration: 2000
                    })
                }
                else{
                    if(res.data["quiz_list"].length == 0){ 
                        var r = res.data
                        wx.cloud.callFunction({
                            name: 'gen_quiz',
                            success: function(res) {
                                r.quiz_list = res.result
                                var record = JSON.stringify(r)
                                wx.navigateTo({
                                    url: '../select/index?record=' + record
                                })
                            },
                            fail: console.error
                        })
                    }
                    else{
                        console.log('direct in')
                        var record = JSON.stringify(res.data)
                        wx.navigateTo({
                            url: '../select/index?record=' + record
                        })
                    }

                }
            }
        })


    },
    resetGame:function () {
        wx.showModal({
            title: '危险提示',
            content: '确定要重置吗？重置后所有进度将丢失,每关内容会发生改变。',
            confirmColor:'#608638',
            cancelColor:'#608638',
            success(res) {
                if (res.confirm) {
                    wx.cloud.callFunction({
                        // 云函数名称
                        name: 'reset_game',
                        success: function(res) {
                            wx.showToast({
                                title: '进度已重置',
                                image: '../../img/smile.png',
                                duration: 2000
                            })
                        }
                      })
                } 
            }
        })
    },
    addLife:function () {
        record.doc("1229caae5eea579600073f432bc2398a").get({
            success: function(res) {
                if(res.data["life"] != 0){
                    wx.showToast({
                        title: '现在不需要续命',
                        image: '../../img/smile.png',
                        duration: 2000
                    })
                }
                else{
                    if(!res.data["add_allowed"]){
                        wx.showToast({
                            title: '续命无效',
                            image: '../../img/dead.png',
                            duration: 2000
                        })
                    }
                    else{
                        record.doc("1229caae5eea579600073f432bc2398a").update({
                            data:{life:1},
                            success:function(res){
                                wx.showToast({
                                    title: '续命成功~',
                                    image: '../../img/smile.png',
                                    duration: 2000
                                })
                            }
                        }
                        )

                    }
                }
            }
        })
    }
})
