<template>
    <div class="right clearfix">
    <div class="centers">
        <el-card>
            <div class="form-boxes">
                <el-form  label-width="80px">
                  <el-form-item label="问题描述">
                    <el-input v-model="problem" style="margin-left:10px;width:550px" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item label="上传图片">
                    <el-upload
                      style="margin-left:10px"
                      :action="actionPath"
                      multiple
                      :limit="1"
                      :file-list="fileList"
                      :on-success="fileSuccess">
                      <el-button type="primary" style="font-size: 14px;">上传<i class="el-icon-upload el-icon--right"></i></el-button>
                      <div slot="tip" class="el-upload__tip">只能上传图片，且只能上传一张图片(非必选项)</div>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="联系方式">
                    <el-input v-model="contactinformation" style="margin-left:10px;width:550px"    placeholder="请输入手机号或者邮箱" ></el-input>
                  </el-form-item>
                  <el-form-item style="margin-left:10px">
                    <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  </el-form-item>
                </el-form>
              </div>
        </el-card>
    </div>
    </div>
  </template>
  
  <script>
  import qs from "qs";
  export default {
    data() {
      return {
        fileList: [],
        file_name: '', // 上传图片
        actionPath: '',
        problem: '', // 问题描述
        contactinformation: '', // 联系方式
        id: '',
        identity: '',
        school_name: '',
        nickname: '',
        
      };
    },
    created() {
      // admin/paper/updatafile
      this.actionPath = `${BASE_URL}v1/Userlogin/updatafile`;
      // id
      this.id=localStorage.getItem("id");
      console.log(this.id);
      
      // 身份 1为学生  2位老师
      this.identity = localStorage.getItem("identity");
      // 学校名称
      this.school_name = localStorage.getItem("school_name");
      // 姓名
      this.nickname = localStorage.getItem("nickname");
    },
  
    computed: {},
    methods: {
      fileSuccess(response, file, fileList){
        console.log(response);      
        this.file_name = response.info
        console.log(this.file_name)
      },
      async onSubmit() {
        if(this.problem.replace(/\s*/g,"") == ''){
          this.$message({message: "问题描述不能为空",type: "warning",duration: 2000,offset:90});
          return false;
        }
         // 手机号
        let phoneRe = /^1(3|4|5|6|7|8|9)\d{9}$/;
        // 邮箱正则表达式
        let emailRe = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;

        if(!emailRe.test(this.contactinformation)&&!phoneRe.test(this.contactinformation)){
          this.$message({message: "邮箱或者手机号格式不正确",type: "warning",duration: 2000,offset:90});
          return false;
        }
        const res = await this.$http.post("v1/Schoolclass/addproblemFeedback",qs.stringify({
          id:this.id,
          type: this.identity,
          school_name: this.school_name,
          name: this.nickname,
          wenti: this.problem,
          URL: this.file_name,
          mailbox: this.contactinformation,
          // addtime:''
        }));
      console.log(res);   
      if (res.status === 200 && res.data.code === "1") {
          this.$message({message: res.data.info,type: "success",duration: 2000,offset:90});
          this.contactinformation = '';
          this.file_name = '';
          this.problem = '';
        } else {
          this.$message({message: res.data.info,type: "warning",duration: 2000,offset:90});
        }
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  /* @import url("../../assets/css/index.less"); */
  .right {
    padding-top: 80px;
    min-height: 100%;
   padding-bottom:50px;
    background:url(../../assets/image/creatshijuan/bg.png) no-repeat   ;
    width:100%;
    height:100%;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    overflow:auto;
    /* background-color: #f0f0f0; */
    .centers{
      width: 96%;
      margin:0 auto;
    }
    .form-boxes {
      width: 660px;
      text-align: left;
      margin: 20px;
      /* margin-top: 0; */
      padding: 30px 20px 20px 15px;
      background-color: #fff;
      /* box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04); */
      .el-form-item .el-form-item--small {
        line-height: 50px;
      }
    }
  }
  </style>
  