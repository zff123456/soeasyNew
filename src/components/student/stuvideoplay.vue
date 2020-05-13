<template>
    <div  class="videoplay" style="width:100%;height: 100%;background: #EFF1F6;margin-top:70px;">
        <div class="centers">
        <div style="width: 90%;height: 500px;margin-left: 5%">
            <video id="playVideos" controls width="100%" height="500">
                <source id="playVideosss" src="https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20200317.mp4" type="video/mp4">
            </video>
        </div>

        <div style="width: 90%;background: #fff;margin-left: 5%;margin-top: 40px;border:1px solid #C5C6C9">
            <div>
                <div class="video_play_nav">
                    <div @click="active(1)" :class="{'active':this.isshow == 1}" class="video_play_item">简介</div>
                    <div @click="active(2)" :class="{'active':this.isshow == 2}" class="video_play_item">选集</div>
                    <div @click="active(3)" :class="{'active':this.isshow == 3}" class="video_play_item">评论</div>
                </div>
            </div>
            <div v-if="isshow == 1" class="video_des">
                <span>连续的图像变视频（Video）泛指将一系列静态影像以电信号的方式加以捕捉、纪录、处理、储存、传送与重现的各种技术。连续的图像变化每秒超过24帧（frame）画面以上时，根据视觉暂留原理，人眼无法辨别单幅的静态画面；看上去是平滑连续的视觉效果，这样连续的画面叫做视频。视频技术最早是为了电视系统而发展，但现在已经发展为各种不同的格式以利消费者将视频记录下来。网络技术的发达也促使视频的纪录片段以串流媒体的形式存在于因特网之上并可被电脑接收与播放。视频与电影属于不同的技术，后者是利用照相术将动态的影像捕捉为一系列的静态照片。视频（Video）泛指将一系列静态影像以电信号的方式加以捕捉、纪录、处理、储存、传送与重现的各种技术。连续的图像变化每秒超过24帧（frame）画面以上时，根据视觉暂留原理，人眼无法辨别单幅的静态画面；看上去是平滑连续的视觉效果，这样连续的画面叫做视频。视频技术最早是为了电视系统而发展，但现在已经发展为各种不同的格式以利消费者将视频记录下来。网络技术的发达也促使视频的纪录片段以串流媒体的形式存在于因特网之上并可被电脑接收与播放。视频与电影属于不同的技术，后者是利用照相术将动态的影像捕捉为一系列的静态照片。视频（Video）泛指将一系列静态影像以电信号的方式加以捕捉、纪录、处理、储存、传送与重现的各种技术。连续的图像变化每秒超过24帧（frame）画面以上时，根据视觉暂留原理，人眼无法辨别单幅的静态画面；看上去是平滑连续的视觉效果，这样连续的画面叫做视频。视频技术最早是为了电视系统而发展，但现在已经发展为各种不同的格式以利消费者将视频记录下来。网络技术的发达也促使视频的纪录片段以串流媒体的形式存在于因特网之上并可被电脑接收与播放。视频与电影属于不同的技术，后者是利用照相术将动态的影像捕捉为一系列的静态照片。视频（Video）泛指将一系列静态影像以电信号的方式加以捕捉、纪录、处理、储存、传送与重现的各种技术。连续的图像变化每秒超过24帧（frame）画面以上时，根据视觉暂留原理，人眼无法辨别单幅的静态画面；看上去是平滑连续的视觉效果，这样连续的画面叫做视频。视频技术最早是为了电视系统而发展，但现在已经发展为各种不同的格式以利消费者将视频记录下来。网络技术的发达也促使视频的纪录片段以串流媒体的形式存在于因特网之上并可被电脑接收与播放。视频与电影属于不同的技术，后者是利用照相术将动态的影像捕捉为一系列的静态照片。化每秒超过24帧（frame）画面以上时，根据视觉暂留原理，人眼无法辨别单幅的静态画面；看上去是平滑连续的视觉效果，这样连续的画面叫做视频。视频技术最早是为了电视系统而发展，但现在已经发展为各种不同的格式以利消费者将视频记录下来。网络技术的发达也促使视频的纪录片段以串流媒体的形式存在于因特网之上并可被电脑接收与播放。视频与电影属于不同的技术，后者是利用照相术将动态的影像捕捉为一系列的静态照片。</span>
            </div>

            <div  v-if="isshow == 2">
                <div  class="boxs">
                    <el-collapse v-model="activeName" accordion>
                       <div v-for="(item,key) in courselist" :key="key">
                        <el-collapse-item :title="`第${key+1}章 ${item.title1}`" :name="key+1" >
                            <div class="videolist" v-for="(itemmenu,index) in item.childen" :key="index">
                               <div class="video_list" style="border-bottom: 1px #C5C6C9 solid;height:40px;line-height: 40px;font-size: 12px;">
                                   <span style="margin-left: 50px">{{itemmenu.title2}}</span>
                                   <span style="margin-left: 80%">时长：{{itemmenu.timer}}</span>
                               </div>
                               
                            </div>
                        </el-collapse-item>
                       </div>
                    </el-collapse>
                </div>
            </div>


            <div v-if="isshow == 3" class="video_des">
                <div style="height: 120px; border-bottom:1px solid #C5C6C9;width: 100%">
                    <div style="width:100px;height: 100px;background: #ccc;border-radius: 50%;margin-top: 10px;position: absolute"></div>
                    <div>
                        <el-input
                                style="width:60%;position: absolute;height: 100px;margin-left:10%;margin-top: 30px"
                                type="textarea"
                                :rows="3.5"
                                placeholder="请输入内容"
                                v-model="input">
                        </el-input>
                        <div style="width:120px;height:80px;background: #5D96FE;float:right;font-size: 20px;text-align: center;line-height:80px;margin-top: 30px;color: #fff;font-weight: bold;border-radius: 10px;" @click="pushComment">发表评论</div>
                    </div>
                </div>

                <div v-for="(val,keys) in commentList" :key="keys">
                    <div style="height: 100px;border-bottom: 1px #C5C6C9 solid" >
                        <div style="width:60px;height: 60px;background: #ccc;border-radius: 50%;margin-top: 30px;position: absolute">
                            <img :src="val.url?val.url:require('../../assets/image/video/2020-04-18_174041.png')" alt="" style="width: 100%;height: 100%;">
                        </div>
                        <div style="position: absolute;margin-left: 100px;margin-top: 20px" >
                            <span :class="{color:val.level=='vip'}">{{val.name}} </span>
                            <span v-if="val.level=='vip'" style="padding:3px 15px;background:#FFAE00;border-radius:10px;">vip</span>
                        </div>
                        <div style="position: absolute;margin-left: 100px;margin-top: 50px;">{{val.comment}}</div>
                        <div style="float: right;margin-top: 60px">{{val.timer}}</div>
                    </div>
                </div>
            </div>


        </div>

        <div style="width: 100%;height:40px;background:#EFF1F6 "></div>
    </div>
