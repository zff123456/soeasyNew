<template>
    <div class="dancixunlian">
        <!-- <div class="header">
            <el-button type="warning" plain   @click="checked(1)" >四级单词</el-button>
            <el-button type="warning" plain   @click="checked(2)" >六级单词</el-button>
        </div> -->
        <div class="centers">
         <div style="text-align:center"   class="header">
          <el-button type="warning" plain size="small" @click="blockCn" style="margin:0 1.2rem">只显示中文</el-button>
          <el-button type="warning" plain size="small" @click="blockEn" style="margin:0 1.2rem">只显示英文</el-button>
          <el-button type="warning" plain size="small" @click="alsoBl" style="margin:0 1.2rem">全部显示</el-button>
        </div>
        <audio src="" ref="audio"></audio>
        <el-table :data="flatten(tableData.slice((currentPage -1) * pagesize, currentPage * pagesize))" stripe  class="tables"  border  :row-style="{height:'48px'}"  :header-row-style="{height:'48px'}">
            <el-table-column type="index" width="60"> </el-table-column>
            <el-table-column prop="englishWord" label="单词" v-if="zhanshiEn"   >
            <template slot-scope="scope">
              <el-button size="small" type="text" v-show="scope.row.collect == 0 || scope.row.collect == 1 || scope.row.collect == 3" @click="scope.row.collect = 2">{{scope.row.englishWord}}
              </el-button>
              <el-button size="small" type="text" v-show="scope.row.collect == 2 " @click="scope.row.collect = 0">查看单词</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="pa" label="音标" >
            <template slot-scope="scope">
              <el-button size="small" type="text" v-show="scope.row.collect == 0 || scope.row.collect == 1|| scope.row.collect == 2 " @click="scope.row.collect = 3">{{scope.row.pa}}
              </el-button>
              <el-button size="small" type="text" v-show="scope.row.collect == 3  " @click="scope.row.collect = 0">查看音标</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="chineseWord" label="中文" v-if="zhanshiCn" min-width="160"  ></el-table-column>
          <el-table-column label="发音" prop="" >
            <template slot-scope="scope"  >
              <el-button size="small" type="primary" @click="playVideo(scope.row)" icon="el-icon-video-play" style="font-size: 14px;padding: 4px 12px;"></el-button>
            </template>
          </el-table-column>
          <el-table-column label="例句" prop="" min-width="120">
            <template slot-scope="scope">
                <!-- <el-botton  @mouseover="flag=1" slot="reference" size="small" type="text"  >例句</el-botton>
                <div>
                    <div v-if="flag==1">英文例句：{{scope.row.englishInstance1}}({{scope.row.englishInstance1}})</div>
                </div> -->
              <el-popover  placement="left-start" title="例句" width="500" trigger="hover" :content="blockLize(scope.row)">
                <el-button slot="reference" size="small" type="text">例句</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页插件。 -->
        <div style="float:right;margin-top:5px">
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
export default {
    data() {
        return {
            flag:0,
            tableData:[],
            pagesize: 15,
            currentPage: 1,
            zhanshiCn: true,
            zhanshiEn: true
        };
    },
    created() {

    },
    mounted() {
        this.getList()

    },
    methods: {
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
    async getList(){
        const res = await this.$http.post( "http://ruanjian.chinadingao.com/admin/teacher/dancilst" );
        if (res.status === 200 && res.data.code === "1") {
          this.tableData = res.data.info;
        }
        console.log(res);
        
      },
      blockCn(){
        this.zhanshiCn = true;
        this.zhanshiEn = false;
      },
      blockEn(){
        this.zhanshiCn = false;
        this.zhanshiEn = true;
      },
      alsoBl(){
        this.zhanshiCn = true;
        this.zhanshiEn = true;
      },
      pageChage(){
        this.zhanshiCn = true;
        this.zhanshiEn = true;
      },
      playVideo(e){
        // console.log(e);
        this.$refs.audio.src = e.pron;
        this.$refs.audio.play();
      },
    //   鼠标经过的时候显示的内容
      blockLize(e){
        return `${'英文：'+e.englishInstance1}${'('+'中文翻译：'+e.chineseInstance1+')'}-----------------------${'英文:'+e.englishInstance2}${'('+'中文翻译：'+e.chineseInstance2+')'}`;
      }

    }
};
</script>

<style scoped lang="less">
  .dancixunlian{
    padding-top: 80px;
    min-height: 100%;
   padding-bottom:50px;
    background:url(../../../assets/image/creatshijuan/bg.png) no-repeat   ;
    width:100%;
    height:100%;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    overflow:auto;
    .centers{
      width: 96%;
      margin:0 auto;
    }
/* .dancixunlian{
    height: 100%;
    padding-top: 80px;
    background-color: #f0f0f0; */
    .header{
          background-color: #ffffff;
          padding-left: 80px;
          line-height:60px;
          box-sizing: border-box;  
          margin-bottom: 20px;     
        .el-button{
            margin:0 20px;
        }
    }
    .contents{
   /* padding:10px; */
   /* margin-top:10px; */
   box-sizing: border-box;
   background-color: #ffffff;
}
}
.el-table {
    margin-top:0!important;
}
</style>
