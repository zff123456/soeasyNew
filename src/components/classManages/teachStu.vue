<template>
  <div class="right" v-loading="isLoading" element-loading-text="拼命加载中" style="padding-top:61px;">
    <div style="width: 100%;height:20px;background:#EFF1F5 "></div>
    <div style=" width:100%;margin-left:20px;height: 60px;margin-top: 20px;" >
      <div  style="float:left;margin-right: 20px;">
          <el-select v-model="queryName" placeholder="请选择查询条件">
              <el-option  v-for="item in queryInfo" :key="item.id"  :label="item.name"   :value="item.id"> </el-option>
          </el-select>
      </div> 
      <div style="float:left;" >
        <el-input placeholder="请输入搜索内容" v-model="keys"    style="border-radius: 20px;width: 200px;"  ></el-input>
        <el-button slot="append"  style="background:#F56C6C;color:#fff;margin-left:20px;border-radius: 20px;border: none"   @click="searchInfo">搜索</el-button>                                     
    </div>
  </div> 
      
    <div class="table-box">
      <!-- <el-card> -->
        <el-table stripe ref="multipleTable" border class="table"  :data="tableData"  :row-style="{height:'48px'}"  :header-row-style="{height:'48px'}">
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
        <el-table-column label="操作" align="center"   min-width="260">
          <template slot-scope="scope" min-width="260">
            <el-button  style="background: #5D72AE;color: #fff;border:none;border-radius:20px;padding:8px 15px;" plain @click="checket(scope.row)">重置密码</el-button>
            <el-button size="mini" @click="to_mystudent"  style="background: #00DBBE;color: #fff;border:none;border-radius:20px;padding:8px 15px;" plain >查看学生信息</el-button>           
          </template>
        </el-table-column>
      </el-table>
      <!-- </el-card> -->
      <!-- 返回按钮box -->     
      <div class="transfer-box">
           <el-button type="info" @click="goback" >返回学校班级</el-button>
      </div>
      <!-- 分页插件。 -->
      <div style="float:right;padding-top:15px">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          layout="total, prev, pager, next,jumper"
          :total="total"
        ></el-pagination>
      </div>
      <el-button type="primary" @click="exportExcel" icon="el-icon-upload2" class="excel" style="float: right;margin:15px;background: #28784C;color:#fff;border:none;">导出Excel</el-button>
    </div>
    <!-- 导出Excel -->
    <div class="table-box" v-show="false">
      <el-table :data="tableData" stripe border :row-style="{height:'48px'}"  :header-row-style="{height:'48px'}"  class="table">
  
      </el-table>
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
         // 搜索信息
      transferaseId:'',
      keys:'',
      queryInfo:[{id:1,name:'学生账号'},{id:2,name:'学生姓名'}],
      queryName:'',
      tableData: [ ],
      id: '',
      isLoading: false,
      pagesize: 5,
      currentpage: 1,
      type: '',
      total:0,
      StudentInfo:" ",
      StudentName:" ",
      // transferaseId:'',
    };
  },
  created() {
    this.id = localStorage.getItem("id");
    this.school_id = localStorage.getItem("school_id");
    this.transferaseId=localStorage.getItem("transferaseId");
    this.getList();
  },
  computed: {},
  methods: {
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentpage = val;
      this.getList()
   
    },
   
  //查看学生信息
  to_mystudent(){
          this.$router.push("./mystudent")
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
    },
    goback(){ // 返回班级列表
      this.$router.go(-1);//返回上一层
    },
    //根据学生姓名搜索。
    searchInfo(){ 
      this.currentPage=1
      this.getList()
 
  },
    // 重置密码
    async checket(e){
      // const res = await this.$http.post("admin/teacher/studentpwdupdata", qs.stringify({id: e.id}));
      // if (res.status === 200 && res.data.code === "1") {
      //   this.$message({message: res.data.info,type: "success",duration: 2000});
      //   this.getList();
      // } else {
      //   this.$message({message: res.data.info,type: "error",duration: 2000});
      // }
    },
    exportExcel() {
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
  }
};
</script>

<style lang="less" scoped>
/* // @import url("../../../assets/css/index.less"); */
.right {
  background-color: #fff;
  height: 100%;
  width: 100%;
  .table-box {
    padding: 10px;
    padding-top: 0;
    overflow: hidden;
  }
  .transfer-box {
    float: left;
    font-size: 18px;
    margin-top: 15px;
    margin-right: 20px;
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
.dialog {
  width: 400px;
  margin: 20vh auto 0;
}
</style>