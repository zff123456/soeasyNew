<template>
  <div class="login_container"  style="padding-top:61px;">
     <div class="classManage"  style="margin-top:20px;">
        <div style="height:40px;line-height:40px;padding-left:60px;border-bottom:2px solid #f0f0f0;">
            <span  style="display:inline-block;padding:0 10px;color: #6C6C6C;margin:0 10px;cursor:pointer;" @click="goto(1)" >我的班级</span>
            <span  style="display:inline-block;padding:0 10px;margin:0 10px;color: #6C6C6C;cursor:pointer;"  @click="goto(2)" >学校班级</span>
            <span  style="display:inline-block;padding:0 10px;border-bottom:2px solid #E6A23C;color:#E6A23C;margin:0 10px;cursor:pointer;">学生管理</span>
        </div>
        <div style="width: 100%;height:20px;background:#EFF1F5 "></div>
        <div style=" width:100%;margin-left:20px;height: 60px;margin-top: 20px;" >
          <div  style="float:left;margin-right: 20px;">
              <el-select v-model="queryName" placeholder="请选择查询条件">
                  <el-option  v-for="item in queryInfo" :key="item.id"  :label="item.name"   :value="item.id"> </el-option>
              </el-select>
          </div> 
          <div style="float:left;" >
            <el-input placeholder="请输入搜索内容" v-model="keys"  clearable  style="border-radius: 20px;width: 200px;"  ></el-input>
            <el-button slot="append"  style="background:#F56C6C;color:#fff;margin-left:20px;border-radius: 20px;border: none"   @click="searchInfo">搜索</el-button>                                     
        </div>
      </div> 
      <div  style="width: 100%;height: 60px;">    
        <el-button @click="to_print" slot="append"  style="background:#013A6F;color:#fff;margin-left:30px;border-radius: 20px;border: none">打印</el-button> 
        <el-button @click="exportFour(tableData)" type="primary"  style="color:#fff;margin-left:30px;border-radius: 20px;border: none;background: #28784C;color:#fff;">导出成绩</el-button> 
     </div>
<!-- 表格 -->
         <el-table  style="width: 100%" :data="tableData" border  stripe :header-cell-style="getRowClass "   >
            <!-- <el-table-column type="index" width="60"> </el-table-column> -->
            <el-table-column prop="name"  label="学生账号"  align="center" color="#000"> </el-table-column>
            <el-table-column prop="nickname"  label="学生姓名"  align="center" color="#000"> </el-table-column>
             <el-table-column prop="class_name"  label="班级名称"  align="center" color="#000"> </el-table-column>
             <el-table-column  prop="teacher_name" label="教师姓名"   align="center"> </el-table-column>
             <el-table-column prop="test_paper_num"  label="测试次数"  align="center"> </el-table-column>
            <el-table-column  prop="video_time" label="观看视频时长"  align="center"   >
                <!-- <template slot-scope="scope">{{ scope.row.video_time | time}}</template> -->
            </el-table-column>
            <el-table-column  prop="is_user_data" label="资料是否完善"  align="center"   >
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.is_user_data==1">已完善</el-tag>
                <el-tag type="warning" v-if="scope.row.is_user_data==0">未完善</el-tag>
              </template>
          </el-table-column>        
            <el-table-column   label="操作"  align="center"  min-width="260">
                <template slot-scope="scope">
                   <div >
                    <el-button size="mini" @click="to_mystudent"  style="background: #00DBBE;color: #fff;border:none;border-radius:20px" plain >查看学生信息</el-button>
                    <el-button size="mini" @click="edits(scope.row)"  style="background: #AE5DA1;color: #fff;border:none;border-radius:20px" plain >修改</el-button>
                    <el-button size="mini" @click="deletes(scope.row)"  style="background: #EB6977;color: #fff;border:none;border-radius:20px" plain >删除</el-button>
                   </div>
                 </template>
             </el-table-column>
         </el-table>             
         <div class="xzbj">
             <el-dialog   title="修改学生信息"   :visible.sync="editFormVisible"     width="30%" >   
                 <!-- //  修改学生信息的表单信息 --> 
                 <!-- :rules="editFormRules"            -->
              <el-form ref="editStudentForm" :model="editStudentForm" label-width="80px"   >
               
                <el-form-item label="学生姓名">
                    <el-input style="width: 80%;" v-model="editStudentForm.nickname" placeholder="请输入学生名称"></el-input>
                </el-form-item>
              
                <el-form-item label="学生账号">
                    <el-input style="width: 80%;" v-model="editStudentForm.name"  maxlength="20" minlength="5"   placeholder="请输入学生账号"></el-input>
                </el-form-item>
                <el-form-item label="登录密码">
                    <el-input style="width: 80%;" v-model="editStudentForm.password"  type="password"    placeholder="请输入密码"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button style="background: #C0C0C0;border: none;border-radius: 20px" @click="editFormVisible=false">取 消</el-button>
                <el-button style="background: #FED467;border: none;border-radius: 20px" @click="editDialoge">确 定</el-button>
            </span>
             </el-dialog>
         </div>
         <!-- 分页插件。 -->
    <div style="float:right;padding-top:5px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        layout="total, prev, pager, next,jumper"
        :total="total"
      ></el-pagination>
    </div>  
    <!-- 导出成绩 -->
    <div class="table-box" v-show="false">
      <el-table :data="tableData" stripe border :row-style="{height:'48px'}"  :header-row-style="{height:'48px'}"  class="table">
  
      </el-table>  
     </div>
  </div>
 </div>
