<template>
  <div class="right" style="margin-top:60px;">
    <!-- 代办理事项 -->
      <div class="navs">
               <!-- <div class="nav-item" @click="goto(5)">
                   <div class="top_item">
                      <img :src="require('@/assets/image/qusetionlist/danci.png')" >
                      <div class="list-item" :class="{'active':selected==5}">单词列表</div>
                   </div>
               </div> -->
               <!-- <div class="nav-item" @click="goto(5)">
                <div class="top_item">
                  <div class="item-left">
                      <img :src="require('@/assets/image/qusetionlist/danci.png')" >                     
                  </div>
                  <div class="list-item" :class="{'active':selected==5}">单词列表</div>
                </div>
            </div> -->
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
            <!-- </div> -->
  
    <!-- 表格数据 -->
    <div class="box-list">
        <stufour v-if="selected==1"></stufour>
        <stusix v-if="selected==2"></stusix>
        <stua v-if="selected==3"></stua>
        <stub v-if="selected==4"></stub>
        <!-- <studanciList v-if="selected==5"></studanciList> -->
    </div>
  </div>
</template>

<script>
 import studanciList from './studanci'; 
 import stufour from './stufour'; // 四级
 import stusix from './stusix'; //六级
import stua from './stua';//a级
  import stub from './stub'; //b级

import qs from "qs";

export default {
  components:{
    studanciList,stufour,stusix,stua,stub
  },
  data() {
    return {
      selected: 1,
  
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
  overflow: auto;
 
}
.data-box ul {
  overflow: hidden;
  margin: 10px 0;
}
.data-box ul li {
  float: left;
  width: 20%;
  padding: 10px 30px;
  /* // height: 80px; */
  box-sizing: border-box;
  /* // background:pink; */
 
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

.navs{
       display: flex;
      justify-content: space-between;
        height: 100px;
       box-sizing: border-box;
}
.nav-item{
        width: 18%;
        box-sizing: border-box;
        height: 100px;
        line-height: 100px;
        display: flex;
        margin:0 5%;
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
          font-size:1.5em;
          font-weight: bold;
          color: #949494;
}
 .list-item.active{
  color:#FC9A52;
}
</style>
