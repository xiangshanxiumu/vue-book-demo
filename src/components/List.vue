<template>
    <div>
        <Mheader>列表</Mheader>
        <Loading v-if="show"></Loading>
        <div class="mainContent" ref="scroll" @scroll="loadMore">
          <ul>
            <router-link v-for="book in someBooks" tag="li" :to="{name:'detail',params:{bid:book.bookId}}" :key="book.bookId">
              <img :src="book.bookCover"/>
              <div>
                <h4>{{book.bookName}}</h4>
                <p>{{book.bookDesc}}</p>
                <b>{{book.bookPrice}}￥</b>
                <div class="button">
                <div><button @click.stop="remove(book.bookId)">删除</button></div>
                <div><button @click.stop="collect(book.bookId)" v-if="!book.bookCollection">收藏</button></div>
                </div>
              </div>
            </router-link>
          </ul>
          <div class="getMore" @click="getMore" v-if="hasMore">加载更多</div>
        </div>
    </div>
</template>
<script>
import Mheader from '../base/Mheader'
import {getSomeBooks, removeBook, collectBook} from '../api/index'
import Loading from '../base/Loading'
import { setInterval, clearInterval, setTimeout, clearTimeout } from 'timers'
export default {
  data () {
    return {
      someBooks: [],
      show: true,
      hasMore: true,
      index: 0
    }
  },
  created () {
    // this.getAllBook()
    // this.remove()
    this.getSomeBooks()
  },
  // 下拉刷新哪数据
  mounted () {
    let scroll = this.$refs.scroll
    let top = scroll.offsetTop
    // console.log(top)
    let distance = 0
    scroll.addEventListener('touchstart', (e) => {
      // console.log(scroll.scrollTop)
      if (scroll.scrollTop !== 0) {
        return
      }
      let start = e.touches[0].pageY
      let move = (e) => {
        let current = e.touches[0].pageY
        let distance = current - start // 拉动的距离
        // console.log(distance)
        if (distance > 0) {
          if (distance <= 50) {
            scroll.style.top = top + distance + 'px'
          } else {
            scroll.style.top = top + 50 + 'px'
          }
        } else {
          scroll.removeEventListener('touchmove', move)
          scroll.removeEventListener('touchend', end)
        }
      }
      let end = (e) => {
        clearInterval(this.timer2)
        this.timer2 = setInterval(() => {
          distance -= 5
          if (distance <= 0) {
            clearInterval(this.timer2)
            distance = 0
            // 获取数据
            if (this.hasMore) {
              this.index += 3
              this.getSomeBooks(this.index)
            }
          }
          scroll.style.top = top + distance + 'px'
        }, 10)
      }
      scroll.addEventListener('touchmove', move)
      scroll.addEventListener('touchend', end)
    })
  },
  methods: {
    // 上拉刷新数据
    loadMore () {
      // 开启延时器节流 提升性能
      if (this.hasMore) {
        clearTimeout(this.timer1)
        this.timer1 = setTimeout(() => {
          let {scrollTop, scrollHeight, clientHeight} = this.$refs.scroll
          if (scrollHeight - scrollTop - clientHeight <= 10) {
            this.getMore()
          }
        }, 50)
      }
    },
    // 获取所有图书
    /* async getAllBook () {
      this.allBooks = await getAllBooks()
      this.show = false // 拿到数据后 Loading效果隐藏
    }, */
    // 加载更多图书
    getMore () {
      this.index += 5
      this.getSomeBooks(this.index)
    },
    // 获取部分图书
    async getSomeBooks () {
      let {books, hasMore} = await getSomeBooks(this.index)
      this.someBooks = books
      this.hasMore = hasMore
      this.show = false
    },
    // 删除某本图书
    async remove (id) {
      await removeBook(id)
      // console.log(id)
      // console.log(this.someBooks)
      this.someBooks = this.someBooks.filter(item => item.bookId !== id)
    },
    // 收藏某本书
    async collect (id) {
      // console.log(id)
      await collectBook(id)
      this.someBooks = this.someBooks.map(item => {
        if (item.bookId === id) {
          item.bookCollection = true
        }
        return item
      })
      // this.$router.push('/list')
    }
  },
  components: {
    Mheader,
    Loading
  }
}
</script>
<style scoped>
.mainContent {
  position: absolute;
  width: 100%;
  top: 40px;
  bottom: 50px;
  overflow: auto;
}
.mainContent ul {
  display: flex;
  flex-wrap: wrap;
}
.mainContent ul li {
  display: flex;
}
.mainContent ul h4{
  line-height: 30px;
  height: 30px;
}
.mainContent ul b {
  font-size: 20px;
  color: orange;
}
.mainContent ul li div {
  padding: 10px 0;
}
.mainContent ul li p {
  margin: 10px 0;
}
.button{
  display: flex;
}
.mainContent button {
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
.mainContent .getMore {
  margin: 0 10px;
  height: 30px;
  line-height: 30px;
  background: #afd9ee;
  font-size: 18px;
  text-align: center;
}
</style>
