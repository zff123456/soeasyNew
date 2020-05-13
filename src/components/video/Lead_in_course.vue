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
                    <img style="position: absolute;margin-top:20px;margin-left: 100px" :src="require('@/assets/image/video/04_00000.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color:#949494">我的课程</div>
                </div>
                <div class="top_nav_item"  @click.prevent="tonav(4)">
                    <img style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/drkc_select.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #FFBB29">学校课程</div>
                    <!-- <img  style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/xjkc.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">新建课程</div> -->
                </div>
                <div class="top_nav_item"  @click="tonav(3)">
                    <img  style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/xjkc.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">新建课程</div>
                    <!-- <img style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/drkc_select.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #FFBB29">导入课程</div> -->
                </div>
            </div>
        </div>

        <div>
            <div style="background: #fff;margin-top: 20px">
                <img style="width: 300px;height:200px;margin-top: 20px;margin-bottom: 20px;margin-left: 10px;border-radius: 5px;border:2px solid #827B6B" src="https://edu-image.nosdn.127.net/6F76DC08344AE80D20B616651FDD59EB.png?imageView&quality=100&thumbnail=230y130">
                <span style="position: absolute;font-size: 20px;margin-top: 20px;font-weight: bold"> 《专业英语》 </span>
                <span style="position: absolute;font-size: 18px;margin-top:70px;margin-left: 10px">讲师：张小伟</span>
                <span style="position: absolute;width:800px;margin-top: 120px;margin-left: 10px">简介：The 68 subjects in the test group went through a treatment of sixteen-week college English course with Chinese culture instructed.</span>
                <span style="position: absolute;margin-left:650px;margin-top: 200px">创建时间：2020.3.25</span>
                <span @click="drsp" style="cursor: pointer;width: 100px;height:40px;background:#FF9000;position: absolute;font-size: 20px;color: #fff;
                line-height: 40px;text-align: center;border-radius: 20px;margin-left: 1200px;margin-top: 100px ">编辑</span>
            </div>

            <div style="background: #fff;margin-top: 20px">
                <img style="width: 300px;height:200px;margin-top: 20px;margin-bottom: 20px;margin-left: 10px;border-radius: 5px;border:2px solid #827B6B" src="https://edu-image.nosdn.127.net/6F76DC08344AE80D20B616651FDD59EB.png?imageView&quality=100&thumbnail=230y130">
                <span style="position: absolute;font-size: 20px;margin-top: 20px;font-weight: bold"> 《专业英语》 </span>
                <span style="position: absolute;font-size: 18px;margin-top:70px;margin-left: 10px">讲师：张小伟</span>
                <span style="position: absolute;width:800px;margin-top: 120px;margin-left: 10px">简介：The 68 subjects in the test group went through a treatment of sixteen-week college English course with Chinese culture instructed.</span>
                <span style="position: absolute;margin-left:650px;margin-top: 200px">创建时间：2020.3.25</span>
                <span style="cursor: pointer;width: 100px;height:40px;background:#FF9000;position: absolute;font-size: 20px;color: #fff;
                line-height: 40px;text-align: center;border-radius: 20px;margin-left: 1200px;margin-top: 100px ">编辑</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Course_Details",
        methods:{
            video_play(){
                this.$router.push("video_play")
            },
            toother(val){
                if(val==1){this.$router.push("video")}
                if(val==2){this.$router.push("New_curriculum")}
                if(val==3){this.$router.push("Lead_in_course")}
            },
            drsp(){
                this.$router.push("Import_video")
            },
            tonav(val){
                console.log(val)
                if(val == 1){this.$router.push("video")}
                if(val == 2){this.$router.push("my_course")}
                if(val == 3){this.$router.push("New_curriculum")}
                if(val == 4){this.$router.push("Lead_in_course")}
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
        float: right;
        margin-left: 90%;
        margin-right: 20px;
        margin-top: 150px;
        position: absolute;
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
</style>