</template>

<script>
import qs from "qs";
import { log } from 'util';
import XLSX from "xlsx";
import FileSaver from "file-saver";
export default {
  data() {
    return {
      school_name:'',
      school_id:'',
     teacherName:'',
     teacher_id:'',
      // teachName:'',
      // addDialoge:false,
      keys:'',
      queryInfo:[{id:1,name:'学生姓名'},{id:2,name:'学生账号'},{id:3,name:'班级名称'},{id:4,name:'教师名称'},],
      queryName:'',
      // 修改班级的信息 
      editStudentForm:{
        nickname:'',
        name:'',
        password:'',
        nickname1:'',
        name1:'',
        password1:'',
    },       
      one_id:'',
      editFormVisible:false,
      tableData:[  ],
      total:0,
      type:'' ,
      currentPage:1,
      pagesize:10,
      value: '',
      class_name:'',
      teacherInfo:'',
      classInfo:'',
      searchMessage:'',
      studentInfo:'',
      studentname:'',
      // editFormRules:{
      //               name:[{ required: true, message: '请输入登录密码', trigger: 'blur'
      //               },{ min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }]
      //             } ,      
    }
  },
  methods: {
    getRowClass ({ rowIndex }) {
      if (rowIndex == 0) {
        return 'background:#EFF1F6;border:none;color:black'
    } else {
      return 'border:1px solid #EFF1F6'
   }
 },
        // 分页
handleSizeChange(val) {
    this.pagesize = val;
    this.getList()
    this.searchInfo()  
},  
handleCurrentChange(val) {
      this.currentPage = val;
      this.getList()
      // this.searchInfo()
},
   goto(val){
     if(val==1){
        this.$router.push('/classmanage')
      }else if(val==2){
           this.$router.push('/schoolClass')
      }else {
          return
      }
    },  
    // 点击搜索按钮查询信息
    searchInfo(){
      this.currentPage=1
      this.getList( )     
    },
  // 打印
  to_print(){
    this.$router.push('/print')
  },
  // 导出成绩
  exportFour(){
    console.log(chengji);
   
  
   //   const res = await this.$http.post("admin/teacher/classstudentachievementexcl", qs.stringify({ class_id: chengji.id }));
   //   if (res.status === 200 && res.data.code === "1") {
   //     this.excelTabal = res.data.info
   //     // if (this.excelTabal == []){ return false; }
   //   } else {
   //     this.$message({ message: "暂无数据", type: "error", duration: 3000});
   //   }
     let getCurrentPage = this.currentPage;
     this.pagesize = 99999;
     this.currentPage = 1;
     this.$nextTick(function () {
       let time = new Date();
       let year = time.getFullYear();
       let month = time.getMonth() + 1;
       let day = time.getDate();
       let name = year + "" + month + "" + day;
       var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
       var wbout = XLSX.write(wb, {
         bookType: "xlsx",
         bookSST: true,
         type: "array"
       });
       try {
         FileSaver.saveAs(
           new Blob([wbout], { type: "application/octet-stream" }),
           name + ".xlsx"
         );
       } catch (e) {
         if (typeof console !== "undefined") console.log(e, wbout);
       }
       this.pagesize = 15;
       this.currentPage = getCurrentPage;
       return wbout;
     })
  },     
    //   修改信息
  edits(val){
    console.log(val)
  this.editFormVisible=true;
  this.editStudentForm.nickname=val.nickname;
   this.editStudentForm.name=val.name
   this.editStudentForm.password=val.password
   this.one_id=val.id
   this.editStudentForm.nickname1=val.nickname;
   this.editStudentForm.name1=val.name
   this.editStudentForm.password1=val.password
               
},
async  editDialoge(){

   if(this.editStudentForm.nickname==this.editStudentForm.nickname1&& this.editStudentForm.password ==this.editStudentForm.password1&& this.editStudentForm.name == this.editStudentForm.name1){
    this.$message({ message: "信息需要修改",offset:90});
    return
   } 
   var unameReg = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/
       if (!unameReg.test(this.editStudentForm.nickname)) {
         this.$message({ message: "请输入真实姓名", type: "warning", duration: 2000  ,offset:90 });
          return false;
    }
  if (this.editStudentForm.name.trim()== ""||this.editStudentForm.name.trim().length<5||this.editStudentForm.name.trim().lenght>20) {
      this.$message({ message: "请输入正确账号", type: "error", duration: 2000,offset:90});
      return 
  }
  if ( this.editStudentForm.password== "") {
      this.$message({ message: "密码不能为空", type: "error", duration: 2000,offset:90});
      return 
  }
  // console.log(this.editStudentForm);
  
 const res = await this.$http.post("v1/Schoolclass/userupdata", qs.stringify({ 
     u_id: this.one_id,
     name:this.editStudentForm.name,
     nickname:this.editStudentForm.nickname,
     password:this.editStudentForm.password,
  }));
  console.log(res);
  if (res.status === 200 && res.data.code === "1") {
      this.$message({ message:res.data.info, type: "success", duration: 3000,offset:90 });
      this.editFormVisible=false;
      // editFormVisible
      this.editStudentForm.nickname=" "
      this.editStudentForm.name=""
      this.editStudentForm.password=""
      this.getList()
  }else {
      this.$message({ message: res.data.info, type: "error", duration: 3000,offset:90 });
  }
  },

    //   删除信息
 async  deletes(val){   
    console.log(val);
 const confirm=await  this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
        type: 'warning'     
      }).catch((error) => {
       console.log(error);       
      });
      console.log(confirm);
      
   if(confirm!="confirm"){
      this.$message({ type: 'info',  message: '已取消删除',offset:90});
          return
   }
   const res = await this.$http.post("v1/Schoolclass/userdel", qs.stringify({ 
       u_id:val.id,
       class_id:val.class_id
    }));
    console.log(res);
      if (res.status === 200 && res.data.code === "1") {
        this.$message({ message: res.data.info, type: "success", duration: 3000,offset:90});
        this.getList()
      }else {
        this.$message({ message: res.data.info, type: "error", duration: 3000,offset:90});
      }
  },
      //查看学生信息
  to_mystudent(){
      this.$router.push("./mystudent")
  },
  
 async getList(){
     this.studentInfo='',
     this.studentname='',
    this.class_name=" "
    this.teacherName=" "
    this.class_name=" "
    if(this.queryName==1){
      this.studentInfo=this.keys
      this.studentname='',
      this.class_name=" "
      this.teacherName=" "
      this.class_name=" "
     }
     if(this.queryName==2){
      this.studentInfo=""
      this.studentname=this.keys,
      this.class_name=" "
      this.teacherName=" "
      this.class_name=" "
     }
     if(this.queryName==3){
      this.studentInfo=""
      this.studentname=" "
      this.class_name=" "
      this.teacherName=this.keys
      this.class_name=" "
     }
     if(this.queryName==3){
      this.studentInfo=""
      this.studentname=" "
      this.class_name=" "
      this.teacherName=""
      this.class_name=this.keys
     }
         const res = await this.$http.post("v1/Schoolclass/schooluserlst", qs.stringify({
            teacher_name:this.teacherName,
            class_name:this.class_name,
            school_id:this.school_id,     
            currentpage:this.currentPage,
            nickname:this.studentInfo,
            name: this.studentname,
          }));
          console.log(res);
        if (res.status === 200 && res.data.code === "1") {
          this.tableData = res.data.info.info
          this.total=res.data.info.num
          this.pagesize=parseInt(res.data.info.page)
      }else {
        this.$message({ message: res.data.info, type: "error", duration: 3000});
      } 
       
    },  
  },
   mounted() {
    this.teacher_id = localStorage.getItem("id");
    this.school_id = localStorage.getItem("school_id");
    this.school_name = localStorage.getItem("school_name");
    console.log(this.nickname );           
    // this.teacherName = localStorage.getItem("nickname");
    this.getList();
  },
}
</script>

