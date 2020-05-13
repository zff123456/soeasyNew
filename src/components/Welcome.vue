
<template>
  <div class="login_container" style="margin-top:61px;">
    <!-- 轮播图 -->
      <div class="banner" >
         <el-carousel height="500px">
          <el-carousel-item v-for="item in imagesbox" :key="item.id">
             <img :src="item.idView" class="image" style="width:100%;height:100%;">
          </el-carousel-item>
        </el-carousel>
      </div>
<!-- 学生端 -->
<!-- <div v-if="isIdent==2">111111</div> -->
      <!--组卷  -->
      <ul class="list clear"  >
        <li class="item">
          <div class="item1">
            <div class="img-l">
            <!-- <img :src="item.url" alt=""> -->
            <img src="../assets/image/index/shouye_14.png" alt="">
          </div>
          <div class="item-r">
            <div>四级试卷</div>
            <div style="font-size:18px">63</div>
               <span class="img-r" @click="zujuan(1)">
                 一键组卷
               </span>                
          </div>
          </div>
        </li>
        <li class="item">
          <div class="item1">
              <div class="img-l">
              <!-- <img :src="item.url" alt=""> -->
                <img src="../assets/image/index/shouye_16.png" alt="">
              </div>
              <div class="item-r">
              <div>六级试卷</div>
              <div style="font-size:18px">63</div>
                <span class="img-r img-r1" @click="zujuan(2)">  一键组卷 </span>                
              </div>
          </div>
        </li>
        <li class="item">
            <div class="item1">
                <div class="img-l">
            <!-- <img :src="item.url" alt=""> -->
            <img src="../assets/image/index/shouye_18.png" alt="">
          </div>
          <div class="item-r">
            <div>A级试卷</div>
            <div style="font-size:18px">63</div>
               <span class="img-r img-r2" @click="zujuan(3)">
                 一键组卷
               </span>                
          </div>
            </div>
        </li>
        <li class="item">
          <div class="item1">
                 <div class="img-l">
            <!-- <img :src="item.url" alt=""> -->
            <img src="../assets/image/index/shouye_20.png" alt="">
          </div>
          <div class="item-r">
            <div>B级试卷</div>
            <div style="fong-size:18px">63</div>
               <span class="img-r img-r3" @click="zujuan(4)">
                 一键组卷
               </span>                
          </div>
          </div>
        </li>
        <li class="item">
              <div class="item1">
                 <div class="img-l">
                    <!-- <img :src="item.url" alt=""> -->
                    <img src="../assets/image/index/shouye_22.png" alt="">
                  </div>
                  <div class="item-r">
                    <div>我的试卷</div>
                    <div style="fong-size:18px">63</div>
                      <!-- <span class="img-r img-r4">
                        一键组卷
                      </span>                 -->
                  </div>
              </div>
        </li>
      </ul>


      <!-- 班级 -->
      <ul class="list2 clear">
        <li class="item2">
          <img src="../assets/image/index/shouye_30.png" alt="">
          <p  class="item3">一键管理您的班级</p>
          <div class="btns" @click="clicks(1)">班级管理</div>
        </li>
          <li class="item2">
          <img src="../assets/image/index/shouye_33.png" alt="">
          <p  class="item3">实时监控学生学习进度</p>
          <div class="btns" style="background:#8650F6;"  @click="clicks(1)" >我的班级</div>
        </li>
          <li class="item2">
          <img src="../assets/image/index/shouye_35.png" alt="">
          <p  class="item3">在这里您可以创建新的试卷</p>
          <div class="btns" style="background:#3444F4;"  @click="clicks(3)" >试卷管理</div>
        </li>
          <li class="item2">
          <img src="../assets/image/index/shouye_37.png" alt="">
          <p  class="item3">终极题库 精选试题</p>
          <div class="btns"  style="background:#FF7407;" @click="clicks(4)">题库</div>
        </li>      
      </ul>

      <!-- 图表 -->
      <div class="tubiao clear" style="margin-top:70px;height: 300px;">
        <div class="centers">
           <div class="box1">
                <div class="left-box" ></div>
                <div style="width:95%;height:300px;" ref="chart"  class="chart"></div>
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
       <div class="tubiao clear" style="margin-top:80px;height: 300px;">
         <div class="centers">
           <div class="box2">
              <div style="font-size:14px;">STUDENT YUYUE</div>
              <div style="font-size:20px;margin:5px  0 10px 0">班级平均值对比图</div>
              <div style="font-size:14px;" >了解学生预约情况，避免学生旷课。了解学生预约情况，避免学生旷课。了解学生预约情况，避免学生旷课。了解学生预约情况，避免学生旷课。</div>
              <div style="margin-top:30px;">
                <span style="padding:5px 25px;font-size:18px;border:1px solid #8F9AA7;border-radius:10px;cursor:pointer;">了解更多</span>
              </div>
           </div>
          <div class="box1" style="box-sizing:border-box;padding-left:80px;">
             <div class="right-box" ></div>
              <div style="width:95%;height:300px;" ref="chart1"  class="chart"></div>
            </div>        
         </div>
      </div>
