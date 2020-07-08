// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'codeoasis-2f992'
})
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  var list = []
  for(var i = 1;i <= 24;i++){
    list.push(i)
  }
  list.sort(function () {
    return 0.5 - Math.random()
  })
  db.collection('record').doc('1229caae5eea579600073f432bc2398a').update({
    data:{
      quiz_list:list
    }
  })
  return list
}