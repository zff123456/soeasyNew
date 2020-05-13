<template>
    <div style="width:100%;height: 100%;background: #EFF1F6;position: absolute;top:70px;">

        <div class="Course_Details_nav"  style="margin-top: 10px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: 'Lead_in_course' }">已创建课程</el-breadcrumb-item>
                <el-breadcrumb-item style="border-bottom:3px solid #5D96FE">导入视频</el-breadcrumb-item>
            </el-breadcrumb>

        </div>

        <div>
            <div style="width: 100%;height:80px;background: #fff;margin-top: 20px">
                <div style="font-size: 24px;font-weight: bold;line-height:80px;margin-left: 140px;position: absolute">《专业英语》</div>
                <span style="width:120px;height:40px;line-height:40px;background: #60C5F9;position: absolute;margin-top: 20px;border-radius: 20px;text-align: center;margin-left:320px;">创建章节名</span>
                <span style="width:120px;height:40px;line-height:40px;background: #00DBBE;position: absolute;margin-top: 20px;border-radius: 20px;text-align: center;margin-left:450px;">单个导入</span>
                <span style="width:120px;height:40px;line-height:40px;background: #FFC23F;position: absolute;margin-top: 20px;border-radius: 20px;text-align: center;margin-left:580px;">批量导入</span>
            </div>
        </div>

        <div class="drsp_sco" style="margin-top: 10px">
            <el-collapse v-model="activeName" accordion>

                <el-collapse-item name="1">
                    <template slot="title">
                        第一章：if i were a bird
                        <span class="btn_add" style="">添加</span>
                    </template>
                    <div style="height: 40px;background: #fff;padding-top:0px;line-height: 40px;margin-top: 20px">
                        <span>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</span>
                        <span class="btn_change" style="">替换</span>
                        <span class="btn_del" style="">删除</span>
<!--                        <span style="width: 50px;height: 30px;line-height: 30px;background: red;position: absolute">删除</span>-->
                    </div>
                    <div style="height: 40px;background: #fff;padding-top:10px;line-height: 40px;margin-top: 10px">
                        <span>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</span>
                        <span class="btn_change" style="">替换</span>
                        <span class="btn_del" style="">删除</span>
                        <!--                        <span style="width: 50px;height: 30px;line-height: 30px;background: red;position: absolute">删除</span>-->
                    </div>
                </el-collapse-item>

                <el-collapse-item name="2">
                    <template slot="title">
                        第一章：if i were a bird    第一章：if i were a bird    第一章：if i were a bird    第一章：if i were a bird
                        <span class="btn_add" style="">添加</span>
                    </template>
                    <div style="height: 40px;background: #fff;padding-top:0px;line-height: 40px;margin-top: 20px">
                        <span>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</span>
                        <span class="btn_change" style="">替换</span>
                        <span class="btn_del" style="">删除</span>
                        <!--                        <span style="width: 50px;height: 30px;line-height: 30px;background: red;position: absolute">删除</span>-->
                    </div>
                    <div style="height: 40px;background: #fff;padding-top:10px;line-height: 40px;margin-top: 10px">
                        <span>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</span>
                        <span class="btn_change" style="">替换</span>
                        <span class="btn_del" style="">删除</span>
                        <!--                        <span style="width: 50px;height: 30px;line-height: 30px;background: red;position: absolute">删除</span>-->
                    </div>
                </el-collapse-item>

            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                activeName: '1'
            }
        },
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
    .drsp_sco .el-collapse-item__content{
        background: red;
    }
    .btn_change{
        width: 80px;
        height: 30px;
        line-height: 30px;
        background: #5D72AE;
        position: absolute;
        text-align: center;
        margin-top: 5px;
        color: #fff;
        border-radius: 20px;
        margin-left: 1000px;
        cursor:pointer
    }
    .btn_add{
        width: 80px;
        height: 30px;
        line-height: 30px;
        background: #00DBBE;
        position: absolute;
        text-align: center;
        margin-top: 5px;
        color: #fff;
        border-radius: 20px;
        margin-left: 1690px;
        cursor:pointer;
    }
    .btn_del{
        width: 80px;
        height: 30px;
        line-height: 30px;
        background: #EB6877;
        position: absolute;
        text-align: center;
        margin-top: 5px;
        color: #fff;
        border-radius: 20px;
        margin-left: 1100px;
        cursor:pointer
    }
</style>