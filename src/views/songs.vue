<template>
  <div class="songs-container">
    <div class="tab-bar topbar">
      <!-- 获取 key 数字 求 value 地区 -->
      <span class="item"  :class="{active: type == Object.keys(area)[0] }" 
            v-for="(area,index) in areas" :key="index"
            @click="changeArea(Object.keys(area)[0])">{{area[Object.keys(area)[0]]}}</span>
  
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th class="toLeft">音乐标题</th>
        <th class="toLeft">歌手</th>
        <th class="toLeft" style="width:330px">专辑</th>
        <th class="toLeft">时长</th>
      </thead>
      <tbody >
        <tr class="el-table__row" style="height: 80px;"
          v-for="(song,index) in songs" :key="index">
          <td  style="font-size: 14px; text-align: center;">{{index+1}} </td>
          <td>
            <!-- 点击播放音乐 -->
            <div class="img-wrap" @click="playMusic(song)">
              <img v-lazy="song.album.blurPicUrl" :key="song.album.blurPicUrl"  alt="" />
              <span class="iconfont icon-play"></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{song.name}}</span>
                <span class="iconfont icon-mv"  v-if="song.mvid"  @click="toMv(song.mvid)"></span>
              </div>
              <span>{{song.album.alias[0]}}</span>
            </div>
          </td>
          <td>{{song.album.artists[0].name}}</td>
          <td>{{song.album.name}}</td>
          <td>{{song.duration|timeFormat}}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>

export default {
  name: 'songs',
  components:{

  },
  data() {
    return {
      // 地区类型,默认全部
      type: 0,
      areas:[{0:'全部'},{7:'华语'},{96:'欧美'},{8:'日本'},{16:'韩国'}],
      songs:[],
    };
  },
  created(){
    // console.log(this.areas)
    this.getNewSong()
  },
      // type: 地区类型 id,对应以下:
    // 全部:0
    // 华语:7
    // 欧美:96
    // 日本:8
    // 韩国:16
  methods:{
    getNewSong(){
      this.request.get("/top/song",{
        params:{
          type : this.type
        }
      }).then(res=>{
          this.songs = res.data
        //处理时长 毫秒 转为分秒    
        //后续可以使用moment过滤器
        // 已经使用js里写的过滤器
          })
      },
    
    //点击切换分区
    changeArea(nowtype){
      this.type = nowtype
      this.getNewSong();
    },

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
        now.artist = song.artists[0].name
        now.pic= song.album.blurPicUrl
        now.lrc = ''

        // console.log(res)
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
  }
};
</script>

<style >
  .toLeft{
      text-align: left
  }

  .topbar{
    height: 30px;
    align-items: center;
    padding: 0 20px;
    vertical-align: top;
    box-sizing: border-box; 
    /* border: 1px #ced8e4 solid;  */
    border-right: 0;
    border-radius: 20px 20px 0 0 ; 
    box-shadow: 0 0 10px 2px #bdcee0;
  }
</style>
