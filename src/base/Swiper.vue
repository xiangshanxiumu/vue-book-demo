<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="slide in sliders" :key='slide.sliderId'><img :src="slide.sliderSrc"/></swiper-slide>
    <div  slot="pagination"></div>
  </swiper>
</template>
<script>
export default {
  name: 'carrousel',
  props: ['sliders'],
  data () {
    return {
      swiperOption: {
        autoplay: 1000,
        setWrapperSize: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        mousewheelControl: true,
        observeParents: true
      },
      swiperSlides: [1, 2, 3, 4, 5]
    }
  },
  mounted () {
    setInterval(() => {
      // console.log('simulate async data')
      if (this.swiperSlides.length < 10) {
        this.swiperSlides.push(this.swiperSlides.length + 1)
      }
    }, 1000)
  }
}
</script>
<style scoped>
img{
  width: 100%;
}
</style>
