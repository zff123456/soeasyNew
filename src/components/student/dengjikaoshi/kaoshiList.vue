<template>
    <!-- ab级英译汉 -->
    <div class="kaoshiList"    v-loading="isLoading"    element-loading-text="拼命加载中" >
        <div class="header">
            <span   @click="checked(1)"  :class="{'color':type==1}">真题</span>
            <span   @click="checked(2)"  :class="{'color':type==2}" >模拟</span>
        </div>
      <div class="table-box">
        <el-table style="width: 100%" border="" stripe :data="flatten(tableData.slice((currentPage -1) * pagesize, currentPage * pagesize))"  :row-style="{height:'48px'}"  :header-row-style="{height:'48px'}" :header-cell-style="getRowClass">
          <el-table-column prop="id" label="ID" width="65"  align="center"></el-table-column>
          <!-- prop="test_paper_name" -->
          <el-table-column prop="test_paper_name" label="试卷名称" min-width="120" align="center"></el-table-column>
          <el-table-column prop="manfen" label="总分"  align="center"> </el-table-column>
          <el-table-column prop="test_paper_type_name" label="试卷所属" align="center"></el-table-column>
          <el-table-column prop="cishu" label="练习次数" align="center"></el-table-column>
          <el-table-column prop="zuigaofeng" label="最高分" align="center"></el-table-column>
          <el-table-column prop="zuidifeng" label="最低分" align="center">
          </el-table-column>
          <el-table-column prop="pingjunfen" label="平均分" align="center" >
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template slot-scope="scope">
              <el-button size="mini" type="warning"    @click="startKaoshi(scope.row)" v-if="scope.row.huancun == 1">继续作答</el-button>
              <el-button size="mini" type="warning" plain   @click="startKaoshi(scope.row)" v-if="scope.row.huancun == 0">开始训练</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="button-box">
        <el-button style="border:none;margin-left:30px;float: left;"   slot="append" type="info" @click="goback" >返回到等级考试</el-button>
    
      <!-- 分页插件。 -->
      <div style="float:right;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          layout="total, prev, pager, next,jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
      <!-- 导出Excel -->
      <el-button type="primary" @click="exportExcel" icon="el-icon-upload2" class="excel"   style="float: right;"  >导出Excel</el-button>
    </div>

    <!-- 导出excel表格的数据 -->
    <div  v-show="hidden">
      <el-table style="width: 100%" border  class="table"  :data="flatten(tableData.slice((currentPage -1) * pagesize, currentPage * pagesize))">
        <el-table-column prop="id" label="ID" width="65"  align="center"></el-table-column>
        <el-table-column prop="test_paper_name" label="试卷名称" min-width="120" align="center"></el-table-column>
        <el-table-column prop="manfen" label="总分"  align="center"> </el-table-column>
        <el-table-column prop="test_paper_type_name" label="试卷所属" align="center"></el-table-column>
        <el-table-column prop="cishu" label="练习次数" align="center"></el-table-column>
        <el-table-column prop="zuigaofeng" label="最高分" align="center"></el-table-column>
        <el-table-column prop="zuidifeng" label="最低分" align="center"> </el-table-column>
        <el-table-column prop="pingjunfen" label="平均分" align="center" ></el-table-column>
      </el-table>
    </div>
    </div>
  </template>
  
  <script>
  import qs from "qs";
  import FileSaver from "file-saver";
  import XLSX from "xlsx";
  export default {
    data() {
      return {
        hidden:false,
        tableData: [],
        isLoading: false,
        pagesize: 15,
        currentPage: 1,
        id: '',
        identity: '',
        type: 1,
        test_paper_type_id: '',
        school_id: '',
        stu_id: '',
        isLoading:false,
      };
    },
    created() {
    //   this.type = localStorage.getItem("type");
      this.test_paper_type_id = localStorage.getItem("test_paper_type_id");
      this.stu_id = localStorage.getItem("id"); //学生id
      this.school_id = localStorage.getItem("school_id");
      this.identity = localStorage.getItem("identity");
      this.getThesisList();
    },
    components: {
  
    },
    computed: {},
    methods: {
        checked(val){
            this.type=val
            this.getThesisList()
        },
      handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
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
      getRowClass ({ rowIndex }) {
        if (rowIndex == 0) {
            return 'background:#EFF1F6;border:none;color:black'
       } else {
            return 'border:1px solid #EFF1F6'
        }
      },
      async getThesisList() {
        this.isLoading = true;
        console.log(this.type,this.test_paper_type_id,this.school_id,this.stu_id);
        const res = await this.$http.post("v1/Testpaper/usertestpaperlst",qs.stringify({             
          type:this.type, 
          test_paper_type_id:this.test_paper_type_id,
          school_id:this.school_id,
          u_id: this.stu_id
        }));
        console.log(res);
        
        if (res.status === 200 && res.data.code === "1") {
          this.tableData = res.data.info;
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.$message({message: res.data.info,type: "error",duration: 2000,offset:90});
        }
      },
      goback(){
        this.$router.go(-1);//返回上一层
      },
      startKaoshi(e){
        localStorage.setItem("kaoshiId", e.id);
        if (e.test_paper_type_id == 1){ this.$router.push({ name: "stufourKaoshi" }) };
        if (e.test_paper_type_id == 2){ this.$router.push({ name: "stusixKaoshi" }) };
        if (e.test_paper_type_id == 3){ this.$router.push({ name: "stuaKaoshi" }) };
        if (e.test_paper_type_id == 4){ this.$router.push({ name: "stubKaoshi" }) };
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
  /* @import url("../../assets/css/index.less"); */
  .kaoshiList {
    box-sizing: border-box;
    min-height: 100%;
    padding-top:80px;
    background-color: #f0f0f0;
    overflow: hidden;
    .header{
        line-height: 60px;
        background-color: #ffffff;
        text-align:center;
        span{
            margin:0 30px;
            font-size: 1.2em;
        }
        span:hover{
          cursor:pointer;
        }
        .color{
            color:#409EFF;

        }
    }
    .button-box {

      border-top:1px solid transparent;
      width: 100%;
      .el-button {
        padding: 4px 9px;
        font-size: 12px;
        margin-top: 20px;
      }
    .excel {
    padding: 4px 9px;
    font-size: 12px;
    float: right;
    margin-right: 20px;
    margin-top: 20px;
  }
    }
  
  }
  .cell .el-button {
    padding: 4px 9px;
    font-size: 12px;
  }
  
  </style>