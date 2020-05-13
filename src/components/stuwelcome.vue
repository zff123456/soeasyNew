
<template>
    <div class="login_container" style="height: 100%;margin-top:60px;">
      <!-- 轮播图 -->
        <div class="banner" >
           <el-carousel height="500px">
            <el-carousel-item v-for="item in imagesbox" :key="item.id">
               <img :src="item.idView" class="image" style="width:100%;height:100%;">
            </el-carousel-item>
          </el-carousel>
        </div>
  <!-- 学生端试卷列表-->
  <!-- <div class="box-list clear">
    <div class="item-list" v-for="(item,key) in typeList" :key="key">
         <div class="box-item">
          <div class="top-img">
            <img :src="item.url" class="image" style="width:100%;height:100%;">
          </div>
          <div class="bottom-text">
              <span class="text"  @click="topath(item)"  :class="sstt[key]">{{item.title}}</span> 
              <h4 style="height:2.5em;line-height: 2.5em;">{{item.shuji}}</h4>
              <p style="font-size:12px;">讲师：{{item.teacher}}</p>
              <div class="schoolName " >
                <div class="texts">{{item.school}}</div>
              </div>
          </div>      
         </div>     
     </div>
  </div> -->
        <!--组卷  -->
        <!-- <ul class="list clear"  style="margin-top:40px;">
          <li class="item" v-for="(item,key) in shijuanList" :key="key">
            <div class="item1">
              <div class="img-l">
              <img :src="item.url" alt="">
            </div>
            <div class="item-r">
              <div >{{item.type}}</div>
              <div style="font-size:18px">{{item.number}}</div>
                 <span class="img-r" @click="gotokaoshi(key+1)" :class="colorList[key]">
                  前去测试
                 </span>                
            </div>
            </div>
          </li>       
        </ul> -->
  
  
        <!-- 班级 -->
        <!-- <ul class="list2 clear">
          <li class="item2">
            <img src="../assets/image/index/stushouye.png" alt="">
            <p  class="item3"></p>
            <div class="btns" @click="clicks(1)">成绩统计</div>
          </li>
            <li class="item2">
            <img src="../assets/image/index/shouye_33.png" alt="">
            <p  class="item3"></p>
            <div class="btns" style="background:#8650F6;"  @click="clicks(2)" >在线课程</div>
          </li>
            <li class="item2">
            <img src="../assets/image/index/shouye_35.png" alt="">
            <p  class="item3"></p>
            <div class="btns" style="background:#3444F4;"  @click="clicks(3)" >在线模拟</div>
          </li>
            <li class="item2">
            <img src="../assets/image/index/shouye_37.png" alt="">
            <p  class="item3"> </p>
            <div class="btns"  style="background:#FF7407;" @click="clicks(4)">题库练习</div>
          </li>      
        </ul> -->
  
        <!-- 图表 -->
        <div class="tubiao clear" style="margin-top:70px;height: 350px;">
          <div class="centers">
             <div class="left-box"></div>
             <div class="box1 ">
              <div style="height:40px;background:#E5E5E5;line-height:40px">
                <span style="margin-left:15px;color:#777777;font-size:16px;">总成绩统计</span>
               <div class="select" style="float:right;padding:0 20px 0 0">
                   <el-select  placeholder="请选择试卷"  v-model="value"  style="height:30px;">
                     <el-option
                       v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                     </el-option>
                 </el-select>
               </div>
            </div>
            <div style="height:300px;" ref="chart"  class="chart"></div>
             
                 
            </div>
            <div class="box2">
              <div style="font-size:14px;">STUDENT YUYUE</div>
              <div style="font-size:20px;margin:5px 0 10px 0">学生考试预约</div>
              <div style="font-size:14px;" >了解学生预约情况，避免学生旷课。了解学生预约情况，避免学生旷课。了解学生预约情况，避免学生旷课。了解学生预约情况，避免学生旷课。</div>
              <div style="margin-top:30px;">
                <span style="padding: 5px 25px;font-size:18px;border:1px solid #8F9AA7;border-radius:10px;cursor:pointer;" @click="more(1)">了解更多</span>
              </div>
           </div>
          </div>        
        </div>
  
  
         <div class="tubiao clear" style="margin-top:80px;height: 350px;">
           <div class="centers">
             <div class="box2-left " >
                <div style="font-size:14px;">STUDENT YUYUE</div>
                <div style="font-size:20px;margin:5px  0 10px 0">班级平均值对比图</div>
                <div style="font-size:14px;" >了解学生预约情况，避免学生旷课。了解学士预约情况，避免学生旷课。了解学士预约情况，避免学生旷课。了解学士预约情况，避免学生旷课。</div>
                <div style="margin-top:30px;">
                  <span style="padding:5px 25px;font-size:18px;border:1px solid #8F9AA7;border-radius:10px;cursor:pointer;">了解更多</span>
                </div>
             </div>
             <div class="right-box" ></div>
            <div class="box1 chart3" style="box-sizing:border-box;padding-left:80px;">
              <div style="height:40px;background:#E5E5E5;line-height:40px">
                <span style="margin-left:15px;color:#777777;font-size:16px;">总成绩统计</span>
               <div class="select" style="float:right;padding:0 20px 0 0">
                   <el-select  placeholder="请选择试卷"  v-model="value"  style="height:30px;">
                     <el-option
                       v-for="item in options"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
                     </el-option>
                 </el-select>
               </div>
            </div>
               
                <div style="height:300px;" ref="chart1"  class="chart"></div>
              </div>        
           </div>
        </div>

       
        <!-- mod_help -->
        <div style="margin-top:50px;"> 
              <div class="mod_help">
                 <div class="centers">
                    <dl class="mod_help_item" >
                      <dt>学院介绍</dt>
                      <dd> 服务项目 </dd>
                      <dd> 服务项目 </dd>
                      <dd> 服务项目 </dd>
                      <dd> 服务项目 </dd>
  
                  </dl>
                  <dl class="mod_help_item">
                       <dt>教育教学</dt>
                      <dd> 服务项目 </dd>
                      <dd> 服务项目 </dd>
                      <dd> 服务项目 </dd>
                      <dd> 服务项目 </dd>
  
                  </dl>
                  <dl class="mod_help_item">
                      <dt>学术科研</dt>
                      <dd> 服务项目 </dd>
                      <dd> 服务项目 </dd>
                      <dd> 服务项目 </dd>
                      <dd> 服务项目 </dd>
  
                  </dl>
                  <dl class="mod_help_item">
                      <dt>新闻公告</dt>
                      <dd> 服务项目 </dd>
                      <dd> 服务项目 </dd>
                      <dd> 服务项目</dd>
                      <dd> 服务项目 </dd>
  
                  </dl>
                  <dl class="mod_help_item mod_help_app">
                      <dt>联系电话</dt>
                      <dd style="font-size:20px;margin:10px 0;color:#fff"> 
                        000-123-4567
                      </dd>
                      <dd style="font-size:12px;width:200px; ">地址：此处填写真实学校地址</dd>
                      <dd style="font-size:12px;width:200px; "> 行政办公电话：000000000000</dd>
                      <dd style="font-size:12px;width:200px; ">  邮编：246000</dd>
                     
                  </dl>
                  <dl class="mod_help_item mod_help_app" style="margin-left:80px;">
                      <dt>扫描二维码</dt>
                      <dd>
                          <img src="../assets/image/index/sm.png" alt="" style="width:100px;height:100px;">
                          <p style="font-size:12px;">扫一扫关注微信公众号</p>
                      </dd>
                  </dl>
                 </div>
              </div>
  
              <!-- mod_copyright  -->
              <div class="mod_copyright" >
                  <p class="mod_copyright_info">
                      某某科技有限公司版权所有 京ICP备08001421号京公网安备110108007702
                  </p>
              </div>
          </div>
      </div>
      <!-- footer end -->
      
  </template>
  
  <script >
    import qs from "qs";
  export default {
    data() {
      return {
       
        isIdent:'',
          arr1:[],
           arr2:[],
           sstt:[
            "ss1",
            "ss2",
            "ss3",
            "ss4",
            "ss5",
          ],
          colorList:['color1','color2','color3','color4',],
          percent1: 30,
        percent2: 70,
        year: "2018-10-20",
        time: "10:05:03",
          imagesbox:[
          {id:0,idView:require("../assets/image/index/banner1.png")},     
          {id:1,idView:require("../assets/image/index/banner2.png")},
          {id:2,idView:require("../assets/image/index/banner3.png")},
          {id:3,idView:require("../assets/image/index/banner4.png")}],
         typeList:[{
           url:require('../assets/image/index/stubg.png'),title:'好评如潮',shuji:"《专业英语四级讲解》",teacher:'张大伟',school:'南京财经大学',
           },{url:require('../assets/image/index/stubg.png'),title:'新建课程',shuji:"商务英语",teacher:'张大伟',school:'南京财经大学',
           },{url:require('../assets/image/index/stubg.png'),title:'网站推荐',shuji:"《专业英语六级讲解》",teacher:'张大伟',school:'南京财经大学',
           },{url:require('../assets/image/index/stubg.png'),title:'新鲜视频',shuji:"《专业英语四级讲解》",teacher:'张大伟',school:'南京财经大学',
           },{url:require('../assets/image/index/stubg.png'),title:'网站推荐',shuji:"《专业英语四级讲解》",teacher:'张大伟',school:'南京财经大学',}],
           shijuanList:[{
             url:require('../assets/image/index/shouye_14.png'),type:'四级试卷',number:63
            },{ url:require('../assets/image/index/shouye_16.png'),type:'六级试卷',number:63
             },{ url:require('../assets/image/index/shouye_18.png'),type:'A级试卷',number:63
            },{ url:require('../assets/image/index/shouye_20.png'),type:'B级试卷',number:63
          } ],
           xAxisData:[],
            options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          value:'',
      }
    },
  
    methods: {
       async getzql_data(){
                  const _this=this
                  const res =  await  this.$http.post("admin/index/studenhome",qs.stringify({
                      id: 1, identity:2,
                  }));
                  console.log(res)
                  if (res.status === 200 && res.data.code == 1) {
                      Object.keys(res.data.info.tongji).forEach(function(key){
  
                          _this.arr2.push(res.data.info.tongji[key].zhengquelv)
                          _this.arr1.push(res.data.info.tongji[key].type_name)
  
  
                      });
                      this.initChart()
  
                  }
  
              },
      more(val){
        if(val==1){
          this.$router.push('/stuOrder')
        }
      },
    

   myChart () {
    //  折线图
    　let myChart1 = this.$echarts.init(this.$refs.chart1);
    // 柱状图
    let myChart = this.$echarts.init(this.$refs.chart);
    　　console.log(this.$refs.chart)
    　　// 绘制图表
    　myChart1.setOption({
      xAxis: {
        type: 'category',
        data: ['试卷01', '试卷01', '试卷01', '试卷01', '试卷01', '试卷01', '试卷01', '试卷01', '试卷01']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [80, 90, 15, 40, 70, 60, 95,111,50],
        type: 'line',
        smooth: true
    }]
    　　});
    　　// 绘制图表
    　myChart.setOption({
      color: ['#3398DB'],
       tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' ,       // 默认为直线，可选为：'line' | 'shadow'
        }
      },
     grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: [
        {
            type: 'category',
            data: ['听短文理解', '完型填空', '新闻报道', '听成对话', '听短对话', '听单句', '仔细阅读'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 20, 50, 70, 60, 10, 75]
        }
    ]
    　　});
  　　},

  
       gotoPage(index) {
      this.currentIndex = index;
    },
    // 
      clicks(val){
        console.log(val)
      if(val==1){
            this.$router.push('/stuscore')
      }
      if(val==2){
            this.$router.push('/onlinecourse')
      }
       if(val==3){
            this.$router.push('/onlinemoni')
      }
       if(val==4){
            this.$router.push({name:'tikulianxi'})
      }
      },
      // 
      topath(val){
        console.log(val);
        this.$router.push({name:'onlinecourse'})
    if(val.title== "好评如潮" ){
      
  
    }
      
        
      },
      gotokaoshi(val){
        console.log(val)
         if(val==1){
          // this.$router.push('/fourAdd')
          this.$router.push({name:'stufourlist'})
        } 
         if(val==2){
          this.$router.push({name:'stusixlist'})
        } 
         if(val==3){
      
          this.$router.push({name:'stualist'})
        } 
         if(val==4){
          this.$router.push({name:'stublist'})
        } 
    
      },
      
      //定时器
      runInv() {
        this.timer = setInterval(() => {
          this.gotoPage(this.nextIndex)
        }, 1000)
      }
    },
    computed: {
    //上一张
    prevIndex() {
      if(this.currentIndex == 0) {
        return this.dataList.length - 1;
      }else{
        return this.currentIndex - 1;
      }
    },
    //下一张
    nextIndex() {
      if(this.currentIndex == this.dataList.length - 1) {
        return 0;
      }else {
        return this.currentIndex + 1;
      }
    }
  },
  mounted(){
    this.isIdent=localStorage.getItem("identity"); 
    console.log(this.isIdent);
    
    this.getzql_data()
    //  this.initCharts();
     this.myChart();
    //  this.myCharts();
    //  this.charts();
    //  this.initChart()
             
    }
  }
  </script>
