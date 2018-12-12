<template>
    <div>
        <Mheader>添加</Mheader>
        <div class="addBook">
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
            <label for="bookCover">
              封面
            </label>
            <input type="text" id="bookCover" v-model="book.bookCover"/>
          </li>
          <li>
            <button @click = 'add'>添加</button>
          </li>
        </ul>
      </div>
    </div>
</template>
<script>
import Mheader from '../base/Mheader'
import { addOneBook } from '../api/index.js'
export default {
  data () {
    return {
      book: {}
    }
  },
  components: {
    Mheader
  },
  methods: {
    // 添加图书操作
    async add () {
      await addOneBook(this.book)
      this.$router.push('/list')
    }
  }
}
</script>
<style scoped>
.addBook {
  position: fixed;
  width: 100%;
  top: 40px;
  bottom: 50px;
  overflow: auto;
}
.addBook ul {
  margin: 0 20px 0;
}
.addBook label {
  font-size: 25px;
  display: block;
}
.addBook input {
  height: 25px;
  width: 100%;
  font-size: 20px;
}
.addBook textarea {
  width: 100%;
  height: 100px;
  font-size: 16px;
  overflow: scroll;
}
.addBook button {
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
