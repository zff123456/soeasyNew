<template>
    <div class="login_container" style="padding-top:61px;">
        <div class="classManage"  >
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
            <div  style="height: 60px;">
                <el-button style="background: #60C5F9;color:#fff;border:none;margin-left:30px;border-radius: 20px;" slot="append"  @click="move(tableData)">转移到其他班级</el-button>
                <el-button style="background: #28784C;color:#fff;border:none;margin-left:30px;border-radius: 20px;" slot="append"  @click="exports(tableData)" >导出Excel</el-button>                            
                <el-button @click="addDialoge=true" type="primary"   style="color:#fff;margin-left:30px;border-radius: 20px;border: none;">新增学生</el-button> 
            </div>
                    
           <el-table   @selection-change="handleSelectionChange"  style="width: 100%" :data="tableData" border  stripe :header-cell-style="getRowClass "   > 
            <el-table-column prop="name"  label="学生账号"  align="center" color="#000"> </el-table-column>
            <el-table-column prop="nickname"  label="学生姓名"  align="center" color="#000"> </el-table-column>
             <el-table-column prop="class_name"  label="班级名称"  align="center" color="#000"> </el-table-column>
             <el-table-column  prop="teacher_name" label="教师姓名"   align="center"> </el-table-column>
             <el-table-column prop="test_paper_num"  label="测试次数"  align="center"> </el-table-column>
            <!-- <el-table-column prop="use_num"  label="班级注册人数"   align="center"> </el-table-column> -->
            <el-table-column  prop="video_time" label="观看视频时长"  align="center"   >
                <!-- <template slot-scope="scope">{{ scope.row.video_time | time}}</template> -->
            </el-table-column>
            <el-table-column  prop="is_user_data" label="资料是否完善"  align="center"   >
              <template slot-scope="scope">
                <el-tag type="success" v-if="scope.row.is_user_data==1">已完善</el-tag>
                <el-tag type="warning" v-if="scope.row.is_user_data==0">未完善</el-tag>
              </template>
          </el-table-column>                       
          <el-table-column   label="操作"  min-width="260" align="center">
                    <template slot-scope="scope">                         
                        <el-button @click="dialogVisible1 = true" size="mini"   type="warning" style="background: #5D72AE;color: #fff;border:none;border-radius:20px" plain >重置密码</el-button>
                        <el-button size="mini" @click="lookStudent(scope.row)"  style="background: #00DBBE;color: #fff;border:none;border-radius:20px"  >查看学生信息</el-button>
                        <el-button @click="edits(scope.row)" size="mini"  style="background: #AE5DA1;color: #fff;border:none;border-radius:20px" >修改</el-button>
                        <el-button @click="removeStudent(scope.row)" size="mini"  style="background: #EB6977;color: #fff;border:none;border-radius:20px"  >删除</el-button>                  
                    </template>
                </el-table-column>
            </el-table>
    <!-- 重置密码的表框 -->
            <div class="bjzy">
                <el-dialog  title="重置密码"  :visible.sync="dialogVisible1"   width="28%" >
                    <el-form ref="passwardForm"  label-width="80px">
                        <el-form-item label="输入密码">
                            <el-input style="width: 80%;" v-model="newPassward"   type="passward" placeholder="请输入新密码"></el-input>
                        </el-form-item>
                        <el-form-item label="确定密码">
                            <el-input style="width: 80%;" v-model="newpsw" placeholder="请确认新密码"></el-input>
                        </el-form-item>
                    </el-form>                
                    <span slot="footer" class="dialog-footer">
                         <el-button style="background: #C0C0C0;border: none;border-radius: 20px" @click="dialogVisible1 = false">取 消</el-button>
                         <el-button style="background: #FED467;border: none;border-radius: 20px" @click="dialogVisible1 = false">确 定</el-button>
                   </span>
                </el-dialog>
            </div>        
            <!-- 修改 -->
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
             <!-- 转移教师弹出框 -->
            <el-dialog title="转移班级" :visible.sync="moveShow" class="dialog" width="30">
            <el-form >
                <el-form-item label="选择班级">
                  <el-select v-model="teacherValue" placeholder="请选择班级" style="width:270px">
                    <el-option v-for="item in classList" :key="item.id" :label="item.nickname" :value="[item.id,item.nickname]"></el-option>
                   </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="moveShow = false">取 消</el-button>
                <el-button type="primary" @click="moveShow=false">确 定</el-button>
            </div>
            </el-dialog>
     
            <!-- 导出excel表格 -->
            <el-table  style="width: 100%" :data="tableData" border  stripe :header-cell-style="getRowClass "  class="table" v-show="hidden">
                <el-table-column type="index" width="60" ></el-table-column>
                <el-table-column prop="class_name"  label="班级"  align="center" color="#000"> </el-table-column>
                <el-table-column  prop="teacher_name" label="所属教师"   align="center"> </el-table-column>
                <el-table-column prop="name" label="账号"></el-table-column>
                <el-table-column prop="create_time" label="注册时间" min-width="160">
                    <template slot-scope="scope">{{ scope.row.create_time | time}}</template>
                </el-table-column>
                <el-table-column  prop="addtime" label="登录IP"  align="center"  min-width="100">
                     <template slot-scope="scope">{{ scope.row.addtime | time}}</template>
                </el-table-column>
            </el-table>
         <el-button style="border:none;margin-left:50px;" slot="append" type="info" @click="goback" >返回到我的班级</el-button>
        </div>
        <!-- 分页插件。 -->
        <div style="float:right;padding-top:20px">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-size="pagesize"
                    layout="total, prev, pager, next,jumper"
                    :total="total"></el-pagination>
        </div>
         <!-- 新增学生 -->
         <div class="xzbj">
            <el-dialog  title="新增班级"   :visible.sync="addDialoge"  width="30%"   >
                <el-form ref="form" :model="addStudentForm" label-width="80px">
                    <el-form-item label="学生姓名">
                        <el-input style="width: 80%;" v-model="addStudentForm.studentName" placeholder="请输入学生名称"></el-input>
                    </el-form-item>
                  
                    <el-form-item label="学生账号">
                        <el-input style="width: 80%;" v-model="addStudentForm.zhanghao" placeholder="请输入学生账号"></el-input>
                    </el-form-item>
                    <el-form-item label="老师姓名">
                        <el-select v-model="teacherValue" placeholder="请选择老师" style="width:270px">
                            <el-option v-for="item in teacherList" :key="item.id" :label="item.nickname" :value="[item.id,item.nickname]"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div>
                </div>
                <span slot="footer" class="dialog-footer">
                     <el-button style="background: #C0C0C0;border: none;border-radius: 20px" @click="addDialoge = false">取 消</el-button>
                     <el-button style="background: #FED467;border: none;border-radius: 20px" @click="addDialoge = false">确 定</el-button>
                </span>
            </el-dialog>
        </div>

    </div>
