<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card" @click="toPlaylist(topPlaylist.id)">
      <div class="icon-wrap ">
        <img :src="topPlaylist.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">
          {{topPlaylist.name}}
        </div>
        <div class="info">
         {{topPlaylist.description}}
        </div>
      </div>
      <img :src="topPlaylist.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <!-- 取十条，后续可做一个伸缩吧全部展示出来 -->
        <span class="item" :class="{active: cat == '全部'}" @click="changeCat('全部')">全部</span>
        <span class="item"  v-for="(tag,index) in tags.slice(0,8)" :key="index" 
        :class="{active: tag.name == cat}"  @click="changeCat(tag.name)">{{tag.name}}</span>

      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item,index) in comPlaylists" :key="index" @click="toPlaylist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{item.playCount|playCountFormat}}</span>
              </div>
              <img v-lazy="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
    <!-- 分页器 -->
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: 'recommend',
  data() {
    return {
      //顶部精选歌单歌单
      topPlaylist:{},
      //中部推荐歌单
      comPlaylists:[],
      //歌单类型
      cat:"全部",
      // 总条数
      total:100,
      // 页码
      page:1,
      //偏移量 初始为0
      offset:0, 
      //一页请求10条
      pagelimit : 10,
      // 歌单标签
      tags:[],
    };
  },
  created(){
    //获取歌单标签
    this.request.get("/playlist/highquality/tags").then(res=>{
      this.tags = res.tags
    })
    

    //获取顶部精选歌单
   this.getTopPlaylist()
    
    //获取推荐歌单
    this.getComPlaylists()
   
      },
  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      //切换页数
      this.page = val
      // console.log(this.page)
      this.getComPlaylists()
    },

    getTopPlaylist(){
      
      this.request.get("/top/playlist/highquality",{
        params:{
          limit : 1,
          cat : this.cat
        }
     }).then(res=>{
        this.topPlaylist = res.playlists[0]
      // console.log(res)
    })
    },


    getComPlaylists(){
         //获取中部歌单
     this.request.get("/top/playlist",{
      params:{
        limit : this.pagelimit,
        offset : (this.page-1)*this.pagelimit , 
        cat : this.cat
      }
    }).then(res=>{
      this.comPlaylists = res.playlists
    })
    },

    //切换歌单类别
    changeCat(newCat){
      this.cat = newCat
      // 切换类别，重新加载，页数归0
      this.page= 1
      //重新请求
      this.getTopPlaylist()
      this.getComPlaylists();

     },
    //前往歌单详情页
    toPlaylist(id){
      //携带数据
      this.$router.push(`/playlist?listId=${id}`)
    }
  }

  



};
</script>

<style >

</style>
