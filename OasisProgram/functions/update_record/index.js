// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'codeoasis-2f992'
})
const db = cloud.database()
exports.main = async (event, context) => {
  db.collection('record').doc('1229caae5eea579600073f432bc2398a').update({
    data: event,
    success: function(res) {
      console.log('update ok')
    }
  })
}