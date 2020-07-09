// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'codeoasis-2f992'
})
const db = cloud.database()

exports.main = async (event, context) => {
  const _ = db.command
  db.collection('quiz').doc(event.id).update({
    data: {
      step:_.inc(1)
    },
    success: function() {
      console.log("quiz inc ok")
    }
  })
}