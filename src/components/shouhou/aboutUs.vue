<template>
    <div class="lianxi">
       <div class="banner" >
           <img src="../../assets/image/lianxi/lianxi.png" alt="">
       </div>
       <!-- <div class="liuyan">
             <div class="headers" >留言板</div>
             <div class="liuyan-box">
                 <div class="input" style="width: 100%;">
                    <el-input style="width: 20%;" placeholder="姓名*"  v-model="nickName"  clearable></el-input>
                    <el-input style="width: 20%;margin:0 10%" placeholder="邮箱*" v-model="email"  clearable></el-input>
                    <el-input style="width: 20%;" placeholder="电话*" v-model="phone"  clearable></el-input>
                 </div>
                 <div class="biaoti" style="width: 80%;margin:30px 0;">
                     <el-input  placeholder="标题*" v-model="titleName"  clearable></el-input>
                 </div>
                 <div class="texe" style="width: 80%;">
                    <el-input  placeholder="内容*"   type="textarea"  rows="2" v-model="content"></el-input>
                </div>
                <div  style="width: 80%;">
                    <div class="btn" @click="fasong" style="cursor:pointer">发送留言</div>
                </div>
             </div>
       </div> -->
       <div class="lianxifangshi" >
            <div class="fanagshi" >
                 联系方式
            </div>
            <div class="centers-box">
               <!-- <span style="background-color: blue;width: 100%;height: 100%;"> -->
                <div class="title">江苏鼎傲科教育技集团有公司</div>
                <div class="item" >联系人<span>：技术部</span></div>
                <div class="item">电话:<span>123456转8007</span> </div>
                <div class="item">地址：<span>江苏省南京市岱山中路善创文化商务楼1501</span>  </div>
               <!-- </span> -->
                <!-- </div> -->
            </div>
       </div>
       <div class="ditu" style="width: 100%;height: 400px;">
           <img src="../../assets/image/index/ditu.png"   style="width: 100%;height: 100%;" alt="">
       </div>
       <!-- mod_help -->
       <div > 
        <div class="mod_help">
           <div class="centers">
              <dl class="mod_help_item" >
                <dt>学院介绍</dt>
                <dd> 服务项目 </dd>
                <dd> 服务项目 </dd>
                <dd> 服务项目 </dd>
                <dd> 服务项目 </dd>

            </dl>
            <dl class="mod_help_item">
                 <dt>教育教学</dt>
                <dd> 服务项目 </dd>
                <dd> 服务项目 </dd>
                <dd> 服务项目 </dd>
                <dd> 服务项目 </dd>

            </dl>
            <dl class="mod_help_item">
                <dt>学术科研</dt>
                <dd> 服务项目 </dd>
                <dd> 服务项目 </dd>
                <dd> 服务项目 </dd>
                <dd> 服务项目 </dd>

            </dl>
            <dl class="mod_help_item">
                <dt>新闻公告</dt>
                <dd> 服务项目 </dd>
                <dd> 服务项目 </dd>
                <dd> 服务项目</dd>
                <dd> 服务项目 </dd>

            </dl>
            <dl class="mod_help_item mod_help_app">
                <dt>联系电话</dt>
                <dd style="font-size:20px;margin:10px 0;color:#fff"> 
                  000-123-4567
                </dd>
                <dd style="font-size:12px;width:200px; ">地址：此处填写真实学校地址</dd>
                <dd style="font-size:12px;width:200px; "> 行政办公电话：000000000000</dd>
                <dd style="font-size:12px;width:200px; ">  邮编：246000</dd>
               
            </dl>
            <dl class="mod_help_item mod_help_app" style="margin-left:80px;">
                <dt>扫描二维码</dt>
                <dd>
                    <img src="../../assets/image/index/sm.png" alt="" style="width:100px;height:100px;">
                    <p style="font-size:12px;">扫一扫关注微信公众号</p>
                </dd>
            </dl>
           </div>
        </div>

        <!-- mod_copyright  -->
        <div class="mod_copyright" >
            <p class="mod_copyright_info">
                某某科技有限公司版权所有 京ICP备08001421号京公网安备110108007702
            </p>
        </div>
    </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nickName:'',
            email:'',
            phone:'',
            titleName:'',
            content:'',
        };
    },
    created() {

    },
    mounted() {
       
    },
    methods: {
        fasong(){
            // 电话号码的正则表达式
            // const phoneTest=/^1(3|4|5|6|7|8|9)\d{9}$/;
            if(!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))){ 
                this.$message({message:'电话格式不正确',type:'warning',offset:90}) 
                     return false; 
             } 
             if(!(/^([A-Za-z0-9_+-.])+@([A-Za-z0-9\-.])+\.([A-Za-z]{2,22})$/.test(this.email))){ 
              this.$message({message:'邮箱格式不正确',type:'warning',offset:90}) 
                     return false; 
             } 

            
        }
    }
};
</script>

