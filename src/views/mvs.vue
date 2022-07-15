<template>
  <div class="mvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title"  v-for="(item,index) in areas"  :key="index"   
                  :class="{active: item == area }"  @click="changeArea(item)">{{item}}</span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title" v-for="(item,index) in types" :key="index"
               :class="{active: item == type}"  @click="changeType(item)" >{{item}}</span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span class="title "  v-for="(item,index) in orders" :key="index"
                 :class="{active: item == order}" @click="changeOrder(item)" >{{item}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div class="item"  v-for="(item,index) in mvs" :key="index"
                          @click="toMv(item.id)">
          <div class="img-wrap">
            <img v-lazy="item.cover" alt="" />
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{item.playCount|playCountFormat}}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{item.name}}</div>
            <div class="singer">{{item.artistName}}</div>
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
        :page-size="8"
        :limit="limit">
      </el-pagination>
    </div>
  </div>
</template>

<script>

export default {
  name: 'mvs',
  data() {
    return {
  //  area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 
      area:'全部',
      type:'全部',
      order:'上升最快',
      areas: ['全部','内地','港台','欧美','日本','韩国'],
  //type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部
      types:['全部','官方版','原声','现场版','网易出品'],
  // order: 排序,可选值为上升最快,最热,最新,不填则为上升最快
     orders:['上升最快','最热','最新'],
  // limit: 取出数量 , 默认为 30
  // offset: 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
     offset : 0,
  //  mv信息
      mvs : [],
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量--在分页器中不添加应该也没事
      limit: 8

    };
  },

  created(){
    this.getMvs()
  },
  watch: {
      area(){
        this.page=1
        this.getMvs()
      },
      type(){
        this.page=1
        this.getMvs()
      },
      order(){
        this.page=1
        this.getMvs()
      },

    },

  methods: {
    toMv(id) {
      this.$router.push(`/mv?id=${id}`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val
      this.getMvs()
    },
    // 切换地区
    changeArea(area){
      this.area = area
    },
    //切换类别
    changeType(type){
      this.type = type
    },
    //切换排序
    changeOrder(order){
      this.order = order
    },
    //请求mv信息
    getMvs(){
      this.request.get("/mv/all?",{
        params:{
          area : this.area,
          type : this.type,
          order : this.order,
          limit : this.limit,
          offset : (this.page - 1) * this.limit
        }
      }).then(res=>{
        //没用其他校验，检验200其实没用必要哈
        if(res.code==200){
          this.mvs = res.data
          //count值改用filter修改
          // console.log(res)
          //第二页时没用count值，则没有count就不修改
          if(res.count){
            this.total = res.count
          }

        }

      })

    }
  }
};
</script>

<style >

</style>
