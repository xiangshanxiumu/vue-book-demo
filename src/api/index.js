import axios from 'axios'
//  http://localhost:4000
// 增加默认请求路径
axios.defaults.baseURL = 'http://localhost:4000'
// 设置拦截器 只返回数据
axios.interceptors.response.use((res) => {
  // console.log(res)
  return res.data
}, (err) => {
  return Promise.reject(err) // 设置axios拦截器 没有写(err) 情况 拦截器不起作用
})
// 获取轮播图数据
export let getSliders = () => {
// 返回一个promsie对象
  return axios.get('/sliders')
}
// 获取热门图书信息
export let getHotBooks = () => {
  return axios.get('/hot')
}
// home 页面同时获取所有数据
export let getHomeInfo = () => {
  return axios.all([getSliders(), getHotBooks()])
}
// List获取图书信息
/* export let getAllBooks = () => {
  return axios.get('./getAllBooks')
} */
// List获取部分图书
export let getSomeBooks = (index) => {
  return axios.get(`/list?index=${index}`)
}
// 删除某部图书
export let removeBook = (id) => {
  return axios.delete(`/book?id=${id}`)
}
// 获取某本图书
export let getOneBook = (id) => {
  return axios.get(`/book?id=${id}`)
}
// 修改某本图书
export let updateBook = (id, data) => {
  return axios.put(`/book?id=${id}`, data)
}
// 收藏某本书
export let collectBook = (id) => {
  return axios.put(`/collectBook?id=${id}`)
}
// 添加某本图书
export let addOneBook = (data) => {
  return axios.post('/book', data)
}
// 获取收藏图书
export let getCollectBook = () => {
  return axios.get('/collectionBooks')
}
// 去收藏图书
export let unCollectBook = (id) => {
  return axios.put(`/unCollectBook?id=${id}`)
}