<style lang="less" scoped>
  .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }
  
    .el-carousel__item:nth-child(2n) {
       background-color: #99a9bf;
    }
    
    .el-carousel__item:nth-child(2n+1) {
       background-color: #d3dce6;
    }
    .clear::before,
  .clear::after{
    content: "";
    display: block;
    visibility: hidden;
    height: 0;
    line-height: 0;
    clear: both;
  }
    .list{
      width: 100%;
      margin-top:20px;
      .item{
      width:25%;
      float: left; 
      .item1{
       width:50%;
       margin: 0 auto;
       height: 80px;
       padding: 3% 3%;
       box-shadow:rgba(0,0,0,.4) 0px 0px 6px;
        /* box-shadow: 0 0 4px rgba(0,0,0,.2); */
    }
   }
      .img-l{
        float: left;
        width:40%;
        text-align: center;
      img{
        width:60px;
        height:60px;  
        }
      }
      .item-r{
         float:right;
         width:60%;

      }
      .img-r{
        height:20px;
        font-size: 0.7em;
        color:#fff;
        background:#E0CE00;
        margin-left:8%;
        padding:0  0.5em ;
        margin:0.5em;
        height: 2em;
        line-height: 2em;
        border-radius: 8px;
        display: inline-block;
        cursor:pointer      
      }
      .img-r:hover{
              cursor:pointer
        }
      .color2{
        background: #8D6436;
      }
      .color3{
   background: #B5BB3D;
      }
      .color4{
   background: #38AE4E;
      }
      .color5{
      background: #8D6436;
      }
    }
  .list2{
    margin-top:40px;   
  }
  .list2 .item2{ 
      float: left;
      width: 18%;
      margin: 0 3%;
      box-sizing: border-box;
      text-align: center;
      /* background-color: #f0f0f0; */
      /* border:1px solid #808080; */
      /* border: 1px solid #cccccc; */
      /* box-shadow: 2px 2px 2px rgba(0,0,0,.5); */
      box-shadow:rgba(0,0,0,.5) 0px 0px 8px;
      border-radius: 5px 5px 0 0 ;
      /* box-shadow: 0 0 4px rgba(0,0,0,.2); */
  }
  
  .list2 .item2 img{
        width:80px;
        height: 80px;
      }
  .list2 .item2 .item3{
         text-align: center;
         font-size: 16px;
         margin-bottom: 15px;
      }
      .list2 .item2 .btns{
        display: inline-block;
        width:50px;
        padding: 5px 8px;
        background-color: #EE333B;
        font-size: 12px;
        color: #fff;
        border-radius: 10px;
        margin-bottom: 10px;
      }
      .list2 .item2 .btns:hover{
       cursor:pointer
      } 
  .chart1{
    background-color: rgb(245, 235, 236);
    border:10px solid #99CFF2;
    box-sizing: border-box;
    border-radius: 15px;
  }
  /* .right-box{
    width:500px;
    height: 300px ;
    background-color: #6B98FF;
    position: absolute;
    right:0px;

    top: 156%;
  } */
  .chart{
     background-color:#f0f0f0;
  
  }
 
  .box1{
    width:50%;
    height: 350px;
    position: absolute;
    background: #fff;
    
  }
  .chart3{
    position: absolute;
    right: 10%;

  }
  /* .left-box{
    width:500px;
    height: 300px ;
    background-color:#FFB67B;
    position: absolute;
    left: 0;
    top:116%;
  } */
  .box2{
    position: absolute; 
    padding-top:100px;
    padding-left:30px;
    padding-right:30px;
    box-sizing: border-box;
    width:30%;
    right: 10%;
  }
  .box2-left {
    position: absolute; 
    padding-top:100px;
    padding-left:30px;
    padding-right:30px;
    box-sizing: border-box;
    width:30%;
  }
  .center2{
    width:80%;
    margin:0 auto;
  }
  .tubiao .centers{
    width:90%;
    margin:0 auto;
  }
  .bigBox{
    padding-top:20px;
    padding-bottom: 50px;
    background: url(../assets/image/index/shouye_43.png) no-repeat;
    background-size:100%,100%;
  }
  .box3{
    width:40%;
    height: 300px;
    float: left;
    margin:10px 5%;
  }
  .box4{
    margin:0 auto;
    height: 350px;
  }
  .mod_help {
     height: 187px;
     padding-top:30px;
    border-bottom: 1px solid #6E747A;
    background-color: #42494E;
    padding-bottom: 20px;
  }
  .mod_help  .centers{
    width:80%;
    margin:0 auto;
  }
  .mod_help_item {
      float: left;
    width:12%;
    padding-top:20px;
    
  }
  .mod_help_item dt {
      height: 25px;
    font-size: 16px;
    color: #fff;
  }
  .mod_help_item dd {
    font-size: 12px;
    color: #999B9C;
    margin-top:10px;
  }
 
  .mod_help_app{
    width:20%;
  }

  .mod_help_app img {
      margin: 7px 0;
  }
  .mod_copyright {
    text-align: center;
   
    background: #42494E;
  }
  .mod_copyright_info {
    line-height: 18px;
    font-size: 14px;
    color:#979B9D;
    padding:15px 0;
  }
  .box-list{
    margin:30px 0;
    height: 280px;
    overflow: hidden;
    /* background-color: red; */

      .item-list{
        float:left;
        width:20%;
         box-sizing:border-box;
         padding:0px  2%;
         /* box-shadow: 10px 10px 10px rgba(0,0,0,.2); */
         .items-list{
            width:100%;
            height: 100%;
            background-color:#fff;
         }
         .box-item{
          box-shadow: 10px 10px 10px rgba(0,0,0,.2);
         }
      }
      .top-img{
          width: 100%;
          height:150px;
          box-sizing: border-box;
          border:2px solid #5092FA;
          border-radius: 5px 5px 0 0;
      }
     
      .bottom-text{
          padding: 10px 0 15px 15px;
          box-shadow: 0px 0px 3px #A3B4D8;
          .text{
              padding:5px 10px;
              border-radius:5px;
              font-size:12px;
              background-color:#FEAC00;
              cursor:pointer
          }        
         .schoolName{            
             font-size:14px;
             height:20px;
             .texts{
              font-size:14px;
              float: right;
              margin-right:10px;

             }
         } 
      }
      .bottom-text .ss2{
              background-color:#03FBBC;
          }
          .bottom-text .ss3{
              background-color:#04BFF1;
          }
          .bottom-text .ss4{
              background-color:#03FBBC;
          }
          .bottom-text .ss5{
              background-color:#04BFF1;
          }
  }
  </style>
  