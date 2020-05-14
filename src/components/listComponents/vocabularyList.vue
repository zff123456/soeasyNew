<template>
  <!-- ab级词汇匹配 -->
  <div class="right" v-loading="isLoading" element-loading-text="拼命加载中">
    <div class="table-box">
      <el-table style="width: 100%" border="" stripe :data="flatten(tableData.slice((currentPage -1) * pagesize, currentPage * pagesize))" :row-style="{height:'48px'}"  :header-row-style="{height:'48px'}">
        <el-table-column prop="id" label="Id" width="65"></el-table-column>
        <el-table-column prop="test_paper_name" label="试卷名称">
          <template slot-scope="scope">{{testPaperName(scope.row.test_paper_name)}}</template>
        </el-table-column>
        <el-table-column prop="test_paper_type_name" label="所属题库">
          <template slot-scope="scope">{{tesPaperTypeName(scope.row.test_paper_type_name)}}</template>
        </el-table-column>
        <el-table-column  label="操作">
          <template slot-scope="scope">
            <el-button type="primary" @click="look(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页插件。 -->
    <div style="float:right;padding-top:5px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="pagesize"
        layout="total, prev, pager, next,jumper"
        :total="tableData.length"
      ></el-pagination>
    </div>
<!-- 查看详情的对话框 -->
    <el-dialog  title="问题" :visible.sync="dialogVisible"  width="50%">
        <div  style="padding:10px;box-sizing:border-box" v-html="lookData.jiexi"></div>
        <div  style="padding:10px;box-sizing:border-box;margin:10px 0" v-html="lookData.beixuanxiang"></div>
  </el-dialog>
  </div>
</template>

<script>
import qs from "qs";
export default {
  name: "vocabularyList",
  props: ["paperId", "paperName"],
  data() {
    return {
      dialogVisible:false,
      tableData: [],
      isLoading: false,
      pagesize: 15,
      currentPage: 1,
      lookData:{
        beixuanxiang:'',
        jiexi:''
      }
    };
  },
  created() {
    this.getThesisList();
  },
  components: {

  },
  computed: {},
  methods: {
    look(val){
      this.dialogVisible=true
      this.lookData.jiexi=val.jiexi
      this.lookData.beixuanxiang=val.beixuanxiang
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
    async getThesisList() {
      this.isLoading = true;
      const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/paper/cihuipipeilst",qs.stringify({cet: this.paperId }));
      if (res.status === 200 && res.data.code === "1") {
        this.tableData = res.data.info;
        this.isLoading = false;
        console.log(res);
      }
    },
    testPaperName(i){
      if(i == '' || i == null){return "不属于任何试卷"} else {return i};
    },
    tesPaperTypeName(i){
      if(i == '' || i == null){return "不属于任何题库"} else {return i};
    },
    revision(i,e){ // 编辑

    },
    delit(e){ // 删除

    }
  }
};
</script>

<style lang="less" scoped>
// @import url("../../assets/css/index.less");
.right {
  box-sizing: border-box;
  padding: 0 10px 10px 10px;
}
.cell .el-button {
  padding: 4px 9px;
  font-size: 12px;
}
</style>
