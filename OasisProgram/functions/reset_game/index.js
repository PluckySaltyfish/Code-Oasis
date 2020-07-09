// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'codeoasis-2f992'
})
const db = cloud.database()
const _ = db.command
// 云函数入口函数
exports.main = async (event, context) => {
  db.collection('record').doc('1229caae5eea579600073f432bc2398a').update({
    // data 传入需要局部更新的数据
    data: {
      // 表示将 done 字段置为 true
      life:3,
      coin:3,
      level_info:{level:1,status:0},
      quiz_list:[],
      score:0,
      add_allowed:false,
      must_3:3,
      src_lst : [0,0,0,0,0,0,1,0,0,0,0,0,0]
    },
    success: function() {
      console.log('reset record ok')
    }
  }),
  db.collection('quiz').where({
    type: _.lt(7)
  }).update({
    data:{
      step:0
    }
  })
  db.collection('quiz').where({
    type: 6
  }).update({
    data:{
      chose:-1,
      times:10
    }
  })

}