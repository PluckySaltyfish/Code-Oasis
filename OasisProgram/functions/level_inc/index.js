// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'codeoasis-2f992'
})
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const _ = db.command
  db.collection('record').doc('1229caae5eea579600073f432bc2398a').update({
    data: {
      // 表示指示数据库将字段自增 10
      level_info:{level:_.inc(1)}
    },
    success: function(res) {
      console.log(res.data)
    }
  })
}