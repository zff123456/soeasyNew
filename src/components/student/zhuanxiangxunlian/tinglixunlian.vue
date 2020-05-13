<template>
    <div class="tinglixunlian" v-loading="isLoading"  element-loading-text="拼命加载中"  >
      <div class="centers">
        <audio ref="xinwenAudio"></audio>
        <div class="header">
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
            <div class="selected"  style="float: left;">
                选择题目类型: <el-select v-model="problem" placeholder="请选择"  clearable   @change="changeProblem">
                        <el-option
                          v-for="item in problemList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.name">
                        </el-option>
                      </el-select>              
                </div>
            <!-- <el-button type="warning" plain   @click="checked(1)" >四级题库</el-button>
            <el-button type="warning" plain   @click="checked(2)" >六级题库</el-button>
            <el-button type="warning" plain   @click="checked(3)" >A级题库</el-button>
            <el-button type="warning" plain   @click="checked(4)" >B级题库</el-button>
            <el-button type="warning" plain   @click="checked(5)" >考研题库</el-button> -->
        </div>
        <div class="contents"   style="width: 100%;margin-top:20px;">
        
            <!-- v-if="problem == '新闻报道' || problem == '听讲座对话'|| problem == '听长对话' || problem == '听短文理解' || problem == '听篇章' || problem == '听短对话'" -->
            <div class="content-box"  style="width: 100%;" >
              <div class="titleName">
               题目类型： {{problem}}
              </div>
                <div class="big-box" v-for="(item,key) in itemData.slice((currentPage -1) * pagesize, currentPage * pagesize)">
                    <div class="zuowen-title"    style="width: 100%;">Directions: In this section, you will hear several newsreports.At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A，B，C and D. Then select the corresponding letter on the web page.</div>
                    <audio ref="xinwenOpt" size="mini"></audio>
                    <el-button size="mini" type="primary" icon="el-icon-video-play" @click="play_xinwen(item,key)" style="margin-top: 5px; background: rgb(0, 234, 238); border: none;">播放大题听力</el-button>
                    <div v-if="item.state == 0" v-html="item.yiwen" style="margin-top:10px;border: 1px solid #ccc;padding:10px">{{item.yiwen}}</div>
                    <div class="duanwen-options" >
                      <div class="option-one" v-for="(ie, k, index) in item.xuanzhe[0]">
                        <el-button type="success" icon="el-icon-video-play" @click="play_xinwen_opt(ie,k)"   size="mini"  ref="dw_btn" style="margin-top: 5px; background: rgb(174, 93, 161); border: none;">第({{k + 1}})小题听力</el-button>
                        <div class="xuanxiang" v-for="(i,e) in ie.xuanxiang" style="margin-top: 5px">
                          <el-radio v-model="ie.yn" :label="e" :class="item.state == 0 && ie.yn != ie.daan && e == ie.daan? 'red':''">{{i}}</el-radio>
                        </div>
                        <div v-if="item.state == 0" v-html="ie.tiyan" style="margin-top:10px;border: 1px dashed #ccc;padding:10px">{{ie.tiyan}}</div>
                        <div v-if="item.state == 0" v-html="ie.jiexi" style="margin-top:10px;border: 1px dashed #ccc;padding:10px">{{ie.jiexi}}</div>
                      </div>
                    </div>
                  <!-- 提交按钮。 -->
                  <!-- <el-button type="primary" @click="submitXinwen(item)">提交</el-button> -->
                  <el-button type="primary"   class="playagain" @click="submitXinwen(item)">提交</el-button>
                  <!-- playagain -->
                </div>

              </div>
            <!-- 111111111111 -->
        </div>
        <div   class="fenye"  style="width: 100%;height:60px;">
          <div  >
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="pagesize"
              layout="total, prev, pager, next"
              :current-page.sync="currentPage"
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
            isLoading:false,
            itemData:[],
            itemOne:[],
            type:"",
            typeId:'',
            problem:'',
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
          problemList:[],
          fourList:[{id:11,name:'听长对话'},{id:12,name:'听短文理解'},{id:13,name:'新闻报道'},{id:14,name:'听讲座对话'}],
          sixList:[{id:21,name:'听长对话'},{id:22,name:'听篇章'},{id:23,name:'新闻报道'},{id:24,name:'听讲座对话'}],
          aList:[{id:31,name:'听长对话'},{id:32,name:'听短对话'},{id:33,name:'听短文'},],
          bList:[{id:41,name:'听长对话'},{id:42,name:'听短对话'},{id:43,name:'听单句'},],
          id: ''
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
        this.problem='听短文理解'
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
            console.log(this.typeId);
            if(val==1){
                this.problemList=this.fourList
            }
            if(val==2){
                this.problemList=this.sixList
            }
            if(val==3){
                this.problemList=this.aList
            }
            if(val==4){
                this.problemList=this.bList
            }
            if(val==5){
                this.problem=""
                this.problemList=[]
            }
            
        },
        changeProblem(val){
            this.problem=val
            console.log(this.problem);
            this.getList()
            

        },
        // 播放答题音频
        play_xinwen(item){
            console.log(this.$refs.xinwenAudio);
      this.$refs.xinwenAudio.src = `${BASE_URL}${item.audio_url}`;
      this.$refs.xinwenAudio.play();

       },
    //    播放小题音频
    play_xinwen_opt(ie,k){ // 新闻报道 单项
      const res = this.itemData.slice((this.currentPage -1) * this.pagesize, this.currentPage * this.pagesize);
      this.$refs.xinwenAudio.src = `${BASE_URL}${res[0].xuanzhe[0][k].audio_url}`;
      console.log(this.$refs.xinwenAudio.src);
      this.$refs.xinwenAudio.play();
    },
    //    提交
    submitXinwen(item){
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
    /* background-color: #f0f0f0; */
    .centers{
      width: 96%;
      margin:0 auto;
    }
    .header{
        background-color: #ffffff;
         padding-left: 40px;
        line-height:60px;
        height:60px; 
        font-size: 1em;    
      box-sizing: border-box;       
      
    }
.contents{
   padding:10px;
   margin-top:10px;
   box-sizing: border-box;
   background-color: #ffffff;
   opacity: 0.7;
   padding-bottom:60px;
}
.titleName{
          text-align: center;
          height:60px;
          line-height: 60px;
          font-weight:700;
          margin-bottom: 20px;
          font-size: 1.1em;
}
}
.big-box {
      /* padding: 15px 10px 0; */
      .zuowen-title {
        font-size: 16px;
        line-height: 30px;
      }
      img {
        height: 200px;
        margin-left: 145px;
      }
      .duanwen-options {
           /* // 听短文理解选项 */
        padding: 10px 0 0;
        /* // border-top: 1px solid #ccc;
        // margin-top: 10px; */
        .option-one {
          border-bottom: 1px dashed #ccc;
          margin: 20px 0;
          padding-bottom: 5px;
          overflow: hidden;
          &:last-child {
            border-bottom: none;
          }
          .xuanxiang {
            font-size: 16px;
            height: 20px;
            margin-left: 30px;
          }
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
