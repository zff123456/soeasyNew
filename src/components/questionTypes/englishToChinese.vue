<template>
  <div class="right">
    <div class="form-boxes">
      <el-form  label-width="80px">
        <el-form-item label="选择试卷" style="ling-height:50px">
          <el-select v-model="paper_ty" placeholder="请选择试卷" style="width:550px;margin-left:10px">
            <el-option
              v-for="item in paperList"
              :key="item.id"
              :label="item.test_paper_name"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="文章">
          <quill-editor v-model="wenzhang" style="width:550px;margin-left:10px" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="解析">
          <quill-editor v-model="jiexi" style="width:550px;margin-left:10px" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="参考答案">
          <quill-editor v-model="cankaodaan" style="width:550px;margin-left:10px" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item style="margin-left:10px">
           <el-button type="warning"   @click="onSubmit" style="padding:12px 20px;background: linear-gradient(#F3DB76,#FAA621);color:#fff; border: none;" class="btn" size="mini"  round>立即创建</el-button>
           <!-- <el-button type="warning"   @click="onSubmit" style="padding:10px 20px;" class="btn" size="mini"  round>立即创建</el-button> -->
          <!-- <el-button type="primary" @click="onSubmit">立即创建</el-button> -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>

// 导入富文本编辑器组件
import { quillEditor } from 'vue-quill-editor'
import qs from "qs";
export default {
  name: "englishToChinese",
  props: ["paperId", "paperName"],
  data() {
    return {
      paperList: [], // 试卷列表
      paper_ty: '', // 选中的试卷
      editorOption: {
        modules:{
          toolbar:[
            
            [{ 'align': [] }],[{ 'color': [] }, { 'background': [] }],[{ 'direction': 'rtl' }],
            ['bold', 'italic', 'underline', 'strike','image','italic','video','size'],
          ]
        }
      }, // 自定义富文本
      wenzhang: '', // 文章
      jiexi: '', // 解析
      cankaodaan: '', // 参考答案
    };
  },
  created() {
    // console.log("paperId",paperId);
    console.log("this.paperId", this.paperId);
    // console.log("paperName",paperName);
    console.log("this.paperName", this.paperName);
    this.actionPath = `${BASE_URL}admin/paper/updatafile`;
    this.getPaperList()
  },
  components: {
    quillEditor: quillEditor
  },
  computed: {},
  methods: {
    async getPaperList(){
      const res = await this.$http.post("admin/paper/testpapertype",qs.stringify({type: this.paperId }));
      if (res.status === 200 && res.data.code === "1") {
        this.paperList = res.data.info
        console.log(res.data);
      }
    },
    async onSubmit() {
      if(this.wenzhang == ''){
        this.$message({message: "文章不能为空",type: "warning",duration: 2000,offset:90});
        return false;
      }
      if(this.jiexi == ''){
        this.$message({message: "请填写解析",type: "warning",duration: 2000,offset:90});
        return false;
      }
      if(this.cankaodaan == ''){
        this.$message({message: "请填写参考答案",type: "warning",duration: 2000,offset:90});
        return false;
      }
      const res = await this.$http.post("admin/paper/addyingyihan",qs.stringify({ 
        test_paper_id: this.paper_ty,
        wenzhang: this.wenzhang,
        jiexi: this.jiexi,
        cankaodaan: this.cankaodaan,
        cet: this.paperName
      }));
      if (res.status === 200 && res.data.code === "1") {
        this.$message({message: res.data.info,type: "success",duration: 2000,offset:90});
        this.paper_ty = '';
        this.wenzhang ='';
        this.jiexi = '';
        this.cankaodaan = '';
      } else {
        this.$message({message: res.data.info,type: "warning",duration: 2000,offset:90});
        this.paper_ty = '';
      }
    },
    
  }
};
</script>

<style lang="less" scoped>
.right {
  box-sizing: border-box;
  .form-boxes {
    width: 660px;
    text-align: left;
    margin: 0px 0 20px 20px;
    padding: 30px 20px 20px 15px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    .el-form-item .el-form-item--small {
      line-height: 50px;
      
    }
  }
}
</style>
