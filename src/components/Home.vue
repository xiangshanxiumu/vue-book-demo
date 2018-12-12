<template>
    <div>
        <Mheader :back="true">首页</Mheader>
        <Loading v-if="show"></Loading>
        <div class="carrousel">
          <Swiper :sliders="sliders"></Swiper>
          <h3>热门图书</h3>
          <ul>
            <router-link v-for="book in hotBooks" tag="li" :to="{name:'detail',params:{bid:book.bookId}}" :key="book.bookId">
              <img :src="book.bookCover"/>
              <b>{{book.bookName}}</b>
            </router-link>
          </ul>
        </div>
    </div>
</template>
<script>
import Mheader from '../base/Mheader'
import Swiper from '../base/Swiper'
import Loading from '../base/Loading'
import { getHomeInfo } from '../api/index'
export default {
  created () {
    // this.getSlider()
    // this.getHotBook()
    this.getHomeInfo()
  },
  data () {
    return {
      sliders: [],
      hotBooks: [],
      show: true
    }
  },
  components: {
    Mheader,
    Swiper,
    Loading
  },
  methods: {
    // 获取轮播图片数据
    /* async getSlider () {
      this.sliders = await getSliders()
    },
    // 获取热门图书数据
    async getHotBook () {
      this.hotBooks = await getHotBooks()
    }, */
    // 把多个异步请求封装到一个方法getIofo里面 使用axios.all
    /* getInfo () {
      let that = this
      axios.all([getSliders(), getHotBooks()])
        .then(axios.spread(function (sliders, hotBooks) {
          that.sliders = sliders
          // console.log(getSliders)
          that.hotBooks = hotBooks
          // console.log(getHotBooks)
          that.show = false // 拿到数据后 Loading 效果隐藏
        }))
    } */
    // 把多个异步请求封装到一个方法getHomeInfo里面 axios.all从接口文件里面引入
    async getHomeInfo () {
      let [sliders, hotBooks] = await getHomeInfo()
      this.sliders = sliders
      this.hotBooks = hotBooks
      this.show = false // 拿到数据后 Loading 效果隐藏
    }
  }
}
</script>
<style scoped>
li{
  width: 50%;
  float: left;
  text-align: center;
  margin: 5px 0;
}
</style>
