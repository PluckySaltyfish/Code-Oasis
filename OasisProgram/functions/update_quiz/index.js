const cloud = require('wx-server-sdk')
cloud.init({
  env: 'codeoasis-2f992'
})
const db = cloud.database()
exports.main = async (event, context) => {
  db.collection('quiz').doc(event.doc).update({
    data:event.data,
    success: function(res) {
      console.log('update quiz ok')
    }
  })
}