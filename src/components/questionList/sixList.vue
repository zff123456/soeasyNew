<template>
  <div class="sixList">
       <!-- <h3  style="text-align:center; margin-top:20px;">六级题库</h3> -->
       <div class="centers">
            <div class="button-box">
                <el-button type="warning" plain @click.native="check(1)" :class="isCheck == 1?'checked':''">作文题</el-button>
                <el-button type="warning" plain @click.native="check(2)" :class="isCheck == 2?'checked':''">听篇章</el-button>
                <el-button type="warning" plain @click.native="check(3)" :class="isCheck == 3?'checked':''">选词填空</el-button>
                <el-button type="warning" plain @click.native="check(4)" :class="isCheck == 4?'checked':''">听讲座对话</el-button>
                <el-button type="warning" plain @click.native="check(5)" :class="isCheck == 5?'checked':''">长篇阅读</el-button>
                <el-button type="warning" plain @click.native="check(6)" :class="isCheck == 6?'checked':''">仔细阅读</el-button>
                <el-button type="warning" plain @click.native="check(7)" :class="isCheck == 7?'checked':''">听长对话</el-button>
                <el-button type="warning" plain @click.native="check(8)" :class="isCheck == 8?'checked':''">篇章翻译</el-button>
            </div>    
            <div class="component-box">
                <thesisList v-if="isCheck == 1" :paperId="paperId" :paperName="paperName"></thesisList>
                <listenLecture v-if="isCheck == 4" :paperId="paperId" :paperName="paperName"></listenLecture>
                <listenLongList v-if="isCheck == 7" :paperId="paperId" :paperName="paperName"></listenLongList>
                <listenDuanList v-if="isCheck == 2" :paperId="paperId" :paperName="paperName"></listenDuanList>
                <gapFillingList v-if="isCheck == 3" :paperId="paperId" :paperName="paperName"></gapFillingList>
                <longReadList v-if="isCheck == 5" :paperId="paperId" :paperName="paperName"></longReadList>
                <carefulReadingList v-if="isCheck == 6" :paperId="paperId" :paperName="paperName"></carefulReadingList>
                <textualTranslationList v-if="isCheck == 8" :paperId="paperId" :paperName="paperName"></textualTranslationList>
            </div>
       </div>
  </div>
</template>

<script>
import thesisList from '../listComponents/thesisList'; // 作文
import listenLecture from '../listComponents/listenLecture'; // 听新闻报道/ 听讲座  
import listenLongList from '../listComponents/listenLongList'; // 听长对话
import listenDuanList from '../listComponents/listenDuanList'; // 短文理解
import gapFillingList from '../listComponents/gapFillingList'; // 选词填空  
import longReadList from '../listComponents/longReadList'; // 长篇阅读
import carefulReadingList from '../listComponents/carefulReadingList'; // 仔细阅读
import textualTranslationList from '../listComponents/textualTranslationList'; // 新增篇章翻译
export default {
  name:'sixList',
  data() {
    return {
      isCheck: 1, // Tab栏切换
      paperId: 2, // 类型区分
      paperName: 2, // 类型区分
    };
  },
  components: {
     thesisList: thesisList, // 作文组件
    listenLecture: listenLecture, // 新增听新闻报道 听讲座
    listenLongList: listenLongList, // 新增听长对话
    listenDuanList: listenDuanList, // 新增短文理解
    gapFillingList: gapFillingList, // 选词填空
    longReadList: longReadList, // 长篇阅读
    carefulReadingList: carefulReadingList, // 仔细阅读
    textualTranslationList: textualTranslationList, // 篇章翻译
  },
  created() {},
  computed: {},
  methods: {
    check(item){
      this.isCheck = item;
    }
  }
};
</script>

<style lang="less" scoped>
.sixList{
    padding-top:10px;
/* //   min-height: 100%;
//   border: 1px solid transparent;
// //   background-color: pink;
//   background:url(../../assets/image/creatshijuan/bg.png)  no-repeat   ;
//   width:100%;
//   height:100%;
//   min-width: 1366px;
//   background-repeat: no-repeat;
//   background-size: cover;
//   -webkit-background-size: cover;
//   -o-background-size: cover;
//   background-position: center 0;
//   padding-bottom: 30px;
//   overflow: auto;; */
}
.sixList .centers{
    width:95%;
    margin:30px auto;
    margin-top: 0px;
    margin-bottom: 0;
    padding-top:20px;
    background-color: #fff;
    border: 1px solid transparent;
}
 .button-box {
      text-align: left;
      border-bottom: 2px solid #E6A23C;
    //   height: 50px;
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
        margin-left: 5px;
        font-size: 16px;
      }
     
    }

</style>