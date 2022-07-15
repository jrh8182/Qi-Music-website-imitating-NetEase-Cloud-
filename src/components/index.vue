<template>
  <div class="index-container" :style="theBottomStyle">
    <div class="nav" :hidden="ishidden">
      <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-find-music"></span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlists">
            <span class="iconfont icon-music-list"></span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-music"></span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/mvs">
            <span class="iconfont icon-mv"></span>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>
    <!-- $event 传入scroll 原生事件的参数  直接写函数名也可以，默认传递但是为了后续逻辑判断-->
    <div class="main" @scroll="handleScroll($event)">
      <router-view></router-view>
    </div>
    <div class="player"  style="height: 100px; "  :hidden="showPlayer">
      <!-- autoplay 设置自动播放 -->
<!--      <audio :src='musicUrl' controls autoplay></audio>-->
      <aPlayer :songInfo="songInfo"  :autoplay="true" :muted="true"    :controls="true" :show-lrc="true" :lrcType="1" v-if="songInfo"  />
    </div>
      <!--下拉超过一定范围出现回到最顶    -->
    <div class="toTop" v-if="showToTop" @click="backTop">
      <el-button icon="el-icon-top"   circle></el-button>
    </div>
    <!-- 双向绑定了路由路径作为选中效果，避免进入其他页面或者回退操作的异常。。点击可以route push      -->
    <el-tabs id="navTabs"  :active-name="this.$route.path"  :tab-position="tabPosition" style="height: auto;"  @tab-click="handleClick"  v-if="ishidden==true">
      <el-tab-pane label="发现音乐" name='/discovery'></el-tab-pane>
      <el-tab-pane label="推荐歌单" name='/playlists'></el-tab-pane>
      <el-tab-pane label="最新音乐" name='/songs'></el-tab-pane>
      <el-tab-pane label="最新M V" name='/mvs'></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

import aPlayer from "@/components/aPlayer";
export default {
  name: 'index',
  components:{
    aPlayer
  },
  props:{
    //控制nav收缩
    ishidden : Boolean,
    //音频是否出现
    showPlayer:Boolean,
  },
  data() {
    return {
      musicUrl:"",
      //收起audio条时后，内边距同时改变
      theBottomStyle:{
        paddingBottom: '90px',
      },
      //返回顶端按钮
      showToTop:false,
      //关闭侧边栏后的悬浮窗口
      tabPosition: 'left',
      //歌曲信息
      songInfo:
          {
          title: '我爱祖国.map3', //歌曲名称
          artist: '123', //演唱者
          lrc: '', //LRC 歌词或者歌词文件的 URL
          pic: '', //封面图片 URL
          src: 'https://music.163.com/song/media/outer/url?id=1466598056.mp3' //音频文件的 URL
          },

    };
  },
  watch:{
    showPlayer(){
      //若为true即 hidden为true 隐藏 ,内边距设置为0可全屏展示
      if (this.showPlayer===true){
        this.$data.theBottomStyle.paddingBottom = '0px'
      }else {
        this.$data.theBottomStyle.paddingBottom = '84px'
      }
    }
  },
  //监听main容器里的scroll,这里因为不是全局的scroll，所以用window或者document.body之类的是读不出来的！
  methods:{
    handleScroll(e){
      if (this.scrollTop === 0){
        this.showToTop = false
      }
      if(e.target.scrollTop>700){
        // console.log(e.target.scrollTop)
        // e.target.scrollTop = 0
        this.showToTop = true
      }else {
        this.showToTop = false
      }
    },
    backTop(){
      //不显示
      this.showToTop = !this.showToTop
      //获取元素main盒子的scrollTop
      //做滑动效果---懒得做
     document.getElementsByClassName('main')[0].scrollTop = 0
    },
    //用标签实现简单路由跳转
    handleClick(tab) {
      // console.log(tab, event);
      let url = tab.name
      this.$router.push(url)
    }
  },

};
</script>

<style >
    .toTop{
        position: fixed;
        bottom: 130px;
        right: 100px;
    }

    #navTabs{
      position:absolute;
      top:200px;
      right:100px;
    }


</style>