</template>

<script>
import qs from "qs";
import XLSX from "xlsx";
import FileSaver from "file-saver";
    export default {
        data() {
            return {
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
                total:0,
                // 转移学生的对话框
                moveShow:false,
                //勾选需要转移的人
                multipleSelection: [],
                   // 重置密码的对话框
                 dialogVisible1:false,
                // 信密码
                 newPassward:'',
                // 确认密码
                 newpsw:'',
                 // 添加学生的对话框
                addDialoge:false,
                // 修改学生信息的对话框
                editdialogVisible:false,
                  // 添加学生的表单信息
                  addStudentForm:{
                    studentName:'',
                    zhanghao:'',
                    teacherName:''
                 },
                //  新增学生时  老师的列表信息
                teacherList:[],
                teacherValue:'',
                //  修改学生信息的表单信息
                 editStudentForm:{
                    studentName:'',
                    zhanghao:'',
                    teacherName:''
                 },
                   // 搜索条件
                   queryInfo:[{id:1,name:'学生账号'},{id:2,name:'学生姓名'}],
                //  选择搜索内容
                queryName:'',
                 // 输入的搜索内容
                keys:'',
                // 班级信息
                classes:'',
                classList:[{id:1,name:'一班'},{id:2,name:'二班'},{id:3,name:'三班'}],
                //导出excel表格的表单需将其隐藏               
                hidden:false,               
                tableData:[],
                teacher_id:'',
                school_id:'',
                school_name:'',
                teacherName:'',
                type:'' ,
                currentpage:1,
                pagesize:10,
                transferaseId:'',                            
            }
        },
        methods: {
            // 返回到我的班级
            goback(){
                    this.$router.push('/classmanage')
            },
           handleSelectionChange(val){
                 this.multipleSelection = val;
                    console.log(val);
           },
            // 分页
            handleSizeChange(val) {
                this.pagesize = val;
                this.getList()
                // this.searchInfo()
            },
            handleCurrentChange(val) {
                this.currentpage = val;
                this.getList()
                // this.searchInfo()
            },
            getRowClass ({ rowIndex }) {
                if (rowIndex == 0) {
                    return 'background:#EFF1F6;border:none;color:black'
                } else {
                    return 'border:1px solid #EFF1F6'
                }
            },
      searchInfo(){
        this.currentpage=1
        this.getList()    
         },
        // 查看学生信息
         lookStudent(){
            this.$router.push("./mystudent")
        },
            // 删除学生
           async removeStudent(val){
                console.log(val);
                
                // // console.log(val);
                const confirm=await  this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                  
                }).catch((error) => {
                    console.log(error);
                });
                console.log(confirm);
                
                if(confirm!='confirm'){ 
                     this.$message({   type: 'info',  message: '已取消删除',offset:90 });
                     return
                }

                this.$message({  type: 'success',  message: '删除成功' ,offset:90 });
            },       
    async getList(){
    if(this.queryName==2){
      this.StudentInfo=this.keys
      this.StudentName=""
    }else if(this.queryName==1){
      this.StudentInfo=" "
      this.StudentName=this.keys
    }else{
      this.StudentInfo=" "
      this.StudentName=" "
    }
    const res = await this.$http.post("v1/Schoolclass/classuserlst", qs.stringify({
        class_id:this.transferaseId,
        currentpage:this.currentpage,
        nickname:this.StudentInfo,
        name:this.StudentName,
      }));
     console.log(res);
   if (res.status === 200 && res.data.code === "1") {
      this.tableData = res.data.info.info
      this.total=res.data.info.num
      this.pagesize=parseInt(res.data.info.page)
    }else {
      this.$message({ message: res.data.info, type: "error", duration: 3000});
    }
                //  const res = await this.$http.post("v1/Schoolclass/classuserlst", qs.stringify({
                //     class_id: this.transferaseId,
                //     currentpage:this.currentpage,
                // }));
                //      console.log(res);
                // if (res.status === 200 && res.data.code === "1") {
                //      this.tableData = res.data.info.info
                //      this.total=res.data.info.num
                //      this.pagesize=parseInt(res.data.info.page)
                // }else {
                //    this.$message({ message: res.data.info, type: "error", duration: 3000});
                // }
        
               
                // console.log(res)
            },
            // 转移班级
          async  move(val){
                console.log(val);
                const stuArr = [];
                for ( var i = 0 ; i < this.multipleSelection.length ; i++) {
                    stuArr.push(this.multipleSelection[i].id)        
                }
                    // console.log(this.stuArr);
                 if (this.multipleSelection.length == 0){
                    this.$message({ message: "请选择至少一名学生", type: "error", duration: 3000,offset:90});
                    return false;
                }
                 this.moveShow = true;
                // 先获取老师姓名
                //  this.id_list = stuArr;
                const res = await this.$http.post("admin/teacher/classlst", qs.stringify({ teacher_id: '',school_id: this.school_id}));
                console.log(res);
                    
                if (res.status === 200 && res.data.code === "1") {
                    const classList = [];
                    for(var j = 0; j < res.data.info.length ; j++) {
                        if (res.data.info[j].id != this.id) {
                            classList.push(res.data.info[j])
                        }
                    }
                 console.log(classList)
                this.classList = classList;
                console.log( this.classList); 
            }
          },
            
            // 导出表格
            exports(val){
                //   const res = await this.$http.post("admin/teacher/classstudentachievementexcl", qs.stringify({ class_id: chengji.id }));
                // if (res.status === 200 && res.data.code === "1") {
                //     this.excelTabal = res.data.info
                //     // if (this.excelTabal == []){ return false; }
                // } else {
                //     this.$message({ message: "暂无数据", type: "error", duration: 3000});
                // }
            let getCurrentPage = this.currentpage;
            this.pagesize = 99999;
            this.currentpage = 1;
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
        this.currentpage = getCurrentPage;
        return wbout;
      })
    },
    // 修改信息
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
async editDialoge(){

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
   this.editStudentForm.nickname=" "
   this.editStudentForm.name=""
   this.editStudentForm.password=""
   this.getList()
}else {
   this.$message({ message: res.data.info, type: "error", duration: 3000,offset:90 });
}
},

},
 mounted() {
    this.teacher_id = localStorage.getItem("id");
    this.school_id = localStorage.getItem("school_id");
    this.school_name = localStorage.getItem("school_name");
    console.log(this.nickname );           
    this.teacherName = localStorage.getItem("nickname");
    // this.getList();
    this.transferaseId = localStorage.getItem("transferaseId");
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

</style>
