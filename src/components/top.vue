<template>
  <div class="top-container">
    <div class="left-box">
      <div class="icon-wrapper">
        <span class="iconfont icon-home" @click="toHome()"></span>
        <span class="iconfont icon-sami-select" @click="handleNav()"></span>
        <span class="iconfont icon-full-screen" @click="handlePlayer()"></span>
      </div>
      <div class="history-wrapper">
        <span class="iconfont icon-arrow-lift" @click="go(-1)"></span>
        <span class="iconfont icon-arrow-right" @click="go(1)"></span>
      </div>
    </div>
    <div class="right-box">
      <el-button type="warning" size="small" style="margin-right: 5px" @click="toLogin()"> 登录 </el-button>
      <div class="el-input el-input--small el-input--prefix">
        <input
            type="text"
            autocomplete="off"
            placeholder="搜索"
            class="el-input__inner"
            v-model="inputValue"
            @keyup.enter= "toResult"
        />
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'top',
    data() {
      return {
        //输入的内容
        inputValue : '',
      }
    },
    methods:{
      toResult(){
        if (this.inputValue == ''){
          this.$message.warning("请输入内容")
        }else {
          //跳转搜索页 携带数据
          this.$router.push('/result?queryWord='+this.inputValue)
        }
      },
      toLogin(){
        this.$notify({
          title: '还真的点啊',
          message: '这功能我还没做呢！！！',
          duration: 2500,
          offset: 100
        });
      },
      toHome(){
        // console.log(222)
        if (this.$route.path=='/discovery'){
          this.$message.warning("已经回到主页咯")
        }else {
          this.$router.push('/discovery')
        }
      },
      //调用父组件的方法修改ishidden ,单向传递给index，形成伸展效果
      handleNav(){
        this.$emit('changeHidden',)
      },
      //是否展示播放器
      handlePlayer(){
        this.$emit('changePlayer',)
      },
      //页面前后跳转
      go(val){
          window.history.go(val)
      }
    }
  }
</script>

<style scoped></style>
