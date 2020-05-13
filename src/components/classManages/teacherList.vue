<template>
    <div class="right" v-loading="isLoading" element-loading-text="拼命加载中">
      <div class="centers">
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
          <div class="table-box">
            <el-table stripe   border :data="tableData" :row-style="{height:'48px'}" :header-cell-style="getRowClass"     :header-row-style="{height:'48px'}">
              <el-table-column prop="id" label="ID" width="70"    align="center"></el-table-column>
              <el-table-column prop="nickname" label="教师姓名" width="130"  align="center"></el-table-column>
              <el-table-column prop="name" label="账号"    align="center"></el-table-column>
              <el-table-column prop="create_time" label="注册时间" min-width="160"  align="center">
                <template slot-scope="scope">{{ scope.row.create_time | time}}</template>
              </el-table-column>
              <el-table-column prop="login_time" label="登录时间" min-width="160"  align="center">
                   <template slot-scope="scope">{{ scope.row.login_time | time}}</template>
              </el-table-column>
              <el-table-column  prop="is_user_data" label="资料是否完善"  align="center"   >
                <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.is_user_data==1">已完善</el-tag>
                  <el-tag type="warning" v-if="scope.row.is_user_data==0">未完善</el-tag>
                </template>
            </el-table-column> 
              <el-table-column label="操作" align="center"  min-width="260">
                <template slot-scope="scope">
                  <el-button size="mini"   @click="checket(scope.row)"   style="background: #00DBBE;color: #fff;border:none;border-radius:20px" plain >重置密码</el-button>
                  <el-button  @click="bianji(scope.row)"  size="mini"  style="background: #AE5DA1;color: #fff;border:none;border-radius:20px" plain >修改</el-button>
                  <el-button    @click="open(scope.row)"  size="mini"  style="background: #EB6977;color: #fff;border:none;border-radius:20px" plain >删除</el-button>
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
          </div>
          <!-- 修改信息表单表单 -->
          <el-dialog title="修改信息" :visible.sync="dialogFormVisible" width="500px" custom-class="cuotidialog" ref="dialog" style="margin-left:-300px;margin-top:10vh">
            <el-form :model="form" label-width="40px">
              <el-form-item label="姓名" >
                <el-input v-model="form.name" label-width="400px"></el-input>
              </el-form-item>
              <el-form-item label="账号" >
                <el-input v-model="form.zhanghao" label-width="400px"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="submitCheck">确 定</el-button>
            </div>
          </el-dialog>
       <!-- </el-card> -->
      </div>
  
    </div>
  </template>
  
  <script>
  import qs from "qs";
  export default {
    data() {
      return {
        // 搜索条件
        queryInfo:[{id:1,name:'教师姓名'},{id:2,name:'教师账号'}],
        queryName:'',
        keys:'',
        disabled:false,
        tableData: [],
        isLoading: false,
        type: '',
        id: '',
        school_id: '',
        teacherName:'',
        teacherNickname:'',
        isLoading: false,
        pagesize:5,
        currentPage: 1,
        total:0,
        dialogFormVisible: false,
        form: {
        name: '',
        zhanghao: '',
        id: ''
        },
        
      };
    },
    created() {
      this.id = localStorage.getItem("id");
      this.school_id = localStorage.getItem("school_id");
      this.teacherName=localStorage.getItem("name");
      this.teacherNickname=localStorage.getItem("nickname");
      console.log(this.id,this.school_id)
      this.getList();
    },
    computed: {},
    methods: {
      getRowClass ({ rowIndex }) {
        if (rowIndex == 0) {
            return 'background:#EFF1F6;border:none;color:black'
        } else {
                    return 'border:1px solid #EFF1F6'
        }
      },
      handleSizeChange(val) {
        this.pagesize = val;
        this.getList()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getList()
      },
     
      async getList(){
        if(this.queryName==1){
          this.teacherNickname=this.keys
          this.teacherName=" "
        }else  if(this.queryName==2){
          this.teacherNickname=" "
          this.teacherName=this.keys
        }else{
          this.teacherNickname=" "
          this.teacherName=""
        }
        const res = await this.$http.post("v1/Schoolclass/teacherlst", qs.stringify({
          school_id:this.school_id, 
          nickname:this.teacherNickname,
          currentpage:this.currentPage,
          name:this.teacherName
        }));
          console.log(res);         
        if (res.status === 200 && res.data.code === "1") {
          this.tableData = res.data.info.info
          this.total=res.data.info.num
          this.pagesize=parseInt(res.data.info.page)
        }else{
          this.$message({message: res.data.info,type: "error",duration: 2000,offset:90});
        }
      },
      blockState(e){
        // if(e.status == 1) { return "正常"} else { return "等待审核" }
      },
      async checket(e){ // 重置密码
          console.log(this.id,this.school_id)
        if(this.school_id==67&&this.id!=828){
          // this.disabled=true
          console.log(111)
           this.$message({message: '请尽快联系袁利老师',type: "error",duration: 4000,offset:90});
           return
        }else{
  
        const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/teacher/teacherpwdupdata", qs.stringify({id: e.id}));
        if (res.status === 200 && res.data.code === "1") {
          this.$message({message: res.data.info,type: "success",duration: 2000,offset:90});
          this.getList();
        } else {
          this.$message({message: res.data.info,type: "error",duration: 2000,offset:90});
        }
        }
      },
     async  open(e) { // 删除学生提示
        console.log(this.id,this.school_id)
        if(this.school_id==67&&this.id!=828){
          // this.disabled=true
          console.log(111)
           this.$message({message: '请尽快联系袁利老师',type: "error",duration: 4000,offset:90});
           return
        }else{
      const confirm= await  this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch((err) => {
          console.log(err);          
              //  this.$message({  type: 'info',  message: '已取消删除' ,offset:90});
        }) }

        console.log(confirm);
        
      },
       delit(e){ 
        // 删除学生。
        // console.log(111)
    
        //   const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/teacher/tecacherdel", qs.stringify({id: e.id}));
        // if (res.status === 200 && res.data.code === "1") {
        //   this.$message({message: res.data.info,type: "success",duration: 4000,offset:90});
        //   this.getList();
        // } else {
        //   this.$message({message: res.data.info,type: "error",duration: 4000,offset:90});
        // }
  
        
      
      },
      async bianji(e){
         console.log(111)
         console.log(this.id,this.school_id)
        if(this.school_id==67&&this.id!=828){
          // this.disabled=true
          console.log(111)
           this.$message({message: '请联系袁利老师',type: "error",duration: 4000,offset:90});
           return
        }else{
          this.dialogFormVisible = true;
          this.form.name = e.nickname;
          this.form.zhanghao = e.name;
          this.form.id = e.id;
        }
        // return
       
      },
       searchInfo(){ 
         // 搜索姓名
         this.currentPage=1
         this.getList()
        // if (this.type == ''){
        //   this.getList();
        //   return false;
        // };
        // const res = await this.$http.post("admin/teacher/teacherlstnew", qs.stringify({nickname: this.type, school_id:this.school_id}));
        // if (res.status === 200 && res.data.code === "1") {
        //   this.tableData = res.data.info;
        // } else {
        //   this.$message({ message: "未搜索到此学生信息", type: "error", duration: 3000,offset:90});
        // }
      },
      async submitCheck(){ // 提交
        this.dialogFormVisible = false;
        if (this.form.name.trim() == '' ){
          this.$message({message: "姓名不能为空",type: "error",duration: 4000,offset:90});
          return false;
        };
        if (this.form.zhanghao.trim() == ''){
          this.$message({message: "账号不能为空",type: "error",duration: 4000,offset:90});
          return false;
        };
        const res = await this.$http.post("admin/teacher/teacherupdata", qs.stringify({id: this.form.id,nickname: this.form.name, name: this.form.zhanghao}));
        if (res.status === 200 && res.data.code === "1") {
          this.$message({message: res.data.info,type: "success",duration: 4000,offset:90});
          this.getList();
        } else {
          this.$message({message: res.data.info,type: "error",duration: 4000,offset:90});
        }
      }
    }
  };
  </script>
  
  <style lang="less" scoped>
  .right {
    background-color: #f0f0f0;
    height: 100%;
    width: 100%;
    padding-top:80px;
    /* .centers{
        width: 92%;
        margin-left:4%;
    } */
    /* // overflow: hidden; */
    .search-box {
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      .title {
        /* color: @theme; */
        float: left;
        font-size: 14px;
        margin-right: 20px;
      }
    }
    .table-box {
      padding: 10px;
      padding-top: 10px;
      background-color: #fff;
    }
  }
  .cell .el-button {
    padding: 4px 9px;
    font-size: 12px;
  }
  input::-webkit-input-placeholder{
      color:#000;
  }
  input::-moz-placeholder{   /* Mozilla Firefox 19+ */
      color:#000;
  }
  input:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
      color:#000;
  }
  input:-ms-input-placeholder{  /* Internet Explorer 10-11 */ 
      color:#000;
  }
  </style>