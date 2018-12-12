/* Node的用来测试前端的后端服务器 */
let http = require('http')
// let fs = require('fs') 读写本地文件数据的文件模块
let url = require('url')
let db = require('./db.js')

const PORT = 4000
// 封装读取本地文件数据方法
/* function read (cb) {
  fs.readFile('./books.json', 'utf-8', (err, data) => {
    if (err || data.length === 0) {
      // eslint-disable-next-line standard/no-callback-literal
      cb([])
    } else {
      cb(JSON.parse(data))
    }
  })
} */

// 封装写入本地文件数据方法
/* function write (data, cb) {
  fs.writeFile('./books.json', JSON.stringify(data), cb)
} */

http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*') // 此处是res.setHeader，不是res.header
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')
  res.setHeader('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Access-Token')
  res.setHeader('X-Powered-By', ' 3.2.1')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  // console.log(url.parse(req.url))
  if (req.method === 'OPTIONS') {
    return res.end('预请求成功')
  }
  let {pathname, query} = url.parse(req.url, true)
  let id = parseInt(query.id)
  // console.log(query)
  // console.log(req.method)
  // 路由请求分发
  switch (req.method) {
    case 'GET':
    // 操作mysql数据库响应HOME页面sliders轮播路由请求
      // console.log('非空' + req.method) // 谷歌浏览器一次URL操作 发送了两次请求 第一次预请求
      if (pathname === '/sliders') {
        // res.setHeader('Content-Type', 'application/json;charset=utf8')
        // res.end(JSON.stringify(sliders))
        let sql = 'SELECT * FROM sliders'
        let data = null
        db.base(sql, data, (results) => {
          // console.log(results)
          let sliders = JSON.stringify(results)
          res.end(sliders)
        })
      }
      // 操作mysql数据库响应HOME热门图书路由请求
      if (pathname === '/hot') {
        let sql = 'SELECT * FROM books'
        let data = null
        db.base(sql, data, (results) => {
          let books = results.reverse().slice(0, 8)
          res.end(JSON.stringify(books))
        })
        // 操作本地测试用模拟数据响应HOME热门图书请求
        /* read(function (books) {
          // [] 或有数据
          books = books.reverse().slice(0, 6)
          res.end(JSON.stringify(books))
        }) */
      }
      // 操作本地测试用模拟数据响应LIST列表获取所有图书请求
      /* if (pathname === '/getAllBooks') {
        read(function (books) {
          res.end(JSON.stringify(books))
        })
      } */
      // 操作mysql数据库响应LIST列表获取图书请求
      if (pathname === '/list') {
        let index = parseInt(query.index) || 5 // 前端传来index值控制加载数据多少
        let hasMore = true // 是否还有数据可加载
        let sql = 'SELECT * FROM books order by bookId DESC limit ?' // 根据bookId由大到小 取限定行记录
        let data = [index]
        db.base(sql, data, (results) => {
          let books = results
          /* if (index >= books.length) {
            index = books.length
            hasMore = false
          } */
          // books = books.reverse().slice(0, index)
          if (index > results.length) {
            hasMore = false
          } else {
            hasMore = true
          }
          // console.log(hasMore)
          res.end(JSON.stringify({books: books, hasMore: hasMore}))
        })
        // 操作本地测试用模拟数据响应LIST列表获取图书请求
        /* read(function (books) {
          // index = index > books.length ? books.length : index
          if (index >= books.length) {
            index = books.length
            hasMore = false
          }
          books = books.reverse().slice(0, index)
          res.end(JSON.stringify({books: books, hasMore: hasMore}))
        }) */
      }
      // 操作mysql数据库响应detail详情页面查询某本图书请求
      if (pathname === '/book') {
        let sql = 'SELECT * FROM books WHERE bookId = ?'
        let data = [id]
        db.base(sql, data, (results) => {
          // console.log(results)
          let book = results
          res.end(JSON.stringify(book))
        })
        // 操作本地测试用模拟数据响应detail详情页面查询某本图书请求
        /* read(function (books) {
          // console.log(id)
          let book = books.find(item => item.bookId === id)
          // console.log(book)
          if (!book) {
            book = {}
          }
          res.end(JSON.stringify(book))
        }) */
      }
      // favicon.ico请求
      if (pathname === '/favicon.ico') {
        console.log('/favicon.ico' + '请求')
      }
      // 操作mysql数据库响应COLLECT页面获取收藏图书请求
      if (pathname === '/collectionBooks') {
        let sql = 'SELECT * FROM books WHERE bookCollection = ?'
        let data = [true]
        db.base(sql, data, (results) => {
          let books = results
          res.end(JSON.stringify(books))
        })
        // 操作本地测试用模拟数据响应COLLECT页面获取收藏图书请求
        /* read(function (books) {
          books = books.filter(item => {
            if (item.bookCollection) {
              return item
            }
          })
          res.end(JSON.stringify(books))
        }) */
      }
      break
    case 'POST':
      // 操作mysql数据库响应 ADD页面新增图书请求
      if (pathname === '/book') {
        let str2 = ''
        req.on('data', chunck => {
          str2 += chunck
        })
        req.on('end', () => {
          let book = JSON.parse(str2)
          book.bookCollection = false
          let sql = 'INSERT INTO books (bookName, bookDesc, bookCover, bookPrice, bookCollection) VALUES (?,?,?,?,?)'
          let data = [book.bookName, book.bookDesc, book.bookCover, book.bookPrice, book.bookCollection]
          db.base(sql, data, (results) => {
            if (results.affectedRows === 1) {
              res.end(JSON.stringify({bool: 1}))
            } else {
              res.end(JSON.stringify({bool: -1}))
            }
          })
          // 操作本地测试用模拟数据响应ADD页面新增图书请求
          /* read(function (books) {
            // 前面接收数据chunck 同上
            let lastbook = books[books.length - 1]
            book.bookId = lastbook.bookId + 1
            books.push(book)
            write(books, function () {
              res.end(JSON.stringify(book))
            })
          }) */
        })
      }
      break
    case 'DELETE':
    // 操作mysql数据库响应 删除LIST页面图书请求
      let sql = 'DELETE FROM books WHERE bookId = ?'
      let data = [id]
      db.base(sql, data, (results) => {
        if (results.affectedRows === 1) {
          res.end(JSON.stringify({bool: 1}))
        } else {
          res.end(JSON.stringify({bool: -1}))
        }
      })
      // 操作本地测试用模拟数据响应删除LIST页面图书请求
      /* read(function (books) {
        books = books.filter(item => item.bookId !== id) // 如果客户端axios拦截器设置出问题 得用books[0]拿数据
        write(books, function () {
          res.end(JSON.stringify({}))// 删除成功后返回空对象
        })
      }) */
      break
    case 'PUT':
    // 操作mysql数据库响应 修改detail页面图书请求
      if (pathname === '/book') {
        let str = ''
        req.on('data', chunck => {
          str += chunck
        })
        req.on('end', () => {
          let book = JSON.parse(str)
          let sql = 'UPDATE books set bookName = ?, bookDesc = ?, bookCover = ?, bookPrice = ? WHERE bookId =?'
          let data = [book.bookName, book.bookDesc, book.bookCover, book.bookPrice, id]
          db.base(sql, data, (results) => {
            if (results.affectedRows === 1) {
              res.end(JSON.stringify({bool: 1}))
            } else {
              res.end(JSON.stringify({bool: -1}))
            }
          })
          // 操作本地测试用模拟数据响应修改detail页面图书请求
          /* read(function (books) {
            books = books.map(item => {
              if (item.bookId === id) {
                return book
              }
              return item
            })
            write(books, function () {
              res.end(JSON.stringify(book))
            })
          }) */
        })
      }
      // 操作mysql数据库响应 收藏图书请求
      if (pathname === '/collectBook') {
        console.log(id)
        let sql = 'UPDATE books set bookCollection = ? WHERE bookId = ?'
        let data = [true, id]
        db.base(sql, data, (results) => {
          if (results.affectedRows === 1) {
            res.end(JSON.stringify({bookCollection: 1}))
          } else {
            res.end(JSON.stringify({bookCollection: 0}))
          }
        })
        // 操作本地测试用模拟数据响应收藏图书请求
        /* read(function (books) {
          books = books.map(item => {
            if (item.bookId === id) {
              item.bookCollection = true
            }
            return item
          })
          write(books, function () {
            res.end(JSON.stringify({}))
          })
        }) */
      }
      // 操作mysql数据库响应 去收藏 图书请求
      if (pathname === '/unCollectBook') {
        console.log(id)
        let sql = 'UPDATE books set bookCollection = ? WHERE bookId = ?'
        let data = [false, id]
        db.base(sql, data, (results) => {
          if (results.affectedRows === 1) {
            res.end(JSON.stringify({bool: 1}))
          } else {
            res.end(JSON.stringify({bool: -1}))
          }
        })
        // 操作本地测试用模拟数据响应 去收藏 图书请求
        /* read(function (books) {
          books = books.map(item => {
            if (item.bookId === id) {
              item.bookCollection = false
            }
            return item
          })
          write(books, function () {
            res.end('ok')
          })
        }) */
      }
      break
  }
}).listen(PORT)
console.log('Server runing at port:' + PORT + '...')
