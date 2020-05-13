<template>
    <div class="tinglixunlian" v-loading="isLoading"  element-loading-text="拼命加载中" >
      <div class="centers">

   
        <div class="header" >
            <div class="selected" style="float: left;margin-right: 20px;">
                选择题库类型: <el-select v-model="typeId" placeholder="请选择"   clearable  @change="changeType"  @clear="clearType">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.id">
                        </el-option>
                      </el-select>              
            </div>
            <!-- <div class="selected"  style="float: left;">
              选择题目类型: <el-select v-model="problem" placeholder="请选择"  clearable   @change="changeProblem">
                      <el-option
                        v-for="item in problemList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.name">
                      </el-option>
                    </el-select>              
              </div> -->
        </div>
        <div class="contents" style="width: 100%;margin-top:20px;">
         
            <!-- v-if="problem == '作文' || problem == '英译汉' || problem == '篇章翻译'" -->
            <div class="content-box"  style="width: 100%;" >
              <div class="titleName">
                题目类型： {{problem}}
               </div>
                <div class="big-box" >
                  <div class="zuowen-title"    style="width:100%;font-size: 0.9em;line-height:25px;">{{itemOne.wenti}}</div>
                  <div v-html="itemOne.wenti" ></div>
                  <div v-html="itemOne.wenzhang" ></div>
                  <img v-if="itemOne.is_img != 0 && problem == '作文' && itemOne.is_img != undefined" :src="itemOne.img_url" alt="" style="height: 200px;margin-left: 145px;">
                  <el-input v-model="itemOne.yn" :autosize="{ minRows: 26}" type="textarea" style="border-radius: 0;margin: 10px 0;font-size: 0.9em;line-height:25px;"></el-input>
                  <div v-html="itemOne.daan" v-if="itemOne.state == 0 " style="border: 1px solid #ccc;padding:10px;font-size: 0.9em;line-height:25px;">{{itemOne.daan}}</div>
                  <div v-html="itemOne.cankaodaan" v-if="itemOne.state == 0 " style="border: 1px solid #ccc;padding:10px;font-size: 0.9em;line-height:25px;"></div>
                  <div v-html="itemOne.jiexi" v-if="itemOne.state == 0" style="margin:10px 0;border: 1px solid #ccc;padding:10px;font-size: 0.9em;line-height:25px;">{{itemOne.jiexi}}</div>
                  <!-- 提交按钮。 -->
                  <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin:10px 0;transform: translateX(-30px);"></div> -->
                  <!-- <el-button type="primary">提交</el-button> -->
                  <el-button type="primary"   class="playagain"  @click="submitZuowen(itemOne)">提交</el-button>
                </div>
                <!-- 分页插件。 -->
             
                <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin:60px 0 0;transform: translateX(-30px);"></div> -->
              </div>

            <!-- 111111111111 -->
        </div>
        <div  class="fenye" style="width: 100%;height:60px;">
          <div >
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="pagesize"
              :current-page.sync="currentPage"
              layout="total, prev, pager, next"
              :total="itemData.length"
            ></el-pagination>
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
            is_tijiao: false,
            isLoading:false,
            pagesize:1,
            currentPage:1,
            itemData:[],
            itemOne:"",
            type:"",
            typeId:'',
            problemList:[{id:1,name:'作文'}],
            problem:'作文',
            options: [{
               id: 1,
               label: '四级题库'
            }, {
                id:2,
               label: '六级题库'
            }, {
                id:3,
               label: 'A级题库'
           }, {
            id: 4,
             label: 'B级题库'
           }, ],
          //  {
          //   id:5,
          //    label: '其他题库'
          // }
        
         };
    },
    watch: {
    itemData( val ){
      this.changeOne( val );
      deep: true   // 深度监听，监听到更深层级值的变化
    },
    currentPage( val ){
      this.itemOne = this.itemData.slice((this.currentPage -1) * this.pagesize, this.currentPage * this.pagesize);
      console.log(this.itemOne );
      
      this.itemOne = this.itemOne[0];
      console.log("触发分页事件");
      deep: true   // 深度监听，监听到更深层级值的变化
    },
  },
    created() {
    },
    mounted() {
        this.typeId=1
        this.problem='作文'
        this.problemList=this.fourList
        this.getList()

    },
    methods: {
    changeOne( val ){
      console.log(this.itemData.length);
      console.log(this.itemData);
      
      if (this.itemData.length == 1) {
        this.itemOne = val[0];
      } else {
        this.itemOne = this.itemData.slice((this.currentPage -1) * this.pagesize, this.currentPage * this.pagesize);
        this.itemOne = this.itemOne[0];
      }
    },
        handleSizeChange(val){
            this.pagesize=val

        },
        handleCurrentChange(val){
            this.currentPage=val
            this.$set(this,"currentPage", val);
        },
    async   getList(){
        this.isLoading=true
       const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/Examination/danxiangtupo",qs.stringify({ 
           test_paper_type_name: this.typeId, 
           problem: this.problem 
        }));
        console.log(res);
        
      if (res.status === 200 && res.data.code === "1") {
        this.$set(this,"itemData", res.data.info);
        for ( var i = 0 ; i < this.itemData.length ; i++) {
          console.log(this.itemData);
          
          if (this.itemData[i].is_img  == 1){
            this.itemData[i].img_url = `${BASE_URL}${this.itemData[i].img_url}`;
          }
        };
        this.isLoading = false;
      }else{
        this.isLoading = false;
      } 

        },
        clearType(){
           this.problem=""
        },
        changeType(val){
            console.log(val);          
            this.typeId=val
            this.getList()  
        },
        changeProblem(val){
            this.problem=val
            console.log(this.problem);
            this.getList()
        },
    //    提交
    // async submitZuowen(item){
    //   this.itemOne.state = 0;
    //   // if(item.yn == '' || item.yn == undefined){
    //   //   this.$message({message: "您尚未作答",type: "error",duration: 4000});
    //   // } else {
    //   //   this.$message({message: "提交成功",type: "success",duration: 4000});
    //   // }
    // },
    submitZuowen(item){
      item.state = 0;
    },
    }
};
</script>

<style scoped lang="less">
.tinglixunlian{
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
    .header{
        background-color: #ffffff;
        padding-left: 40px;
        line-height:60px;
        height:60px;
        box-sizing: border-box;
        .selected{
          font-size: 1em;
        }
            
        .el-button{
            margin:0 20px;
        }
    }
    .contents{
   padding:10px;
   margin-top:10px;
   box-sizing: border-box;
   background-color: #ffffff;
   padding-bottom: 60px;
   opacity: 0.5;
   .titleName{
          text-align: center;
          height:60px;
          line-height: 60px;
          font-weight:700;
          margin-bottom: 20px;
          font-size: 1.1em;
}
}
}
.playagain {
            float: right;
            padding: 10px  25px;
            border-radius: 20px;
            border:none;
            color:#fff;
            font-size: 1em;
            background-image: linear-gradient(to top, #FD9C10 , #F1E282);
            /* margin: 10px 0px 5px; */
            /* width: 100%; */
          }
</style>