<!-- 数据统计 -->
       <div class="tubiao  bigBox" style="margin-top:80px;">
         <div class="center2">
                <div class="line" style="width:80px;margin:0 auto;height:20px;border-bottom:1px solid #fff;margin-bottom:10px;"></div>
               <p  style="font-size:26px;color:#fff;text-align: center;font-weight:700;">数据统计</p>
            <div class="clear" style="margin-top:10px;">
              <div class="box3  " >
                <div style="width:95%;height:300px;" ref="chart2" class="chart1" ></div>
              </div>   
              <div class="box3 ">
                <div style="width:95%;height:300px;" ref="chart3"  class="chart1" ></div>
              </div> 
          </div>
          <div class="box4  chart1 " >
               <div style="height:40px;background:#E5E5E5;line-height:40px">
                     <span style="margin-left:15px;color:#777777;font-size:16px;">近期班级平均正确率</span>
                    <div class="select" style="float:right;padding:0 20px 0 0">
                        <el-select  placeholder="请选择班级"  v-model="value"  style="height:30px;">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                      </el-select>
                    </div>
               </div>
              <div style="width:98%;height:300px;" ref="chart4" ></div>
          </div>      
        </div>      
      </div>
      <!-- mod_help -->
      <div> 
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
       isIdent:1,
        arr1:[],
         arr2:[],
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
         url:'../assets/image/index/shouye_14.png',title:'四级试卷',number:60,iconUrl:''
         },{url:'../assets/image/index/shouye_16.png',title:'六级试卷',number:60,iconUrl:''
         },{url:'../assets/image/index/shouye_18.png',title:'A级试卷',number:60,iconUrl:''
         },{url:'../assets/image/index/shouye_20.png',title:'B级试卷',number:60,iconUrl:''
         },{url:'../assets/image/index/shouye_22.png',title:'我的试卷',number:60,iconUrl:''}],
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
   initCharts () {
  　　let myChart = this.$echarts.init(this.$refs.chart);
  　　console.log(this.$refs.chart)
        // var xAxisData = [];
        var emphasisStyle = {
            itemStyle: {
                barBorderWidth: 1,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0,0,0,0.5)'
            }
        };

  　　// 绘制图表
  　myChart.setOption({
    // backgroundColor: '#eee',
     color: ['#BBBBBB','#25C5C9'],
    legend: {
        left: 160,
    },
    tooltip: {},
    xAxis: {
        data: this.xAxisData,
        name: 'X Axis',
        axisLine: {onZero: true},
        splitLine: {show: false},
        splitArea: {show: false}
    },
    yAxis: {
        inverse: true,
        splitArea: {show: false}
    },
    grid: {
        left: 150
    },
    series: [
        {
            name: '已预约',
            type: 'bar',
            stack: 'two',
            emphasis: emphasisStyle,
            data: [5,4,4,5,5,5,5,8,10,80,50,40,30,20,10,9,8,0,16],
            // color:red,
        },
        {
            name: '未预约',
            type: 'bar',
            stack: 'two',
            emphasis: emphasisStyle,
            data: [-1,-2,-3,-5,-6,-3,-4,-8,-8,-10,-70,-60]
        }
    ]

  　　});
　　},

// 折线图
 myChart () {
  　　let myChart = this.$echarts.init(this.$refs.chart1);
  　　console.log(this.$refs.chart)
  　　// 绘制图表
  　myChart.setOption({
     title: {
        text: '成绩对比图'
    },
    color: ['#F86B4F','#6EB5E5'],
     legend: {
        data: ['最近成绩', '上次成绩']
    },
    tooltip: {
        trigger: 'axis'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '最近成绩',
            type: 'line',
            stack: '总量',
            data: [120, 132, 101, 134, 90, 230, 210,240,360,20,]
        },
        {
            name: '上次成绩',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310,30,90,80,120]
        } ]

  　　});
　　},

