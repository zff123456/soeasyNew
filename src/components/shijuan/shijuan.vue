<!-- 考试统计。 -->
<template>
  <!-- v-loading="isLoading" element-loading-text="拼命加载中" -->
  <div class="right " style="padding-top:61px;"    v-loading="isLoading"    element-loading-text="拼命加载中" >
    <div class="centers">
      <div class="header" style="background-color: #fff;">
       <div style="margin-left:20px"   class="header-item" >
        <span      @click="checked(1)" :class="{'color':type==1}">真题</span>
        <span    @click="checked(2)"   :class="{'color':type==2}">模拟</span>
       </div>
    <!-- <div class="search-box" >
      <el-select v-model="getPaperId" clearable placeholder="请选择题库"  clearable style="width:150px;margin-top:10px;">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>   
    </div> -->
    <!-- <div class="search-box">
       <el-select v-model="getPaperType" clearable placeholder="请选择试卷"  style="width:150px;margin-top:10px;">
        <el-option
          v-for="item in opts"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div> -->

    <div class="block">
      <!-- <el-date-picker
        v-model="value2"
        type="datetimerange"
        value-format="timestamp"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="选择开始日期"
        end-placeholder="选择结束日期"
        align="right"
        style="margin:10px;width:340px;">
      </el-date-picker> -->
      <!-- <el-button type="primary" style="margin: 10px;"  icon="el-icon-search" @click="search">搜索</el-button> -->
        <!-- <div class="add" style="float:right;margin-right:50px; margin-top: 10px;">
            <el-button  type="warning"   @click="add" class="add-btn" style="border:none">新增试卷</el-button>
        </div> -->
    </div>
  </div>
    
    <div class="table-box" >
      <el-table :data="flatten(tableData.slice((currentPage -1) * pagesize, currentPage * pagesize))" :header-cell-style="getRowClass "    border script >
        <el-table-column prop="id" label=" ID" width="75"  align="center"></el-table-column>
          <el-table-column prop="test_paper_name" label="试卷名称" min-width="160"  align="center"></el-table-column>
        <el-table-column prop="test_paper_name" label="所属题库"   min-width="70"  align="center">
             <template slot-scope="scope">{{ grade(scope.row.test_paper_type_id) }}</template>
        </el-table-column>
        <el-table-column  label="所属"  align="center"> 
        
          <template slot-scope="scope">  {{subordinate(scope.row.subordinate)}}</template>
        </el-table-column>
       <el-table-column label="开始时间"  align="center"  min-width="100">
          <template slot-scope="scope">{{ scope.row.start_time | time}}</template>
        </el-table-column>
        <el-table-column label="结束时间"  align="center"   min-width="100">
          <template slot-scope="scope">{{ scope.row.end_time | time}}</template>
        </el-table-column>
        <el-table-column label="当前状态" width="80">
          <template slot-scope="scope">{{lookState(scope.row.state)}}</template>
        </el-table-column>
        <el-table-column prop="cishu" label="考试次数"  align="center"></el-table-column>
        <el-table-column prop="zuigaofeng" label="最高分"  align="center"></el-table-column>
        <el-table-column prop="zuidifeng" label="最低分"  align="center"></el-table-column>
        <el-table-column prop="pingjunfen" label="平均分"  align="center"></el-table-column> 
        <el-table-column label="操作" align="center" min-width="160" >
          <template slot-scope="scope">
            <el-button size="mini" type="info"  @click="look(scope.row)" style="border-radius:10px" :disabled="scope.row.state==0"   class="look">预览</el-button>
            <el-button size="mini" type="danger"  @click="deletes(scope.row)" style="border-radius:10px;background:#FF4527" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
       <!-- 分页插件。 -->
       <el-button style="border:none;margin-left:30px;float: left;margin-top:10px;"   slot="append" type="info" @click="goback" >返回到试卷管理页面</el-button>
      <div style="float:right;padding-top:5px;height:40px;margin-right:15px">
        
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          layout="total, prev, pager, next,jumper"
          :total="tableData.length"
        ></el-pagination>
      </div>
    </div>
  </div>