</div>
</template>

<script>
    export default {
        data(){
            return{
                isshow:1,
                activeName: '1',
                input:"",
                courselist:[{
                    title1:'学习英语1',
                    childen:[{
                        title2:'英语的表达方式1',timer:'00:00:09'
                    },{title2:'英语的表达方式2',timer:'00:00:09'
                   },{title2:'英语的表达方式3',timer:'00:00:09'
                  },{title2:'英语的表达方式4',timer:'00:00:09'}]},
                  {
                    title1:'学习英语2',
                    childen:[{
                        title2:'英语的表达方式3',timer:'00:00:09'
                    },{title2:'英语的表达方式2',timer:'00:00:09'
                   },{title2:'英语的表达方式2',timer:'00:00:09'
                  },{title2:'英语的表达方式2',timer:'00:00:09'}]},
                  {
                    title1:'学习英语3',
                    childen:[{
                        title2:'英语的表达方式1',timer:'00:00:09'
                    },{title2:'英语的表达方式1',timer:'00:00:09'
                   },{title2:'英语的表达方式1',timer:'00:00:09'
                  },{title2:'英语的表达方式1',timer:'00:00:09'}]},
                  {
                    title1:'学习英语4',
                    childen:[{
                        title2:'英语的表达方式3',timer:'00:00:09'
                    },{title2:'英语的表达方式2',timer:'00:00:09'
                   },{title2:'英语的表达方式2',timer:'00:00:09'
                  },{title2:'英语的表达方式2',timer:'00:00:09'}]},
                  {
                    title1:'学习英语5',
                    childen:[{
                        title2:'英语的表达方式3',timer:'00:00:09'
                    },{title2:'英语的表达方式2',timer:'00:00:09'
                   },{title2:'英语的表达方式2',timer:'00:00:09'
                  },{title2:'英语的表达方式2',timer:'00:00:09'}]},
                ],
                commentList:[{url:require('../../assets/image/video/pic.png'),name:'张大伟',comment:'老师说的真棒！',level:'nomal',timer:'2020年1月1号',            
                             },{url:'',name:'张大伟',comment:'老师说的真棒！',level:'nomal',timer:'2020年1月1号',
                            },{url:'',name:'张大伟',comment:'老师说的真棒！哈哈哈',level:'nomal',timer:'2020年1月1号',},
                            {url:require('../../assets/image/video/pic.png'),name:'张二伟',comment:'老师说的真棒！号号号',level:'vip',timer:'2020年1月1号',},
                            {url:'',name:'张大伟',comment:'老师说的真棒！',level:'nomal',timer:'2020年1月1号',}
                        ]
            }
        },
        name: "video_play",
        methods:{
            active(val){
                this.isshow = val
            },
            pushComment(){
                var date=new Date();
                date=  this.init(date)
               console.log(this.input);
               this.commentList.push({
                  url:'',
                  name:'李四',
                  comment:this.input,
                  level:'nomal',
                  timer:date
               })
               this.input=''
               
            },
            init(val){
	           var date=new Date(val);
	              //年
               var year=date.getFullYear();
                 //月
               var month=date.getMonth()+1;
                    //日
                var day=date.getDate();
                //时
                var hh=date.getHours();
                     //分
                 var mm=date.getMinutes();
                  //秒
                var ss=date.getSeconds();
               var rq=year+"年"+month+"月"+day+"日"+hh+":"+mm+":"+ss;
               return rq
              //  document.getElementById("rq").innerHTML=rq;
     }

        }
    }
</script>

<style scoped>
 .color{
     color: red;
 }
    /* .boxs{
        box-sizing: border-box;
    } */
  .boxs  .el-collapse-item:last-child {
    /* margin-bottom: -1px; */
    box-sizing: border-box;
    padding-left: 20px;
    margin-top: 10px;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
}


    .videoplay .centers{
        width: 90%;
        margin: 0 auto;
    }
    .active{
        border-bottom: 2px #5D96FE solid;
    }
    .video_play_nav{
        display: flex;
        border-bottom: 1px #646464 solid;
    }
    .video_play_item{
        width: 60px;
        margin-left: 22%;
        height: 50px;
        line-height: 50px;
        text-align: center;
        cursor: pointer;
    }
    .video_des{
        width: 96%;
        margin-left:2%;
        line-height: 40px;
        letter-spacing: 0.1em;
        /*overflow: scroll;*/

    }
    .videolist{
        cursor: pointer;
    }

</style>