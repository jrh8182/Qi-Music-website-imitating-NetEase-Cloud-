<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video
          controls
          :src="mvPlayUrl"
        ></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info" v-for="(singer,index) in mvInfo.artists" :key="index" 
              style="display: inline-block; text-align: center ;margin-left: 9px"> 
          <div style="margin: 0 auto;"  class="avatar-wrap">
            <img :src="singer.img1v1Url" alt="" />
          </div>
          <span class="name">{{singer.name}}</span>
        </div>
        <div class="mv-info" >
          <h2 class="title">{{mvInfo.name}}</h2>
          <span class="date">{{mvInfo.publishTime}}</span>
          <span class="number">播放：{{ mvInfo.playCount|playCountFormat }}次</span>
          <p class="desc">
            {{mvInfo.desc}}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">精彩评论<span class="number">({{ hotComment.length}})</span></p>
        <div class="comments-wrap" v-if="hotComment.length!==0"   v-for="(hotC,index) in hotComment" :key="index">
          <div class="item">
            <div class="icon-wrap">
              <img :src="hotC.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ hotC.user.nickname }}：</span>
                <span class="comment">{{ hotC.content }}</span>
              </div>
              <div class="re-content" v-if="hotC.beReplied.length!==0" v-for="(replay,index) in hotC.beReplied" :key="index">
                <span class="name">{{replay.user.nickname}}：</span>
                <span class="comment">{{ replay.content }}</span>
              </div>
              <div class="date">{{ hotC.time|dateFormatDetail}}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">最新评论<span class="number">({{total}})</span></p>
        <div class="comments-wrap"  v-for="(com,index) in comments" :key="index">
          <div class="item">
            <div class="icon-wrap">
              <img v-lazy="com.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ com.user.nickname }}：</span>
                <span class="comment">{{com.content}}</span>
              </div>
              <div class="re-content" v-if="com.beReplied.length!==0" v-for="(re,index) in com.beReplied" :key="index">
                <span class="name">{{re.user.nickname}}：</span>
                <span class="comment">{{ re.content }}</span>
              </div>
              <div class="date">{{com.time|dateFormatDetail}}</div>
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
        :limit="limit"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items" v-for="(mv,index) in simMv" :key="index">
          <div class="item" @click="toMv(mv.id)">
            <div class="img-wrap">
              <img v-lazy="mv.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{mv.playCount|playCountFormat}}</div>
              </div>
              <span class="time">{{ mv.duration|timeFormat }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ mv.name }}</div>
              <div class="singer">{{ mv.artists[0].name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'mv',
  data() {
    return {
      //当前mvid
      mvId: 0 ,
      //当前mv播放信息
      mvPlayUrl:"",
      //mv相关信息
      mvInfo:"",
      //mv评论
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 10,
      //热门评论
      hotComment:[],
      //最新评论
      comments:[],
      //相似mv
      simMv: [],
    };
  },
  created(){
    this.getUrlId()
    //为了防止异步问题，最好还是用路由获取id，后续修改
    //先获取id ，再进行其他请求
    this.load()
  },
  watch:{
    //监听页面当前的mvid是否变化，若变化重新请求
    mvId(){
      this.load()
    }
  },

  methods: {
    load(){
      if (this.mvId===0){
        this.$message.warning("请稍等")
        return
      }
      this.getUrl(this.mvId)
      this.getMvinfo(this.mvId)

      //请求评论
      this.getHotComment()
      this.getNewComment()

      //类似mv推荐
      this.getSimMv()
    },

    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val
      this.getNewComment()
    },
    //获取歌曲id
    getUrlId(){
      this.mvId = this.$urlParse.getUrlKey("id")
      // console.log(this.mvId)
    },
    //获取播放url
    getUrl(id){
      // 封装的方法获取当前页面的参数
      // let url = window.location.href
      // console.log(id)
      //请求播放mv  ----分辨率暂时不写
      //id计算的很快一般不用担心跳转不到,或者使用route传参
        if (id===0){
          this.$message.warning("还未加载")
        }

      this.request.get("/mv/url?",{
        params:{
          id : id
        }
      }).then(res=>{
        this.mvPlayUrl = res.data.url
        // console.log(this.mvPlay)
      })
    },
    //获取mv信息
    getMvinfo(mvid){
      this.request.get("/mv/detail?",{
        params:{
          mvid : mvid
        }
      }).then(res=>{
        // console.log(res)
        this.mvInfo =  res.data
      })
    },
    //请求相似歌单
    getSimMv(){
      this.request.get('/simi/mv',{
        params:{
          mvid : this.mvId
        }
      }).then(res=>{
        // console.log(res)
        this.simMv = res.mvs
      })
    },

    //请求热门评论
    // 获取歌单评论
    getHotComment() {
      this.request.get('/comment/hot', {
        params: {
          id: this.mvId,
          type: 1
        }
      }).then(res => {
        // console.log(res)
        this.hotComment = res.hotComments
      })
    },
    //获取最新评论
    getNewComment(){
      this.request.get('/comment/mv',{
        params:{
          id:  this.mvId,
          limit : 10,
          //根据页码计算
          offset:(this.page-1)*10
        }
      }).then(res=>{
        this.total = res.total
        this.comments = res.comments
        // console.log(res)
      })
    },

    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
      //重置id
      this.getUrlId()
    },

    //查询歌手信息
    toSinger(id){
        
    }
  }
};
</script>

<style></style>
