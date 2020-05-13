<template>
    <div style="background: red !important;margin-top:70px;">
        <div style="width: 100%;height: 100px;background: #86A1B0;position: relative">
            <div style="width: 33.3%;height: 100%;position: relative">
                <el-button type="info" plain style="float:left;margin-top:35px;" size="mini" @click="goBack" > 返回上一页</el-button>
                <!-- <span style="float: left;height: 30px;line-height: 30px;margin-top:35px;background-color:#3DB298;color:#fff;">返回上一页</span> -->
                <div style="width:80px;height:80px;border-radius:60%;background: #ccc;margin-left:25%;line-height: 100px;margin-top: 10px;position: absolute"></div>
                <div style="position: absolute;margin-left:45%;margin-top:20px;color: #EFF2F4;font-size: 18px">张三</div>
                <div style="position: absolute;margin-left:45%;margin-top: 50px;color:#EFF2F4;width:100%;font-size: 18px"><span>21岁</span>
                    <span  style="margin-left:30px;position: absolute;font-size: 18px">电话：12345678910</span></div>
            </div>
            <div style="width: 2px;height: 80px;background: #EFF2F4;margin-left: 33.3%;margin-top: -90px;position: absolute"></div>


           <div style="width: 33.3%;height:100px;margin-left: 33.3%;margin-top: -100px">
                <div style="text-align: center;padding-top: 20px;font-size:18px;color: #EFF2F4">所属教师：李四</div>
               <div style="text-align: center;padding-top: 10px;font-size:18px;color: #EFF2F4">班级：测试班级</div>
           </div>
            <div style="width: 2px;height: 80px;background: #EFF2F4;margin-left: 66.6%;margin-top: -90px;position: absolute"></div>
            <div style="width: 33.3%;height:100px;margin-left: 66.6%;margin-top: -100px">
                <div style="padding-top: 20px;font-size:18px;color: #EFF2F4;margin-left: 40px">账号：123456</div>
                <div style="padding-top: 10px;font-size:18px;color: #EFF2F4;margin-left: 40px">注册时间：2019年1月1日</div>
            </div>
        </div>

                       <div style="background: #ccc;width: 100%;height:820px;position: absolute">
                           <div class="time">
                               <div class="timeline">
                                   <el-timeline>
                                       <el-timeline-item timestamp="2018/4/12" placement="top">
                                           <h4 style="margin-top: -20px">信息</h4>
                                           <el-card style="background: #F7F8FA;width: 130%;margin-top: 20px">
                                               <p>观看直播里斯老师，市场40分钟</p>
                                           </el-card>
                                       </el-timeline-item>
                                       <el-timeline-item timestamp="2018/4/3" placement="top">
                                           <h4 style="margin-top: -20px">信息</h4>
                                           <el-card style="background: #F7F8FA;width: 130%;margin-top: 20px">
                                               <p>观看直播里斯老师，市场40分钟</p>
                                           </el-card>
                                       </el-timeline-item>
                                       <el-timeline-item timestamp="2018/4/2" placement="top">
                                           <h4 style="margin-top: -20px">变更</h4>
                                           <el-card style="background: #F7F8FA;width: 130%;margin-top: 20px">
                                               <p>观看直播里斯老师，市场40分钟</p>
                                           </el-card>
                                       </el-timeline-item>
                                   </el-timeline>
                               </div>
                           </div>


                           <div class="right" >
                               <div>
                                   <div style="position: absolute;height: 40px;line-height: 40px;margin-top: 40px;margin-left: 40px;font-size: 18px">活跃统计</div>
                                   <div style="position: absolute;margin-top: 40px;margin-left: 120px">
                                       <el-select v-model="value" placeholder="请选择">
                                           <el-option
                                                   v-for="item in options"
                                                   :key="item.value"
                                                   :label="item.label"
                                                   :value="item.value">
                                           </el-option>
                                       </el-select>
                                   </div>
                                   <div style="position: absolute;height: 40px;line-height: 40px;margin-top: 40px;margin-left:350px;font-size: 18px">年</div>
                                   <div style="position: absolute;margin-top: 40px;margin-left: 380px">
                                       <el-select v-model="value" placeholder="请选择">
                                           <el-option
                                                   v-for="item in options"
                                                   :key="item.value"
                                                   :label="item.label"
                                                   :value="item.value">
                                           </el-option>
                                       </el-select>
                                   </div>
                                   <div style="position: absolute;height: 40px;line-height: 40px;margin-top: 40px;margin-left:615px;font-size: 18px">月</div>
                               </div>
                               <div>
                                   <div id="myChart" :style="{width: '100%', height: '570px',}"></div>
                               </div>

                               <div class="bottom">
                                   <div class="item">
                                       <img style="margin-top:45px;position: absolute;margin-left: 50px;width:70px;height:65px" :src="require('@/assets/image/mystudent/mystudent1.png')" >
                                       <p class="count">7</p>
                                       <p class="type">考试</p>
                                   </div>
                                   <div class="item">
                                       <img style="margin-top:45px;position: absolute;margin-left: 50px;width:70px;height:65px"  :src="require('@/assets/image/mystudent/mystudent2.png')" >
                                       <p class="count">12</p>
                                       <p class="type">预约</p>
                                   </div>
                                   <div class="item">
                                       <img style="margin-top:45px;position: absolute;margin-left: 50px;width:70px;height:65px" :src="require('@/assets/image/mystudent/mystudent3.png')"  >
                                       <p class="count">36</p>
                                       <p class="type">观看</p>
                                   </div>
                                   <div class="item">
                                       <img style="margin-top:45px;position: absolute;margin-left: 50px;width:70px;height:65px" :src="require('@/assets/image/mystudent/mystudent4.png')"  >
                                       <p class="count">56</p>
                                       <p class="type">发言</p>
                                   </div>
                               </div>
                           </div>


                       </div>
    </div>
