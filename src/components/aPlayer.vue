<template>
  <div class="mainPage" ref="MainRef">
    <aplayer
        :autoplay="autoplay"
        :music="songInfo"
        :showLrc="showLrc"
        :mutex="mutex"
        :theme="theme"
        :shuffle="shuffle"
        :repeat="repeat"
        :listFolded="listFolded"
        :listMaxHeight="listMaxHeight"
        :list="list"
        :controls="controls"
        :muted="muted"
        :volume="volume"
        :preload="preload"
    ></aplayer>

  </div>
</template>

<script>
import Aplayer from 'vue-aplayer'
export default {
  props: {
    /**
     *  音频配置
     * */
    songInfo: {
      type: Object,
      default: () => {
        return {
          title: '', //歌曲名称
          artist: ' ', //演唱者
          lrc: '', //LRC 歌词或者歌词文件的 URL
          pic: '', //封面图片 URL
          src: '' //音频文件的 URL
        }
      }
    },
    /**
     *  播放列表。如果 list 不是空数组，播放列表就会显示出来，即使 list 中只有一首歌并且它和 music 一样
     * */
    list: {
      type: Array,
      default: () => {
        return [
          {
            artist:"徐梓淳",
            lrc:"[00:00.000] 作词 : 于浩y/泽蛋\n[00:01.000] 作曲 : 徐轶凡/于浩y\n[00:02.000] 编曲 : 徐轶凡\n[00:03.000] 制作人 : 徐轶凡\n[00:04.000] 出品 : 雪球音乐\n[00:05.000] 发行 : 雪球音乐×Hot Cake Studio\n[00:06.000] 营销 : 雪球音乐×Hot Cake Studio\n[00:07.000] 混音 : within_轶名\n[00:08.000] 企划 : 豆心\n[00:09.000] 统筹 : 柴柴/泽蛋\n[00:10.000] 出品人 : 张迟\n[00:11.820]我会慢慢地疏远离开\n[00:14.610]只为成全你和他的爱\n[00:17.430]而我不经意间看见你对他的偏爱\n[00:20.070]这感情对我都是空白\n[00:23.010]我要慢慢地学会期待\n[00:25.770]期待没发生的事到来\n[00:28.560]这场爱幻灭终究毁了期待\n[00:31.260]如果你不爱我就别对我说出爱\n[00:34.740]你是我任何时候遇见都不嫌晚的人\n[00:37.560]我只是一个喜欢对你偏爱的保护神\n[00:40.350]可是我是一个喜欢独处的病人\n[00:43.080]唯独爱你这件事情我总是藏得很深\n[00:45.900]失去一个人最快的方法是靠得太近\n[00:48.750]那我们公平一点你走向我 我坚定你\n[00:51.540]如果你能开心忘了我也没关系\n[00:54.420]在力所能及的地方 请善待自己\n[01:18.810]你不会发现我已离开\n[01:21.569]沉浸在他编织的未来\n[01:24.360]我也不去猜测是否有过我的存在\n[01:27.060]哪怕只一秒在你脑海\n[01:30.030]你不会转身朝我走来\n[01:32.759]期待被失望完全取代\n[01:35.518]我明白祈求也无法再重来\n[01:38.220]也明白他并不是我们唯一阻碍\n[01:41.640]你是我任何时候遇见都不嫌晚的人\n[01:44.518]我只是一个喜欢对你偏爱的保护神\n[01:47.280]可是我是一个喜欢独处的病人\n[01:50.099]唯独爱你这件事情我总是藏得很深\n[01:52.860]失去一个人最快的方法是靠得太近\n[01:55.709]那我们公平一点 你走向我 我坚定你\n[01:58.530]如果你能开心忘了我也没关系\n[02:01.378]在力所能及的地方 请善待自己\n[02:04.408]你是我任何时候遇见都不嫌晚的人\n[02:06.959]我只是一个喜欢对你偏爱的保护神\n[02:09.598]可是我是一个喜欢独处的病人\n[02:12.360]唯独爱你这件事情我总是藏得很深\n[02:15.209]失去一个人最快的方法是靠得太近\n[02:18.028]那我们公平一点 你走向我 我坚定你\n[02:20.848]如果你能开心忘了我也没关系\n[02:23.729]在力所能及的地方 请善待自己\n",
            pic:"https://p2.music.126.net/8MarMiGXnykPib2L3cKv7A==/109951165847468026.jpg",
            src:"http://m801.music.126.net/20220715200347/7ac39503d81cc36687fc9dc1db760549/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/14096526702/b05d/f304/652c/d05cc37633ac27155bd97940a6a32924.mp3",
            title:"嫌晚",
          },
          {
            artist:"Shang",
            lrc:"[00:00.000] 作词 : Shang\n[00:01.000] 作曲 : Jurrivh\n[00:16.580]醒来的时间没有一点不同\n[00:20.500]记忆像跳动在脉搏下的痛\n[00:24.680]把歌词写得含蓄没人猜透\n[00:28.840]说完的话 放开的手\n[00:33.090]我学着如何过得那么从容\n[00:37.440]当我的话已没有谁能懂\n[00:41.610]就让沉默来掩盖我的所有\n[00:45.170]你的温柔 ，不再回头\n[00:48.950]向黑暗中坠落\n[00:50.970]如飞蛾扑向火\n[00:53.060]把枷锁都挣脱\n[00:55.480]让泪水把我淹没\n[00:57.190]判决我犯的错\n[00:59.290]原谅我的懦弱\n[01:01.340]永恒的孤独 就当是你 给我上的锁\n[01:05.950]当我开始学会戴上了面具\n[01:07.959]用来躲避那些锋利的言语\n[01:10.069]生而为人多么残酷的命题\n[01:12.340]我是应该通往天堂或地狱\n[01:14.430]一切回忆让它飘散在风中\n[01:16.670]不用在意谁是毁灭的真凶\n[01:18.530]如果生命只有短暂一分钟\n[01:20.578]想把整个世界全部都清空\n[01:22.599]I don’t even wanna know who’s with me.\n[01:24.688]They ain’t never got no time to remind me.\n[01:26.730]I swallow 20 shots like a black sheep\n[01:28.938]All I know is how to be so crazy\n[01:31.069]You can never tell me Shang you should let it go\n[01:33.239]Cuz live or die I don’t wanna know\n[01:35.218]It’s funny how my life is a black hole\n[01:37.360]I’m really tired of the damn show\n[01:55.640]向黑暗中坠落\n[01:57.718]如飞蛾扑向火\n[01:59.709]把枷锁都挣脱\n[02:01.888]让泪水把我淹没\n[02:03.858]判决我犯的错\n[02:06.069]原谅我的懦弱\n[02:08.109]永恒的孤独 就当是你 给我上的锁\n[02:13.039]你给我的承诺，早遗忘了很久\n[02:16.399]无力的解释为何那天依然开了口\n[02:20.609]故事里的片段，留在离开以后\n[02:24.649]手心的温度是我给你最后的温柔\n[02:44.579]Prod. Jurrivh\n[02:45.399]发行：北京太声文化传播有限公司\n",
            pic:"https://p2.music.126.net/k3SUfJKUut0krqfdOdk9fA==/109951164353498060.jpg",
            src:"http://m7.music.126.net/20220715200441/8d40817594e644620358ccfded7a3bc9/ymusic/5252/515d/0452/e82100c912f792307dc138824430dced.mp3",
            title:"言语",

          }
        ]
      }
    },
    /**
     *  是否展示歌词
     * */
    showLrc: {
      type: Boolean,
      default: false
    },
    /**
     *  自动播放。如果多个 mutex 播放器设置了 autoplay，只有第一个会自动播放
     * */
    autoplay: {
      type: Boolean,
      default: true
    },
    /**
     *  显示原生 audio 元素（在播放器面板和播放列表面板之间）
     * */
    controls: {
      type: Boolean,
      default: false
    },
    /**
     *  静音
     * */
    muted: {
      type: Boolean,
      default: false
    },
    /**
     *  是否在该播放器播放时暂停其他播放器
     * */
    mutex: {
      type: Boolean,
      default: true
    },
    /**
     *  随机播放
     * */
    shuffle: {
      type: Boolean,
      default: false
    },
    /**
     *  默认收起播放列表
     * */
    listFolded: {
      type: Boolean,
      default: false
    },
    /**
     *  主题色。如果当前歌曲也设置了 theme 则以歌曲的为准
     * */
    theme: {
      type: String,
      default: '#41b883'
    },
    /**
     *  轮播模式。值可以是 'repeat-one'（单曲循环）'repeat-all'（列表循环）或者 'no-repeat'（不循环）。
     *  为了好记，还可以使用对应的 'music' 'list' 'none'
     * */
    repeat: {
      type: String,
      default: 'no-repeat'
    },
    /**
     * 播放列表面板最大高度
     * */
    listMaxHeight: {
      type: String,
      default: ''
    },
    /**
     * 加载音乐的方式可以是“none”“metadata”或“auto”
     * */
    preload: {
      type: String,
      default: 'none'
    },
    /**
     * 播放音量
     * */
    volume: {
      type: Number,
      default: 0.8
    },

  },
  watch: {
    songInfo(){
      this.checkLrc()
    },
  },
  data() {
    return {

    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
      checkLrc(){
        if (this.songInfo !=''){
          this.showLrc = true
        }else {
          this.showLrc = false
        }
      }
  },
  components: {
    Aplayer
  },
  beforeDestroy() {
  }

}
</script>

<style lang='scss' scoped>
.mainPage{
  width:100%; height:auto;
  background: #FCFCFC;
  border: 1px solid #E0E0E0;
  border-radius: 4px;

}


</style>