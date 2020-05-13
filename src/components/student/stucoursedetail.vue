<template>
    <div class="coursedetail">
      <div class="centers">
        <div class="Course_Details_main">
            <div style="width: 30%;height:180px;margin-top: 15px;position: absolute;margin-left: 40px">
                <img style="width: 100%;height:180px;position: absolute" :src="obj.url">
            </div>
             <div class="video_main_des" >{{obj.title}}</div>
             <div class="video_main_type" > {{obj.shuji}} </div>
             <div class="video_main_time" > 开课时间：2020.3.24~2020.5.21</div>
             <div class="video_main_xs" > 学时安排：每周五小时</div>
             <div class="video_main_count" > 已有1000人观看 </div>
             <div class="video_main_school" @click="video_play"> 立即观看 </div>
         </div>
      </div>
    </div>
</template>

<script>
export default {
    data() {
        return { 
           obj:{
               title:'',
               shuji:'',
               teacher:'',
               school:'',
               url:''
           },
        };
    },
    created() {

    },
    mounted() {
    console.log(this.$route.params);
    this.obj.title=this.$route.params.title
    this.obj.shuji=this.$route.params.shuji
    this.obj.teacher= this.$route.params.teacher
    this.obj.school= this.$route.params.school
    this.obj.url= this.$route.params.url

    },
    methods: {
        video_play(){
            // console.log(111);
            
         this.$router.push({name:"video_play"})
         console.log(222);
         
     },
    }
};
</script>

<style scoped lang="less">
.coursedetail{
    height: 100%;
    padding-top: 61px;
}
.centers{
    width: 90%;
    margin: 0 auto;
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
        right: 8%;
    }
</style>
