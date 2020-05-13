<template>
    <div style="width:100%;height: 100%;background: #EFF1F6;position: absolute;padding-bottom: 70px;">
        <div>
            <div class="top_nav" style="margin-top:70px" >
                <div class="top_nav_item"  @click="tonav(1)">
                                       <img style="position: absolute;margin-top:20px;margin-left: 100px" :src="require('@/assets/image/video/05_00000.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">课程推荐</div>
                </div>
                <div class="top_nav_item" @click="tonav(2)">
                                       <img style="position: absolute;margin-top:20px;margin-left: 100px" :src="require('@/assets/image/video/04_00000.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color:#949494">我的课程</div>
                </div>
                <div class="top_nav_item"  @click="tonav(4)">
                                       <img style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/drkc.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #949494">学校课程</div>             
                </div>
                <div class="top_nav_item"  @click="tonav(3)">
                                       <img  style="position: absolute;margin-top:20px;margin-left: 100px;width: 60px;height:60px" :src="require('@/assets/image/video/xjkc_select.png')" >
                    <div style="position: absolute;margin-top: 30px;margin-left: 200px;font-size: 24px;font-weight: bold;color: #FFBB29">新建课程</div>
                </div>
            </div>
        </div>

        <div style="margin-top: 20px;padding: 0 50px;padding-top:30px;padding-bottom: 40px;margin-bottom: 50px;">
            <!-- <el-card> -->

            <div  v-if="isReloadData" style="width: 48%;margin-right:4%;float:left;box-sizing: border-box;padding:20px;padding-bottom: 100px;" class="left-box" >
                <h2 style="text-align: center;margin:20px 0;">创建视频</h2>
                <div style="width: 80%; margin-left:10%;" >
                    <el-tabs v-model="activeName"   >
                        <el-tab-pane label="上传视频" name="first">

                            <el-form ref="form"  label-width="80px">
                                <div v-for="(itemOne ,key)  in videoform"  :key="key" style="margin-top:20px">
                                    <el-form-item label="视频标题">
                                        <el-input v-model="itemOne.video_title" placeholder="请输入课程名称，最多可输入30个字符"   maxlength="30" style="width:320px"></el-input>
                                    </el-form-item>
                                    <el-form-item label="视频时长">
                                        <el-input v-model="itemOne.video_time" placeholder="输入格式为00:00:00"   maxlength="10" style="width:320px" @blur="timerChange"></el-input>
                                    </el-form-item>
                                    <el-form-item label="视频金额">
                                        <el-input type="number" v-model="itemOne.currency_num" placeholder="请填写视频观看金额"   maxlength="10" style="width:320px" @blur="timerChange"></el-input>
                                    </el-form-item>
                                    <el-form-item label="视频类型">
                                        <el-radio-group v-model="itemOne.owner_type" style="margin-left:10px">
                                            <el-radio :label="1" v-model="itemOne.owner_type">系统</el-radio>
                                            <el-radio :label="0" v-model="itemOne.owner_type">学校</el-radio>
                                        </el-radio-group>
                                    </el-form-item>
                                    <!-- :before-upload="beforeUploadVideo" -->
                                    <!--                                    <el-form-item label="上传视频" >-->
                                    <!--                                        <el-upload-->
                                    <!--                                                :action="actionPathVideo"-->
                                    <!--                                                multiple-->
                                    <!--                                                :limit="10"-->
                                    <!--                                                :on-success="onSuccess"-->
                                    <!--                                                style="position: relative;text-align:left;margin-left:10px;">-->
                                    <!--                                            <el-button size="small" type="primary" class="btn"  style="background-color: #5C95FE; border: none;"  @clicks="uploadVideo(key)" ><i class="el-icon-upload el-icon&#45;&#45;right"></i>点击上传</el-button>-->
                                    <!--                                        </el-upload>-->
                                    <!--                                        <el-input  v-model="itemOne. video_name" v-show="hidden"></el-input>-->
                                    <!--                                    </el-form-item>-->
                                    <div class="upload">
                                        <el-form-item label="选择视频">
                                            <div>
                                                <input  multiple type="file" id="fileUpload" @change="fileChange($event)" >
                                                <label class="status" style="margin-left: 10px">上传状态: <span>{{statusText}}</span></label>
                                            </div>
                                        </el-form-item>

                                        <div class="upload-type">
                                            <!--                                            <button @click="authUpload" :disabled="uploadDisabled">开始上传</button>-->
                                            <!--                                            <button @click="pauseUpload" :disabled="pauseDisabled">暂停</button>-->
                                            <!--                                            <button :disabled="resumeDisabled" @click="resumeUpload">恢复上传</button>-->
                                            <!--                                            <button  @click="quxiao">取消上传</button>-->
                                            <!--                                            <span class="progress">上传进度: <i id="auth-progress">{{authProgress}}</i> %</span>-->
                                            <el-progress style="margin-top: 10px;margin-left: 20px" :percentage="authProgress"></el-progress>
                                        </div>
                                    </div>
                                </div>
                                <el-form-item >
                                    <el-button type="primary" @click="authUpload" style="background-color: #5C95FE; border: none;" size="mini">立即创建</el-button>
                                    <el-button    @click="addVideo(1)" type="success"  style="background-color: #FF9000; border: none" size="mini">增加一个视频</el-button>
                                    <el-button    type="danger" @click="delitVideo(1)" size="mini" style="background-color: #FF4E4E;border: none;">删掉一个视频</el-button>
                                </el-form-item>
                            </el-form>


                        </el-tab-pane>
                        <el-tab-pane label="我的视频" name="second">
                            <el-table :data="videoDate"  style="width: 100%" border>
                                <el-table-column type="index"  width="70"></el-table-column>
                                <el-table-column   prop="title"     label="视频名称"   width="180"> </el-table-column>
                                <el-table-column     label="操作">
                                    <template>
                                        <el-button    type="danger"    size="mini" >删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="学校视频" name="third">
                            <el-table :data="videoDate"  style="width: 100%"  border>
                                <el-table-column type="index"  width="70"></el-table-column>
                                <el-table-column   prop="title"     label="视频名称"   width="180"> </el-table-column>
                                <el-table-column   label="操作">
                                    <template>
                                        <el-button   type="danger"    size="mini" >删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>

                </div>
            </div>
            <!-- </el-card>  -->

            <div style="float:left;width:48%;padding:20px;box-sizing: border-box;padding-bottom: 200px;margin-bottom: 50px;" class="right-box">
                <h2 style="text-align: center;margin:20px 0;">创建章节</h2>
                <!-- <el-card> -->
                <!-- <div style="margin:20px 0">创建章节</div> -->
                <div style="width: 80%; margin-left:10%;">
                    <el-form ref="form"  label-width="80px">

                        <el-form-item label="课程类型">
                            <el-radio-group v-model="course" style="margin-left:10px">
                                <el-radio :label="1" v-model="course">自己创建</el-radio>
                                <el-radio :label="0" v-model="course">系统选择</el-radio>
                            </el-radio-group>
                            <!-- <el-input v-model="items.leixing" placeholder="请输入视频类型名称，最多可输入30个字符"   maxlength="30" style="width:320px"></el-input> -->
                            <div v-if="course==0">
                                <el-select   v-model="leixing" placeholder="请选视频类型" style="width:320px"   >
                                    <!-- @change="videochange" -->
                                    <el-option v-for="item in vidList" :key="item.id" :label="item.title" :value="item.title" ></el-option>
                                </el-select>
                            </div>
                            <div v-if="course==1">
                                <el-input v-model="videoleixing" placeholder="请输入视频类型名称，最多可输入30个字符"   maxlength="30" style="width:320px"  @blur="inputChange"></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="课程名称">
                            <el-input v-model="typeName" placeholder="请输入章节名称，最多可输入20个字符"   maxlength="20" style="width:320px"></el-input>
                            <!-- <el-select v-model="typeName"  style="width:220px">
                                <el-option v-for="(item,key) in typeList" :key="key" :label="item" :value="item" ></el-option>
                            </el-select> -->
                        </el-form-item>
                        <el-form-item label="封面图片">
                            <!-- v-if="imgShow" -->
                            <!--                            <img src="../../assets/image/index/stubg.png"  style="width:150px;height: 80px;" alt="" v-show="imgShow" >-->
                            <!-- :before-upload="beforeUploadImg" -->
                            <el-upload
                                    style="margin-left:10px"
                                    :action="actionPathImg"
                                    multiple
                                    :limit="1"
                                    :on-success="fileSuccess">
                                <el-button type="primary" style="background-color: #5C95FE; border: none;font-size: 14px;">上传图片<i class="el-icon-upload el-icon--right"></i></el-button>
                                <div slot="tip" class="el-upload__tip">只能上传图片，且只能上传一个文件</div>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="章节简介">
                            <quill-editor v-model="brief_introduction" style="width:550px;margin-left:10px" :options="editorOption" ></quill-editor>
                        </el-form-item>
                        <el-form-item label="视频简介">
                            <el-upload
                                    style="margin-left:10px"
                                    :before-upload="beforeUploadVideo"
                                    :action="actionPathVideo"
                                    multiple
                                    :limit="1"
                                    :on-success="videoSuccess">
                                <el-button type="primary" style="background-color: #5C95FE; border: none;font-size: 14px;">上传视频<i class="el-icon-upload el-icon--right"></i></el-button>
                            </el-upload>
                        </el-form-item>
                        <el-form-item label="视频课件">
                            <el-upload
                                    style="margin-left:10px"
                                    :action="actionPathVideo"
                                    multiple
                                    :limit="1"
                                    :on-success="courseSuccess">
                                <el-button type="primary" style="background-color: #5C95FE; border: none;font-size: 14px;">点击上传<i class="el-icon-upload el-icon--right"></i></el-button>
                            </el-upload>
                        </el-form-item>
                        <div v-for="(item,i) in  zhangjie" :key="i">
                            <el-form-item label="章节名称">
                                <el-input v-model="item.zjName" placeholder="请输入视频类型名称，最多可输入20个字符" maxlength="20" style="width:320px"  ></el-input>
                            </el-form-item>
                            <el-form-item label="上传视频">
                                <el-button size="small" type="primary"  @click="btnUpload(i)" style="background-color: #5C95FE; border: none;font-size: 14px;">点击上传</el-button>
                                <div v-show="hidden"></div>
                            </el-form-item>
                        </div>
                        <el-form-item >
                            <el-button type="primary" @click="creatSub(2)" size="mini"  style="background-color: #5C95FE; border: none;font-size: 14px;">  立即创建</el-button>
                            <el-button    @click="addVideo(2)" type="success" style="background-color: #FF9000; border: none;font-size: 14px;"  size="mini">增加一个章节</el-button>
                            <el-button    type="danger" @click="delitVideo(2)" size="mini" style="background-color: #FF4E4E;border: none;font-size: 14px;">删掉一个章节</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>

            <el-dialog title="添加视频" :visible.sync="dialogVisible" width="30%"  @close="closeDialog">
                <el-table :data="videoDate"  style="width: 100%"  @selection-change="handleSelectionChange"   ref="multipleTable" >
                    <el-table-column type="selection"  width="55"></el-table-column>
                    <el-table-column   prop="title"     label="视频名称"   width="180"> </el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible=false">确 定</el-button>
              </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    // 导入富文本编辑器组件
    import { quillEditor } from 'vue-quill-editor'
    export default {
        components: {
            quillEditor: quillEditor
        },
        data() {
            return {
                inputfile:"",
                isReloadData: true,
                hidden:false,
                activeIndex:0,
                videoIndex:0,
                isshangchuan:0,
                imgShow:true,
                course:null,
                flag:true,
                videoleixing:"",
                zhangjie:[{
                    zjName:'',
                    itemID:[],
                }],
                vidList:[{id:1,title:'精选课程'},{id:2,title:'四级课程'},{id:3,title:'六级课程'},{id:4,title:'A级课程'},{id:5,title:'B级课程'},{id:6,title:'我的课程'},{id:7,title:'我校课程'}],
                activeName:'first',
                dialogVisible:false,
                videoDate:[{id:1,title:'111'},{id:2,title:'222'},{id:3,title:'444'},{id:4,title:'555'},{id:5,title:'111'},{id:6,title:'111'},{id:7,title:'111'}],
                videoform:[ {
                    video_url: '',
                    video_title: '',
                    video_time:"" ,
                    //视频类型  学校还是系统的
                    owner_type:"",
                    //上传的视频地址
                    owner_id:0,
                    currency_num:""
                }
                ],

                // :'',
                // video_name:'' ,
                img_name:'',//上传的封面图片地址
                //章节信息
                brief_introduction:'',
                // 上传视频的路径
                actionPathVideo:'',
                //章节的视频路径
                videoName:'',
                // 视频课件路径
                courseVideoName:'',
                videoList:[],
                // 自定义富文本
                // editorOption: {
                //     modules:{
                //        toolbar:[
                //            [{ 'align': [] }],[{ 'color': [] }, { 'background': [] }],[{ 'direction': 'rtl' }],
                //            ['bold', 'italic', 'underline', 'strike','image','italic','video','size'],
                //        ]
                //     }
                // }, 
                // 自定义富文本
                editorOption: {
                    modules:{
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{ 'header': 1 }, { 'header': 2 }],
                            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                            [{ 'script': 'sub' }, { 'script': 'super' }],
                            [{ 'indent': '-1' }, { 'indent': '+1' }],
                            [{ 'direction': 'rtl' }],
                            [{ 'size': ['small', false, 'large', 'huge'] }],
                            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                            [{ 'color': [] }, { 'background': [] }],
                            [{ 'font': [] }],
                            [{ 'align': [] }],
                            ['clean'],
                            ['link', 'image', 'video']
                        ]
                    }
                },
                //  创建章节
                leixing:"",
                //  typeName:" ",
                typeName:'',//章节名称
                //选择视频的节点
                multipleSelection: [],
                arrays:[],
                timeout: '',
                partSize: '',
                parallel: '',
                retryCount: '',
                retryDuration: '',
                region: 'cn-shanghai',
                userId: '1240050733905090',
                file: null,
                authProgress: 0,
                uploadDisabled: true,
                resumeDisabled: true,
                pauseDisabled: true,
                uploader: null,
                statusText: '',
                file:"",
                tuozhanming:"",
                finame:"",
                videoId1:"",
                fileid:[]
            }
        },
        created() {
            //  this.actionPath= `${BASE_URL}index/Addpaper/img`;
            //    创建视频名称  上传的视频
            //  this.actionPathVideo=`${BASE_URL}index/Addpaper/img`;
            console.log(this.brief_introduction);
            this.actionPathVideo=`${BASE_URL}admin/paper/updatafile`;
            this.actionPathImg = `${BASE_URL}admin/paper/updatafile`;
        },
        methods: {
            reload () {
                this.isReloadData = false
                this.$nextTick(() => {
                    this.isReloadData = true
                })
            },
            // 创建章节  输入视频时长的input框发生的事件
            timerChange(){
                console.log(this.videoform);
                // for ( let i = 0 ; i < this.videoform.length ; i++) {
                //     var reg = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;     //时间格式的正则表达式
                //     if(!reg.test(this.videoform[i].video_time)){
                //         this.$message({message: "格式不正确，正确格式为：00:00:00",type: "warning",duration: 2000});
                //         return false;
                //     }
                // }
            },
            inputChange(){
                if(this.videoleixing){
                    this.leixing=this.videoleixing
                }
            },
            numChange(){
                console.log(this.videoform);
            },

            // 导航条   点击跳转到不同的页面
            tonav(val){
                console.log(val)
                if(val == 1){this.$router.push("video")}
                if(val == 2){this.$router.push("my_course")}
                if(val == 3){this.$router.push("New_curriculum")}
                if(val == 4){this.$router.push("Lead_in_course")}
            },
            uploadVideo(val){
                this.videoIndex=val
            },
            beforeUploadVideo(file){
                console.log(file);
                var str=file.slice(file.length-4)
                console.log(str);
                // .ts
                if(str!='.mp4'&&str!='rmvb'&&str!='.jpg'&&str!='.avi'){
                    this.$message({message: "请上传正确的视频格式",type: "warning",duration: 2000});
                    return false;
                }
                // var fileSize = file.size / 1024 / 1024 < 100;
                //   if (['video/mp4', 'video/ogg', 'video/flv', 'video/avi', 'video/wmv', 'video/rmvb', 'video/mov'].indexOf(file.type) == -1) {
                //       // layer.msg("请上传正确的视频格式");
                //       this.$message({message: "请上传正确的视频格式",type: "warning",duration: 2000});
                //       return false;
                //   }
                //   if (!fileSize) {
                //     this.$message({message: "视频大小不能超过100MB",type: "warning",duration: 2000});
                //       // layer.msg("视频大小不能超过50MB");
                //       return false;
                //   }
            },
            // 创建视频  点击上传视频发生的事件
            onSuccess(file,fileList){
                //  this.beforeUploadVideo(file.info)
                console.log(file,fileList);
                console.log(file.info);
                this.videoform[this.videoIndex].video_name=file.info
                console.log(this.videoform);

            },
            // 创建章节  点击上传章节视频简介发生的事件
            videoSuccess(file,fileList){
                this.videoName=file.info
                console.log(file,fileList);
            },
            // 创建章节  点击上传视频课件发生的事件
            courseSuccess(file,fileList){
                this.courseVideoName=file.info
                console.log(file,fileList);
            },
            handleExceed(){

            },
            beforeUploadImg(file){
                console.log(111);
                // 默认'jpeg','bmp','gif','jpg'
                var str=file.slice(file.length-4)
                console.log(str);
                if(str!='.bmp'&&str!='.png'&&str!='.jpg'&&str!='.gif'&&str!='jpeg'){
                    this.$message({message: "请上传正确的图片格式",type: "warning",duration: 2000});
                    return false;
                }
            },
            // 创建章节 上传封面图片发生的事件
            fileSuccess(response, file, fileList){
                // this.beforeUploadImg( response.info)
                this.img_name = response.info
                //  this.imgShow=false;
                console.log(this.img_name)
                //  this.imgShow=true
                if(this.img_name){
                    this.imgShow=false
                }
            },
            //  章节课件中  所勾选的视频
            handleSelectionChange(val){
                this.arrays=[]
                this.dialogVisible=true
                this.multipleSelection=val
                console.log(val);
                for(var i=0;i<val.length;i++){
                    console.log(val[i].id);
                    this.arrays.push(val[i].id)
                }
                console.log(this.arrays);
                this.zhangjie[this.activeIndex].itemID=this.arrays
                for(var j = 0;j < this.zhangjie.length;j++){
                    console.log(this.zhangjie[this.activeIndex]);
                    this.zhangjie[this.activeIndex].itemID=this.arrays
                }
                console.log( this.zhangjie);
            },
            closeDialog(){
            },
            // 创建章节  清除所选的视频
            clear(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            // 创建章节  点击上传视频发生的事件
            btnUpload (val){
                this.activeIndex=val
                for(var s in this.$refs){
                    console.log(s);
                    console.log(this.$refs[s]);
                    if(s=='multipleTable'){
                        this.clear()
                    }
                }
                this.multipleSelection=[]
                this.arrays=[]
                this.dialogVisible=true
            },
            // 创建一个章节或者视频
            creatSub(val){
                if(val==1){
                    console.log(this.fileid)
                    for ( let i = 0 ; i < this.videoform.length ; i++) {
                        if(this.videoform[i].video_type_name== ''){
                            this.$message({message: "请填写视频标题",type: "warning",duration: 2000});
                            return false;
                        }

                        if(this.videoform[i].video_time== ''){
                            this.$message({message: "请填写视频时长",type: "warning",duration: 2000});
                            return false;
                        }
                        var reg = /^(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;     //时间格式的正则表达式
                        if(!reg.test(this.videoform[i].video_time)){
                            this.$message({message: "格式不正确，正确格式为：00:00:00",type: "warning",duration: 2000});
                            return false;
                        }
                        console.log(this.videoform[i].num);
                        console.log(444);

                        if(this.videoform[i].video_name==''){
                            this.$message({message: "请上传视频",type: "warning",duration: 2000});
                            return false;
                        }
                        this.videoDate.push({
                            id:this.videoIndex,
                            title:this.videoform[this.videoIndex].video_type_name
                        })
                    }

                    //   //上传成功之后发生的事件
                    //   this.videoDate.push({
                    //             id:this.videoDate.length+1,
                    //             title:this.videoform[this.videoIndex].video_type_name
                    //  })
                    this.videoform=[{
                        video_type_name:'',
                        video_time:'',
                        num:'',
                        videoType:0,
                        video_name:'',
                    }]

                }
                if(val==2){
                    if(this.leixing==''){
                        this.$message({message:"请选择/创建课程类型名称",type: "warning",duration: 2000});
                        return false;
                    }
                    if(this.typeName==""){
                        this.$message({message: "请填写课程名称",type: "warning",duration: 2000});
                        return false;
                    }
                    if( this.img_name==''){
                        this.$message({message: "请上传视频封面图片",type: "warning",duration: 2000});
                        return false;
                    }

                    if(this.brief_introduction==''){
                        this.$message({message: "请填写章节介绍信息",type: "warning",duration: 2000});
                        return false;
                    }

                    if(this.courseVideoName==''){
                        this.$message({message: "请上传章节视频课件",type: "warning",duration: 2000});
                        return false;
                    }
                    if(this.videoName==''){
                        this.$message({message: "请上传章节视频",type: "warning",duration: 2000});
                        return false;
                    }
                    for ( let i = 0 ; i < this.zhangjie.length ; i++) {
                        if(this.zhangjie[i].zjName== ''){
                            this.$message({message: "请填写章节名称",type: "warning",duration: 2000});
                            return false;
                        }
                        if(this.zhangjie[i].itemID==''){
                            this.$message({message: "请选择需要的视频",type: "warning",duration: 2000});
                            return false;
                        }
                    }

                    //   创建成功之后发生的事件
                    this.flag=true
                    this.img_name=" "
                    this.leixing=''
                    this.typeName=""
                    this.videoleixing=""
                    this.brief_introduction=" "
                    this.multipleSelection=" "
                    this.arrays=[]
                    this.zhangjie=[{
                        zjName:'',
                        itemID:[],
                    }]
                }
                console.log(this.brief_introduction);
            },
            // 添加一个
            addVideo(val){
                if(val==1){
                    this.videoform.push(
                        {
                            video_url: '',
                            video_title: '',
                            video_time:'' ,
                            owner_type:0,
                            owner_id:0,//上传的视频
                            currency_num:""
                        },
                    )
                }
                if(val==2){
                    this.zhangjie.push({
                        zjName:'',
                        itemID:[]
                    })
                }
                return
            },
            // 删除一个
            delitVideo(val){
                if(val==1){
                    console.log(this.videoform)
                    console.log("长度",this.videoform.length)
                    if (this.videoform.length > 1){
                        this.videoform.pop()
                    } else {
                        this.$message({message: "最少保留一个问题",type: "warning",duration: 2000});
                    }
                }
                if(val==2){
                    if (this.zhangjie.length > 1){
                        this.zhangjie.pop()
                    } else {
                        this.$message({message: "最少保留一个问题",type: "warning",duration: 2000});
                    }
                }

                return

            },
            fileChange (e) {
                console.log(e);
                
                console.log(e.target.value)
                this.inputfile =e.target.value
                this.isshangchuan =1
                console.log(e)
                this.file = e.target.files[0]

                if (!this.file) {
                    this.$message({message: "请先选择需要上传的文件!",type: "warning",duration: 2000});
                    // alert("请先选择需要上传的文件!")
                    return
                }
                var Title = this.file.name
                var userData = '{"Vod":{}}'
                if (this.uploader) {
                    this.uploader.stopUpload()
                    this.authProgress = 0
                    this.statusText = ""
                }
                this.uploader = this.createUploader()
                console.log(userData)
                for(var i=0; i<e.target.files.length; i++) {
                    // 逻辑代码
                    this.uploader.addFile(e.target.files[i], null, null, null, userData)
                }
                console.log(this.uploader)

                this.uploadDisabled = false
                this.pauseDisabled = true
                this.resumeDisabled = true
            },

            // videoform:[ {
            //     video_url: '',
            //     video_title: '',
            //     video_time:"" ,
            //     //视频类型  学校还是系统的
            //     owner_type:0,
            //     //上传的视频地址
            //     owner_id:0,
            //     currency_num:""
            // }
            authUpload () {
                if(this.isshangchuan ==0){
                    this.$message.error('还没有选择视频哦 ！');
                }else if(this.isshangchuan ==1){{
                    if(this.videoform[0].video_title =="" ){
                        this.$message.error('请填写视频标题 ！');
                    } if(this.videoform[0].video_time ==""){
                        this.$message.error('请填写视频时间 ！');
                    } if( this.videoform[0].currency_num == ""){
                        this.$message.error('请填写视频观看金额 ！');
                    }else{
                        if (this.uploader !== null) {
                            this.uploader.startUpload()
                            this.uploadDisabled = true
                            this.pauseDisabled = false
                        }
                    }
                }

                }
                // 然后调用 startUpload 方法, 开始上传


            },
            quxiao(){
                if (this.uploader !== null) {
                    this.uploader.onUploadCanceled()
                    // this.uploadDisabled = true
                    // this.pauseDisabled = false
                }
            },
            // 暂停上传
            pauseUpload () {
                if (this.uploader !== null) {
                    this.uploader.stopUpload()
                    this.resumeDisabled = false
                    this.pauseDisabled = true
                }
            },
            // 恢复上传
            resumeUpload () {
                if (this.uploader !== null) {
                    this.uploader.startUpload()
                    this.resumeDisabled = true
                    this.pauseDisabled = false
                }
            },
            createUploader (type) {
                let self = this
                let uploaader = new AliyunUpload.Vod({
                    timeout: self.timeout || 60000,
                    partSize: self.partSize || 1048576,
                    parallel: self.parallel || 5,
                    retryCount: self.retryCount || 3,
                    retryDuration: self.retryDuration || 2,
                    region: self.region,
                    userId: self.userId,
                    // 添加文件成功
                    addFileSuccess: function (uploadInfo) {
                        console.log(uploadInfo)
                        self.uploadDisabled = false
                        self.resumeDisabled = false
                        self.statusText = '添加文件成功, 等待上传...'
                        console.log("addFileSuccess: " + uploadInfo.file.name)
                        this.finame = uploadInfo.file.name
                        let createUrl1 = 'http://192.168.1.137/v1/video/ailiyunupload'
                        axios.get(createUrl1,{
                            params: {
                                filename: this.finame
                            }
                        }).then(({data}) => {
                            //  console.log(self.videoform)
                            //  self.videoform.video_url[0] = data.info.VideoId
                            // // console.log(data.info.VideoId)
                            // //  self.fileid.video_url = data.info.VideoId
                            self.fileid.push(data.info.VideoId)
                            //  console.log(self.videoform)
                            for(var i=0;i<self.videoform.length;i++){
                                console.log(self.videoform[i])
                                self.videoform[i].video_url = self.fileid[i]
                            }
                            console.log(self.videoform)


                        })
                        const aa = uploadInfo.file.name
                        console.log(aa.substring(aa.length-3))
                    },

                    // 开始上传
                    // http://vod.cn-shanghai.aliyuncs.com/?Action=CreateUploadVideo&Title=exampleTitle&FileName=example.avi&FileSize=10485760&Format=JSON&<公共参数>
                    onUploadstarted: function (uploadInfo) {
                        console.log(self.videoform[0])
                        console.log(self.isshangchuan)

                        console.log(self.videoform[0])
                        // var filename = document.getElementById("fileUpload").value;
                        // // 这时的filename不是 importFile 框中的值
                        // console.log(filename);
                        // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
                        // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
                        // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
                        // 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
                        // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
                        // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
                        if (!uploadInfo.videoId) {
                            console.log(123)
                            // let createUrl1 = 'http://192.168.1.134/v1/video/ailiyunupload/?Action=CreateUploadVideo&Title=exampleTitle&FileName=eb30f520442c5b90ed6810f05e18a110.mp4'
                            let createUrl1 = 'http://192.168.1.137/v1/video/ailiyunupload'
                            axios.get(createUrl1,{
                                params: {
                                    filename: this.finame
                                }
                            }).then(({data}) => {
                                // console.log(this._.values(data.info.videoId).join())
                                let uploadAuth = data.info.UploadAuth
                                let uploadAddress = data.info.UploadAddress
                                let videoId =data.info.videoId
                                this.videoId1 = data.info.VideoId
                                console.log("aaa",data.info.VideoId)
                                uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)

                            })
                            self.statusText = '文件开始上传...'
                            console.log("onUploadStarted:" + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
                        } else {
                            console.log(videoId)
                            // 如果videoId有值，根据videoId刷新上传凭证
                            // https://help.aliyun.com/document_detail/55408.html?spm=a2c4g.11186623.6.630.BoYYcY
                            let refreshUrl = 'http://192.168.1.137/v1/video/ailiyunupload'
                            axios.get(refreshUrl).then(({data}) => {
                                let uploadAuth = data.info.UploadAuth
                                let uploadAddress = data.info.UploadAddress
                                let videoId = data.info.VideoId
                                console.log("bbb",data)
                                uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress,videoId)

                            })
                        }


                    },
                    geturl(){
                        let createUrl1 = 'http://192.168.1.137//v1/video/videourl'
                        axios.get(createUrl1,{
                            params: {
                                videoId: this.videoId1
                            }
                        }).then(({data}) => {
                            console.log(data)
                        })
                    },
                    // 文件上传成功
                    onUploadSucceed: function (uploadInfo) {

                        this.videoform.video_url = ""
                        this.videoform.video_title = ""
                        this.videoform.video_time = ""
                        this.videoform.owner_type =0
                        this.videoform.owner_id = 0
                        this.videoform.currency_num = ""
                        console.log(uploadInfo)
                        console.log("onUploadSucceed: " + uploadInfo.file.name + ", endpoint:" + uploadInfo.endpoint + ", bucket:" + uploadInfo.bucket + ", object:" + uploadInfo.object)
                        self.statusText = '文件上传成功!'
                        console.log(this.videoId1)
                        this.uploadDisabled = false
                        // this.geturl()

                    },
                    // 文件上传失败
                    onUploadFailed: function (uploadInfo, code, message) {
                        console.log("onUploadFailed: file:" + uploadInfo.file.name + ",code:" + code + ", message:" + message)
                        self.statusText = '文件上传失败!'
                    },
                    // 取消文件上传
                    onUploadCanceled: function (uploadInfo, code, message) {
                        console.log("Canceled file: " + uploadInfo.file.name + ", code: " + code + ", message:" + message)
                        self.statusText = '文件已暂停上传'
                    },
                    // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
                    onUploadProgress: function (uploadInfo, totalSize, progress) {
                        console.log("onUploadProgress:file:" + uploadInfo.file.name + ", fileSize:" + totalSize + ", percent:" + Math.ceil(progress * 100) + "%")
                        let progressPercent = Math.ceil(progress * 100)
                        self.authProgress = progressPercent
                        self.statusText = '文件上传中...'
                    },
                    // 上传凭证超时
                    onUploadTokenExpired: function (uploadInfo) {
                        // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
                        // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
                        // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth
                        let refreshUrl = 'https://demo-vod.cn-shanghai.aliyuncs.com/voddemo/RefreshUploadVideo?BusinessType=vodai&TerminalType=pc&DeviceModel=iPhone9,2&UUID=59ECA-4193-4695-94DD-7E1247288&AppVersion=1.0.0&Title=haha1&FileName=xxx.mp4&VideoId=' + uploadInfo.videoId
                        axios.get(refreshUrl).then(({data}) => {
                            let uploadAuth = data.UploadAuth
                            uploader.resumeUploadWithAuth(uploadAuth)
                            console.log('upload expired and resume upload with uploadauth ' + uploadAuth)
                        })
                        self.statusText = '文件超时...'
                    },
                    // 全部文件上传结束
                    onUploadEnd: function (uploadInfo) {

                        console.log(uploadInfo)
                        console.log("onUploadEnd: uploaded all the files")
                        self.statusText = '文件上传完毕'
                        self.file=""
                        console.log(self.fileid)
                        console.log(self.videoform[0])

                        this.uploadDisabled = false
                        console.log(self.uploadDisabled)
                        // document.getElementById('fileUpload')&&document.getElementById('fileUpload').reset();
                        let createUrl1 = 'http://192.168.1.137/v1/video/addvideo'
                        axios.get(createUrl1,{
                            params: {
                                name: self.videoform
                            }
                        }).then(({data}) => {
                            self.$message({
                                message: "添加成功",
                                type: 'success'
                            });
                            console.log( "aa",self.videoform)
                            // self.authProgress= 0
                            self.statusText=""
                            setTimeout(function(){ self.authProgress =0 }, 1000);
                            self.videoform[0].video_url = ""
                            self.videoform[0].video_title = ""
                            self.videoform[0].video_time = ""
                            self.videoform[0].owner_type =""
                            self.videoform[0].owner_id = 0
                            self.videoform[0].currency_num = ""
                            self.isshangchuan =0
                            // var test= document.getElementById('fileUpload');
                            // console.log(test)
                            // test.outerHTML=test.outerHTML
                            window.location.reload()
                            this.file =""

                        })

                    }
                })
                return uploader
            }
        }
    }
</script>
<style lang="less" scoped>
    .el-tabs__content{
        width: 80%;
        margin-left:10%;
    }
    .left-box{
        height: 900px;
        background: #fff;
        overflow-y:scroll;
      
        box-shadow: 0px 0px 5px #A3B4D8;

    }
    .right-box{
        height: 900px;
        background: #fff;
        overflow-y:scroll;
        overflow-x:auto;
        /* box-shadow: 10px 10px 10px rgba(#000,.2); */
        box-shadow: 0px 0px 5px #A3B4D8;
        /* background: #DEC2D6; */
    }
    .Course_Details_nav{
        width: 100%;
        height: 50px;
        background: #fff;
        line-height: 50px;
    }
    .top_nav{
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        width: 100%;
        background: #EFF1F6;
    }
    .top_nav_item{
        width: 23%;
        height: 100px;
        background: #fff;
    }
</style>