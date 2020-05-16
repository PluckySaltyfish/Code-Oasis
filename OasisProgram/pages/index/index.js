//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    onLoad: function () {

    },
    getLevel:function(){
        return 3
    }
    ,
    getLife:function () {
        return 0
    },
    canAddLife:function () {
        return true
    },
    startGame: function () {
        if(this.getLife() == 0){
            wx.showToast({
                title: '你死啦~',
                image: '../../img/dead.png',
                duration: 2000
            })
        }
        else{
            var currLevel = this.getLevel()
            wx.navigateTo({
                url: '../select/index?currLevel=' + currLevel
            });
        }

    },
    resetGame:function () {
        wx.showModal({
            title: '危险提示',
            content: '确定要重置吗？重置后所有进度将丢失,每关内容会发生改变。',
            confirmColor:'#608638',
            cancelColor:'#608638',
            success(res) {
                if (res.confirm) {
                    console.log('用户点击确定')
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        })
    },
    addLife:function () {
        if(this.canAddLife()){
            wx.showToast({
                title: '续命成功~',
                image: '../../img/smile.png',
                duration: 2000
            })
        }
    }
})