</template>

<script>
    export default {
        name: "mystudent",
        data(){
            return {
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
                value: ''
            }
        },
        mounted(){
            this.drawLine();
        },
        methods: {
            goBack(){
              this.$router.go(-1)
            },
            drawLine(){
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                myChart.setOption({

                    tooltip: {},

                    xAxis: {

                        name:"单位：天",
                        data: ["1","5","10","15","20","25","31"],
                        axisLine:{
                            lineStyle:{
                                color:'#8DB2FF', //更改坐标轴颜色
                                textStyle:{
                                    color:"red"
                                }
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: 'black',  //更改坐标轴文字颜色
                                fontSize : 14      //更改坐标轴文字大小
                            }
                        },

                    },
                    yAxis: {
                        splitLine: {
                            show: true,
                            lineStyle:{
                                color: ["#B8D8FF"],
                                width: 1,
                            }},
                        name:"单位：小时",
                        axisLine:{
                            lineStyle:{
                                color:'#C1DDFF' //更改坐标轴颜色
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: 'black',  //更改坐标轴文字颜色
                                fontSize : 14      //更改坐标轴文字大小
                            }
                        },
                    },
                    series: [{
                        name: '活跃度',
                        type: 'line',
                        smooth: true,
                        data: [2, 12, 6, 9, 10, 11,3],
                        symbolSize: 10,   //设定实心点的大小
                        itemStyle:{
                            normal:{
                                color:"#C593FF",
                                lineStyle:{
                                    color:"#C593FF"
                                }
                            }
                        }
                    }],



                });
            }}

    }

</script>

<style scoped>

.personal .el-divider--vertical{

    width: 5px;
    height: 80px;
    margin-left: 33.3%;
    margin-top: -90px;
}
    .time{
        position: absolute;
        width: 30%;
        display: block;
        margin-top: 20px;
        margin-left: 10px;
        height: 800px;
        background: #fff;

        /*box-shadow: 0px -3px 0px 0px pink,   !*上边阴影  红色*!*/

        /*-10px 0px 0px 0px #3bee17,   !*左边阴影  绿色*!*/

        /*10px 0px 0px 0px #2279ee,    !*右边阴影  蓝色*!*/

        /*0px 10px 0px 0px #eede15;    !*下边阴影  黄色*!*/
    }
    .timeline{
        width: 60%;
        margin-left: 20%;
        margin-top: 40px;
    }
#myChart{
    margin-top: 100px;
}
    .right{
        width: 68%;height:650px;background: #fff;margin-left: 31.5%;margin-top: 20px;position: absolute;

    }
    .bottom{
        width: 100%;height: 120px;background: #fff;margin-top:10px;position: absolute;display: flex;
    }
    .bottom .item{
        width: 25%;

        position: relative;
    }
.bottom .item .count{
    width: 100%;
    height: 120px;
    line-height: 100px;
    position: absolute;
    color: #6DAEFF;
    font-size: 18px;
    margin-left: 130px;
    margin-top: 10px;
}
.bottom .item .type{

    height: 120px;
    width: 100%;
    line-height: 160px;
    position: absolute;
    font-size: 20px;
    color: #878787;
    margin-left: 130px;
    margin-top: 10px;
}
</style>