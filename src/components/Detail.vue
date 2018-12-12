<template>
    <div>
      <Mheader :back = 'true'>详情页</Mheader>
      <div class="detail">
        <ul>
          <li>
            <label for="bookName">
              书名
            </label>
            <input type="text" id="bookName" oncopy="return true" onpaste="return true" v-model="book.bookName"/>
          </li>
          <li>
            <label for="bookDesc">
              内容简介
            </label>
            <textarea type="text" id="bookDesc" v-model="book.bookDesc"></textarea>
          </li>
          <li>
            <label for="bookPrice">
              价格
            </label>
            <input type="text" id="bookPrice" v-model="book.bookPrice"/>
          </li>
          <li>
            <button @click = 'save(book.bookId)'>保存</button>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import Mheader from '../base/Mheader'
import {getOneBook, updateBook} from '../api/index.js'
export default {
  data () {
    return {
      book: {}
    }
  },
  components: {
    Mheader
  },
  created () {
    this.getData()
  },
  methods: {
    // 拿某本书数据
    async getData () {
      let book = await getOneBook(this.bid)
      this.book = book[0] // 服务返回的数据data
      // console.log(this.bid)
      // console.log(this.book) // 拿到book数据
      if (!this.book.bookId) {
        // this.$router.push('/list')
        this.$router.go(-1)
      }
    },
    // 保存修改后数据
    async save (id) {
      await updateBook(id, this.book)
      // this.$router.push('/list')
      this.$router.go(-1)
    }
  },
  computed: {
    // 通过$route获取bid
    bid () {
      return this.$route.params.bid // 是$route 不是$router
    }
  }
}
</script>
<style scoped>
.detail{
  position: fixed;
  width: 100%;
  top: 40px;
  bottom: 50px;
  overflow: auto;
}
.detail ul {
  margin: 0 20px 0;
}
.detail label {
  font-size: 25px;
  display: block;
}
.detail input {
  height: 25px;
  width: 100%;
  font-size: 20px;
}
.detail textarea {
  width: 100%;
  height: 100px;
  font-size: 16px;
  overflow: scroll;
}
.detail button {
  margin-top: 20px;
  outline: none;
  border: none;
  width: 80px;
  height: 30px;
  border-radius: 8px;
  background: #afd9ee;
  font-size: 18px;
}
</style>
