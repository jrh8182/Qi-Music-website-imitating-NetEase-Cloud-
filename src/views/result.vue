<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{this.$route.query.queryWord}}</h2>
      <span class="sub-title">找到{{this.resultCount}}个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead class="addhe" style="height: 20px">
          <th></th>
          <th>音乐标题</th>
          <th>歌手</th>
          <th>专辑</th>
          <th>时长</th>
          </thead>
          <tbody>
          <tr style="height: 38px" v-for="(item,index) in songList" :key="index" class="el-table__row">
            <td style="text-align: center">{{index+1}}</td>
            <td>
              <div class="song-wrap">
                <div   @click="toPlay(item.id)" class="name-wrap">
                  <span>{{ item.name }}</span>
                  <span v-if="item.mvid !== 0" class="iconfont icon-mv" @click="toMv(item.mvid)"></span>
                </div>
                <!--  二级标题-->
                <span style="margin-top: 4px ; margin-bottom: 6px"  v-if="item.alias.length!==0">{{ item.alias[0] }}</span>
              </div>
            </td>
            <td>{{item.artists[0].name}}</td>
            <td>{{item.album.name}}</td>
            <td>{{ item.duration|timeFormat }}</td>
          </tr>

          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div v-for="(item,index) in playList" :key="index"   class="item"
               @click="toPlaylist(item.id)">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount|playCountFormat  }}</span>
              </div>
              <img v-lazy="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play"></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>

        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="(item,index) in mvList" :key="index" @click="toMv(item.id)">
            <div class="img-wrap">
              <img v-lazy="item.cover" alt="" />
              <span class="iconfont icon-play"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount|playCountFormat }}</div>
              </div>
              <span class="time">{{ item.duration|timeFormat }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{item.artistName}}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>



export default {
  name: 'result',
  data() {
    return {
      //tab 切换时会改变的数据
      activeIndex: 'songs',
      //保存 查询歌曲的数据
      songList : [],
      //歌单数据
      playList : [],
      //mv数据
      mvList : [],
      //查询结果总数
      resultCount : 0,
    };
  },
  created() {
    this.search(1)
  },
  watch:{
    //监视查询关键词刷新页面
    '$route.query.queryWord'(){
      if (this.activeIndex == 'songs'){
        //如果在歌单页面直接刷新
        this.search(1)
      }else {
        //将面板切换至歌曲，触发下面的监视器，重新请求
        this.activeIndex = 'songs'
      }
    },

    activeIndex(){
      //songs lists mv
      let type = 1;
      switch (this.activeIndex) {
        case 'songs':
          type = 1;
          break;
        case 'lists':
          type = 1000;
          break;
        case 'mv':
          type = 1004;
          break;
        default:
          break;
      }
      //查找结果
      this.search(type)
      // console.log(this.playList)
      //根据当前面板展示结果
      }
    },
  methods:{
    //查询接口
    search(type){
      let limit = 15

      if (type === 1000){
        limit = 10
      }else if (type === 1004){
        limit = 8
      }else{
        limit = 15
      }

      this.request.get("/search?",{
        params: {
          keywords: this.$route.query.queryWord,
          type: type,
          //获取数据量
          limit: limit,
        }
      }).then(res=> {
        // 请求歌曲情况
        if (type ==1) {
          this.songList = res.result.songs
          // 保存总数
          this.resultCount = res.result.songCount
          // 修改时长，改为使用过滤器

        }else if(type == 1000){
            this.playList = res.result.playlists
            //总数
            this.resultCount = res.result.playlistCount
            //处理播放数
        }else{
          //保存mv
          this.mvList = res.result.mvs
          //总数
          this.resultCount = res.result.mvCount
          //处理播放数
        }
      })
    },
    toMv(mvid){
      this.$router.push('/mv?id='+mvid)
    },
    toPlay(id){
        // 请求获取歌曲的url
        this.request.get("/song/url?",{
          params:{
            id : id
          }
        }).then(res=>{
          // console.log(res)
          let url = res.data[0].url
          //修改父组件index 里播放器的url
          this.$parent.musicUrl = url
        })
    }
    ,
    toPlaylist(id){
      //携带数据
      this.$router.push(`/playlist?listId=${id}`)
    }
  }
};
</script>

<style >
  .addhe{
    text-align: left;
  }
  .mb-5{
    margin-bottom: 5px;
  }
</style>
