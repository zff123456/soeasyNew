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
                <div class="top_nav_item"  @click="tonav(2)">
                    <img style="position: absolute;margin-top:20px;margin-left: 100px" :src="require('@/assets/image/video/04_00000.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">我的课程</div>
                </div>
                <div class="top_nav_item"  @click="tonav(3)">
                    <!-- <img  style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/xjkc.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">新建课程</div> -->
                    <img  style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/drkc.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">学校课程</div>
                </div>
                <div class="top_nav_item"  @click="tonav(4)">
                    
                    <!-- <img  style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/drkc.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">学校课程</div> -->
                    <img  style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/xjkc.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">新建课程</div>
                </div>
            </div>
        </div>

        <div class="video_tab">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="全部" name="first"></el-tab-pane>
                <el-tab-pane label="英语四级" name="second"></el-tab-pane>
                <el-tab-pane label="英语六级" name="third"></el-tab-pane>
                <el-tab-pane label="高职A级" name="fourth"></el-tab-pane>
                <el-tab-pane label="高职B级" name="fifth"></el-tab-pane>
            </el-tabs>
        </div>

        <div class="video_list">
            <div class="video_main"  v-for="(item,key) in typeList " :key="key">
               <div @click="tovideo(item)">
                   <img :src="item.url" alt="" class="video_main_pic">
                   <!-- <img class="video_main_pic" src="https://edu-image.nosdn.127.net/C321D9E56A934D520D9DD79F9527CCE6.jpg?imageView&quality=100&thumbnail=230y130"> -->
                   <div class="video_main_des" >{{item.title}}</div>
                   <div class="video_main_type" > {{item.shuji}} </div>
                   <div class="video_main_tea" > 讲师：{{item.teacher}} </div>
                   <div class="video_main_school" > {{item.school}} </div>
               </div>
            </div>
        </div>

        <div class="video_paga" style="float: right;margin-right: 10px;margin-top: 10px">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage4"
                    :page-size="100"
                    layout="prev, pager, next, jumper"
                    :total="1000">
            </el-pagination>
        </div>
    </div>
</template>


<script>
    export default {
        data() {
            return {
                activeName: 'first',
                currentPage4:3,
                typeList:[{
           url:require('../../assets/image/index/stubg.png'),title:'好评如潮',shuji:"《专业英语四级讲解》",teacher:'张大伟',school:'南京财经大学',
           },{url:require('../../assets/image/index/stubg.png'),title:'新建课程',shuji:"商务英语",teacher:'张大伟',school:'南京财经大学',
           },{url:require('../../assets/image/index/stubg.png'),title:'网站推荐',shuji:"《专业英语六级讲解》",teacher:'张大伟',school:'南京财经大学',
           },{url:require('../../assets/image/index/stubg.png'),title:'新鲜视频',shuji:"《专业英语四级讲解》",teacher:'张大伟',school:'南京财经大学',
           },{url:require('../../assets/image/index/stubg.png'),title:'网站推荐',shuji:"《专业英语四级讲解》",teacher:'张大伟',school:'南京财经大学',
           },{url:require('../../assets/image/index/stubg.png'),title:'新鲜视频',shuji:"《专业英语四级讲解》",teacher:'张大伟',school:'南京财经大学',
           },{url:require('../../assets/image/index/stubg.png'),title:'网站推荐',shuji:"《专业英语四级讲解》",teacher:'张大伟',school:'南京财经大学',}],
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            },
            tovideo(val){
                console.log(val);
                localStorage.setItem('obj',val)
                localStorage.setItem('videoschool',val.school)
                localStorage.setItem('videosrc',val.url)
                localStorage.setItem('videotitle',val.title)
                localStorage.setItem('videoteahcer',val.teacher)
                localStorage.setItem('videoshuji',val.shuji)
                this.$router.push("Course_Details")
                
                
            },
            toother(val){
                if(val==2){this.$router.push("New_curriculum")}
                if(val==3){this.$router.push("Lead_in_course")}
            },
            tonav(val){
                console.log(val)
                if(val == 1){this.$router.push("video")}
                if(val == 2){this.$router.push("my_course")}
                if(val == 4){this.$router.push("New_curriculum")}
                if(val == 3){this.$router.push("Lead_in_course")}
            }
        }
    };
</script>


<style>
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
    .video_tab{
        margin-top: 10px;

    }
    .video_tab .el-tabs__nav-scroll{
        background: #fff;
        padding-left: 200px;
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
        /*box-shadow:  0px 2px 0px 0px #ccc,*/
        /*-2px 0px 0px 0px #ccc,*/
        /*2px 0px 0px 0px #ccc,*/
        /*0px 2px 0px 0px #ccc;*/
        border-radius: 5px 5px 0 0;
        cursor: pointer;
    }
    .video_main_pic{
        width: 100%;
        border-radius: 5px 5px 0 0;
    }
    .video_main_des{
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
    .video_main_type{

        font-size: 18px;
        margin-top: 10px;
        color: #262626;
        font-weight: bold;
    }
    .video_main_tea{
        margin-left: 10px;
        font-size: 16px;
        margin-top: 10px;
        color: #262626;
    }
    .video_main_school{
        float: right;
        margin-right: 10px;
        font-size: 16px;
    }
    .video_paga .el-pager li{
        background: #EFF1F6 ;
    }
    .video_paga .el-pagination .btn-next{
        background: #EFF1F6 ;
    }
    .video_paga .el-pagination .btn-prev{
        background: #EFF1F6 ;
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
        cursor: pointer;
    }
</style>