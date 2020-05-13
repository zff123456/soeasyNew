<template>
  <div class="wrapper" style="margin-top:70px;">
     <div class="centers">
      <div style="margin:20px 0 20px 25px;font-size：20px;font-weight:700; ">四级新增 <span style="cursor:pointer;float:right;padding:5px 10px;border:1px solid #E6A23C;color:#E6A23C;margin-right:50px;font-size:16px;font-weight:400;border-radius:5px;" @click="back">上一页</span>  </div>
     
         <!-- <span style="float:right;padding:5px 10px;border:1px solid #E6A23C;color:#E6A23C;margin-right:50px;font-size:16px;font-weight:400;border-radius:5px;" @click="back">上一页</span>  -->
          <div class="button-box">
            <el-button type="warning" plain @click.native="check(1)" :class="isCheck == 1?'checked':''">新增作文题</el-button>
            <el-button type="warning" plain @click.native="check(2)" :class="isCheck == 2?'checked':''">新增听短文理解</el-button>
            <el-button type="warning" plain @click.native="check(3)" :class="isCheck == 3?'checked':''">新增选词填空</el-button>
            <el-button type="warning" plain @click.native="check(4)" :class="isCheck == 4?'checked':''">新增新闻报道</el-button>
            <el-button type="warning" plain @click.native="check(5)" :class="isCheck == 5?'checked':''">新增长篇阅读</el-button>
            <el-button type="warning" plain @click.native="check(6)" :class="isCheck == 6?'checked':''">新增仔细阅读</el-button>
            <el-button type="warning" plain @click.native="check(7)" :class="isCheck == 7?'checked':''">新增听长对话</el-button>
            <el-button type="warning" plain @click.native="check(8)" :class="isCheck == 8?'checked':''">新增篇章翻译</el-button>
        </div>    
        <div class="component-box">
          <composition v-if="isCheck == 1" :paperId="paperId" :paperName="paperName"></composition>
          <listenNewsReport v-if="isCheck == 4" :paperId="paperId" :paperName="paperName"></listenNewsReport>
          <listenLongDuihua v-if="isCheck == 7" :paperId="paperId" :paperName="paperName"></listenLongDuihua>
          <duanUnderstand v-if="isCheck == 2" :paperId="paperId" :paperName="paperName"></duanUnderstand>
          <gapFilling v-if="isCheck == 3" :paperId="paperId" :paperName="paperName"></gapFilling>
          <longRead v-if="isCheck == 5" :paperId="paperId" :paperName="paperName"></longRead>
          <carefulReading v-if="isCheck == 6" :paperId="paperId" :paperName="paperName"></carefulReading>
          <textualTranslation v-if="isCheck == 8" :paperId="paperId" :paperName="paperName"></textualTranslation>
        </div>
    </div>
  </div>
</template>

<script>
import composition from '../questionTypes/composition'; // 作文
import listenNewsReport from '../questionTypes/listenNewsReport'; // 听新闻报道
import listenLongDuihua from '../questionTypes/listenLongDuihua'; // 听长对话
import duanUnderstand from '../questionTypes/duanUnderstand'; // 短文理解
import gapFilling from '../questionTypes/gapFilling'; // 选词填空
import longRead from '../questionTypes/longRead'; // 长篇阅读
import carefulReading from '../questionTypes/carefulReading'; // 仔细阅读
import textualTranslation from '../questionTypes/textualTranslation'; // 新增篇章翻译
export default {
  components: {
     composition: composition, // 作文组件
    listenNewsReport: listenNewsReport, // 新增听新闻报道
    listenLongDuihua: listenLongDuihua, // 新增听长对话
    duanUnderstand: duanUnderstand, // 新增短文理解
    gapFilling: gapFilling, // 选词填空
    longRead: longRead, // 长篇阅读
    carefulReading: carefulReading, // 仔细阅读
    textualTranslation: textualTranslation, // 篇章翻译
  },
  props: {},
  data() {
    return {
      isCheck: 1,
      paperId: 1,
      paperName: 1,
    };
  },
  watch: {},
  computed: {},
  methods: {
       check(item){
      this.isCheck = item;
    },
    back(){
      // this.$router.push('/addPaper')
       this.$router.go(-1);//返回上一层
    }
  },
  created() {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.wrapper{
  min-height: 100%;
  border: 1px solid transparent;
  background:url(../../assets/image/creatshijuan/bg.png) no-repeat   ;
  width:100%;
  height:100%;
  /* min-width: 1366px; */
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  padding-bottom: 30px;
  overflow: auto;;
}
.wrapper .centers{
    width:95%;
    margin:30px auto;
    margin-bottom: 50px;
    margin-bottom: 0;
    background-color: #fff;
    border: 1px solid transparent;
}
 .button-box {
      text-align: left;
      border-bottom: 2px solid #E6A23C;
      // height: 46px;
      box-sizing: border-box;
      background-color: #fff;
      position: -webkit-sticky;
      position: sticky;
      top: -20px;
      z-index: 11;
      button {
        color:#E6A23C;
        background-color: #fff;
        border: none;
        border-radius:0;
        margin-left: 0px;
        font-size: 16px;
      }
     
    }
</style>