<style scoped lang="less">
.lianxi{
    padding-top: 80px;
    min-height: 100%;
   /* padding-bottom:50px; */
    /* background:url(../../assets/image/creatshijuan/bg.png) no-repeat; */
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
}
.banner{
    height: 400px;
    img{
        width: 100%;
        height:100%;
    }
}
.liuyan{
    width: 60%;
    height: 400px;
    /* background: -moz-linear-gradient(top, #3984D6 0%, #f24CAFB 100%); */
    /* background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#3984D6), color-stop(100%,#ffffff));
    background: -webkit-linear-gradient(top, #000000 0%,#ffffff 100%);
    background: -o-linear-gradient(top, #000000 0%,#ffffff 100%);
    background: -ms-linear-gradient(top, #000000 0%,#ffffff 100%); */
    /* background: linear-gradient(to bottom, #3984D6  0%,#f24CAFB 100%); */
    background: linear-gradient(to right, #3984D6,#24CAFB);
    background: -ms-linear-gradient(left,#3984D6,#24CAFB );
    /* margin-left: 10%; */
    /* background-color: blue; */
    /* margin-top:-100px; */
    position: absolute;
    left:20%;
    top:280px;
    .headers{
        text-align: center;
        color:#fff;
        padding-top:50px;
        font-size:1.4em;
    }
    .liuyan-box{
        padding:30px 0 30px 10%;
    }
    .btn{
        width: 25%;
        height: 40px;
        margin:30px auto;
        text-align: center;
        border-radius: 10px;
        background-color: #ffffff;
        /* color:blue; */
        line-height: 40px;
        font-size: 1em;
    }
}
.lianxifangshi{
    width: 60%;
    margin: 0 auto;
    margin-top:20px;
    .fanagshi{
        text-align: center;
        font-size: 1.2em;
    }
    .centers-box{
        width: 40%;
        margin: 30px auto;
        /* border: 1px solid #ccc; */
        border-left:1px solid #ccc;
        border-right:1px solid #ccc;
        padding-left:10%;
        box-sizing: border-box;
        .title{
            /* text-align: center; */
            font-size: 1em;
           
           margin-bottom:20px;
        }
        .item{
            font-size: 0.9em;
            line-height:28px;
            span{
                font-size: 0.8em;
                color: #808080;;
            }
            /* text-align: center; */

        }
    }
}
.mod_help {
     height: 187px;
     padding-top:30px;
    border-bottom: 1px solid #6E747A;
    background-color: #42494E;
    padding-bottom: 20px;
  }
  .mod_help  .centers{
    width:80%;
    margin:0 auto;
  }
  .mod_help_item {
      float: left;
    width:12%;
    padding-top:20px;
    
  }
  .mod_help_item dt {
      height: 25px;
    font-size: 16px;
    color: #fff;
  }
  .mod_help_item dd {
    font-size: 12px;
    color: #999B9C;
    margin-top:10px;
  }
 
  .mod_help_app{
    width:20%;
  }

  .mod_help_app img {
      margin: 7px 0;
  }
  .mod_copyright {
    text-align: center;
   
    background: #42494E;
  }
  .mod_copyright_info {
    line-height: 18px;
    font-size: 14px;
    color:#979B9D;
    padding:15px 0;
  }
</style>
