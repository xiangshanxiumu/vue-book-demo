<template>
    <div class="footer">
    <router-link to="/home">
    <i class="iconfont icon-shouye"></i>
    <span>首页</span>
    </router-link>
    <router-link to="/list">
    <i class="iconfont icon-weibiaoti2010101"></i>
    <span>列表</span>
    </router-link>
    <router-link to="/collect">
    <i class="iconfont icon-shoucang"></i>
    <span>收藏</span>
    </router-link>
    <router-link to="/add">
    <i class="iconfont icon-zengjia"></i>
    <span>添加</span>
    </router-link>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
    .footer{
        position: fixed;
        left: 0;
        bottom: 0;
        height: 40px;
        width: 100%;
        display: flex;
    }
    a{
        display: flex;
        flex-direction: column;
        flex: 1;
        text-align: center;
        justify-content: center;
    }
    .router-link-active{
        color: red;
    }
</style>
