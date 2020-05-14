import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import "./assets/css/index.css"; // 公共样式
import moment from 'moment';  //引入时间的组件
import echarts from 'echarts'
require ("../static/lib/aliyun-upload-sdk/lib/aliyun-oss-sdk-5.3.1.min")
require("../static/lib/aliyun-upload-sdk/lib/aliyun-upload-sdk-1.5.0.min")
require("../static/lib/aliyun-upload-sdk/lib/es6-promise.min")
// Vue.use(VueAwesomeSwiper)
// // 引入全局的样式
import './assets/css/global.css'
// 引入axios  并将其挂载到vue原型上
import "./config/global.js"; // 引全局路径
import axios from 'axios'
Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts
axios.defaults.baseURL = "http://192.168.1.168/";
// axios.defaults.baseURL = "http://127.0.0.1/";
// BASE_URL = "http://192.168.1.134/";
// axios.defaults.baseURL = "http://ruanjian.chinadingao.com/"; //线上
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded";

Vue.config.productionTip = false

// 富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

// 时间处理器
Vue.filter('time', function (value, formatString) {  //挂载全局 时间格式化 过滤器  value  是输入内容
  if (value == 0) {
    return '无时间限制'
  } else {
    formatString = formatString || 'YYYY年MM月DD日 HH:mm';
    return moment.unix(value).format(formatString); // 这是时间戳转时间
  }
});




// 导航守卫
router.beforeEach((to, from, next) => {

  if (to.path === "/login"||to.path === "/home"||to.path=="/forgetPas") {
    next();
    return;
  }
  const user = localStorage.getItem("identity");
  // if(user){
  //    next()      
  // }else{
  //   next('/login')  
  // }
  console.log(user);

  if (user) {
    // 登录
    next();
  } else {
    // 没有登录
    next('/login')
  }
});







new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
