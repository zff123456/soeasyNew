<template>
    <div style="width:100%;height: 100%;background: #EFF1F6;position: absolute">

        <div>
            <div class="top_nav" style="margin-top:70px">
                <!--                <div class="top_nav_item">-->
                <!--                    <img style="position: absolute;margin-top:20px;margin-left: 100px" :src="require('@/assets/image/video/05_00000.png')" >-->
                <!--                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">课程推荐</div>-->
                <!--                </div>-->
                <div class="top_nav_item"  @click="tonav(1)">
                    <img style="position: absolute;margin-top:20px;margin-left: 100px" :src="require('@/assets/image/video/03_00000.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #FFBB29">课程推荐</div>
                </div>
                <div class="top_nav_item" @click="tonav(2)">
                    <img style="position: absolute;margin-top:20px;margin-left: 100px" :src="require('@/assets/image/video/04_00000.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">我的课程</div>
                </div>
                <div class="top_nav_item"  @click="tonav(4)">
                    <img  style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/drkc.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">学校课程</div>
                    <!-- <img  style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/xjkc.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">新建课程</div> -->
                </div>
                <div class="top_nav_item"  @click="tonav(3)">
                    <img  style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/xjkc.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">新建课程</div>
                    <!-- <img  style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/drkc.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">导入课程</div> -->
                </div>
            </div>
        </div>
        <div class="Course_Details_nav" style="margin-top: 20px" >
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">主页面</el-breadcrumb-item>
                <el-breadcrumb-item>课程推荐</el-breadcrumb-item>
                <el-breadcrumb-item>专业英语四级讲解</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!-- <div class="Course_Details_main">
           <div style="width: 30%;height:180px;margin-top: 15px;position: absolute;margin-left: 40px">
               <img style="width: 100%;height:180px;position: absolute" :src="videosrc">
           </div>
            <div class="video_main_des" >{{videotitle}}</div>
            <div class="video_main_type" > {{videoshuji}} </div>
            <div class="video_main_time" > 开课时间：2020.3.24~2020.5.21</div>
            <div class="video_main_xs" > 学时安排：每周五小时</div>
            <div class="video_main_count" > 已有1000人观看 </div>
            <div class="video_main_school" @click="video_play" > 立即观看 </div>
        </div> -->
        <div class="Course_Details_main">
                        <div style="width: 30%;height:180px;margin-top: 15px;position: absolute;margin-left: 40px">
            <!--                 <img style="width: 100%;height:180px;position: absolute" :src="obj.url"> -->
                            <img style="width: 100%;height:180px;position: absolute" :src="videosrc">
                        </div>
                         <div class="video_main_des" >{{videotitle}}</div>
                         <div class="video_main_type" > {{videoshuji}} </div>
                         <div class="video_main_time" > 开课时间：2020.3.24~2020.5.21</div>
                         <div class="video_main_xs" > 学时安排：每周五小时</div>
                         <div class="video_main_count" > 已有1000人观看 </div>
                         <div class="video_main_school" @click="video_play"> 立即观看 </div>
                     </div>
    </div>
</template>

<script>
    export default {
        name: "Course_Details",
        data(){
           return{
            videoschool:'',
            videosrc:'',
            videotitle:'',
            videoteahcer:'',
            videoshuji:'',
           }
        },
        methods:{
            video_play(){
                this.$router.push("video_play")
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
            }
        },
        mounted(){
            this.videoschool=localStorage.getItem('videoschool')
               console.log(localStorage.getItem('videoschool'));
               this.videosrc=localStorage.getItem('videosrc')
               console.log( localStorage.getItem('videosrc'));
               this.videotitle= localStorage.getItem('videotitle')
               console.log( localStorage.getItem('videotitle'));
               this.videoteahcer=localStorage.getItem('videoteahcer')
              console.log(  localStorage.getItem('videoteahcer'));            
              this.videoshuji= localStorage.getItem('videoshuji')
              console.log(  localStorage.getItem('videoshuji'));
              
            // console.log( localStorage.getItem('obj'));
            
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
    /* .Course_Details_main{
        width: 100%;
        height:240px;
        background: #fff;
        margin-top: 20px;
    } */
    /* .video_main_des{
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
    } */
    /* .video_main_type{
        margin-left:33%;
        position: absolute;
        font-size: 18px;
        margin-top:80px;
        color: #262626;
        font-weight: bold;
    } */
    /* .video_main_time{
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
        margin-right:2.5%;
        margin-top: 190px;
        height:40px;
        line-height: 40px;
        width: 150px;
        background: red;
        text-align: center;
        border-radius: 20px;
        background: #FFAE00;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
    } */
    /* .video_main_count{
        float: right;
        margin-left: 90%;
        margin-right: 20px;
        margin-top: 150px;
        position: absolute;
    } */
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
        padding-left: 100px;
    }
    .tanmain_item{
        width: 80px;
        text-align: center;
        margin-left: 50px;
        cursor: pointer;
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
        margin-right:2.5%;
        margin-top: 190px;
        height:40px;
        line-height: 40px;
        width: 150px;
        background: red;
        text-align: center;
        border-radius: 20px;
        background: #FFAE00;
        color: #fff;
        font-size: 18px;
        cursor: pointer;
    }
    .video_main_count{
        /* float: right; */
        /* margin-left: 90%; */
        /* margin-right: -50px; */
        margin-top: 150px;
        position: absolute;
        right: 5%;
    }
</style>