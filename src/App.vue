<template>
  <div id="app">
    <!-- 头部组件 -->
    <top @changeHidden="changeHidden"  @changePlayer="changePlayer"></top>
    <!-- 主体组件 -->
    <index :ishidden="ishidden" :show-player="showPlayer"></index>
  </div>
</template>

<script>
import top from './components/top.vue'
import index from './components/index.vue'
export default {
  name: '',
  components:{
    top,
    index,
  },
  data () {
    return {
      msg: '',
      //控制导航栏的收缩，在top.vue 中使用props注入
      ishidden : false,
      showPlayer: false,
    }
  },
  methods: {
    //控制hidden字段，index中使用emit调用修改
      changeHidden(){
        this.ishidden = !this.ishidden
      },
      changePlayer(){
        this.showPlayer = !this.showPlayer
     }
  },
  mounted () {

  }
}
</script>

<style>

</style>
