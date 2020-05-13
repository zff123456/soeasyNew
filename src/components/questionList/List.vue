<template>
  <div class="right" style="margin-top:60px;">
    <!-- 代办理事项 -->
      <div class="navs">
               <div class="nav-item" @click="goto(5)">
                   <div class="top_item">
                     <div class="item-left">
                         <img :src="require('@/assets/image/qusetionlist/danci.png')" >                     
                     </div>
                     <div class="list-item" :class="{'active':selected==5}">单词列表</div>
                   </div>
               </div>
                <div class="nav-item"  @click="goto(1)">
                   <div class="top_item">
                    <div class="item-left">
                      <img  :src="require('@/assets/image/qusetionlist/four.png')" >                    
                  </div>
                  <div  class="list-item" :class="{'active':selected==1}">四级列表</div>
                   
                   </div>
                </div>
                <div class="nav-item"  @click="goto(2)">
                   <div class="top_item">
                     <div class="item-left">
                      <img  :src="require('@/assets/image/qusetionlist/six.png')" >
                     </div>
                   
                    <div class="list-item" :class="{'active':selected==2}">六级列表</div>
                   </div>
                </div>
                <div class="nav-item"  @click="goto(3)">
                   <div class="top_item">
                     <div class="item-left">
                      <img  :src="require('@/assets/image/qusetionlist/a.png')" >
                     </div>
                     
                      <div class="list-item" :class="{'active':selected==3}">A级列表</div>
                   </div>
                </div>
                 <div class="nav-item"  @click="goto(4)">
                    <div class="top_item">
                      <div class="item-left">
                        <img  :src="require('@/assets/image/qusetionlist/b.png')" >
                       </div>
                      
                      <div class="list-item" :class="{'active':selected==4}">B级列表</div>
                    </div>
                </div>
            </div>
    <!-- <div class="data-box">
      
      <ul class="clearfix">
         <li  @click="goto(5)">
           <div :class="[{'active':selected==5},'item']"   >
             <img src="../../assets/image/qusetionlist/danci.png" alt="" width="40px;height:40px;">
              <span  >单词列表</span>
           </div>
         </li>
        <li  @click="goto(1)">
          <div :class="[{'active':selected==1},'item']"  >
             <img src="../../assets/image/qusetionlist/four.png" alt="" width="40px;height:40px;">
              <span  >四级列表</span>
           </div>
         </li>
        <li @click="goto(2)">
          <div :class="[{'active':selected==2},'item']">
             <img src="../../assets/image/qusetionlist/six.png" alt="" width="40px;height:40px;">
              <span  >六级列表</span>
           </div>
        </li>
        <li @click="goto(3)" >
          <div :class="[{'active':selected==3},'item']">
             <img src="../../assets/image/qusetionlist/a.png" alt="" width="40px;height:40px;">
              <span  >A级列表</span>
           </div>
         </li>
        <li @click="goto(4)">
          <div :class="[{'active':selected==4},'item']">
             <img src="../../assets/image/qusetionlist/b.png" alt="" width="40px;height:40px;">
              <span  >B级列表</span>
           </div>
         </li>
      </ul>
    </div> -->
    <!-- 表格数据 -->
    <div class="box-list">    
       <fourList v-if="selected==1"></fourList>   <!-- 四级列表 -->
        <sixList v-if="selected==2"></sixList><!-- 六级列表 -->
        <aList v-if="selected==3"></aList><!-- a级列表 -->
        <bList v-if="selected==4"></bList><!-- b级列表 -->
        <danciList v-if="selected==5"></danciList><!-- 单词列表 -->
    </div>
  </div>
</template>

<script>
 import danciList from './danciList'; 
 import fourList from './fourList'; // 四级
 import sixList from './sixList'; //六级
import aList from './aList';//a级
  import bList from './bList'; //b级

import qs from "qs";

export default {
  components:{
    fourList,sixList,bList,aList,danciList
  },
  data() {
    return {
      selected: 5,
  
    };
  },
  created() {
  
  },
  computed: {},
  mounted() {},
  methods: {
    goto(val){

        console.log(val)
        this.selected=val 
     }
  }
};
</script>

<style lang="less" scoped>
.right {
  padding-top:10px;
   min-height: 100%;
  border: 1px solid transparent;
  background:url(../../assets/image/creatshijuan/bg.png)  no-repeat   ;
  width:100%;
  height:100%;
  /* min-width: 1366px; */
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  padding-bottom: 30px;
  /* overflow: auto;; */
 
}
.data-box ul {
  overflow: hidden;
  margin: 10px 0;
}
.data-box ul li {
  float: left;
  width: 20%;
  padding: 10px 30px;
  // height: 80px;
  box-sizing: border-box;
  // background:pink;
 
img{
  vertical-align: middle;
}
span{
  display: inline-block;
margin-left: 30px;
}
.item{
  height: 50px;
  line-height: 50px;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 2px 2px 2px rgba(#000,.1)
}
}

.box-list{
  /* // background-color: #fff; */
}
.navs{
        display: flex;
        justify-content: space-between;
        height: 100px;
       box-sizing: border-box;
        /* // margin-top: 20px; */
    }
.nav-item{
        width: 18%;
        box-sizing: border-box;
        height: 100px;
        line-height: 100px;
        display: flex;
        margin:0 2%;
        border-radius: 10px;
        background-color:#fff;
        .top_item{
          width:100%;
        }
        .item-left{
          width: 50%;
          float: left;
          box-sizing:border-box;
          img{
          width:80px;
          height:80px;
          box-sizing:border-box;
          margin:10px 15%;
        }

        }
      
}
.list-item{
          width:40%;
          float: left;
          font-size:1.5em ;
          font-weight: bold;
          color: #949494;
}
 /* .list-item{
          font-size: 24px;
          font-weight: bold;
          color: #949494;
          float: left;
        } */
 .list-item.active{
  color:#FC9A52;
}
</style>
