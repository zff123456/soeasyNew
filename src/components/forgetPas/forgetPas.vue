<template>
  <div class="login_container">
        <div  class="login-box">         
           <div class="box" style="width:50%;height:600px;margin:0 auto;margin-top:150px;">
                <div class="biaoti" >登录</div>
            <span style="font-size:22px; border-top: 1px solid #5676E9;padding:10px 0">以科技力量改变中国教育</span>
            <el-form ref="form" style="margin-top:30px;" >
              <el-form-item  class="item">
                <el-select v-model="type" placeholder="请选择登录身份" @change="changeShengfen">
                  <el-option  v-for="item in identList" :key="item.id" :label="item.name" :value="item.id" > </el-option>                   
              </el-select>         
             </el-form-item >
                <el-form-item >
                   <div class="item">
                        <el-input  clearable  placeholder="请输入手机号"  v-model="username"></el-input>
                   </div>
                </el-form-item >
                 <el-form-item >
                   <div class="item items" style="width:100%;height:40px;line-height:40px;background:#0581E2;">
                       <el-input  placeholder="请输入验证码"   v-model="yzm"  style="width:60%;"  clearable ></el-input  >
                       <span class="yzm" v-show="show" @click="getCode">获取验证码</span>
                       <span class="yzm" v-show="!show">{{count}}</span>
                   </div>
                </el-form-item >             
            </el-form>                       
            <div style="font-size:16px;height:40px;color:#ffff;line-height:40px;cursor:pointer;margin-top:10px;" class="login"  @click="login">提交</div>
            <div style="font-size:16px;height:40px;color:#ffff; line-height:40px; cursor:pointer"  class="find"   @click="goback">账号登录</div>          
           </div>
        </div>
  </div>
</template>

<script>
  import qs from "qs"; // qs数据处理插件
export default {
  data() {
    return {
        identId:'',
        // 手机号
        username:'',
        password:'',
        province:'',
        yzm:'',
        show: true,
        count: '',
        timer: null,
        identList: [{ id: 2,  name: '老师' },{id: 1, name: '学生' }],
        type:1,//1为学生  2位老师   
    }
  },
  methods: {
    goback(){
      this.$router.push('/home')
    },
    clicks(val){
      this.activeId=val
    },
    changeShengfen(){
      console.log(this.identId)
      localStorage.setItem("identity", this.identId); // 身份
    },
    //点击登录按钮发生的事件
   async  login(){  
    var CellPoe = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!CellPoe.test(this.username)) {
       this.$message({ message: "手机号不正确",  type: "warning",   duration: 2000 ,offset:90  });
          return false;
     }
     if (this.yzm.trim()=="") {
       this.$message({ message: "请输入验证码",  type: "warning",   duration: 2000  ,offset:90 });
          return false;
     }       
      const res = await this.$http.post( "v1/Sms/smsVerification",
      qs.stringify({ phone: this.username, code:this.yzm })
     );
     console.log(res,333);
     if( res.status==200 && res.data.code==1){
           console.log(res);
          //  1为学生
      if(this.type==1){
        localStorage.setItem('identity',1)
        localStorage.setItem('phone',this.username)
          this.$router.push('/stuwelcome')
      }
      // 2位老师
       if(this.type==2){
        localStorage.setItem('identity',2)
        localStorage.setItem('phone',this.username)
          this.$router.push('/welcome')
      }
       return false
     }else{
       this.$message({message: "手机号登录失败",  type: "error",   duration: 2000 ,offset:90 })
     }
    },
    // 获取验证码
   async  getCode(){
      const TIME_COUNT = 60;
      if (!this.timer) {
      this.count = TIME_COUNT;
      this.show = false;
      this.timer = setInterval(() => {
      if (this.count > 0 && this.count <= TIME_COUNT) {
        this.count--;
        } else {
        this.show = true;
        clearInterval(this.timer);
        this.timer = null;
        }
      }, 1000)
    }
    var CellPoe = /^[1][3,4,5,7,8][0-9]{9}$/;
    if (!CellPoe.test(this.username)) {
       this.$message({ message: "手机号不正确",  type: "warning",   duration: 2000 ,offset:90  });
          return false;
     }
    const res = await this.$http.post( "v1/Sms/userSendMsg",
      qs.stringify({ phone: this.username, type: this.type,tplCode: 'SMS_184380289' })
     );       
     if (res.status ==200 && res.data.code =="1") { 
       console.log(res);
       
        this.$message({message:res.data.info,  type: "success",   duration: 2000 ,offset:90 })                     
        //  this.login() 
     }else{
      this.$message({message:'验证码获取失败',  type: "error",   duration: 2000 ,offset:90 }) 
          return false
     }
     
  }
  }
}
</script>

<style lang="less" scoped>
  .bordered{
    border-bottom: 2px solid #0581E2;
  }
.login_container{
width:100%;
  height: 100%;
  background:url(../../assets/login/bg01.png) no-repeat   ;
  position:fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  /* min-width: 1336px; */
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}

.login-box{
  width: 45%;
  min-width: 600px;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.1rem;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 10%;
  transform: translate(-50%, 0);
  background-image: url(../../assets/login/bg02.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
}
.biaoti{
  font-size: 40px;
  height: 60px;
  margin-bottom: 10px;
}
.el-form{
    width: 70%;
    margin: 0 auto;
    margin-top: 20px;
}
.el-select{
    width: 100%;
}

.login{
    display: inline-block;
    width:70%;
    height: 30px;
    background-color:#70C510;
    margin-bottom: 20px
}
.yzm{
  font-size: 12px;
  height: 30px;
  line-height: 30px;
  width: 80px;
  text-align: center;
  border-radius: 15px;
  background-color: #0045FF;
  margin-top:5px;
  cursor:pointer;

}
.items{
  display: flex;
  justify-content:space-between;
}

</style>
