<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
    <!-- 循环获取的数据接口 -->
      <el-carousel-item v-for="(item,index) in banners" :key="index" >
        <img v-lazy="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">
        推荐歌单
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in list" :key='index'>
          <div class="img-wrap" @click="toPlaylist(item.id)">
            <div class="desc-wrap">
              <span class="desc">{{item.name}}</span>
            </div>
            <img v-lazy="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
          </div>
          <p class="name">{{item.name}}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">
        最新音乐
      </h3>
      <div class="items">
        <div class="item" v-for="(item,index) in newsongs" :key='index'>
          <div class="img-wrap">
            <!-- 都注册事件，容易点到 -->
            <img v-lazy="item.picUrl" alt="" @click="playMusic(item)" />
            <span class="iconfont icon-play" @click="playMusic(item.id)"></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{item.song.name}}</div>
            <div class="singer">{{item.song.artists[0].name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items" >
        <div class="item" v-for="(item,index) in mvs" :key="index">
          <div class="img-wrap" @click="toMv(item.id)">
            <img style="height:145px" :src="item.picUrl" alt="" />
            <span class="iconfont icon-play"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{item.playCount|playCountFormat}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistname}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>



export default {
  name: 'discovery',
  data(){
    return{
      //轮播图
       banners:[],
       //推荐歌单
       list:[],
       //最新歌曲
       newsongs:[],
       //推荐mv
       mvs:[],
       }
   
  },
  created(){
    //轮播图接口
    // axios({
    //   url:'http://localhost:3000/banner',
    //   method:'get',
    // }).then(res=>{
    //   this.banners = res.data.banners
    // })

    // 轮播图接口
    this.request.get("/banner").then(res=>{
      if(res.code == 200){
         this.banners = res.banners
      }
      }) 

    //推荐歌单
      this.request.get("/personalized?limit=10").then(res=>{
      if(res.code == 200){
         this.list = res.result
      }
      })

    //最新歌曲
      this.request.get("/personalized/newsong").then(res=>{
        if(res.code == 200){  
          // console.log(res)
          this.newsongs = res.result;
        }
      })

    //推荐mv
       this.request.get("/personalized/mv").then(res=>{
        if(res.code == 200){
          // console.log(res)
          this.mvs = res.result;
        }
      })
    },
    
    methods:{
        playMusic(song){
          // console.log(id)
          // 请求获取歌曲的url
          this.request.get("/song/url?",{
            params:{
              id : song.id
            }
          }).then(res=>{
            let now = new Object()
            now.title = song.song.name
            now.artist = song.song.artists[0].name
            now.pic= song.picUrl
            now.lrc = ''
            
            let src = res.data[0].url
            // //修改父组件index 里播放器的url
            now.src = src
            //获取歌词
            if (now.lrc === '') {
              this.request.get('/lyric?id=' + song.id).then(res => {
                now.lrc= res.lrc.lyric
              })
            }
            // console.log(now)
            this.$parent.songInfo = now
          })
        },

      toMv(id) {
        this.$router.push(`/mv?id=${id}`);
      },
      //携带参数跳转到歌单详情
      toPlaylist(id){
        this.$router.push(`/playlist?listId=${id}`)
      }
   }

  } 
 
  
   
;
</script>

<style >

</style>
