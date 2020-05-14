<template >
    <div  class="dengjikaoshi">
      <div class="centers">
        <div class="title">
            <div class="title-item">
              <span   @click="checked(1)" :class="{'color':activeIndex==1}"  >笔试</span>
              <!-- <span   @click="checked(2)" :class="{'color':activeIndex==2}"  >听力</span> -->
            </div>
        </div>
        <div class="content">
            <ul  v-if="activeIndex==1" :class="{'active':activeIndex==1}">
              <!-- isHasA == false?open2(): -->
              <li @click="toPath(3)" :class="isHasA == false?'block':''">
                  <img src="../../assets/image/index/siji (4).png" alt="">
              <span>A级</span>
            </li>
            <!-- isHasB == false?open2(): -->
            <li @click="toPath(4)" :class="isHasB == false?'block':''">
                <img src="../../assets/image/index/siji (5).png" alt="">
              <span>B级</span>
            </li>
                <li @click="toPath(1)" :class="isHasFour == false?'block':''">
                  <img src="../../assets/image/index/siji (1).png" alt="">
                  <span>四级</span>
                </li>
                <!-- isHasSix == false?open2():toPath(2,2) -->
                <li @click="toPath(2)" :class="isHasSix == false?'block':''">
                    <img src="../../assets/image/index/siji (7).png" alt="">
                  <span>六级</span>
                </li>               
                <!-- isHasFour == false?open2(): -->
                <li  @click="toPath(5)" :class="isHasFour == false?'block':''">
                    <img src="../../assets/image/index/zs.png" alt="">
                  <span>专四</span>
                </li>
                <!-- isHasSix == false?open2(): -->
                <li @click="toPath(6)" :class="isHasSix == false?'block':''">
                    <img src="../../assets/image/index/zb.png" alt="">
                  <span>专八</span>
                </li>
                <li @click="toPath(7)">
                    <img src="../../assets/image/index/siji (5).png" alt="">
                    <span>考研</span>
                </li> 
                <li @click="toPath(8)">
                  <img src="../../assets/image/index/ry.png" alt="">
                  <span>日语</span>
              </li>     
                <!-- isHasA == false?open2(): -->
                <li @click="toPath(9)" :class="isHasA == false?'block':''">
                    <img src="../../assets/image/index/siji (3).png" alt="">
                  <span>雅思</span>
                </li>
                <!-- isHasB == false?open2(): -->
                <li @click="toPath(10)" :class="isHasB == false?'block':''">
                    <img src="../../assets/image/index/siji (2).png" alt="">
                  <span>托福</span>
                </li>                         
              </ul>              
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
      activeIndex:1,
      school_id: '',
      isHasFour: false,
      isHasSix: false,
      isHasA: false,
      isHasB: false,
        };
    },
    created() {
    },
    mounted() {
        this.school_id = localStorage.getItem("school_id");
    // this.getItem()
    },
    methods: {
        open2(){

        },
        open1(){

        },
        toPath(val){
      // localStorage.setItem("type", type); // 存试卷类型
         localStorage.setItem("test_paper_type_id", val); // 存试卷类型
          if(val==5||val==6||val==7||val==8||val==9||val==10){
            this.$message({message:'学校没有开通此题库请联系我们申请开通',type: "error",duration: 2000,offset:90});
           return
          }
          this.$router.push('shijuan')

        },
        checked(val){
            this.activeIndex=val
        }
    }
};
</script>

<style scoped lang="less">
.dengjikaoshi{
    padding-top:80px;
    height: 100%;
    background-color: #f0f0f0;
    /* background-color: #ffffff; */
    /* .centers{
      width: 94%;
      margin:0 auto;
    } */
  .title{
    background-color: #ffffff;
    padding-left: 100px;
    height: 60px;
    line-height:60px;
    box-sizing:border-box;
    text-align:center;
    .title-item{
      /* display: inline;
      padding:10px 0;
      box-shadow:rgba(0,0,0,.3) 0px 0px 5px; */
      /* box-shadow: 0; */
    }
    span{
      display: inline-block;
      margin:0 30px;
      font-size: 1.5em;
      padding:0 20px;
      line-height:60px;
      /* course:pointer */
    }
    .color{
      color:#409EFF;
      /* background-color: #F1F6FF; */
    }
  
}
.content{
/* padding:10px;
margin-top:10px; */
.active{
       background-color: #F1F6FF;
}
ul {
      display:flex;
      justify-content:center;
      /* justify-content: flex-start; */
      flex-wrap:wrap;    
      padding-top:10px;
      /* background-color: red; */
      /* margin:0; */
      li {
        height: 160px;
        width: 160px;
        float: left;
        margin: 10px;
        box-sizing: border-box;
        padding: 20px;
        margin-top:0;
        background-color: #ffffff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        transition-duration: 0.4s;
        &:hover {
          box-shadow: 0 2px 4px rgba(0, 0, 0, .15), 0 0 6px rgba(0, 0, 0, .15);
          transform: translateY(-2px);
        }
        img {
          width: 80px;
          height: 80px;
          margin: 10px auto 10px;
          display: block;
        }
        span{
          text-align: center;
          display: block;
          font-size: 18px;
          color: #000;
        }
      }
      
    }
    /* ul li:nth-child(1){
        margin-left:40px;
      } */
}
}

</style>