<style lang="less" scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
.header{
   border: 1px solid transparent;
//    background-color: pink;
   padding-bottom: 15px;
   box-shadow: 0 2px 2px 2px rgba(#000,.1);
//   display: flex;
  .item{
    float: left; 
    padding: 5px 10px;
    margin:20px 10px 0 10px;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    border-radius:20px;
  }
  .item1{
    border-top: 1px solid transparent;
    width:30%;
    float: right; 
    margin-top:10px;
    img{
        width:30px;
        height: 30px;
        vertical-align: middle;
        margin-left:10px;
    }
    .img1{
    width:28px;
    height: 28px;
    }
  }
  .active{
    background-color: #409EFF;
    color:#fff;
    
  }
  .img{
    width: 20px;
    height: 20px;

  }
}
.box{
    height: 50px;
    line-height: 50px;
    .input .el-input{
        height: 30px;
        .el-input__inner{
             height: 30px;
        }
    }
}
.el-tabs__nav-scroll{
    margin-left: 100px !important;
}
.nav{
    width: 100%;
    display: flex;
    background: #F1F3F5;
    justify-content: space-between;
}
    .nav .nav_item{
        background: #fff;
        height: 150px;
        width: 19.5%;
    }
    .bjzy{
        border-radius: 10px;
    }

</style>
