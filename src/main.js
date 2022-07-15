import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import request from './axios/request'
//格式转化过滤器
import "./utils/timeFilter"
import "./utils/countFilter"
import './utils/dataFilter'
//图片懒加载
// 导入图片懒加载依赖包
import VueLazyLoad from 'vue-lazyload'
//获取rul参数
import urlParse  from './utils/urlParse'  

Vue.config.productionTip = false
Vue.prototype.$urlParse=urlParse   //注册全局方法
Vue.use(ElementUI);


Vue.use(VueLazyLoad, {
  preLoad: 1.3,
  error: import('./assets/error.webp'), //加载失败显示的图片
  loading: require('./assets/loading.webp'), // 加载中显示的图片
  attempt: 3, 
  // listenEvents: [ 'scroll' ]
})

//封装request
Vue.prototype.request = request
//导入 use

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

