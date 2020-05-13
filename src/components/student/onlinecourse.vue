<template>
    <div class="onlineCourse">
       <div class="centers">
        <div class="header">
            视频类型：<el-button v-for="item in videoTypeList" type="warning" plain >{{item}}</el-button>
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
       </div>       
    </div>
</template>

<script>
export default {
    data() {
        return {
            videoTypeList:[ '全部','四级视频','六级视频','A级视频','B级视频','推荐视频',"我校视频"],
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
    created() {

    },
    mounted() {

    },
    methods: {
        tovideo(val){
                this.$router.push({
                    name:'stucoursedetail',
                    params: {
                       title: val.title,
                       shuji:val.shuji,
                       teacher:val.teacher,
                       school:val.school,
                       url:val.url
                  }})
        },
    }
};
</script>

<style scoped lang="less">
    .onlineCourse{
        height: 100%;
        margin-top:61px;
        background-color: #f0f0f0;
        padding-top:20px;
    }
    .onlineCourse .centers{
        width: 94%;
        margin: 0 auto;
    }
    .onlineCourse .header{
        background-color: #fff;
    }
    .video_list{
        display: flex;
        flex-wrap: wrap;
        justify-content: flex-start;
    }
    .video_main{
        width: 18.5%;
        margin-left: 1.3%;
        height: 330px;
        margin-top: 20px;
        background: #fff;
        /* background: red; */
        border-radius: 5px 5px 0 0;
        cursor: pointer;
    }
    .video_main_pic{
        width: 100%;
        border-radius: 5px 5px 0 0;
        box-sizing: border-box;
        border:2px solid #5D96FE;
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

</style>
