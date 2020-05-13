<template>
  <div class="login_container" style="padding-top:61px;">
     <div class="classManage"  style="margin-top:20px;">
        <div style="height:40px;line-height:40px;padding-left:60px;border-bottom:2px solid #f0f0f0;">
               <span  style="display:inline-block;padding:0 10px;color: #6C6C6C;margin:0 10px;cursor:pointer;" @click="goto(1)" >我的班级</span>
               <span  style="display:inline-block;padding:0 10px;margin:0 10px;border-bottom:2px solid #E6A23C;color:#E6A23C;cursor:pointer;"  >学校班级</span>
               <span  style="display:inline-block;padding:0 10px;color: #6C6C6C;margin:0 10px;cursor:pointer;" @click="goto(3)">学生管理</span>
        </div>
        <div style="width: 100%;height:20px;background:#EFF1F5 "></div>
         <div  class="input"  style="height: 60px;margin-top:20px;">
           <div style="float:left;margin:0px 20px 10px 20px;">
                <el-select v-model="queryName" placeholder="请选择搜索条件"  >
                     <el-option  v-for="item in queryInfo"  :key="item.id" :label="item.name" :value="item.id">  </el-option>
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
            <!--表单信息  -->
        <el-table  style="width: 100%;" :data="tableData"    border  stripe :header-cell-style="getRowClass "   >
            <el-table-column prop="id"  label="ID"   width="60" align="center" > </el-table-column>
            <el-table-column prop="class_name"  label="班级名称"  align="center" color="#000"> </el-table-column>
            <el-table-column  prop="teacher_name" label="教师姓名"   align="center"> </el-table-column>
            <el-table-column prop="student_num"  label="应有学生"  align="center"> </el-table-column>
            <el-table-column prop="use_num"  label="班级注册人数"   align="center"> </el-table-column>
            <el-table-column   label="添加时间"  align="center" min-width="100"> 
                <template slot-scope="scope">{{ scope.row.addtime | time}}</template>
            </el-table-column>
            <el-table-column prop="state"  label="状态"  align="center" >
                <template slot-scope="scope">
                     <el-tag v-if="scope.row.state==1" type="success">正常</el-tag>
                     <el-tag v-if="scope.row.state==2" type="warning" >禁用</el-tag>
                </template>
            </el-table-column>
            <el-table-column   label="操作"  align="center"  min-width="260"> 
               <template slot-scope="scope">
                    <el-button size="mini"   type="warning" style="background: #AE5DA1;color: #fff;border:none;border-radius:20px" plain  @click="edits(scope.row)">修改</el-button>
                    <el-button size="mini"  type="warning" style="background: #EB6977;color: #fff;border:none;border-radius:20px" plain  @click="deletes(scope.row)">删除</el-button>               
                    <el-button size="mini"   type="warning" style="background: #00DBBE;color: #fff;border:none;border-radius:20px"   @click="teachStudents(scope.row)">查看班级学生</el-button>
                </template>
             </el-table-column>
         </el-table>
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
          
        <!--修改信息的对话框-->
            <div class="xzbj">
                <el-dialog  title="修改班级信息"  :visible.sync="editFormVisible" width="30%"  >
                  <el-form ref="form" :model="editStudentForm" label-width="80px"   >
                    <el-form-item label="班级名称">
                        <el-input style="width: 80%;" v-model="editStudentForm.className" placeholder="请输入学生名称"></el-input>
                    </el-form-item>
                  
                    <!-- <el-form-item label="教师姓名">
                        <el-input style="width: 80%;" v-model="editStudentForm.teachName" placeholder="请输入学生账号"></el-input>
                    </el-form-item> -->
                    <el-form-item label="学生数量">
                        <el-input style="width: 80%;" v-model="editStudentForm.number" placeholder="请输入数量"></el-input>
                    </el-form-item>
                    <el-form-item label="使用人数">
                      <el-input style="width: 80%;" v-model="editStudentForm.people" placeholder="请输入数量"></el-input>
                   </el-form-item>
                   <el-form-item label="使用状态">
                    <!-- <template> -->
                      <el-radio v-model="editStudentForm.radio" :label="1" >启用</el-radio>
                      <el-radio v-model="editStudentForm.radio" :label="2" >禁用</el-radio>
                    <!-- </template> -->
                    <!-- <el-input style="width: 80%;" v-model="editStudentForm.people" placeholder="请输入数量"></el-input> -->
                 </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button style="background: #C0C0C0;border: none;border-radius: 20px" @click="editFormVisible = false">取 消</el-button>
                    <el-button style="background: #FED467;border: none;border-radius: 20px" @click="editDialoge">确 定</el-button>
                </span>
              </el-dialog>
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
      // 搜索信息
      teacherInfo:'',
      classInfo:'',
      searchMessage:'',
      keys:'',
      queryInfo:[{id:1,name:'班级名称'},{id:2,name:'教师名称'}],
      queryName:'',
         // 修改班级的信息 
      editStudentForm:{
        className:'',
        teachName:'',
        number:'',
        people:'',
        radio:"",
        className1:'',
        teachName1:'',
        number1:'',
        people1:'',
        radio1:"",
    },  
    one_id:'',
    editFormVisible:false,    
    tableData:[],
      teacher_id:'',
      school_id:'',
      myClassList:[],
      type:'' ,
      currentPage:1,
      pagesize:16, 
      total:0,    
    }
  },
  methods: {
      goto(val){
          console.log(val)
     if(val==1){
        this.$router.push('/classmanage')
      }else if(val==3){
         this.$router.push('/stuMassage')   
      }else{
             return
      }        
    }, 
    // 表格表头的颜色
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
      // this.searchInfo()
    },  
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList()
      // this.searchInfo()
    },  
    //   点击搜索按钮查询信息
    searchInfo(){
      this.currentPage=1
      this.getList()    
    },
    // 修改信息
    edits(val){
     console.log(val)
     this.editFormVisible=true;
     this.editStudentForm.className=val.class_name;
     this.editStudentForm.number=val.student_num
     this.editStudentForm.teachName=val.teacher_name
     this.editStudentForm.radio=val.state,
     this.editStudentForm.people=val.use_num,
     this.editStudentForm.className1=val.class_name;
     this.editStudentForm.number1=val.student_num
     this.editStudentForm.teachName1=val.teacher_name
     this.editStudentForm.radio1=val.state,
     this.editStudentForm.people1=val.use_num,
     this.one_id=val.id
     console.log(val)
  },
 async  editDialoge(){
   console.log(this.editStudentForm.className)
   console.log(this.editStudentForm.className1)
   if(this.editStudentForm.className == this.editStudentForm.className1  && this.editStudentForm.number == this.editStudentForm.number1&& this.editStudentForm.radio == this.editStudentForm.radio1  &&this.editStudentForm.people == this.editStudentForm.people1){
    this.$message({ message: "信息需要修改",offset:90});
    return
   } 
    if ( this.editStudentForm.className == "") {
      this.$message({ message: "班级名称不能为空", type: "error", duration: 2000,offset:90});
      return false;
   }
   var reg = /^[+]{0,1}(\d+)$/; 
  if ( !reg.test(this.editStudentForm.number)) {
      this.$message({ message: "请输入正确的班级人数", type: "error", duration: 2000,offset:90});
      return false;
  }
  if (!reg.test(this.editStudentForm.people)) {
      this.$message({ message: "请输入正确的班级使用人数", type: "error", duration: 2000,offset:90});
      return false;
  }
  if ( this.editStudentForm.radio== "") {
      this.$message({ message: "选择使用状态", type: "error", duration: 2000,offset:90});
      return false;
  }
 const res = await this.$http.post("v1/Schoolclass/classupdata", qs.stringify({ 
    school_id:this.school_id,
    class_id: this.one_id,
    class_name:this.editStudentForm.className,
    student_num:this.editStudentForm.number,
    use_num:this.editStudentForm.people,
    state:this.editStudentForm.radio
  }));
  console.log(res);
  if (res.status === 200 && res.data.code === "1") {
      this.$message({ message: res.data.info, type: "success", duration: 3000,offset:90 });
      this.editFormVisible=false;
      this.editStudentForm.className=" "
      this.editStudentForm.number=""
      this.editStudentForm.radio=""
      this.editStudentForm.people= ""
      this.getList()
  }else {
      this.$message({ message: res.data.info, type: "error", duration: 3000,offset:90 });
  }
  },
    //   删除信息
     async deletes(val){   
        // console.log(val);
       const confirm=await  this.$confirm('此操作将永久删除该班级, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'     
      }).catch((error) => {
       console.log(error);       
      });
      if(confirm!="confirm"){
        this.$message({ type: 'info',  message: '已取消删除',offset:90 });
          return
      }
       this.$message({ type: 'success', message: '删除成功' ,offset:90});
    //   const res = await this.$http.post("admin/teacher/delclass", qs.stringify({ id: val.id}));
    //   if (res.status === 200 && res.data.code === "1") {
    //     this.$message({ message: res.data.info, type: "success", duration: 3000});
    //     this.getList()
    //   }else {
    //     this.$message({ message: res.data.info, type: "error", duration: 3000});
    //   }
      console.log(222);

      },
      // 老师查看班级学生
      teachStudents(e){
        console.log(e);
        
        localStorage.setItem("transferaseId", e.id); // 转移的班级id
        this.$router.push('/teachStu');
      },
       // 打印
       to_print(){
          this.$router.push('/print')
      },
     async getList(){
      if(this.queryName==2){
         this.teacherInfo=this.keys
         this.classInfo=" "
        }else if(this.queryName==1){
            this.classInfo=this.keys
            this.teacherInfo=" "
        }else {
           this.teacherInfo=" "
           this.classInfo=" "
        }
        const res = await this.$http.post("v1/Schoolclass/schoolclassall", qs.stringify({
          school_id:this.school_id,
          class_name:this.classInfo,
          currentpage:this.currentPage,
          teacher_name:this.teacherInfo
          // school_id:this.school_id,currentpage:this.currentPage
        }));
        console.log(res)
        if (res.status === 200 && res.data.code === "1") {
          this.tableData = res.data.info.info
          this.total=res.data.info.num
          this.pagesize=parseInt(res.data.info.page)
        }
    },    
    // 导出成绩excel
     exportFour( chengji ){
         console.log(chengji);
  //  111
  
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

    //   const res = await this.$http.post("admin/teacher/zuowenfanyidaochu", qs.stringify({ cet: 1, type_name: name, class_id: chengji.id  }));
    //   console.log(res);
      
    //   if (res.status === 200 && res.data.code === "1") {
    //     this.excelZuowen = res.data.info
    //   }
      
    },
  },
   mounted() {
    this.teacher_id = localStorage.getItem("id");
    this.school_id = localStorage.getItem("school_id");
    this.getList();
    // this.getMyClass()
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
