<template>
    <div class="login_container classManage" style="padding-top:61px;">
        <div class="classManage"  style="margin-top:20px;">
            <div style="height:40px;line-height:40px;padding-left:60px;border-bottom:2px solid #f0f0f0;">
                <span  style="display:inline-block;padding:0 10px;border-bottom:2px solid #E6A23C;color:#E6A23C;margin:0 10px;cursor:pointer;">我的班级</span>
                <span  style="display:inline-block;padding:0 10px;margin:0 10px;color: #6C6C6C;cursor:pointer;"  @click="goto(2)" >学校班级</span>
                <span  style="display:inline-block;padding:0 10px;color:#6C6C6C;margin:0 10px;cursor:pointer;" @click="goto(3)">学生管理</span>
            </div>
            <div style="width: 100%;height:20px;background:#EFF1F5 "></div>
            <!-- 学生转移 -->
            <div class="bjzy">
                <el-dialog  title="学生转移" :visible.sync="dialogVisible1"    width="30%" >
                    <div>
                        <div>
                            <span>班级名称:</span>
                            <el-select v-model="classes" clearable placeholder="请选择" style="margin-left: 20px">
                                <el-option  v-for="item in classList"  :key="item.id"  :label="item.name"  :value="item.id"></el-option>
                            </el-select>      
                        </div>  
                        <div style="margin-top: 40px" >
                            <span >教师姓名:</span>
                            <el-select v-model="teachers" clearable placeholder="请选择" style="margin-left: 20px">
                                <el-option v-for="item in teacherList"   :key="item.id" :label="item.name"     :value="item.id">  </el-option>
                            </el-select>
                        </div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                        <el-button style="background: #C0C0C0;border: none;border-radius: 20px" @click="dialogVisible1 = false">取 消</el-button>
                        <el-button style="background: #FED467;border: none;border-radius: 20px" @click="dialogVisible1 = false">确 定</el-button>
                    </span>
                </el-dialog>
            </div>
            <!-- 新增班级 -->
            <div class="xzbj">
                <el-dialog  title="新增班级"   :visible.sync="dialogVisible2"  width="30%"   >
                    <el-form ref="form" :model="addClassForm" label-width="80px">                     
                        <el-form-item label="班级名称">
                            <el-input style="width: 80%;" v-model="addClassForm.className" placeholder="请输入班级名称"></el-input>
                        </el-form-item>
                        <el-form-item label="学生数量">
                            <el-input style="width: 80%;" v-model="addClassForm.people" placeholder="请输入数量"></el-input>
                        </el-form-item>
                        <el-form-item label="使用状态" >
                            <template>
                                <el-radio v-model="addClassForm.state" label="1">启用</el-radio>
                                <el-radio v-model="addClassForm.state" label="2">禁用</el-radio>
                            </template>                          
                        </el-form-item>
                    </el-form>
                    <div>
                    </div>
                    <span slot="footer" class="dialog-footer">
                                <el-button style="background: #C0C0C0;border: none;border-radius: 20px" @click="dialogVisible2 = false">取 消</el-button>
                                <el-button style="background: #FED467;border: none;border-radius: 20px" @click="addClass">确 定</el-button>
                            </span>
                </el-dialog>
            </div>
            <div style=" width:100%;margin-left:20px;height: 60px;margin-top:20px;" >
                <div  style="float:left;margin-right: 20px;">
                    <el-select v-model="queryName" placeholder="请选择搜索条件">
                        <el-option
                          v-for="item in queryInfo"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                </div>
                <div style="float:left;" >
                    <el-input placeholder="请输入搜索内容" v-model="keys"    style="border-radius: 20px;width: 200px;"  ></el-input>
                    <el-button slot="append"  style="background:#F56C6C;color:#fff;margin-left:20px;border-radius: 20px;border: none"   @click="searchInfo">搜索</el-button>                                     
                </div>
            </div>
            
            <div  style="width: 100%;display: block;height: 60px;">
                <el-button @click="to_print" slot="append"  style="background:#013A6F;color:#fff;margin-left:30px;border-radius: 20px;border: none">打印</el-button> 
                <el-button @click="allMove"  type="primary"  style="background: #60C5F9;color:#fff;border:none;border-radius: 20px;margin-left:30px;">转移班级</el-button> 
                <el-button @click="exportFour(myClassList,'作文')" type="primary"  style="color:#fff;margin-left:30px;border-radius: 20px;border: none;background: #28784C;color:#fff;">导出四级作文</el-button> 
                <el-button @click="exportFour(myClassList,'篇章翻译')"  type="primary" style="color:#fff;margin-left:30px;border-radius: 20px;border: none;background: #28784C;color:#fff;">导出四级翻译</el-button> 
                <el-button @click="exportFour(myClassList,'成绩')"  type="primary"  style="color:#fff;margin-left:30px;border-radius: 20px;border: none;background: #28784C;color:#fff;">导出成绩</el-button> 
                <el-button @click="dialogVisible2=true" type="primary"   style="color:#fff;margin-left:30px;border-radius: 20px;border: none;">新增班级</el-button> 
            </div>
            <!-- <div style="width: 100%;height:20px;background:#EFF1F5 "></div> -->
            <el-table  style="width: 100%;"   @selection-change="handleSelectionChange"  :data="myClassList" border  stripe :header-cell-style="getRowClass">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="class_name"  label="班级名称"  align="center" color="#000"> </el-table-column>
                <el-table-column  prop="teacher_name" label="教师姓名"   align="center"> </el-table-column>
                <el-table-column prop="student_num"  label="应有学生"  align="center"> </el-table-column>
                <el-table-column prop="use_num"  label="班级注册人数"   align="center"> </el-table-column>
                <el-table-column  prop="addtime" label="添加时间"  align="center"  min-width="100">
                    <template slot-scope="scope">{{ scope.row.addtime | time}}</template>
                </el-table-column>
                <el-table-column prop="state"  label="状态"  align="center" >
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.state==1" type="success">正常</el-tag>
                        <el-tag v-if="scope.row.state==2" type="warning" >禁用</el-tag>
                   </template>
                </el-table-column>
                <el-table-column   label="操作"  align="center" min-width="260" >
                    <template slot-scope="scope"   >
                        <div >
                            <el-button size="mini" @click="toclassstudent(scope.row)"  style="background: #00DBBE;color: #fff;border:none;border-radius:20px" plain >查看班级学生</el-button>
                            <el-button @click="edits(scope.row)" size="mini"  style="background: #AE5DA1;color: #fff;border:none;border-radius:20px" plain >修改</el-button>
                            <el-button @click="removeStudent(scope.row)" size="mini"  style="background: #EB6977;color: #fff;border:none;border-radius:20px" plain >删除</el-button>
                            <el-button size="mini"   type="warning" style="border:none;border-radius:20px"   @click="move(scope.row)">转移</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div class="xzbj">
                <el-dialog  title="修改班级信息"  :visible.sync="editFormVisible" width="30%"  >
                  <el-form ref="form" :model="editStudentForm" label-width="80px"   >
                    <el-form-item label="班级名称">
                        <el-input style="width: 80%;" v-model="editStudentForm.className" placeholder="请输入学生名称"></el-input>
                    </el-form-item>
                    <el-form-item label="学生数量">
                        <el-input style="width: 80%;" v-model="editStudentForm.number" placeholder="请输入数量"></el-input>
                    </el-form-item>
                    <el-form-item label="使用人数">
                      <el-input style="width: 80%;" v-model="editStudentForm.people" placeholder="请输入数量"></el-input>
                   </el-form-item>
                   <el-form-item label="使用状态">
                      <el-radio v-model="editStudentForm.radio" :label="1" >启用</el-radio>
                      <el-radio v-model="editStudentForm.radio" :label="2" >禁用</el-radio>                 
                 </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button style="background: #C0C0C0;border: none;border-radius: 20px" @click="editFormVisible = false">取 消</el-button>
                    <el-button style="background: #FED467;border: none;border-radius: 20px" @click="editDialoge">确 定</el-button>
                </span>
              </el-dialog>
         </div> 
            <!--删除信息的对话框-->
            <!-- <div class="xzbj1">
                <el-dialog  title="删除学生"  :visible.sync="dialogVisible4" width="30%"  >
                    <span>确定删除吗？删除后将不可恢复</span>
                    <span slot="footer" class="dialog-footer">
                  <el-button style="background: #C0C0C0;border: none;border-radius: 20px" @click="dialogVisible4 = false">取 消</el-button>
                  <el-button style="background: #FED467;border: none;border-radius: 20px" @click="removeStudent">确 定</el-button>
                </span>
                </el-dialog>
            </div> -->

            <!-- 分页插件。 -->
            <div style="float:right;padding-top:5px">
                <el-pagination  @size-change="handleSizeChange"  
                                @current-change="handleCurrentChange" :page-size="pagesize"
                                layout="total, prev, pager, next,jumper"
                                :total="total" >
                </el-pagination>
            </div>

            <!--  导出的四级作文  -->
            <div class="table-box" v-show="false">
                <el-table :data="myClassList" stripe border :row-style="{height:'48px'}"  :header-row-style="{height:'48px'}" class="zuowenTab">
                    <el-table-column type="index"></el-table-column>
                    <el-table-column prop="u_nickname" label="学生姓名"></el-table-column>
                    <el-table-column prop="u_name" label="学生学号"></el-table-column>
                    <el-table-column prop="test_paper_name" label="试卷名称"></el-table-column>
                    <el-table-column prop="addtime" label="添加时间">
                        <template slot-scope="scope">{{ scope.row.addtime | time}}</template>
                    </el-table-column>
                    <el-table-column prop="wenti" label="问题"></el-table-column>
                    <el-table-column prop="user_yn" label="学生答案"></el-table-column>
                    <!-- <el-table-column prop="pingjunfen" label="平均分"></el-table-column> -->
                </el-table>
            </div>
            <!--导出翻译篇章-->
            <div class="table-box" v-show="false">
                <el-table :data="myClassList" stripe border :row-style="{height:'48px'}"  :header-row-style="{height:'48px'}" class="fanyiTab">

                </el-table>
            </div>
            <!--导出成绩-->
            <div class="table-box" v-show="false">
                <el-table :data="myClassList" stripe border :row-style="{height:'48px'}"  :header-row-style="{height:'48px'}" class="table">
            
                </el-table>
            </div>
            <!--单个转移班级的对话框-->          
            <div class="bjzy">
                <el-dialog  title="转移班级":visible.sync="moveShow" width="30%">
                    <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="请选择老师">
                            <el-select v-model="value" placeholder="请选择老师">
                                <el-option v-for="item in teacherList"   :key="item.id" :label="item.name"  :value="item.id"> </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="请选择班级">
                            <el-select v-model="value" placeholder="请选择班级" >
                                <el-option v-for="item in classList"   :key="item.id" :label="item.name"  :value="item.id"> </el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <span slot="footer" class="dialog-footer">
                      <el-button @click="moveShow = false">取 消</el-button>
                      <el-button type="primary" @click="moveShow = false">确 定</el-button>
                    </span>
                </el-dialog >
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
                // 搜索条件
                queryInfo:[{id:1,name:'班级名称'},{id:2,name:'教师名称'}],
                // 班级信息
                classes:'',
                classList:[{id:1,name:'一班'},{id:2,name:'二班'},{id:3,name:'三班'}],
                // 老师信息
                teachers:'',
                teacherList:[{id:1,name:'章老师'},{id:2,name:'王老师'},{id:3,name:'李老师'}],
                // 添加班级的表单信息
                addClassForm:{
                    state:'',
                    className:'',
                    people:''
                 },
                moveShow:false,
                // 修改班级的信息
                form:{
                    name:'',
                    people:'',
                },
                formLabelWidth: '105px',
                labelPosition: 'left',
                // one_id:'',
                className:'',
                number:'',
                editFormVisible:false,
                activeId:0,
                show:true,
                flag:true,
                open_dakai:0,
                queryName:'',
                activeName:'first',
                keys:'',
                tableData:[],
                // teacher_id:'',
                // school_id:1,
                myClassList:[],
                type:'' ,
                flag:true,
                currentPage:1,
                pagesize:10,
                total:0,
                open_index:"",
                dialogVisible1: false,
                dialogVisible2: false,
                dialogVisible3: false,
               input:"",
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
                value: '',
                multipleSelection:[],
               school_name:'',
               school_id:'',
               teacherName:'',
               teacher_id:'',
               teacherInfo:'',
               classInfo:'',
              searchMessage:''
            }
        },
        methods: {
            // 新增班级
        async  addClass(){
                console.log( this.addClassForm.state,this.addClassForm.className,this.addClassForm.people);
                if(this.addClassForm.className==""){
                    this.$message({ message: "请输入班级名称", type: "error", duration: 2000,offset:90});
                }
                var reg = /^[+]{0,1}(\d+)$/; 
                // !reg.test("要验证的内容")
                if(!reg.test(this.addClassForm.people)){
                    this.$message({ message: "请输入正确的班级人数", type: "error", duration: 2000,offset:90});
                }
                if(this.addClassForm.state==""){
                    this.$message({ message: "请输入使用状态", type: "error", duration: 2000,offset:90});
                }
             const res = await this.$http.post("v1/Schoolclass/addclass", qs.stringify({
                 school_name:this.school_name,
                 school_id:this.school_id,
                 teacher_name:this.teacherName,
                 teacher_id:this.teacher_id,
                 class_name:this.addClassForm.className,
                 student_num:this.addClassForm.people,
                 state:this.addClassForm.state,
                }));
                console.log(res);
        if (res.status === 200 && res.data.code === "1") {
            this.$message({ message: res.data.info, type: "success", duration: 3000,offset:90});
            this.getList()           
            this.addClassForm.people=""
            this.addClassForm.className=""
            this.addClassForm.state=""
            this.dialogVisible2=false
         }else {
           this.$message({ message: res.data.info, type: "error", duration: 3000,offset:90});
         }        
            },
            // 搜索
      searchInfo(){
        this.currentPage=1
        this.getList()
        console.log(this.keys)
        console.log(this.queryName);
    },
            // 打印
            to_print(){
                this.$router.push('/print')
            },
            goto(val){
                console.log(val)
                if(val==2){
                    this.$router.push('/schoolClass')
                }else if(val==3){
                    this.$router.push('/stuMassage')
                }else {
                    return
                }


            },
            // 批量转移班级
            allMove(){
                console.log(this.multipleSelection)
                const stuArr = [];
                for ( var i = 0 ; i < this.multipleSelection.length ; i++) {
                    stuArr.push(this.multipleSelection[i].id)
                }
                console.log(stuArr);
                if (this.multipleSelection.length == 0){
                    this.$message({ message: "请选择至少一名学生", type: "error", duration: 3000,offset:90});
                    return false;
                }
                this.dialogVisible1 = true;
                // 获取老师列表获取班级列表

            },
            // 批量选择需要转移
            handleSelectionChange(val){
                this.multipleSelection = val;
                console.log(val);
            },
            //   修改信息
           edits(val){
            console.log(val)
            this.editFormVisible=true;
            this.editStudentForm.className=val.class_name;
            this.editStudentForm.number=val.student_num
            this.editStudentForm.teachName=val.teacher_name
            this.editStudentForm.radio=val.state,
            this.editStudentForm.people=val.use_num,
    //  this.editFormVisible=true;
     console.log(this.editStudentForm.radio)
     this.editStudentForm.className1=val.class_name;
     this.editStudentForm.number1=val.student_num
     this.editStudentForm.teachName1=val.teacher_name
     this.editStudentForm.radio1=val.state,
     this.editStudentForm.people1=val.use_num,
     this.one_id=val.id
            },
            // 修改
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
  if ( !reg.test(this.editStudentForm.people)) {
      this.$message({ message: "请输入正确的班级使用人数", type: "error", duration: 2000,offset:90});
      return false;
  }
  if ( this.editStudentForm.radio== "") {
      this.$message({ message: "请选择使用状态", type: "error", duration: 2000,offset:90});
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
    // this.getList()
  },
            //   删除信息
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
                localStorage.setItem("transferaseId", e.id); // 转移的班级id
                this.$router.push('/teachStu');
            },
            // 转移班级
            move(val){
                this.moveShow=true;
                console.log(val)

            },
          
          
            toclassstudent(e){
                console.log(e)
                localStorage.setItem("transferaseId", e.id); // 转移的班级id

                this.$router.push("./classstudent")
            },
            to_mystudent(){
                this.$router.push("./mystudent")
            },
            getRowClass ({ rowIndex }) {
                if (rowIndex == 0) {
                    return 'background:#EFF1F6;border:none;color:black'
                } else {
                    return 'border:1px solid #EFF1F6'
                }
            },
            // 学校班级的分页
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
          
            clicks(val){
                this.activeId=val
            },
            handleClick(){
                console.log(this.activeName)
                // if(this.activeName)=="secon")
            },
            
        async getList(){
                // console.log(111)111
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
        const res = await this.$http.post("v1/Schoolclass/myclassall", qs.stringify({
          teacher_id:this.teacher_id,
          currentpage:this.currentPage,
          teacher_name:this.teacherInfo,
          class_name:this.classInfo
        }));
        console.log(res)
        if (res.status === 200 && res.data.code === "1") {
          this.myClassList = res.data.info.info
          this.total=res.data.info.num
          this.pagesize=parseInt(res.data.info.page)
        }
        
             
            },
            // edits(val){
            //     console.log(val)

            // },
            delete(val){
                console.log(val)
            },
            open(aaa,ccc){
                this.show=false
                console.log(this.show)
                this.open_index = aaa
                this.flag=!this.flag
                this.open_dakai=1
            },
            flatten(arr) {
                var res = [];
                arr.map(item => {
                    if (Array.isArray(item)) {
                        res = res.concat(flatten(item));
                    } else {
                        res.push(item);
                    }
                });
                return res;
            },
            // 导出作文
            exportFour( chengji , name){
                console.log(chengji,name);
                if(name=="作文"){
                    let getCurrentPage = this.currentPage;
                    this.pagesize = 99999;
                    this.currentPage = 1;
                    this.$nextTick(function () {
                        let time = new Date();
                        let year = time.getFullYear();
                        let month = time.getMonth() + 1;
                        let day = time.getDate();
                        let name = year + "" + month + "" + day;
                        var wb = XLSX.utils.table_to_book(document.querySelector(".zuowenTab"));
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
                }
                if(name=="篇章翻译"){
                    let getCurrentPage = this.currentPage;
                    this.pagesize = 99999;
                    this.currentPage = 1;
                    this.$nextTick(function () {
                        let time = new Date();
                        let year = time.getFullYear();
                        let month = time.getMonth() + 1;
                        let day = time.getDate();
                        let name = year + "" + month + "" + day;
                        var wb = XLSX.utils.table_to_book(document.querySelector(".fanyiTab"));
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
                }
                if(name=="成绩"){

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


                }
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
            this.school_name = localStorage.getItem("school_name");
            console.log(this.nickname );           
            this.teacherName = localStorage.getItem("nickname");
            //  this.teacherName = localStorage.getItem("name");

            this.getList();
            // this.getMyClass()
            // console.log( this);
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