// 每月视频观看节数
myCharts() {
  　　let myChart = this.$echarts.init(this.$refs.chart2);
  　　console.log(this.$refs.chart)
  　　// 绘制图表
  　myChart.setOption({
     title: {
        text: '成绩对比图'
    },
    color: ['#F86B4F','#6EB5E5'],
    
   xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [90, 70, 80, 100, 150],
        type: 'line',
        smooth: true
    }]

  　　});
　　},
//直播观看的对比图
charts(){
  let myChart = this.$echarts.init(this.$refs.chart3);
  　　console.log(this.$refs.chart)
  　　// 绘制图表
  　myChart.setOption({
     title: {
        text: '直播观看的对比图'
    },
    color: ['#DCDBE0','#FF5B82'],
    
    legend: {},
    tooltip: {},
    dataset: {
        source: [
            ['product', '视频总时长', '观看时长'],
            ['学生1', 43.3, 85.8],
            ['学生2', 83.1, 73.4],
            ['学生3', 86.4, 65.2],
            ['学生4', 72.4, 53.9]
        ]
    },
    xAxis: {type: 'category'},
    yAxis: {},
    series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'}
    ]

  　　});
},
// 近期班级平均正确率
initChart(){
 let myChart = this.$echarts.init(this.$refs.chart4);
                // 绘制图表
                myChart.setOption({
                    //   title: {
                    //     text: '直播观看的对比图'
                    // },
                    tooltip: {
                        trigger: 'item',
                        formatter:'{c}%'　　　　//这是关键，在需要的地方加上就行了
                   },
                    color: ['#71B2EE'],
                    xAxis: {
                        type: 'category',
                        data: this.arr1
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            show:true,
                            formatter: '{value}%',//给Y轴数值添加百分号
                        },
                    },
                    series: [{
                        data: this.arr2,
                        type: 'bar',
                        barWidth:"35",
                        itemStyle: {
                            normal: {
                                //每根柱子颜色设置
                                color: function(params) {
                                    let colorList = ["#c23531","#2f4554","#61a0a8","#d48265","#91c7ae","#749f83","#ca8622","#bda29a","#6e7074","#546570","#c4ccd3", "#4BABDE","#FFDE76","#E43C59","#37A2DA"];
                                    return colorList[params.dataIndex];
                                }
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'inside',
                                formatter: '{c}%'
                            }

                        }
                    }]


                })
},

     gotoPage(index) {
    this.currentIndex = index;
  },
    clicks(val){
      console.log(val)
    if(val==1){
          this.$router.push('/classmanage')
    }
     if(val==3){
          this.$router.push('/shijuan')
    }
     if(val==4){
          this.$router.push({name:'list'})
    }
    },
    zujuan(val){
      console.log(val)
       if(val==1){
        // this.$router.push('/fourAdd')
        this.$router.push({name:'fourAdd'})
      } 
       if(val==2){
        this.$router.push({name:'sixAdd'})
      } 
       if(val==3){
    
        this.$router.push({name:'aAdd'})
      } 
       if(val==4){
        this.$router.push({name:'bAdd'})
      } 
      //  if(this.paper_ty[1]=='其他题库'){
      //   this.$router.push({name:'otherAdd'})
      // } 
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
  localStorage.getItem("id"); // 教师id
   localStorage.getItem("nickname"); // 教师实名
   localStorage.getItem("identity"); // 身份   2为教师  1位学生
   localStorage.getItem("school_name"); // 学校名称
  localStorage.getItem("school_id"); // 学校id 
  console.log(this.isIdent);
  
  this.getzql_data()
   this.initCharts();
   this.myChart();
   this.myCharts();
   this.charts();
   this.initChart()
            // this.$nextTick(function() {
            //     this.drawPie('main')
            // })
        }
}
</script>

<style lang="less" scoped>

.el-carousel__item h3 {
    /* color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0; */
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
      width:20%;
      float: left; 
      /* height: 80px; */
      /* overflow: hidden; */
      /* width:18.5%;
      float:left;  */
        /* background:pink; */
     /* margin:0 3.25%;     */
      /* ::backdrop */
      .item1{
       width:60%;
       margin: 0 auto;
       /* background-color: red; */
       height: 80px;
       padding: 3% 5%;
       box-shadow:rgba(0,0,0,.3) 0px 0px 10px;

    }
   }
   
    .img-l{
      float: left;
      width:40%;
      /* padding: ; */
      img{
      width: 60px;
      height: 60px;

      }
    }
    .item-r{
       float: right;
        width:60%;
    }
    .img-r{
      height:20px;
      font-size:12px;
      color:#fff;
      background:#E0CE00;
      margin-left:10%;
      padding:5px 5px;
      border-radius: 8px;
      cursor:pointer
      
    }
      .img-r:hover{
            cursor:pointer
        }
    .img-r1{
      background: #8D6436;
    }
    .img-r2{
 background: #B5BB3D;
    }
    .img-r3{
 background: #38AE4E;
    }
    .img-r4{
 background: #8D6436;
    }
  }
.list2{
  margin-top:40px; 
  

}
.list2 .item2{
    float: left;
    width: 16%;
    margin: 0 4%;
    box-sizing: border-box;
    text-align: center;
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
      background-color: #3267F0;
      font-size: 12px;
      color: #fff;
      border-radius: 10px;
    }
    .list2 .item2 .btns:hover{
     cursor:pointer
    } 
.tubiao{
  /* margin-top:20px; */
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

  top:121%;
} */
.chart{
  box-shadow: 0  2px 2px 2px  rgba(#000,.1);
   background-color:#eee;

}
/* .box1 .left-box{
  width:500px;
  height: 300px ;
  background-color: #FFB67B;
  position: absolute;

  left:0px;
  top:86%;

} */
.box1{
  float: left;
  width:60%;
  height: 300px;
}
.box2{
  float: left;
  padding-top:50px;
  padding-left:30px;
  padding-right: 30px;
  box-sizing: border-box;
  width:40%;
}
.center2{
  width:80%;
  margin:0 auto;
}
.tubiao .centers{
  width:80%;
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
/* // .mod_help_item dt a{
//   font-size: 12px;
//   color: #999B9C!important;
// } */
.mod_help_app{
  width:20%;
}
/* // .mod_help_app dt,
// .mod_help_app p {
// 	padding-left: 15px;
// } */
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

</style>
