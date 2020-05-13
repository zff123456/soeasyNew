<template>
  <div class="login_container">
      111
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryName:'',
     
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
.login_container{
 width:100%;
  height: 100%;
//   background:url(../assets/login/bg01.png) no-repeat   ;
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
}
.header{
   border: 1px solid transparent;
//    background-color: pink;
   padding-bottom: 15px;
   box-shadow: 0 2px 2px 2px rgba(#000,.1);
//   display: flex;
  .item{
    float: left; 
    padding: 5px 10px;
    margin:20px 10px 0 10px;
    font-size: 12px;
    height: 20px;
    line-height: 20px;
    border-radius:20px;
  }
  .item1{
    border-top: 1px solid transparent;
    width:30%;
    float: right; 
    margin-top:10px;
    img{
        width:30px;
        height: 30px;
        vertical-align: middle;
        margin-left:10px;
    }
    .img1{
    width:28px;
    height: 28px;
    }
  }
//   .item1 .el-input.el-input--prefix{
//       width:70%;
//       border-radius:20px;
//       background-color: red;
//   }
//   .el-input__inner{
//  border-radius:20px;
//   }
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
