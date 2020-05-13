<template>
  <div class="login_container">
        <img src="../assets/image/index/tb.png" alt="" style="  margin:10px 20px;width:40px;height:40px;">  
        <div class="login-box">
            <div class="biaoti">江苏鼎傲教育科技集团有限公司</div>
            <div style="font-size:22px;margin:30px 0">科技改变中国教育</div>
            <button style="font-size:16px;width:180px;height:50px;border-radius:25px;color:#ffff;cursor:pointer" @click="goto">立即登录</button>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeId:0,
     
    }
  },
  methods: {
    clicks(val){
      this.activeId=val
    },
    goto(){
      console.log(1111)
       this.$router.push('/home')
    }
  }
}
</script>

<style lang="less" scoped>
  #app{
    height: 100%;
  }
.login_container{
 width:100%;
  height: 100%;
  background:url(../assets/login/bg01.png) no-repeat   ;
  position:fixed;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
 /* min-width: 1366px; */
  background-color: #fff;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  /* height: 100%;
  width: 100%;
  overflow: hidden;
  background-image: url(../assets/login/bg01.png);
  background-size: cover;
  background-position: center center; */
}

.login-box{
  /* width: 80%;
  color: #ffffff;
  text-align: center;
  letter-spacing: 0.1rem;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%); */
  /* width:600px; */
  color: #fff;
  margin: 0 auto;
  margin-top: 28vh;
  text-align: center;
  /* background-color: rgba(255, 255, 255, 0.7); */
  padding: 20px 25px;
  overflow: hidden;
  border-radius: 4px;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04); */
  position: relative;
  /* transition-duration: 0.5s; */


  button{
    font-size: 16px;
    // opacity: 0.9;
    background-color: #484CD4;
    border: 1px solid #ffffff;
  }
}
.biaoti{
  font-size: 40px;
  height: 60px;
  
}
</style>
