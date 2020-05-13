<template>
    <div style="width:100%;height: 100%;background: #EFF1F6;position: absolute">

        <div>
            <div class="top_nav" style="margin-top:70px" >
                                <div class="top_nav_item"  @click="tonav(1)">
                                    <img style="position: absolute;margin-top:20px;margin-left: 100px" :src="require('@/assets/image/video/05_00000.png')" >
                                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">课程推荐</div>
                                </div>
<!--                <div class="top_nav_item"  @click="tonav(1)">-->
<!--                    <img style="position: absolute;margin-top:20px;margin-left: 100px" :src="require('@/assets/image/video/03_00000.png')" >-->
<!--                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #FFBB29">课程推荐</div>-->
<!--                </div>-->
                <div class="top_nav_item" @click="tonav(2)">
                    <img style="position: absolute;margin-top:20px;margin-left: 100px" :src="require('@/assets/image/video/06_00000.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color:#FFBB29">我的课程</div>
                </div>
                <div class="top_nav_item"  @click.prevent="tonav(4)">
                    <img style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/drkc.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">学校课程</div>
                    <!-- <img  style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/xjkc.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">新建课程</div> -->
                </div>
                <div class="top_nav_item"  @click="tonav(3)">
                    <img  style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/xjkc.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">新建课程</div>
                </div>
            </div>
        </div>
        <div class="video_list">
            <div class="video_main"  v-for="(item,key) in typeList " :key="key">
               <div @click="tovideo(item)">
                   <img :src="item.url" alt="" class="video_main_pic">
                 
                   <div class="video_main_title" >{{item.title}}</div>
                   <div class="video_main_shuji" > {{item.shuji}} </div>
                   <div class="video_main_tea" > 开课时间：{{item.timer}}  <span style="float: right;">已有{{item.count}}人观看 </span> </div>
                  <div>
                       <div class="video_main_schools" > 学时安排：{{item.courseTimer}} </div>
                       <div class="video_main_school" @click="video_play" > 编辑 </div> 
                  </div>
               </div>
            </div>
        </div>

        <!-- <div class="Course_Details_main">
            <div style="width: 30%;height:180px;margin-top: 15px;position: absolute;margin-left: 40px">
                <img style="width: 100%;height:180px;position: absolute" src="https://edu-image.nosdn.127.net/5EB2BDD5604524306BFD43F4761C2305.png?imageView&quality=100&thumbnail=230y130">
            </div>
            <div class="video_main_des" >好评如潮</div>
            <div class="video_main_type" > 《专业英语四级讲解》 </div>
            <div class="video_main_time" > 开课时间：2020.3.24~2020.5.21</div>
            <div class="video_main_xs" > 学时安排：每周五小时</div>
            <div class="video_main_count" > 已有1000人观看 </div>
            <div class="video_main_school" @click="video_play" > 编辑 </div>
        </div> -->
    </div>
</template>

<script>
    export default {
        name: "Course_Details",
        data(){
            return{
                typeList:[{
           url:require('../../assets/image/index/stubg.png'),title:'好评如潮',shuji:"《专业英语四级讲解》",teacher:'张大伟',school:'南京财经大学',timer:'2020.3.24~2020.5.21',courseTimer:'每周五小时',count:1000,
           },{url:require('../../assets/image/index/stubg.png'),title:'新建课程',shuji:"《商务英语》",teacher:'张大伟',school:'南京财经大学',timer:'2020.3.24~2020.5.21',courseTimer:'每周六小时',count:1000,
           },{url:require('../../assets/image/index/stubg.png'),title:'网站推荐',shuji:"《专业英语六级讲解》",teacher:'张大伟',school:'南京财经大学',timer:'2020.3.24~2020.5.21',courseTimer:'每周五小时',count:1000,
           },{url:require('../../assets/image/index/stubg.png'),title:'新鲜视频',shuji:"《专业英语四级讲解》",teacher:'张大伟',school:'南京财经大学',timer:'2020.3.24~2020.5.21',courseTimer:'每周五小时',count:1000,
           },{url:require('../../assets/image/index/stubg.png'),title:'网站推荐',shuji:"《专业英语四级讲解》",teacher:'张大伟',school:'南京财经大学',timer:'2020.3.24~2020.5.21',courseTimer:'每周五小时',count:1000,
           },{url:require('../../assets/image/index/stubg.png'),title:'新鲜视频',shuji:"《专业英语四级讲解》",teacher:'张大伟',school:'南京财经大学',timer:'2020.3.24~2020.5.21',courseTimer:'每周五小时',count:1000,
           },{url:require('../../assets/image/index/stubg.png'),title:'网站推荐',shuji:"《专业英语四级讲解》",teacher:'张大伟',school:'南京财经大学',timer:'2020.3.24~2020.5.21',courseTimer:'每周五小时',count:1000,}],
            }

        },
        methods:{
            video_play(){
                this.$router.push("Import_video")
            },
            toother(val){
                if(val==2){this.$router.push("New_curriculum")}
                if(val==3){this.$router.push("Lead_in_course")}
            },
            tonav(val){
                console.log(val)
                if(val == 1){this.$router.push("video")}
                if(val == 2){this.$router.push("my_course")}
                if(val == 3){this.$router.push("New_curriculum")}
                if(val == 4){this.$router.push("Lead_in_course")}
            },
            tovideo(val){
                
            }
        }
    }
