<template>
    <div>
    <mheader>收藏</Mheader>
    <Loading v-if="show"></Loading>
    <div class="collectContent">
          <ul>
            <router-link v-for="book in collectBooks" tag="li" :to="{name:'detail',params:{bid:book.bookId}}" :key="book.bookId">
              <img :src="book.bookCover"/>
              <div>
                <h4>{{book.bookName}}</h4>
                <p>{{book.bookDesc}}</p>
                <b>{{book.bookPrice}}￥</b>
                <div class="button">
                <div><button @click.stop="unCollect(book.bookId)" v-if="book.bookCollection">去收藏</button></div>
                </div>
              </div>
            </router-link>
          </ul>
    </div>
    </div>
</template>
<script>
import Mheader from '../base/Mheader'
import Loading from '../base/Loading'
import {getCollectBook, unCollectBook} from '../api'
export default {
  data () {
    return {
      collectBooks: [],
      show: true
    }
  },
  created () {
    this.getCollectBooks()
  },
  methods: {
    // 获取收藏图书数据
    async getCollectBooks () {
      let books = await getCollectBook()
      // console.log(books)
      this.collectBooks = books
      this.show = false
    },
    // 去收藏 操作
    async unCollect (id) {
      await unCollectBook(id)
      this.collectBooks = this.collectBooks.filter(item => item.bookId !== id)
      // console.log(this.collectBooks)
      // this.$router.push('/collect')
    }
  },
  components: {
    Mheader,
    Loading
  }
}
</script>
<style scoped>
.collectContent {
  position: absolute;
  width: 100%;
  top: 40px;
  bottom: 50px;
  overflow: auto;
}
.collectContent ul {
  display: flex;
  flex-wrap: wrap;
}
.collectContent ul li {
  display: flex;
}
.collectContent ul h4{
  line-height: 30px;
  height: 30px;
}
.collectContent ul b {
  font-size: 20px;
  color: orange;
}
.collectContent ul li div {
  padding: 10px 0;
}
.collectContent ul li p {
  margin: 10px 0;
}
.button{
  display: flex;
}
.collectContent button {
  flex: 1;
  margin-right: 5px;
  outline: none;
  border: none;
  width: 80px;
  height: 30px;
  border-radius: 8px;
  background: #afd9ee;
  font-size: 18px;
  cursor: pointer;
}
</style>
