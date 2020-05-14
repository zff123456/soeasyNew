<template>
    <div class="right">
     <div class="centers">
        <!-- <el-card> -->
            <div class="form-boxes">
                <el-form    label-width="100px"     class="demo-ruleForm"> 
                  <el-form-item label="姓名">
                    <el-input v-model="nickName" style="width:200px;margin-left:10px"   disabled></el-input>
                  </el-form-item>
                  <el-form-item label="密码">
                    <el-input v-model="password" style="width:200px;margin-left:10px" type="password"></el-input>
                  </el-form-item>
                  <el-form-item label="确认密码">
                    <el-input v-model="affirmPsw" style="width:200px;margin-left:10px" type="password" @blur="teaConfirmPsd"></el-input>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm" style="margin-left:10px;padding:12px 20px">立即修改</el-button>
                  </el-form-item>
                </el-form>
              </div>
          <!-- </el-card> -->
     </div>
    </div>
  </template>
  
  
  <script>
  import qs from "qs";
  export default {
    data() {
      return {
        nickName: '',
        password: '',
        id: '',
        affirmPsw: '',
        identify:'',
        
      };
    },
    created() {
      this.id = localStorage.getItem("id");
      // 姓名
      this.nickName= localStorage.getItem("nickname");
      this.name= localStorage.getItem("name");
      this.identify= localStorage.getItem("identity");
      console.log(  this.id,this.nickName,this.name,this.identify);
      
    //   this.getItem();
    },
    computed: { // 计算属性，监听值得变化。
  
    },
    methods: {
      // async getItem(){
      //   const res = await this.$http.get(`http://ruanjian.chinadingao.com/admin/teacher/studentChangePassword?id=${this.id}`);
      //   if (res.status === 200 && res.data.code === "1") {
      //     this.nickname = res.data.info.nickname;
      //   }
      // },
      teaConfirmPsd(){ //确认密码
        if(this.password != this.affirmPsw){
          this.$message({message: "确认密码与填写密码不同",type: "error",duration: 3000});
          this.affirmPsw =''
        }
      },
      async submitForm(){
        if(this.nickname == ''){
          this.$message({message: "请填写姓名",type: "warning",duration: 2000});
          return false;
        }
        if(this.password == ''){
          this.$message({message: "请输入密码",type: "warning",duration: 2000});
          return false;
        }
        if(this.password.length < 5){
          this.$message({message: "密码长度不能少于五位",type: "warning",duration: 2000});
          return false;
        }
        if(this.password != this.affirmPsw){
          this.$message({message: "确认密码与填写密码不同",type: "error",duration: 3000});
          this.affirmPsw = '';
          return false;
        }
        // type   id  password  confirmpassword
        const res = await this.$http.post("v1/Schoolclass/userteacherupdatapassword",qs.stringify({
          type: this.identify,
          password: this.password,
          confirmpassword:this.affirmPsw,
          id: this.id
        }));
        console.log(res);
        
        if (res.status === 200 && res.data.code === "1") {
          this.$message({message: res.data.info,type: "success",duration: 2000,offset:90});
          // this.nickname = '',
          this.affirmPsw = '',
          this.password = ''
        } else {
          this.$message({message: res.data.info,type: "error",duration: 2000,offset:90});
        }
      }
      
    }
  };
  </script>
  
  <style lang="less" scoped>
  .right {
    background-color: #f0f0f0;
    height: 100%;
    overflow: hidden;
    padding-top:61px;

    
    .form-boxes {
      width: 600px;
      text-align: left;
      margin: 20px 0 20px 20px;
      padding: 50px 20px 20px 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
      background-color: #ffffff;
      /* padding: ; */
      .el-form-item {
        line-height: 50px;
        .el-form-item--small .el-form-item__content, 
        .el-form-item--small .el-form-item__label {
          line-height: 50px;
        }
      }
    }
  }
  </style>