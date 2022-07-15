<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <img class="avatar"  v-if="playlist.creator"  :src="playlist.creator.avatarUrl" alt="" />
          <span class="name"  v-if="playlist.creator" >{{ playlist.creator.nickname }}</span>
          <span class="time">{{ playlist.createTime|dateFormat}} 创建</span>
        </div>
        <div class="play-wrap">
          <span class="iconfont icon-circle-play"></span>
          <span class="text">播放全部</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(tag,index) in playlist.tags" :key="index">{{tag}}</li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc"
            >{{playlist.description}}</span
          >
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead style="text-align: left">
            <th></th>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th style="width: 100px">发行时间</th>
          </thead>
          <tbody>
            <tr class="el-table__row" v-for="(item,index) in songDetail" :key="index" style="height: 80px;">
              <td style="text-align: center">{{index+1}}</td>
              <td>
                <div class="img-wrap" @click="playMusic(item)">
                  <img v-if="item.al"  v-lazy="item.al.picUrl" alt=""  />
                  <span class="iconfont icon-play"></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span class="iconfont icon-mv" v-if="item.mv!==0" @click="toMv(item.mv)"></span>
                  </div>
                  <span v-if="item.alia">{{ item.alia[0] }}</span>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>{{ item.publishTime|dateFormat }}</td>
            </tr>

          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane  v-if="comment" :label="'评论('+total+')'" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap" v-if="hotComment.length!==0">
          <p class="title">精彩评论<span class="number">({{ hotComment.length}})</span></p>
          <div class="comments-wrap" v-for="(hotC,index) in hotComment" :key="index">
            <div class="item" >
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
          <div class="comments-wrap" v-for="(com,index) in comment" :key="index">
            <div class="item">
              <div class="icon-wrap">
                <img v-lazy="com.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <span class="name">{{ com.user.nickname }}：</span>
                  <span class="comment">{{com.content}}</span>
                </div>
<!--            评论回复-->
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
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>


export default {
  name: 'playlist',
  data() {
    return {
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      //歌单详情数据
      playlist:[],
      //歌单中歌曲的id等信息
      trackIds:[],
      //歌曲id的集合
      songIds:[],
      //用字符串拼接以传参
      ids: "",
      //歌曲详情
      songDetail : [],
      //热门评论
      hotComment:[],
      //一般评论
      comment:[],

    };
  },
  created() {
    //请求歌单信息
     this.getPlaylist()
    //请求评论
    this.getHotComment()
    this.getNewComment()

  },
  methods: {
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val
      this.getNewComment()
    },
    getPlaylist() {
      this.request.get('/playlist/detail', {
        params: {
          id: this.$route.query.listId
        }
      }).then(res => {
        // console.log(res)
        this.playlist = res.playlist
        this.trackIds = res.playlist.trackIds
        //取出歌单id进行请求
        this.trackIds.forEach(t => {
          this.songIds.push(t.id)
        })
        //拼接成字符串,隔开才能请求
        for (let i = 0; i < this.songIds.length; i++) {
          if (i < this.songIds.length - 1) {
            this.ids += this.songIds[i] + ",";
          } else {
            this.ids += this.songIds[i];
          }
        }
        // console.log(this.ids)
        if (this.ids != '') {
          this.request.get('/song/detail?ids=' + this.ids).then(res => {
            // console.log(res)
            this.songDetail = res.songs
            // console.log(this.songDetail)
          })
        }
      })
    },
    // 获取歌单评论
    getHotComment() {
      this.request.get('/comment/hot', {
        params: {
          id: this.$route.query.listId,
          type: 2
        }
      }).then(res => {
        // console.log(res)
        this.hotComment = res.hotComments
      })
    },
    //获取最新评论
    getNewComment(){
      this.request.get('/comment/playlist',{
        params:{
          id:  this.$route.query.listId,
          limit : 10,
          //根据页码计算
          offset:(this.page-1)*10
        }
      }).then(res=>{
        this.total = res.total
        this.comment = res.comments
        // console.log(res)
      })
    },
    //播放mv
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },

    //播放歌曲
    playMusic(song){
      // console.log(song)
      // 请求获取歌曲的url
      this.request.get("/song/url?",{
        params:{
          id :song.id
        }
      }).then(res=>{

        let now = new Object()
        now.title = song.name
        now.artist = song.ar[0].name
        now.pic= song.al.picUrl
        now.lrc = ''

        // console.log(res)
        let src = res.data[0].url
        // //修改父组件index 里播放器的url
        now.src = src

        if (now.lrc === '') {
          this.request.get('/lyric?id=' + song.id).then(res => {
            now.lrc= res.lrc.lyric
          })
        }
        // console.log(now)
        this.$parent.songInfo = now
      })
        },

  }
};
</script>

<style >

</style>
