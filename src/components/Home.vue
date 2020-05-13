<template>
    <div class="login_container">
      <img src="../assets/image/index/tb.png" alt="" style="  margin:10px 20px;width:40px;height:40px;">  
          <div  class="login-box">         
             <div class="box" style="width:50%;height:600px;margin:0 auto;margin-top:150px;">
                  <div class="biaoti" >鼎傲教育</div>
              <span style="font-size:22px; border-top: 1px solid #5676E9 ;padding:10px 0">以科技力量改变中国教育</span>
              <el-form ref="form"  style="margin-top:30px;"   :rules="formRules">
                  <el-form-item >               
                      <div class="item">
                          <el-select v-model="identId" placeholder="请选择登录身份" @change="checkshengfen">
                          <el-option  v-for="item in identList" :key="item.name"  :label="item.name" :value="item.name"></el-option>                   
                      </el-select>
                      </div>
                  </el-form-item >
                  <el-form-item >
                     <div class="item">
                          <el-input placeholder="请输入账号"   clearable    v-model="username"> </el-input>
                     </div>
                  </el-form-item >
                  <el-form-item >
                     <div class="item">
                           <el-input   placeholder="请输入密码"  show-password  v-model="password" clearable   > </el-input>
                     </div>
                  </el-form-item >
              </el-form>                       
              <div style="font-size:16px;height:40px;color:#ffff;line-height:40px;cursor:pointer " class="login"  @click="login">登录</div>
              <div style="font-size:16px;height:40px;color:#ffff; line-height:40px;cursor:pointer"  class="zhuce" @click="dialogVisible=true" >注册</div>
              <div style="font-size:16px;height:40px;color:#ffff; line-height:40px; margin-top:10px;"  class="find"  >
               <span style="cursor:pointer;float: left;margin-left:18%;"    @click="findPassward">手机号登录</span>
               <span style="cursor:pointer;float: right;margin-right:18%;;"  @click="dialogshow=true">申请试用</span>
              </div>
             </div>
          </div>
          <el-dialog   :title="titleName" :visible.sync="dialogVisible"  class="zhuceForm"    width="30%"  >
            <el-form  ref="form"  >
                <el-form-item  > 
                    选择身份：               
                    <el-radio-group v-model="radio" @change="checked">
                        <el-radio :label="1">学生</el-radio>
                        <el-radio :label="2">老师</el-radio>
                        <el-radio :label="3">社会人员</el-radio>
                    </el-radio-group> 
              </el-form-item>
              <el-form-item v-if="this.radio!=3">    
                    <el-select v-model="sheng"  placeholder="请选择省份"   @change="changeShengfen"    >
                      <el-option v-for="item in shengList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                   </el-select>
              </el-form-item>
              <el-form-item  v-if="this.radio!=3">    
                 <el-select v-model="chengshi" placeholder="请选择城市"  @change="changeCity" >
                   <el-option v-for="item in chengshiList" :key="item.id" :label="item.name"  :value="item.id" ></el-option>
               </el-select>
             </el-form-item  >
             <el-form-item    v-if="this.radio!=3">    
                <el-select v-model="school" placeholder="请选择学校"  @change="changeSchool" >
                   <el-option v-for="item in schoolList"  :key="item.id"  :label="item.school_name"  :value="[item.id,item.school_name]" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  v-if="this.radio==1" >
                <el-select v-model="tracher"  placeholder="请选择教师"   @change="changeTeacher" >
                  <el-option v-for="item in tracherList" :key="item.id"  :label="item.nickname"   :value="[item.id,item.nickname]" ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item  v-if="this.radio==1">    
                <el-select v-model="classes" placeholder="请选择班级"  >
                     <el-option v-for="item in classList"  :key="item.id" :label="item.class_name"  :value="[item.id,item.class_name]"  ></el-option>
                 </el-select> 
          </el-form-item>   
          <el-form-item  >
                <el-input placeholder="请输入真实姓名"  clearable  v-model="shiming" @blur="nameInput" > </el-input>
          </el-form-item>
         <el-form-item >
            <el-input placeholder="请输入注册账号"  clearable v-model="zhanghao"  > </el-input>
         </el-form-item>
         <el-form-item >
            <el-input placeholder="请输入密码"  clearable   show-password  v-model="psw" > </el-input>
        </el-form-item>
        <el-form-item >
            <el-input placeholder="请确认密码"    clearable  show-password v-model="paw"  > </el-input>
        </el-form-item>
        </el-form>           
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="zhuce">确 定</el-button>
          </span>
        </el-dialog>
        <!--申请试用的弹框-->  
        <el-dialog      :visible.sync="dialogshow"       width="45%"  >
           <div class="shengqing-box">
            <div class="left-img">
              <img src="../assets/image/index/shenqing.png" alt="">
            </div>
            <el-form ref="shenqingForm"  class="right-box"   :rules="shenqingFormRules">
              <el-form-item >
               <div  class="itemName">申请试用</div>
            </el-form-item >
             <el-form-item >
               <el-input placeholder="学校名称"   clearable    v-model="shenqingForm.schoolName"   > </el-input>
           </el-form-item >
           <el-form-item >
                <el-input placeholder="试用人数" v-model="shenqingForm.people" clearable    type="text"  > </el-input>
          </el-form-item >
          <el-form-item >
               <el-input placeholder="您的姓名" v-model="shenqingForm.nickName" clearable   type="text"   > </el-input>
         </el-form-item >
         <el-form-item>
            <el-input  placeholder="您的联系方式"   v-model="shenqingForm.phone"   clearable ></el-input  >
         </el-form-item>
          <el-form-item >
                 <el-input placeholder=" 备注：我想试用四级，六级题库" v-model="shenqingForm.beizhu"  type="textarea"   clearable   > </el-input>
        </el-form-item >
        <el-form-item >
         <div  @click="shengqing"  style="width: 100%;height: 40px;" class="btns">确 定</div>
        </el-form-item >
       </el-form>      
           </div> 
           <!-- <span slot="footer" class="dialog-footer">
              <el-button @click="dialogshow = false">取 消</el-button>
                <el-button type="primary" @click="shengqing">确 定</el-button>
           </span> -->
        </el-dialog>
    </div>
  </template>
  
  <script>
      import qs from "qs";
      export default {
          data() {
              return {
                count:60,
                show:true,
                dialogshow:false,
                dialogVisible:false,
                 titleName:'注册',
                  radio:1,
                  username: '',
                  password: '',
                  identId:'学生',
                 identList: [{
                    id: '2',
                    name: '老师'
                  },{
                     id: '1',
                    name: '学生'
                  }],
                  formRules: {
                    username: [{  required: true,  message: '请输入登录账号',  trigger: 'blur'
                      }, { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}],
                      password: [{ required: true, message: '请输入登录密码', trigger: 'blur'
                      }, { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
                  } ,
                  // 省份地址
                shengList: [ ],
                sheng:'',
				       // 城市地址
                chengshiList:[],
                chengshi:'',
				        // 学校
                schoolList:[],
                school:'',
				        // 老师
                tracherList:[],
                tracher:'',
				        // 班级
                classList:[], 
                classes:'',
                // 真实姓名
                shiming:'',
                // 注册账号
                zhanghao:'',
                // 注册密码
                psw:'',
                // 确认密码
                paw:'',
                // 注册的时候选择的学校名称
                school_name:'',
                // 注册的时候选择的学校id
                school_id:'',
                 // 注册的时候选择的老师id
                teacher_id: "",
                 // 注册的时候选择的老师名称
                teacher_name: "",
                 // 注册的时候选择的班级id
                class_id: "",
                 // 注册的时候选择的班级名称
                class_name: "",
                shenqingForm:{
                  schoolName:'',
                  people:'',
                  nickName:'',
                  phone:'',
                  beizhu:'',
                },
                peopleList:[],
                people:[],
                peopleName:'',
                peopleNum:'',
                shenqingFormRules: {
                  schoolName: [{ required: true,  message: '请输入登录账号',  trigger: 'blur'
                      }, { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur'}],
                      nickName: [{ required: true, message: '请输入登录密码', trigger: 'blur'
                      }, { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }],
                  } ,
              }
          },
        
          created: function() {   
             this.getShengshi();
             console.log(this.radio);
             this.getPeopleList()            
          },
          methods: {
            // 获取销售人员
         async   getPeopleList(){
          const res = await this.$http.post("v1/Sale/salelst")
          console.log(res);
          if (res.status === 200&& res.data.code==1) {
             this.peopleList=res.data.info
          }
          
            },
            checkpeople(val){
              console.log(val);
              this.people=val
              this.peopleName=this.people[0]
              this.peopleNum=this.people[1]
             
            },
            // 申请使用
         async   shengqing(){
          //  console.log(this.peopleName,1);
           
          // if (this.peopleName=="") {
          //      this.$message({ message: "请选择销售人员",  type: "warning",  duration: 2000 });
          //             return false;
          //       }
              if (this.shenqingForm.schoolName.trim() == "") {
                    this.$message({ message: "请输入学校名称",  type: "warning",  duration: 2000 ,offset:90});
                      return false;
                }
              if (this.shenqingForm.people.trim()=="") {
                      this.$message({  message: "请填写试用人数",   type: "warning",   duration: 2000,offset:90
                  });
                      return false;
             }
             if (this.shenqingForm.nickName.trim()=="") {
                      this.$message({message: "请填写您的姓名",  type: "warning",   duration: 2000,offset:90
               });
                      return false;
             }
            var CellPoe = /^[1][3,4,5,7,8][0-9]{9}$/;
            if (!CellPoe.test(this.shenqingForm.phone)) {
              this.$message({ message: "手机号不正确",  type: "warning",   duration: 2000,offset:90 });
                  return false;
            }
            if (this.shenqingForm.beizhu.trim() == "") {
                      this.$message({  message: "请填写备注信息",  type: "warning",  duration: 2000,offset:90
              });
                      return false;
             }
            //  sale_name:this.peopleName,
            //     sale_phone:this.peopleNum,
             const res = await this.$http.post( "v1/Sale/addSchoolApplication",qs.stringify({
                school_name:this.shenqingForm.schoolName,
                user_num:this.shenqingForm.people,
                school_teacher_name:this.shenqingForm.nickName,
                school_teacher_phone:this.shenqingForm.phone,             
                remarks:this.shenqingForm.beizhu
              }))
              if(res.status==200&&res.data.code==1){

                  console.log(res);
                  this.$message({message:res.data.info,type:'error',duration: 2000,offset:90})
              this.shenqingForm.schoolName=""
              this.shenqingForm.people="",
              // this.people=[]
              this.shenqingForm.nickName=""
              this.shenqingForm.phone=""  
              this.shenqingForm.beizhu=" "
               this.dialogshow=false
              }else{
                this.$message({message:'申请失败',type:'error',duration: 2000,offset:90})
              }
              // this.$message({message:'申请失败',type:'error',duration: 2000})
              // this.shenqingForm.schoolName=""
              // this.shenqingForm.people="",
              // this.people=[]
              // this.shenqingForm.nickName=""
              // this.shenqingForm.phone=""            
            },
            // 登录的时候  切换学生或者老师登录
            checkshengfen(val){
                console.log(val);
                this.identId=val
            },
            // 注册的时候 切换学生老师或者职工人员
            checked(val){
                     console.log(val);
                     this.radio=val    
            },
              // 登录
           async login() {
             console.log(this.identId);
             
          //   if(this.identId=="学生"){ this.$router.push('/stuwelcome')
          //       localStorage.setItem("identity", 1); 
          //     }
              
          //   if(this.identId=="老师"){ this.$router.push('/welcome') 
          //   localStorage.setItem("identity", 2); 
          //  }
           
          //    console.log(1111);
             
              if (this.username.trim() == "") {
                  this.$message({ message: "账号不正确",  type: "warning",  duration: 2000 ,offset:90});
                      return false;
              }
              if (this.password.trim() == "") { 
                  this.$message({  message: "密码不能为空",  type: "warning", duration: 2000 ,offset:90  });
                      return false;
              }
              if(this.identId=="学生"){               
               const res = await this.$http.post("v1/Userlogin/userLogin",
                    qs.stringify({
                        name:this.username,
                        password:this.password
                 }))
                      console.log(res); 
              if (res.status ==200 && res.data.code==1) {
                    // this.$message({ message:'登录成功',   type: "success",   duration: 2000 });
                   localStorage.setItem("header_url", res.data.info.header_url); // 学生头像
                   localStorage.setItem("is_member", res.data.info.is_member); // 
                  localStorage.setItem("is_user_data", res.data.info.is_user_data); // 
                    localStorage.setItem("balance", res.data.info.balance); // 
                    localStorage.setItem("nickname", res.data.info.nickname); // 学生实名
                    localStorage.setItem("name", res.data.info.name);   //学生登录账号
                    localStorage.setItem("identity", res.data.info.type); // 身份   2为教师  1位学生  
                    localStorage.setItem("school_name", res.data.info.school_name); // 学校名称
                    localStorage.setItem("school_id", res.data.info.school_id); // 学校id
                    localStorage.setItem("id", res.data.info.id); // 学生id
                    this.$router.push('/stuwelcome') 
                     this.username=" ";
                     this.password=" "
                  }else{
                     this.$message({ message:res.data.info ,type: "error", duration: 2000 ,offset:90  }); 
                  }
                  // this.$message({ message:'登录失败', type: "error", duration: 2000 ,offset:90  }); 
                    return false                                             
             }
            if(this.identId=="老师"){
              console.log('老师登录');              
              const res = await this.$http.post("v1/Teacher/teacherLogin",
                 qs.stringify({
                   name:this.username,
                  password:this.password
              }))
              console.log(res);                                     
              if (res.status ==200 && res.data.code==1) {
                console.log(res.data.info);
                  //  this.$message({ message:res.data.info,   type: "success",   duration: 2000 ,offset:90 });
              localStorage.setItem("id", res.data.info.id); // 教师id
              localStorage.setItem("nickname", res.data.info.nickname); // 教师实名
              localStorage.setItem("name", res.data.info.name);   //学生登录账号
              localStorage.setItem("identity", res.data.info.type); // 身份   2为教师  1位学生  
              localStorage.setItem("school_name", res.data.info.school_name); // 学校名称
              localStorage.setItem("school_id", res.data.info.school_id); // 学校id
              this.$router.push('/welcome')  
                     //  
              this.username=" ";
              this.password=" "
              }else {
                this.$message({ message:res.data.info, type: "error",   duration: 2000 ,offset:90 }); 
              }
                // this.$message({ message:res.data.info, type: "error",   duration: 2000 ,offset:90 });  
                return false              
            }   

        },
              // 手机号登录
        findPassward() {
           console.log(111)
          this.$router.push('/forgetPas') 
       },
       nameInput(){
        var unameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
            if (!unameReg.test(this.shiming)) {
                 this.$message({ message: "请输入真实姓名", type: "warning", duration: 2000  ,offset:90 });
                 return false;
            }
       },
              // 注册
      async    zhuce() {
          if(this.radio==1){
               if (this.sheng == "") {
                this.$message({ message: "请选择省份",   type: "warning",   duration: 2000 , offset:90 });
               return false;
           }
           if (this.chengshi == "") {
                this.$message({ message: "请选择城市",   type: "warning",   duration: 2000  ,offset:90 });
                return false;
           }
            if (this.school == "") {
               this.$message({ message: "请选择学校",   type: "warning",   duration: 2000  ,offset:90 });
              return false;
            }               
            if (this.school!= "") {
               this.school_name = this.school[1];
               this.school_id = this.school[0];
             }
            if (this.tracher == "") {
              this.$message({ message: "请选择老师",   type: "warning",   duration: 2000  ,offset:90 });
              return false;
            }
            if (this.tracher != "") {
                 this.teacher_name = this.tracher[1];
                this.teacher_id = this.tracher[0];
            }
            if (this.classes == "") {
                this.$message({ message: "请选择班级",   type: "warning",   duration: 2000  ,offset:90 });
               return false;
            }
            if (this.classes != "") {
                this.class_name = this.classes[1];
                this.class_id = this.classes[0];
            }
            var unameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
            if (!unameReg.test(this.shiming)) {
                 this.$message({ message: "请输入真实姓名", type: "warning", duration: 2000  ,offset:90 });
                 return false;
            }
            if (this.zhanghao.replace(/\s*/g,"") == ""&&this.zhanghao.trim().length<2) {
                this.$message({ message: "账号长度为2位以上", type: "warning", duration: 2000  ,offset:90 });
                 return false;
              }
              if (this.psw.replace(/\s*/g,"") == "") {
                    this.$message({ message: "请输入注册密码", type: "warning", duration: 2000 ,offset:90  });
                     return false;
              }
              if (  this.psw.replace(/\s*/g,"").length < 6 || this.psw.replace(/\s*/g,"").length > 20 ) {
                    this.$message({ message: "密码长度为6-20位", type: "warning", duration: 2000  ,offset:90 });
                    return false;
             }
             if (  this.paw.replace(/\s*/g,"")!=this.psw.replace(/\s*/g,"")) {
                    return false;
             }
            // }
            const res = await this.$http.post("v1/Userlogin/schoolUserRegister",qs.stringify({
                 nickname:this.shiming,
                 name:this.zhanghao,
                 school_id:this.school_id,
                 school_name:this.school_name,
                 password:this.psw,
                 teacher_id:this.teacher_id,
                 teacher_name:this.teacher_name,
                 class_id:'this.class_id',
                 class_name:this.class_name
              }));
              console.log(res);
              if (res.status === 200 && res.data.code === "1") {
                this.$message({ message:res.data.info, type: "success", duration: 2000  ,offset:90 }); 
                this.dialogVisible=false 
                this.shengList= []
                this.chengshiList= []
                this.schoolList=[]
                this.tracherList=[]
                this.classList=[]
                this.sheng= ""
                this.chengshi=""
                this.school=""
                this. tracher=""
                this.classes=""
                this.school_name=""
                this.school_id=""
                this.teacher_id=""
                this.teacher_name= ""
                this.class_id= ""
                this.class_name=""  
                this.shiming=" " 
                // this.shiming=""
                this.zhanghao=""
                this.psw=" "
                this.paw=""              
              }else{
                this.$message({ message: res.data.info,   type: "warning",   duration: 2000 ,offset:90  });
              }                      
              }
           if(this.radio==2){
                if (this.sheng == "") {
                    this.$message({ message: "请选择省份",   type: "warning",   duration: 2000 ,offset:90  });
                   return false;
                 }
                 if (this.chengshi == "") {
                    this.$message({ message: "请选择城市",   type: "warning",   duration: 2000  ,offset:90 });
                   return false;
                 }
                 if (this.school == "") {
                    this.$message({ message: "请选择学校",   type: "warning",   duration: 2000  ,offset:90 });
                   return false;
                 }               
                 if (this.school != "") {
                     this.school_name = this.school[1];
                      this.school_id = this.school[0];
                  }
                 var unameReg = /^([\u4e00-\u9fa5]+|([a-z]+\s?)+)$/
                 if (!unameReg.test(this.shiming)) {
                    this.$message({ message: "请输入真实姓名", type: "warning", duration: 2000  ,offset:90 });
                     return false;
                 }

                if (this.zhanghao.replace(/\s*/g,"") == ""||this.zhanghao.trim().length<2) {
                    this.$message({ message: "账号长度为2位以上", type: "warning", duration: 2000  ,offset:90 });
                     return false;
                }
               if (this.psw.replace(/\s*/g,"") == "") {
                     this.$message({ message: "请输入注册密码", type: "warning", duration: 2000  ,offset:90 });
                     return false;
               }
               if (this.psw.replace(/\s*/g,"").length < 6 || this.psw.replace(/\s*/g,"").length > 20 ) {
                    this.$message({ message: "密码长度为6-20位", type: "warning", duration: 2000  ,offset:90 });
                    return false;
              }
              if (this.paw.replace(/\s*/g,"")!=this.psw.replace(/\s*/g,"")) {
                this.$message({ message: "两次密码不同", type: "warning", duration: 2000  ,offset:90 });
                    return false;
              }
              const res = await this.$http.post("v1/Teacher/teacherRegister",qs.stringify({
                 nickname:this.shiming,
                 name:this.shiming,
                 school_id:this.school_id,
                 school_name:this.school_name,
                 password:this.psw
              }));
              console.log(res);
              if (res.status === 200 && res.data.code === "1") {
                this.$message({ message:res.data.info, type: "success", duration: 2000  ,offset:90 }); 
                this.dialogVisible=false
                this.shengList= []
                this.chengshiList= []
                this.schoolList=[]
                this.tracherList=[]
                this.classList=[]
                this.sheng= ""
                this.chengshi=""
                this.school=""
                this.school_name=""
                this.school_id=""
                this.shiming=" " 
                // this.shiming=""
                this.zhanghao=""
                this.psw=" "
                this.paw=""
              }else {
                this.$message({ message:res.data.info, type: "error", duration: 2000  ,offset:90 });
              }
             
              }
              if(this.radio==3){
                var unameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
                 if (!unameReg.test(this.shiming)) {
                    this.$message({ message: "请输入真实姓名", type: "warning", duration: 2000  ,offset:90 });
                     return false;
                 }
                  if (this.zhanghao.replace(/\s*/g,"") == ""||this.zhanghao.trim().length<2) {
                    this.$message({ message: "账号长度为2位以上", type: "warning", duration: 2000  ,offset:90 });
                     return false;
                }
               if (this.psw.replace(/\s*/g,"") == "") {
                     this.$message({ message: "请输入注册密码", type: "warning", duration: 2000  ,offset:90 });
                     return false;
               }
               if (this.psw.replace(/\s*/g,"").length < 6 || this.psw.replace(/\s*/g,"").length > 20 ) {
                    this.$message({ message: "密码长度为6-20位", type: "warning", duration: 2000  ,offset:90 });
                    return false;
              }
              if (this.paw.replace(/\s*/g,"")!=this.psw.replace(/\s*/g,"")) {
                this.$message({ message: "两次密码不同", type: "warning", duration: 2000  ,offset:90 });
                    return false;
              }
              const res = await this.$http.post("v1/Userlogin/SociologyUserRegister",qs.stringify({
                 nickname:this.shiming,
                 name:this.zhanghao,
                 password:this.psw
              }));
              console.log(res);
              if(res.status==200 && res.data.code =="1"){
                this.$message({ message: res.data.info, type: "success", duration: 2000  ,offset:90 });
                this.dialogVisible=false
                this.shiming=" " 
                this.zhanghao=""
                this.psw=" "
                this.paw=""
                
              }else {
                this.$message({ message: res.data.info, type: "error", duration: 2000  ,offset:90 });
              }                   
              }
            },
              async getShengshi() {// 获取省市
                  const res = await this.$http.get("v1/Region/provinceList");
                  console.log(res);                
                   if (res.status === 200&& res.data.code === "1") {
                    this.shengList = res.data.info;
                    console.log(this.shengList);               
              }
             } ,
          changeShengfen() {
          // 省市值发生改变
          this.city = "";
          this.school = "";
          this.tracher = "";
          this.classes = "";
          this.getCity();
    },
    changeCity() {
      // 城市值发生改变
      this.school = "";
      this.tracher = "";
      this.classes = "";
      this.getSchool();
    },
    changeSchool() {
      // 学校值发生改变
      this.tracher = "";
      this.classes = "";
      if(this.radio==1){
        this.getTeacher();
      }
     
    },
    changeTeacher() {
      // 教师值发生改变
      this.classes = "";
      this.getClass();
    },
    async getCity() {
      // 获取城市
      const res = await this.$http.post(
        "v1/Region/cityList",
        qs.stringify({ id: this.sheng })
      );
      console.log(res);
      
      if (res.status === 200&& res.data.code === "1") {
        this.chengshiList = res.data.info
        // console.log("chengshi::,", res.data.info);
      }
    },
    async getSchool() {
      // 获取学校
      const res = await this.$http.post(
        "v1/School/schoolList",
        qs.stringify({ id: this.chengshi })
      );
      if (res.status === 200&& res.data.code === "1" ) {
        this.schoolList = res.data.info;
        console.log(this.schoolList);        
      }
    },
    async getTeacher() {
      // 获取教师
      this.school_id = this.school[0];
      const res = await this.$http.post( "v1/Region/teacherLst",
        qs.stringify({ school_id: this.school_id })
      );
      console.log(res);
      
      if (res.status === 200 && res.data.code === "1") {
        this.tracherList = res.data.info;
      }
      console.log(res.data);
      // console.log(this.school[0])
    },
    async getClass() {
      // 获取班级
      this.teacher_id = this.tracher[0];
      console.log(this.teacher_id);     
      const res = await this.$http.post("v1/Region/classLst",
        qs.stringify({teacher_id:this.teacher_id })
      );
      console.log(res);
      if (res.status === 200 && res.data.code === "1") {
        this.classList = res.data.info;
      }
    },
      }
    }
  </script>
  
  <style lang="less" scoped>
    #app{
     height: 100%;
    }
      .login_container {
     /* height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url(../assets/login/bg01.png);
  background-size: cover;
  background-position: center center; */
          width: 100%;
          height: 100%;
          background: url(../assets/login/bg01.png) no-repeat;
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          /* min-width: 1336px; */
          background-color: #fff;
          background-repeat: no-repeat;
          background-size: cover;
          -webkit-background-size: cover;
          -o-background-size: cover;
          background-position: center 0;
      }
      
      .login-box {
          width: 45%;
          min-width: 600px;
          color: #ffffff;
          /* height: 600px; */
          text-align: center;
          letter-spacing: 0.1rem;
          border-radius: 3px;
          position: absolute;
          left: 50%;
          top: 10%;
          /* height: 73%; */
          transform: translate(-50%, 0);
          background-image: url(../assets/login/bg02.png);
          background-repeat: no-repeat;
          background-size: 100%;
          padding-bottom: 20px;
          -webkit-background-size: cover;
          -o-background-size: cover;
          background-position: center 0;
      }
      
      .biaoti {
          font-size: 40px;
          height: 60px;
          margin-bottom: 10px;
          
      }
      
      .el-form {
          width: 70%;
          margin: 0 auto;
          margin-top: 20px;
      }
      
      .el-select {
          width: 100%;
      }
      
      .login {
          display: inline-block;
          width: 70%;
          height: 30px;
          background-color: #70C510;
          margin-bottom: 20px
      }
      
      .zhuce {
          display: inline-block;
          width: 70%;
          height: 30px;
          line-height: 30px;
          background-color: #A8A7A7;
      }
      .item2  .yzm{
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
.item2{
  display: flex;
  justify-content:space-between;
}
.shengqing-box{
  height: 450px;
  display: flex;
  .left-img{
    width: 48%;
    margin-right:5%;
    height:100%;
    float: left;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .right-box{
    width: 47%;
    float: left;
    box-sizing: border-box;
  }
  .itemName{
    text-align: center;
    font-size: 1.6em;
    letter-spacing: 0.1em;
    color:#327CF7 ;
  }
  .btns{
    background-color:#327CF7 ;
    font-size: 1.2em;
    line-height: 40px;
    text-align: center;
    color: #fff;
  }
}
/* .zhuceForm .el-dialog{
  min-width: 450px;
} */
  </style>