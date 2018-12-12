/* mysql数据库驱动 */
const mysql = require('mysql')
exports.base = (sql, data, callBack) => {
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'vue-book'
  })
  connection.connect()
  connection.query(sql, data, function (error, results, fields) {
    if (error) throw error
    callBack(results)
  })
  connection.end()
}