<!-- 导出excle表格 -->
  <el-table :data="tableData"   v-show="hidden"   class="table"  border script >
    <el-table-column prop="id"   label=" ID"   width="75"  align="center"></el-table-column>
      <el-table-column prop="test_paper_name" label="试卷名称" min-width="160"  align="center"></el-table-column>
    <el-table-column prop="test_paper_name" label="所属题库"   min-width="70"  align="center">
         <template slot-scope="scope">{{ grade(scope.row.test_paper_type_id) }}</template>
    </el-table-column>
    <el-table-column  label="所属"  align="center">  
      <template slot-scope="scope">  {{subordinate(scope.row.subordinate)}}</template>
    </el-table-column>
   <el-table-column label="开始时间"  align="center"  min-width="100">
      <template slot-scope="scope">{{ scope.row.start_time | time}}</template>
    </el-table-column>
    <el-table-column label="结束时间"  align="center"   min-width="100">
      <template slot-scope="scope">{{ scope.row.end_time | time}}</template>
    </el-table-column>
    <el-table-column label="当前状态" width="80">
      <template slot-scope="scope">{{lookState(scope.row.state)}}</template>
    </el-table-column>
    <el-table-column prop="cishu" label="考试次数"  align="center"></el-table-column>
    <el-table-column prop="zuigaofeng" label="最高分"  align="center"></el-table-column>
    <el-table-column prop="zuidifeng" label="最低分"  align="center"></el-table-column>
    <el-table-column prop="pingjunfen" label="平均分"  align="center"></el-table-column> 
  </el-table>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      hidden:false,
      tableData: [  ],
      isLoading: false,
      options:[],
     getPaperId: '',
      opts: [
        {value: '1',label: '真题'},
        {value: '2',label: '模拟题'}
      ],
      getPaperType: '',
      start_time: '',
      tracher: '',
      classList: [],
      classes: '',
      stuList: [],
      type:1,
      teacher_id: '',
      school_id: '',
      subordinate_id: '',
      pagesize: 12,
      currentPage: 1,
      nickname: '',
      teacheride: '',
      classide: '',
      uide: '',
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      value2: '',
      identity:2,     
      end_time: '',
      downloadUrl: '',
      currLength: 0,
      test_paper_type_id:'',
      // subordinate: "", 
      // 试卷所属
    };
  },
  mounted() {
    this.actionPath = `${BASE_URL}admin/paper/updatafile`;
    this.school_id = localStorage.getItem("school_id");
    this.teacher_id = localStorage.getItem("id");
   this.test_paper_type_id= localStorage.getItem("test_paper_type_id");
    // this.getPaperList();
    this.getPaperList()
  },
  computed: {},
  methods: {   
    checked(val){
      this.type=val
      this.getPaperList()
    },
    goback(){
        this.$router.go(-1);//返回上一层
     },
    // 表格表头设置样式
    getRowClass ({ rowIndex }) {
      if (rowIndex == 0) {
    //     return 'background:#EFEFEF;border:none;'
      } else {
    //     return 'border:1px solid #EFEFEF'
      }
    },
    // 分页
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getPaperList();
    },
     // 截取数据分页
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
     blockFile_name(i){
      if (i == "") {
        return "无";
      } else {
        return i;
      }
    },
      subordinate(i) {
        console.log(i);
        
      if (i == 0) {
        return "系统";
      } else if (i == 1) {
        return "学校";
      } else {
        return "教师";
      }
    },
    // 审核当前试卷的状态
    lookState(e){
      if (e == 0) {
        return "等待审核";
      } else if (e == 1) {
        return "正常";
      } else {
        return "删除";
      }
    },
    // 获取试卷的列表数据
    async getPaperList(){
      this.isLoading = true;
      this.currentPage = 1;
      // console.log(this.teacher_id,this.getPaperId,this.getPaperType)
      const res = await this.$http.post("v1/Testpaper/testpaperlst",qs.stringify({ 
        teacher_id:this.teacher_id,
        test_paper_type_id:this.test_paper_type_id,
        type: this.type
      }));
       console.log(res)
      if (res.status === 200 && res.data.code === "1") {
        this.tableData = res.data.info;
        this.isLoading = false;
      }else{
        this.isLoading = true;
      }
    },
    //  async getList(){
    //   // school_id: this.school_id
    //   const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/Examination/tiku", qs.stringify({ school_id:1}));
    //   if (res.status === 200 && res.data.code === "1") {
    //     this.options = res.data.info;
    //     console.log(res);
        
    //   };
    // },
    // 点击搜索按钮发生的事件
    search(){
      console.log(this.value2)
       if (this.getPaperId == ''){
        this.$message({message: "请选择试卷类型",type: "error",duration: 4000,offset:90});
        return false;
      } else if ( this.getPaperType == '' ){
        this.$message({message: "请选择真题或模拟题",type: "error",duration: 4000,offset:90});
      } else {
      
        // this.getPaperList();
      }
    },
    add(){
        console.log(111)
        this.$router.push({name:'addPaper'})
    },
   
    //查看
    look(e){
       console.log(e) 
       localStorage.setItem("kaoshiId", e.id);
       localStorage.setItem("isChakan", 1);
      if (e.test_paper_type_id == 1){ this.$router.push({ name: "stufourKaoshi" ,params: { isChakan: 1}}) };
      if (e.test_paper_type_id == 2){ this.$router.push({ name: "stusixKaoshi" ,params: { isChakan: 1}}) };
      if (e.test_paper_type_id == 3){ this.$router.push({ name: "stuaKaoshi" ,params: { isChakan: 1}}) };
      if (e.test_paper_type_id == 4){ this.$router.push({ name: "stubKaoshi",params: { isChakan: 1} }) };
      if (e.test_paper_type_id == 5){ this.$router.push({ name: "otherKaoshi",params: { isChakan: 1} }) };
    },
    //删除
  async  deletes(e){
      // console.log(e)
    const confirm=await  this.$confirm('此操作将永久删除该账号, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
          this.$message({  type: 'info',  message: '已取消删除',offset:90 });
      });
      console.log(confirm);
      //如果点击的是确定按钮 就发起删除事件
      if(confirm=="confirm"){


      }
      
    },
    // // 删除信息
    // delit(e){

    // },
   
    grade( e ){
      if (e == 1){ return "四级" };
      if (e == 2){ return "六级" };
      if (e == 3){ return "A级" };
      if (e == 4){ return "B级" };
      if (e == 5){ return "其他" };
    },
  }
};
</script>

<style lang="less" scoped>
.look{
    background-color: #c2c2c2;
   border-color: #c2c2c2;
    /* // padding:2px; */
}
.look:hover{
    background-color: #FC9300;
     border-color: #FC9300;
}

.right .centers{
width: 96%;
margin:  0 auto;
margin-top:20px;
}
.right {
  background-color: #f0f0f0;
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .search-box {
    height: 40px;
    line-height: 40px;
    padding: 0 15px;
    float: left;
   
    .title {
    /* //   color: @theme; */
      float: left;
      font-size: 14px;
      margin-right: 10px;
    }
  }
  .table-box {
    padding: 10px;
    background-color: #fff;
    box-sizing: border-box;
  }
}
.cell .el-button {
  padding: 4px 9px;
  font-size: 12px;
}
.excel {
  padding: 4px 9px;
  font-size: 12px;
  float: right;
  margin-right: 12px;
}
.add-btn{
    background-color: #FF7D00;
    background: linear-gradient(#FF7D00,#FFA700);
    border-radius: 5px;
    color: #fff;
}
.header-item{
  text-align:center;
  line-height: 60px;
  font-size: 1.5em;
  span{
    margin:0 30px;
  }
  .color{
    color:#409EFF
  }
}
</style>