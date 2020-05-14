<template>
    <div class="contain">
        <div class="headers">
          <!-- 教师端 -->
            <el-menu  :default-active="activerouter" class="el-menu-demo  menu" mode="horizontal"   @select="handleSelect" background-color="#fff"  active-text-color="#409EFF" v-if="identify==2">                
                   <img src="../assets/image/index/tb.png" alt="" style=" float:left; margin:10px 20px;width:40px;height:40px;">    
                <el-menu-item index="welcome">
                    <img src="../assets/image/index/shouye.png" alt="" style="width:18px;height:18px;">    
                </el-menu-item>                         
                <el-menu-item index="chengji">数据统计</el-menu-item> 
                <el-menu-item index="video">视频管理</el-menu-item>
                <!-- <el-menu-item index="shijuan">试卷管理</el-menu-item> -->
                <el-submenu index="3">
                  <template slot="title">试卷管理</template>
                    <el-menu-item index="shijuanList">试卷列表</el-menu-item>
                    <el-menu-item index="addPaper">新增试卷</el-menu-item>
                    <el-menu-item index="zizhuzujuan">自主组卷</el-menu-item>
                  </el-submenu>
                 <el-submenu index="1">
                  <template slot="title">班级管理</template>
                    <el-menu-item index="classmanage">我的班级</el-menu-item>
                    <el-menu-item index="teacherList">教师列表</el-menu-item>                 
                  </el-submenu>
                  <!-- <el-menu-item index="stuOrder">学生预约</el-menu-item> -->
                  <el-menu-item index="list">题库列表</el-menu-item>
                    <el-submenu index="4">
                      <template slot="title">售后管理</template>
                        <el-menu-item index="stucreateGongdan">创建工单</el-menu-item>
                        <el-menu-item index="gongdanLlist">工单列表</el-menu-item>
                        <el-menu-item index="aboutUs">联系我们</el-menu-item>
                        <!-- <el-menu-item index="changePad"></el-menu-item> -->
                      </el-submenu>
                      <el-menu-item index="changePad">修改密码</el-menu-item>
                <div class="item1 ">               
                   <el-button type="info"  @click="tuichu"   style="background-color: #585AC0;border-color: #585AC0;">退出</el-button>
                </div> 
                <div class="item2" style="margin-right:50px ;"  >               
                  {{nickName}}                 
               </div> 
            </el-menu>  
            
            <el-menu  :default-active="activerouter" class="el-menu-demo" mode="horizontal"  @select="handleSelect" background-color="#fff"   v-if="identify==1"  active-text-color="#409EFF">                
              <img src="../assets/image/index/tb.png" alt="" style=" float:left; margin:10px 20px;width:40px;height:40px;">    
           <el-menu-item index="stuwelcome">
               <img src="../assets/image/index/shouye.png" alt="" style="width:18px;height:18px;">    
           </el-menu-item>                         
           <!-- <el-submenu index="2">
             <template slot="title">数据分析</template>
             <el-menu-item index="stuscore">成绩统计</el-menu-item>
             <el-menu-item index="stuerror">错题统计</el-menu-item>                 
           </el-submenu> -->
           <el-menu-item index="dengjikaoshi">等级考试</el-menu-item>
           <el-menu-item index="kehouzuoye">课后作业</el-menu-item>
           <el-submenu index="4">
             <template slot="title">课程资源</template>
             <el-menu-item index="onlinecourse">我校课程</el-menu-item>
             <el-menu-item index="xitongziyuan">系统课程</el-menu-item>                 
           </el-submenu>
           <el-submenu index="1">
             <template slot="title">专项训练</template>
             <el-menu-item index="tinglixunlian">听力训练</el-menu-item>
             <el-menu-item index="xiezuoxunlian">写作训练</el-menu-item>
             <el-menu-item index="dancixunlian">单词训练</el-menu-item> 
             <el-menu-item index="fanyixunlian">翻译训练</el-menu-item>    
             <el-menu-item index="kouyuxunlian">口语训练</el-menu-item>               
           </el-submenu>
           <el-menu-item index="cuotijijin">错题集锦</el-menu-item>
           <!-- <el-menu-item index="stufourlist">历年真题</el-menu-item>
           <el-menu-item index="onlinemoni">在线模拟</el-menu-item> -->
           <el-menu-item index="tikulianxi">题库练习</el-menu-item>
           <el-menu-item index="wuzhihua">无纸化考试</el-menu-item>
           <el-submenu index="2">
            <template slot="title">数据分析</template>
            <el-menu-item index="stuscore">成绩统计</el-menu-item>
            <el-menu-item index="stuerror">错题统计</el-menu-item>                 
          </el-submenu>
           <el-submenu index="3">
             <template slot="title">售后问题</template>
             <el-menu-item index="stucreateGongdan">问题反馈</el-menu-item>
             <el-menu-item index="gongdanLlist">问题列表</el-menu-item>   
             <!-- <el-menu-item index="changePad">密码修改</el-menu-item>  -->
             <el-menu-item index="aboutUs">联系我们</el-menu-item>              
           </el-submenu>
           <el-menu-item index="changePad">密码修改</el-menu-item>
           <div class="item1 ">               
              <el-button type="info"  @click="tuichu" style="background-color: #585AC0;border-color: #585AC0;">退出</el-button>
              
           </div> 
           <div class="item2" style="margin-right:50px ;"  >               
             {{nickName}}                 
          </div> 
       </el-menu>  


        </div>
        <div class="boxs">
             <!-- 子路由出口： -->
          <router-view/>
        </div>
    </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {
        queryName:'',
        activerouter: '',
        nickName:"",
        identify:1,
    };
  },
  watch: {},
  computed: {},
  methods: {
       handleSelect(key, keyPath) {
        console.log(key, keyPath);
        console.log(this.activerouter)
        this.$router.push({name:key})
      },
      xiaoxi(){

      },
      self(){

      },
      search(){
        this.queryName=''
      },
      // 退出
     async tuichu(){
         try {
        await this.$confirm("您是否确定退出?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        });
        // window.localStorage.clear()
        // 退出登录逻辑：      
        localStorage.removeItem("identity");
        localStorage.removeItem("shenfen");
        localStorage.removeItem("id");
        localStorage.removeItem("school_name");
        localStorage.removeItem("school_id");
        localStorage.removeItem("nickname");
        this.$router.push("/");
      } catch (e) {
        this.$message({ type:"info",  message:"已取消退出",offset:90 });
      }
          // this.$router.     ('/')
      }
  },
  created() {},
  mounted() {
   this.identify=localStorage.getItem("identity")
   console.log(this.identify);  
   this.nickName=localStorage.getItem("nickname")
  }
};
</script>
<style lang="less" scoped>
#app .contain{
  height: 100%;
  /* overflow-x: hidden;  */
}
#app .boxs{
   height: 100%;
   min-height: 100%;
}
.headers{
   width:100%;
    position: fixed;
   z-index:9999;
   top:0;
   height:60px;
  overflow-x: auto;
  overflow-y: hidden;
}
.headers{

  .item{
    float: left; 
    padding: 5px 10px;
    margin:20px 10px 0 10px;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    border-radius:20px;
  }
  .item2{
    float: right; 
    height: 60px;
    line-height: 60px;
  }
  .item1{
    /* // border-top: 1px solid transparent; */
    width:8%;
    float: right; 
    margin-top:10px;
    border:none;
    .input{
      width:70%;
      height: 40px;
      float: left;
      background-color: #F0F0F0;
      // border: 1px solid #ccc;
      border: 1px solid transparent;
      box-sizing: border-box;
      border-radius: 20px;
      padding-left:10px;
      input{
        margin-left:5px;
        height: 38px;
        background-color: #F0F0F0;
        border: none;
      
      }
    }
    img{
        width:30px;
        height: 30px;
        margin-top:5px;
        // vertical-align: middle;
        margin-left:10px;
    }
    .img1{
    width:28px;
    height: 28px;
    }
  }
  .active{
    background-color: #409EFF;
    color:#fff;
    
  }
  .img{
    width: 20px;
    height: 20px;

  }
}
</style>