<template>
  <!-- v-loading="isLoading" element-loading-text="拼命加载中" -->
  <div class="wrapper" style="padding-top:80px;background:#f0f0f0"   >
      <div class="centers">
        <!-- <el-card> -->
          <div style="height:60px ;line-height:60px; background:#fff">
            <div class="item1">学生考试预约</div>
            <div class="item2">
              <span>预约类型:</span>
              <span class="items"     @click="checked(0)"   :class="{active:activeIndex==0}">默认</span>
              <span class="items"   @click="checked(1)" :class="{active:activeIndex==1}">我的考试</span>
              <span class="items"   @click="checked(2)" :class="{active:activeIndex==2}">学校考试</span>
            </div>
           </div>
        <div>
              <el-table :data="flatten(tableData.slice((currentPage -1) * pagesize, currentPage * pagesize))"  style="margin-top:0;width: 100%"   >
                  <el-table-column prop="test_paper_name"   label="试卷名称"  > </el-table-column>
                  <el-table-column prop="nickname"   label="学生名称"  > </el-table-column>
                  <el-table-column prop="class_name"   label="班级"  > </el-table-column>
                  <el-table-column prop="end_time"   label="结束时间"  > 
                      <template slot-scope="scope">{{ scope.row.end_time | time}}</template>
                  </el-table-column>
                  <el-table-column prop="start_time"   label="开考时间"  >  
                       <template slot-scope="scope">{{ scope.row.start_time | time}}</template>
                  </el-table-column>
                  <el-table-column prop="state"   label="预约状态"   > 
                       <template slot-scope="scope"  >
                          <div v-if="scope.row.state!=0" style="font-size: 14px;"> {{lookState(scope.row.state)}}</div>
                          <div style="color:red;font-size: 14px;"  v-if="scope.row.state==0"> {{lookState(scope.row.state)}}</div>
                      </template>
                  </el-table-column>
                  <el-table-column prop="state"   label="试卷状态"  >
                       <template slot-scope="scope"  >
                          <div style="color:red;font-size: 14px;"  v-if="scope.row.state==0"> 未考试<el-button round plain size="mini"  type="info" style="margin-left:10px;border:1px solid #7E7E7E" @click="goto(0)">批卷</el-button></div>
                          <div v-if="scope.row.state!=0" style="font-size: 14px;">已考试<el-button  plain   size="mini" round style="cursor:pointer; margin-left:10px;border:1px solid #5195FF;" @click="goto(1,scope.row)"> 批卷</el-button></div>
                      </template>
                   </el-table-column>
              </el-table>
        </div>
   
         <!-- 分页插件。 -->
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
</template>

<script>
import qs from "qs";
export default {
  components: {},
  props: {},
  data() {
    return {
        activeIndex:0,
           tableData:[{test_paper_name:'试卷01',class_name:'一班',nickname:'张三',start_time:'1586404800',state:1,test_paper_type_id:1,end_time: '1589155200',
          },{test_paper_name:'试卷01',class_name:'一班',nickname:'张三',start_time:0,state:1,test_paper_type_id:2,end_time: '0'
          },{test_paper_name:'试卷01',class_name:'一班',nickname:'张三',start_time:0,state:1,test_paper_type_id:3,end_time: '0'
          },{test_paper_name:'试卷01',class_name:'一班',nickname:'张三',start_time:0,state:1,test_paper_type_id:4,end_time: '0'},
          {test_paper_name:'试卷01',class_name:'一班',nickname:'张三',start_time:0,state:0,test_paper_type_id:4,end_time: '0'}],
        teacher_id:331,
        school_id:1,
        currentPage:1,
        pagesize:15,
        getPaperId:'',
        getPaperType:'',
        isLoading:true,
    };
  },
  watch: {},
  computed: {},
  methods: {
      handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
      checked(val){
        this.activeIndex=val
          console.log(111)
          if(val==0){
              // this.getPaperList()
          }
         
          if(val==1){
            // this.getList()
          }
          if(val==2){
            // this.getList()
          }
      },
      goto(val,item){
        console.log(item);
       localStorage.setItem("kaoshiId", item.id); 
       localStorage.setItem("isEdit", 1);
      if (item.test_paper_type_id == 1){ this.$router.push({ name: "stufourKaoshi" ,params: { isEdit: 1}}) };
      if (item.test_paper_type_id == 2){ this.$router.push({ name: "stusixKaoshi" ,params: { isEdit: 1}}) };
      if (item.test_paper_type_id == 3){ this.$router.push({ name: "stuaKaoshi" ,params: { isEdit: 1}}) };
      if (item.test_paper_type_id == 4){ this.$router.push({ name: "stubKaoshi",params: { isEdit: 1} }) };
      if (item.test_paper_type_id == 5){ this.$router.push({ name: "otherKaoshi",params: { isEdit: 1} }) };
      
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
     async getPaperList() {
      this.isLoading = true;
      this.currentPage = 1;
      console.log(this.teacher_id,this.getPaperId,this.getPaperType)
      const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/paper/testpaperlst",qs.stringify({ 
        teacher_id: this.teacher_id,
        test_paper_type_id: this.getPaperId,
        type: this.getPaperType
      }));
      if (res.status === 200 && res.data.code === "1") {
        this.tableData = res.data.info;
        this.isLoading = false;
        console.log(this.tableData)
      }
    },
      async getList(){
          console.log(this.school_id)
      if( this.activeIndex == 1){
        const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/Examination/AppointmentExaminationlst", qs.stringify({ subordinate: 1, subordinate_id: this.school_id,type: 1}));
        if (res.status === 200 && res.data.code === "1") {
          this.tableData = res.data.info
        }
        console.log(res)
      };
      if ( this.activeIndex == 2){
        const res = await this.$http.post(
          "http://ruanjian.chinadingao.com/admin/Examination/AppointmentExaminationlst",
          qs.stringify({ subordinate: 2, subordinate_id: this.teacher_id,type: 2})
        );
        if (res.status === 200 && res.data.code === "1") {
          this.tableData = res.data.info;
        }
      }
    },
    lookState(e){
          if (e == 0) {
        return "未预约";
      } else if (e == 1) {
        return "已预约";
      } else {
        return "删除";
      }
    }
  },
  created() {},
  mounted() {
    // this.teacher_id = localStorage.getItem("id");
    // this.nickname = localStorage.getItem("nickname");
    // this.school_id = localStorage.getItem("school_id");
      // this.getPaperList()
  }
};
</script>
<style lang="less" scoped>
.wrapper{
    .centers{
      width: 92%;
      margin-left:4%;
    }
    .item1{
        float: left;
        font-size: 16px;
        color: #474747;
        margin-left: 50px;
    }
    .item2{
        float: right;
         color: #9F9F9F;
         margin-right: 50px;
        span{
            margin:0 15px;
        }
        .items{
            display: inline-block;
            font-size: 14px;
            height: 30px;
            padding:0 20px;
            line-height: 30px;
            border-radius: 15px;
            cursor:pointer;
            // background-color: pink;
        }
        .active{
            background-color: #3383FF;
            color: #fff;
        }
    }
}
.red{
    color:#FF3737;
}

</style>