// pages/choice/index.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		life: 3,
		coin: 3,
		quiz: {},
		hint: 3
	},

	onLoad: function (options) {
		console.log(options)
		var q = JSON.parse(options.quiz)
		var life = options.life
		var coin = options.coin
		this.setData({
			quiz: q,
			life: life,
			coin: coin
		})
	},
	onReady: function () {

	},
	onShow: function () {

	},
	onHide: function () {

	},
	onUnload: function () {

	},
	onPullDownRefresh: function () {

	},
	onReachBottom: function () {

	},
	onShareAppMessage: function () {

	},
	tapAnswer: function (e) {
		var t_ans = this.data.quiz.content[this.data.quiz.step].right
		var m_ans = this.data.quiz.content[this.data.quiz.step].ans[Number(e.currentTarget.id) - 1]
		if (t_ans != m_ans && t_ans!="all") {
			wx.showToast({
				title: '回答错误!',
				image: '../../img/dead.png',
				duration: 1000
			})
			if (this.data.hint == 0) {
				var life = this.data.life
				life = life - 1
				wx.cloud.callFunction({
					// 云函数名称
					name: 'update_record',
					// 传给云函数的参数
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
		else {
			var q = this.data.quiz
			if (q.step == q.content.length - 1) {
				wx.showToast({
					title: '恭喜过关!',
					image: '../../img/smile.png',
					duration: 1000
				})
				var coin = this.data.coin
				if (this.data.hint == 3 && this.data.life >= 3 && this.data.coin < 5) {
					coin = Number(coin) + 1
				}
				wx.cloud.callFunction({
					// 云函数名称
					name: 'update_record',
					// 传给云函数的参数
					data: {
						coin: coin
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
					data:{
						id:q._id
					},
					success: function () {
						console.log("quiz inc")
					},
					fail: console.error
				})
			}
		}
	}
})