</script>

<style scoped>
    .Course_Details_nav{
        width: 100%;
        height: 50px;
        background: #fff;
        line-height: 50px;
    }
    .Course_Details_nav .el-breadcrumb {
        /* margin-bottom: 15px; */
        font-size: 14px;
        line-height: 50px;
        padding-left: 150px;
    }
    .Course_Details_main{
        width: 100%;
        height:240px;
        background: #fff;
        margin-top: 20px;
    }
    .video_main_des{
        width: 80px;
        background: #FFAE00;
        height:30px;
        line-height: 30px;
        text-align: center;
        margin-left:33%;
        border-radius: 10px;
        margin-top: 30px;
        font-size: 14px;
        position: absolute;
    }
    .video_main_type{
        margin-left:33%;
        position: absolute;
        font-size: 18px;
        margin-top:80px;
        color: #262626;
        font-weight: bold;
    }
    .video_main_time{
        margin-left:34%;
        position: absolute;
        font-size: 16px;
        margin-top: 120px;
        color: #262626;

    }
    .video_main_xs{
        margin-left:34%;
        position: absolute;
        font-size: 16px;
        margin-top: 155px;
        color: #262626;
    }
    .video_main_school{
        float: right;
        width: 80px;
        text-align: center;
        padding: 5px 0;
        margin-top:15px;
        border-radius: 20px;
        background: #FFAE00;
        color: #fff;
        font-size: 16px;
        cursor: pointer;
    }
    .video_main_count{
        float: right;
        margin-left: 90%;
        margin-right: 20px;
        margin-top: 150px;
        position: absolute;
    }
    .top_nav{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
    }
    .top_nav_item{
        width: 23%;
        height: 100px;
        background: #fff;
    }
    .tabmain{
        display: flex;
        height:50px;
        line-height: 50px;
        background: #fff;
/* background-color: pink;      */
   padding-left: 100px;
    }
    .tanmain_item{
        width: 80px;
        text-align: center;
        margin-left: 50px;
        cursor: pointer;
    }
    .video_list{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .video_main{
        width: 18.5%;
        margin-left: 1.3%;
        height: 350px;
        margin-top: 20px;
        background: #fff;
        border-radius: 5px 5px 0 0;
        cursor: pointer;
    }
    .video_main_pic{
        width: 100%;
        border-radius: 5px 5px 0 0;
    }
    .video_main_title{
        width: 80px;
        background: #FFAE00;
        height:30px;
        line-height: 30px;
        text-align: center;
        margin-left: 10px;
        border-radius: 10px;
        margin-top: 10px;
        font-size: 14px;
    }
  .video_main_shuji{

        font-size: 18px;
        margin-top: 10px;
        color: #262626;
        font-weight: bold;
    }
      .video_main_tea{
        margin-left: 10px;
        font-size: 12px;
        margin-top: 10px;
        color: #808080;
        color: #262626;
    }
    .video_main_schools{
        float:left;
        margin: 15px 0 10px 10px;
        font-size: 15px;
    }
</style>