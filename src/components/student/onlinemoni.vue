<template>
    <div class="history"  >
        <div class="centers">
            <div class="header">历年真题：
                <el-button type="warning" plain  @click="checked(2,1)">四级模拟</el-button>
                <el-button type="warning" plain @click="checked(2,2)">六级模拟</el-button>
                <el-button type="warning" plain @click="checked(2,3)">A级模拟</el-button>
                <el-button type="warning" plain @click="checked(2,4)">B级模拟</el-button>
             </div>
            <div class="tablebox">
                <el-table   :header-cell-style="getRowClass"    :data="flatten(tableData.slice((currentPage -1) * pagesize, currentPage * pagesize))"  style="width: 100%">
                    <el-table-column prop="id" label="序号" width="65"></el-table-column>
                    <!-- prop="test_paper_name" -->
                    <el-table-column prop="test_paper_name" label="试卷名称" min-width="120"></el-table-column>
                    <el-table-column prop="zuigaofeng" label="总分"> </el-table-column>
                    <el-table-column prop="test_paper_type_name" label="试卷所属"></el-table-column>
                    <el-table-column prop="cishu" label="练习次数"></el-table-column>
                    <el-table-column prop="zuigaofeng" label="最高分"></el-table-column>
                    <el-table-column prop="zuidifeng" label="最低分"></el-table-column>
                    <el-table-column prop="pingjunfen" label="平均分">
                    </el-table-column>
                    <el-table-column label="操作" width="120" align="center">
                      <template slot-scope="scope">
                        <el-button size="mini" type="warning" @click="startKaoshi(scope.row)"  plain  v-if="scope.row.huancun == 1">继续作答</el-button>
                        <el-button size="mini" type="warning" @click="startKaoshi(scope.row)"   plain   v-if="scope.row.huancun == 0">开始训练</el-button>
                      </template>
                    </el-table-column>              
                </el-table>
                <div style="float:right;padding-top:5px">
                    <el-pagination small 
                       @size-change="handleSizeChange" 
                    @current-change="handleCurrentChange"
                    :page-size="pagesize" 
                    layout=" total,prev, pager, next,jumper"
                    :total="tableData.length"
                    ></el-pagination>
                </div>
            </div>
        </div>
     
        </div>
    </div>
</template>

<script>
    import qs from "qs";
export default {
    data() {
        return {
            isLoading:false,
            type:2,
            typeId:1,
            stu_id:1,
            school_id:1,
            identity:'',
            tableData: [{
        test_paper_name:'试卷01',
        test_paper_type_id:1,
        start_time:0,
        end_time:0,
        file_name:'',
        state:1,
        cishu:1,
        zuigaofeng:140,
        zuidifeng:100,
        pingjunfen:60,
        test_paper_type_name:"四级",
        huancun:0,
      },{
        test_paper_name:'试卷04',
        test_paper_type_id:2,
        start_time:0,
        end_time:0,
        file_name:'',
        state:0,
        cishu:1,
        zuigaofeng:140,
        zuidifeng:100,
        pingjunfen:60,
        test_paper_type_name:"六级",
        huancun:0,
      },{
        test_paper_name:'试卷02',
        test_paper_type_id:3,
        start_time:0,
        end_time:0,
        file_name:'',
        state:1,
        cishu:1,
        zuigaofeng:140,
        zuidifeng:100,
        pingjunfen:60,
        test_paper_type_name:"A级",
        huancun:0,
      },{
        test_paper_name:'试卷03',
        test_paper_type_id:4,
        start_time:0,
        end_time:0,
        file_name:'',
        state:1,
        cishu:1,
        zuigaofeng:140,
        zuidifeng:100,
        pingjunfen:60,
        test_paper_type_name:"B级",
        huancun:0,
      },{
        test_paper_name:'试卷05',
        test_paper_type_id:5,
        start_time:0,
        end_time:0,
        file_name:'',
        state:1,
        cishu:1,
        zuigaofeng:140,
        zuidifeng:100,
        pingjunfen:60,
        test_paper_type_name:"四级",
        huancun:0,
      },{
        test_paper_name:'试卷011',
        test_paper_type_id:1,
        start_time:0,
        end_time:0,
        file_name:'',
        state:1,
        cishu:1,
        zuigaofeng:140,
        zuidifeng:100,
        pingjunfen:60,
        test_paper_type_name:"四级",
        huancun:0,
      }],
            pagesize:15,
            currentPage:1,
        };
    },
    created() {

    },
    mounted() {
    // this.type = localStorage.getItem("type");
    // this.test_paper_type_id = localStorage.getItem("test_paper_type_id");
    // this.stu_id = localStorage.getItem("id");
    this.school_id = localStorage.getItem("school_id");
    this.identity = localStorage.getItem("identity");
    this.getThesisList();

    },
    methods: {
        checked(type,typeId){
            this.type=type
            this.typeId=typeId 
            console.log( this.type, this.typeId)
            this.getThesisList();
        },
        async getThesisList() {
            console.log( this.type, this.typeId);
            
         this.isLoading = true;
       console.log(this.type,this.typeId,this.school_id,this.stu_id);
      const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/teacher/schoolpaperlst",qs.stringify({        
        type: 2, 
        test_paper_type_id:1,
        school_id:1,
        student_id:1
      }));
      if (res.status === 200 && res.data.code === "1") {
        this.tableData = res.data.info;
        console.log( this.tableData);
        
        this.isLoading = false;
      } else {
        this.isLoading = false;
        this.$message({message: res.data.info,type: "error",duration: 2000});
      }
    },
    getRowClass ({ rowIndex }) {
                if (rowIndex == 0) {
                    return 'background:#E6A23C;color:#fff'
                } else {
                    return ''
      }
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
   startKaoshi(e){
      localStorage.setItem("kaoshiId", e.id);
      localStorage.setItem("kaoshiName", e.test_paper_name);
      if (this.typeId == 1){ this.$router.push({ name: "stufourKaoshi" }) };
      if (this.typeId == 2){ this.$router.push({ name: "stusixKaoshi" }) };
      if (this.typeId == 3){ this.$router.push({ name: "stuaKaoshi" }) };
      if (this.typeId == 4){ this.$router.push({ name: "stubKaoshi" }) };
    },


    }
};
</script>

<style scoped lang="less">
.history{
    height: 100%;
    margin-top: 61px;
    /* margin-top:70px; */
    padding-top:20px;
   background-color: #f0f0f0;

}
.history .centers{
    width: 94%;
    margin: 0 auto;
}
.history .centers .header{
    color: #808080;
    /* height: 60px;
    line-height: 60px;    */
    box-sizing: border-box;
    padding-left: 20px;
    background-color: #fff;
    /* border-bottom: 2px solid #ccc; */
}
.tablebox{
    box-sizing: border-box;
    padding: 10px;
    background-color: #fff;
}

</style>
