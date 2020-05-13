<template>
    <!-- ab级英译汉 -->
    <!-- v-loading="isLoading" element-loading-text="拼命加载中" -->
    <div class="right">
      <div class="table-box">
        <!-- <el-card> -->
            <el-table style="width: 100%" border    stripe    :data="tableData"   :row-style="{height:'48px'}"  :header-row-style="{height:'48px'}">
                <el-table-column prop="id" label="ID" width="65"></el-table-column>
                <el-table-column prop="name" label="用户姓名"  align="center">  </el-table-column>
                <el-table-column prop="wenti" label="问题"    min-width="160" align="center"> </el-table-column>
                <el-table-column prop="addtime" label="提交时间" align="center"  min-width="100" >
                  <template slot-scope="scope">{{ scope.row.addtime | time}}</template>
                </el-table-column>
                <el-table-column prop="state" label="当前状态"  align="center">
                  <template slot-scope="scope">{{blockState(scope.row.state)}}</template>
                </el-table-column>
                <el-table-column label="操作" width="120" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="delit(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
        <!-- </el-card> -->
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
    </div>
  </template>
  
  <script>
  import qs from "qs";
  export default {
    data() {
      return {
        tableData:[{nickname:'张三',problem:'你好',addtime:'' ,state:2,contactinformation:'123456'
               },{nickname:'张三',problem:'你好111',addtime:'' ,state:0,contactinformation:'123456'
            },{nickname:'张三',problem:'你好',addtime:'' ,state:0,contactinformation:'123456'}],
        isLoading: false,
        pagesize: 15,
        currentPage: 1,
        id: '',
        identity: '',
        total:0,
      };
    },
    created() {
      this.id = localStorage.getItem("id");
      this.identity = localStorage.getItem("identity");
      this.getThesisList();
    },
    components: {
  
    },
    computed: {},
    methods: {
      handleSizeChange(val) {
        this.pagesize = val;
        this.getThesisList()
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getThesisList()
      },
      blockState(i){
        if(i == 2){return "已处理"} else {return "客服正在处理"}
      },
      async getThesisList() {
        this.isLoading = true;
        const res = await this.$http.post("v1/Schoolclass/problemFeedbacklst",
        qs.stringify({
          id: this.id , 
          type: this.identity,
          currentpage:this.currentPage
        }));
        console.log(res);
        
        if (res.status === 200 && res.data.code === "1") {
          this.tableData = res.data.info.info;
          this.pagesize=parseInt(res.data.info.page)
          this.total=res.data.info.num
          this.isLoading = false;
        }
      },
      async delit(e) {
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
       console.log(e);        
    const res = await this.$http.post("v1/Schoolclass/problemFeedbackdel", qs.stringify({id: e.id}));
         console.log(res);
        if (res.status === 200 && res.data.code === "1") {
          this.$message({message: res.data.info,type: "success",duration: 2000,offset:90});
          this.getThesisList();
        } else {
          this.$message({message: res.data.info,type: "error",duration: 2000,offset:90});
        }
      },
    }
  };
  </script>
  
  <style lang="less" scoped>
  .right {
    padding-top: 80px;
    min-height: 100%;
   padding-bottom:50px;
    background:url(../../assets/image/creatshijuan/bg.png) no-repeat   ;
    width:100%;
    height:100%;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    overflow:auto;
    /* background-color: #f0f0f0; */
    .centers{
      width: 96%;
      margin:0 auto;
    }
    .table-box {
        /* width: 92%;
        margin-left:4%;     */
        padding:10px;
    }
  }
  .cell .el-button {
    padding: 4px 9px;
    font-size: 12px;
  }
  </style>
  