<template>
    <div class="tiku"  >
      <!-- v-loading="isLoading" element-loading-text="拼命加载中" -->
        <audio ref="xinwenAudio"></audio>
       <div class="centers">
       <div class="header" style="padding-top:10px;">
           <el-button type="warning"  plain v-for="(item,key) in fourList" :key="key"  style="border:none; " @click="cheched(1,item)" > {{item}} </el-button>
       </div>
        <div class="content" style="background-color: #fff;">
            <div class="content-box" v-if="problem == '作文' || problem == '英译汉' || problem == '篇章翻译'">
             
                <div class="big-box" >
                  <div class="zuowen-title" v-if="problem != '英译汉'" style="font-size:14px;padding:10px 0 10px 10px;line-height: 25px;">{{itemOne.wenti}}</div>
                  <!-- <div v-html="itemOne.wenti"  v-if="problem != '英译汉'"></div> -->
                  <div v-html="itemOne.wenzhang" v-if="problem == '英译汉'"></div>
                  <img v-if="itemOne.is_img != 0 && problem == '作文' && itemOne.is_img != undefined" :src="itemOne.img_url" alt="" style="height: 200px;margin-left: 145px;">
                  <el-input v-model="itemOne.yn" :autosize="{ minRows: 26}" type="textarea" style="border-radius: 0;margin: 10px 0"></el-input>
                  <div v-html="itemOne.daan" v-if="itemOne.state == 0 && problem != '英译汉'" style="border: 1px solid #ccc;padding:10px;font-size: 14px;line-height: 25px;">{{itemOne.daan}}</div>
                  <div v-html="itemOne.cankaodaan" v-if="itemOne.state == 0 && problem == '英译汉'" style="border: 1px solid #ccc;padding:10px;font-size: 14px;line-height: 25px;"></div>
                  <div v-html="itemOne.jiexi" v-if="itemOne.state == 0" style="margin:10px 0;border: 1px solid #ccc;padding:10px;font-size: 14px;line-height: 25px;">{{itemOne.jiexi}}</div>
                  <!-- 提交按钮。 -->
                  <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin:10px 0;transform: translateX(-30px);"></div> -->
                  <el-button type="primary" @click="submitZuowen(itemOne)">提交</el-button>
                  <!-- 分页插件。 -->
                  <div  style="float: right;">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :page-size="pagesize"
                      :current-page.sync="currentPage"
                      layout="total, prev, pager, next"
                      :total="itemData.length"
                    ></el-pagination>
                  </div>
                </div>
                
              
                <!-- <div style="height:20px;width:100%;"></div> -->
              </div>


               <!--  第一种类型大题音频，小题音频，abcd单选： -->
     <div class="content-box" v-if="problem == '新闻报道' || problem == '听讲座对话'|| problem == '听长对话' || problem == '听短文理解' || problem == '听篇章' || problem == '听短对话'">
        <div class="big-box" v-for="(item,key) in itemData.slice((currentPage -1) * pagesize, currentPage * pagesize)">
            <div class="zuowen-title" style="font-size:14px;padding:10px 0 10px 10px;line-height: 25px;">Directions: In this section, you will hear several newsreports.At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A，B，C and D. Then select the corresponding letter on the web page.</div>
            <!-- <audio ref="xinwenOpt" size="mini"></audio> -->
            <el-button size="mini" type="primary" icon="el-icon-video-play" @click="play_xinwen(item,key)" style="background: rgb(0, 234, 238); border: none;padding: 6px 11px;font-size: 12px;margin:10px 0;">播放大题听力</el-button>
            <div v-if="item.state == 0" v-html="item.yiwen" style="margin-top:10px;border: 1px solid #ccc;padding:10px">{{item.yiwen}}</div>
            <div class="duanwen-options" >
              <div class="option-one" v-for="(ie, k, index) in item.xuanzhe[0]">
                <el-button type="success" icon="el-icon-video-play" @click="play_xinwen_opt(ie,k)" ref="dw_btn" style="padding: 5px 10px;font-size: 12px;margin:10px 0 ;background: rgb(174, 93, 161); border: none;" >第({{k + 1}})小题听力</el-button>
                <div class="xuanxiang" v-for="(i,e) in ie.xuanxiang" style="margin-top: 5px">
                  <el-radio v-model="ie.yn" :label="e" :class="item.state == 0 && ie.yn != ie.daan && e == ie.daan? 'red':''">{{i}}</el-radio>
                </div>
                <div v-if="item.state == 0" v-html="ie.tiyan" style="margin-top:10px;border: 1px dashed #ccc;padding:10px">{{ie.tiyan}}</div>
                <div v-if="item.state == 0" v-html="ie.jiexi" style="margin-top:10px;border: 1px dashed #ccc;padding:10px">{{ie.jiexi}}</div>
              </div>
            </div>
            <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin:10px 0;transform: translateX(-30px);"></div> -->
          <!-- 提交按钮。 -->
          <el-button type="primary" @click="submitXinwen(item)" style="margin-bottom:10px;">提交</el-button>
          <div style="float:right;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="pagesize"
              layout="total, prev, pager, next"
              :current-page.sync="currentPage"
              :total="itemData.length"
            ></el-pagination>
          </div>
          <!-- <div style="height: 3px;width: 100%;background-color: #ccc;margin-bottom: 10px;"></div> -->
        </div>
        <!-- 分页插件。 -->
        
        <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin:60px 0 0;transform: translateX(-30px);"></div> -->
      </div>

       <!-- 单独一种听单句 -->
    <div class="content-box" v-if="problem == '听单句'">
        <div class="big-box" v-for="(item,key) in itemData.slice((currentPage -1) * pagesize, currentPage * pagesize)">
            <div class="zuowen-title" style="font-size:14px;padding:10px 0 10px 10px;line-height: 25px;">Directions: In this section, you will hear several newsreports.At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A，B，C and D. Then select the corresponding letter on the web page.</div>
            <!-- <audio ref="xinwenOpt" size="mini"></audio> -->
              <div class="duanwen-options" >
                <div class="option-one" v-for="(ie, k, index) in item.xuanzhe[0]">
                  <el-button type="success" icon="el-icon-video-play" @click="play_xinwen_opt(ie,key,k)" ref="dw_btn" style="padding: 5px 10px;font-size: 12px;margin:10px 0">第({{k + 1}})小题听力</el-button>
                  <div class="xuanxiang" v-for="(i,e) in ie.xuanxiang" style="margin-top: 5px">
                    <el-radio v-model="ie.yn" :label="e" :class="item.state == 0 && ie.yn != ie.daan && e == ie.daan? 'red':''">{{i}}</el-radio>
                  </div>
                  <div v-if="item.state == 0" v-html="ie.tiyan" style="margin-top:10px;border: 1px dashed #ccc;padding:10px">{{ie.tiyan}}</div>
                  <div v-if="item.state == 0" v-html="ie.jiexi" style="margin-top:10px;border: 1px dashed #ccc;padding:10px">{{ie.jiexi}}</div>
                </div>
              </div>
            <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin:10px 0;transform: translateX(-30px);"></div> -->
          <!-- 提交按钮。 -->
          <el-button type="primary" @click="submitXinwen(item)" style="margin:10px 0">提交</el-button>
          <!-- <div style="height: 3px;width: 100%;background-color: #ccc;margin-bottom: 10px;"></div> -->
        </div>
        <!-- 分页插件。 -->
        <div style="float: right;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            :current-page.sync="currentPage"
            layout="total, prev, pager, next"
            :total="itemData.length"
          ></el-pagination>
        </div>
        <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin:60px 0 0;transform: translateX(-30px);"></div> -->
      </div>
    <!-- 富文本段落，遍历空数组，下拉选择返回答案   选词填空 -->
    <div class="content-box" v-if="problem == '选词填空'">
        <div class="big-box" v-for="(item,key) in itemData.slice((currentPage -1) * pagesize, currentPage * pagesize)">
          <div class="xuancutiankong-box" style="overflow:hidden">
            <div v-html="item.duanwen" style="padding:10px;padding:10px;font-size: 14px;line-height: 25px;">{{item.duanwen}}</div>
            <div class="for-box" v-for="(ie, k, index) in item.xuan" style="margin: 10px 20px;width:300px;float:left;overflow: hidden;">
              <div class="wenti" style="float:left;margin-right:10px;width:70px">第{{k + 1}}题:</div>
              <el-select v-model="xuancitiankongDy[k]" placeholder="请选择">
                <el-option
                  v-for="e in ie"
                  :key="e"
                  :label="e"
                  :value="e">
                </el-option>
              </el-select>
            </div>
          </div>
          <div style="padding:10px;padding:10px;font-size: 14px;line-height: 25px;" v-if="item.state == 0">{{item.daan}}</div>
          <div style="padding:10px;padding:10px;font-size: 14px;line-height: 25px;" v-if="item.state == 0">{{item.yiwen}}</div>
          <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin:10px 0;transform: translateX(-30px);"></div> -->
          <!-- 提交按钮。 -->
          <el-button type="primary" @click="submitXinwen(item)">提交</el-button>
            <!-- 分页插件。 -->
         <div style="float: right;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            :current-page.sync="currentPage"
            layout="total, prev, pager, next"
            :total="itemData.length"
          ></el-pagination>
        </div>
        </div>
      
        <!-- <div style="height:20px;width:100%;"></div> -->
      </div>

       <!-- 富文本段落，问题，单行输入框  阅读理解  -->
    <div class="content-box" v-if="problem == '阅读理解' || problem == '词汇匹配'">
        <div class="big-box" v-for="(item,key) in itemData.slice((currentPage -1) * pagesize, currentPage * pagesize)">
          <div v-html="item.duanwen" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;" v-if="problem == '阅读理解'"></div>
          <div v-html="item.beixuanxiang" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;" v-if="problem == '词汇匹配'"></div>
          <div v-html="item.jiexi" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;" v-if="problem == '词汇匹配' && item.state == 0"></div>
          <div v-if="item.state == 0" v-html="item.cankaodaan" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;"></div>
          <div class="xuanxiang" v-for="(ie, k, index) in item.xuanzhe">
            <div v-html="ie.wenti" style="margin-top:10px;padding:10px"></div>
            <el-input v-model="ie.yn" placeholder="请输入答案" style="box-sizing: border-box;padding: 0 10px;margin-bottom:10px;font-size: 14px;line-height: 25px;"></el-input>
            <div class="zuowen-title" v-if="item.state == 0">{{ie.daan}}</div>
            <div v-if="item.state == 0 && problem == '阅读理解'" v-html="ie.tiyan" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;"></div>
          </div>
          <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin-bottom:10px;transform: translateX(-30px);"></div> -->
          <!-- 提交按钮。 -->
          <el-button type="primary" @click="submitXinwen(item)">提交</el-button>
           <!-- 分页插件。 -->
        <div style="float: right;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            :current-page.sync="currentPage"
            layout="total, prev, pager, next"
            :total="itemData.length"
          ></el-pagination>
        </div>
        </div>
       
        <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin:60px 0 0;transform: translateX(-30px);"></div> -->
      </div>

        <!-- 富文本段落，循环小题，答案A - T  长篇阅读   -->
    <div class="content-box" v-if="problem == '长篇阅读'">
        <div class="big-box"      v-for="(ie,k) in itemData.slice((currentPage -1) * pagesize, currentPage * pagesize)">
          <div v-html="ie.beixuanxiang" style="padding:10px;font-size: 14px;line-height: 25px;"></div>
            <div v-for="(item, key, index) in ie.xuanzhe" style="margin-bottom:10px">
              <div class="wenti" style="float:left;margin-left:20px;margin-top:10px;width:70px;">第{{key + 1}}题:</div>
              <div v-html="item.wenti" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;">{{item.wenti}}</div>
              <el-select v-model="item.yn" placeholder="请选择" style="margin-left:20px">
                <el-option
                  v-for="item in english"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div style="margin-top:10px;padding:10px;margin-left:10px;font-size: 14px;line-height: 25px;" v-if="ie.state == 0 ">答案：{{item.daan}}</div>
              <div v-html="item.tiyan" style="padding:10px;margin-left:10px;font-size: 14px;line-height: 25px;" v-if="ie.state == 0 "></div>
              <div v-html="item.jiexi" style="padding:10px;margin-left:10px;font-size: 14px;line-height: 25px;" v-if="ie.state == 0 "></div>
            </div>
          <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin-bottom:10px;transform: translateX(-30px);"></div> -->
          <!-- 提交按钮。 -->
          <el-button type="primary" @click="submitYuedu(ie)">提交</el-button>
          <div style="float: right;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="pagesize"
              layout="total, prev, pager, next"
              :total="itemData.length"
              :current-page.sync="currentPage"
            ></el-pagination>
          </div>
        </div>
        <!-- 分页插件。 -->
       
        <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin:60px 0 0;transform: translateX(-30px);"></div> -->
      </div>

        <!-- 富文本段落，问题，abcd单选  仔细阅读 -->
    <div class="content-box" v-if="problem == '仔细阅读'">
        <div class="big-box" v-for="(item,key) in itemData.slice((currentPage -1) * pagesize, currentPage * pagesize)">
          <div class="zuowen-title" style="font-size: 14px;line-height: 25px;">Directions: In this section, you will hear several newsreports.At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A，B，C and D. Then select the corresponding letter on the web page.</div>
          <div v-html="item.wenzhang" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;">{{item.wenzhang}}</div>
          <div class="duanwen-options">
            <div class="option-one" v-for="(ie, k, index) in item.xuanzhe[0]">
              <div v-html="ie.wenti" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;">{{ie.wenti}}</div>
              <div class="xuanxiang" v-for="(i,e) in ie.xuanxiang" style="margin-top: 5px">
                <el-radio v-model="ie.yn" :label="e" :class="item.state == 0 && ie.yn != ie.daan && e == ie.daan? 'red':''">{{i}}</el-radio>
              </div>
              <div v-if="item.state == 0" v-html="ie.jiexi" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;">{{ie.jiexi}}</div>
              <div v-if="item.state == 0" v-html="ie.tiyan" style="padding:10px;font-size: 14px;line-height: 25px;">{{ie.tiyan}}</div>
            </div>
          </div>
          <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin-bottom:10px;transform: translateX(-30px);"></div> -->
          <!-- 提交按钮。 -->
          <el-button type="primary" @click="submitXinwen(item)">提交</el-button>
           <!-- 分页插件。 -->
        <div style="float:right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="itemData.length"
            :current-page.sync="currentPage"
          ></el-pagination>
        </div>
        </div>
       
        <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin:60px 0 0;transform: translateX(-30px);"></div> -->
      </div>
      <!-- 阅读填空  短文填空 -->
      <div class="content-box" v-if="problem == '阅读填空' || problem == '短文填空' ">
        <div class="big-box" v-for="(ie,k) in itemData.slice((currentPage -1) * pagesize, currentPage * pagesize)">
          <div class="zuowen-title" style="font-size: 14px;line-height: 25px;">Directions: In this section you will hear a record short passage.The passage is printed in the test paper,but with some words or phrases missing.The passage will be read two times.You are required to put the missing words or phrases on the Answer Sheet in order of the number blanks according to what you hear.Now the passage will begin.</div>
          <div style="overflow:hidden">
            <el-button size="mini" type="primary" icon="el-icon-video-play" @click="play_yuedu(ie,k)" v-if="problem == '短文填空'" style="padding: 5px 10px;font-size: 12px;margin:10px 0">播放音频</el-button>
            <div v-html="ie.wenti" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;" v-if="problem == '短文填空'"></div>
            <div v-html="ie.duanwen" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;" v-if="problem == '阅读填空'"></div>
            <div style="min-height:100%;overflow:hidden">
              <div v-for="(item, key, index) in ie.yn" >
                <div style="float:left;margin: 10px 10px">
                  <span>第{{key + 1}}题：</span>
                  <el-input v-model="ie.yn[key]" placeholder="请输入答案" style="box-sizing: border-box;padding: 0 5px;width: 200px"></el-input>
                </div>
              </div>
            </div>
            <div v-if="ie.state == 0 " v-html="ie.daan" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;"></div>
            <div v-if="ie.state == 0 " v-html="ie.yiwen" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;"></div>
            <div v-if="ie.state == 0 " v-html="ie.cankaodaan" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;"></div>
          </div>
          <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin-bottom:10px;transform: translateX(-30px);"></div> -->
          <!-- 提交按钮。 -->
          <el-button type="primary" @click="submitYuedu(ie)">提交</el-button>
            <!-- 分页插件。 -->
        <div style="float:right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="itemData.length"
            :current-page.sync="currentPage"
          ></el-pagination>
        </div>
        </div>
      
        <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin:60px 0 0;transform: translateX(-30px);"></div> -->
      </div>

      <!-- 大音频，小音频，输入框   听短文 -->
      <div class="content-box" v-if="problem == '听短文' ">
        <div class="big-box" v-for="(item,key) in itemData.slice((currentPage -1) * pagesize, currentPage * pagesize)">
          <div class="zuowen-title" style="font-size: 14px;line-height: 25px;">Directions: In this section, you will hear several newsreports.At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A，B，C and D. Then select the corresponding letter on the web page.</div>
          <!-- <audio ref="xinwenOpt" size="mini"></audio> -->
            <el-button size="mini" type="primary" icon="el-icon-video-play" @click="play_xinwen(item,key)" style="padding: 6px 11px;font-size: 12px;margin:10px 0">播放大题听力</el-button>
            <div v-if="item.state == 0" v-html="item.yiwen" style="margin-top:10px;border: 1px solid #ccc;padding:10px">{{item.yiwen}}</div>
            <div class="duanwen-options" style="margin-top:10px">
              <div class="option-one" v-for="(ie, k, index) in item.xuanzhe">
                <!-- <el-button type="success" icon="el-icon-video-play" @click="play_xinwen_opt(ie,k)" style="padding: 5px 10px;font-size: 12px;">第({{k + 1}})小题听力</el-button> -->
                <div v-html="ie.wenti" style="padding:10px"></div>
                <el-input v-model="ie.yn" placeholder="请输入答案" style="box-sizing: border-box;padding: 0 10px"></el-input>
                <div v-if="item.state == 0" v-html="ie.jiexi" style="margin-top:10px;border: 1px dashed #ccc;padding:10px;font-size: 14px;line-height: 25px;">{{ie.tiyan}}</div>
                <div v-if="item.state == 0" v-html="ie.daan" style="margin-top:10px;border: 1px dashed #ccc;padding:10px;font-size: 14px;line-height: 25px;">{{ie.jiexi}}</div>
              </div>
            </div>
          <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin:10px 0;transform: translateX(-30px);"></div> -->
          <!-- 提交按钮。 -->
          <el-button type="primary" @click="submitXinwen(item)">提交</el-button>
          <!-- 分页插件。 -->
        <div style="float:right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="itemData.length"
            :current-page.sync="currentPage"
          ></el-pagination>
        </div>
        </div>
        
        <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin:60px 0 0;transform: translateX(-30px);"></div> -->
      </div>
      <!-- 问题，abcd单选  词汇选择   翻译选择 -->
      <div class="content-box" v-if="problem == '词汇选择' || problem == '翻译选择'">
        <div class="big-box" v-for="(item,key) in itemData.slice((currentPage -1) * pagesize, currentPage * pagesize)">
          <div v-html="item.wenti" style="margin-top:10px;padding:10px"></div>
          <div class="xuanxiang" v-for="(i,e) in item.xuanxiang" style="margin-top: 5px;margin-bottom:10px">
            <el-radio v-model="item.yn" :label="e" :class="item.state == 0 && item.yn != item.daan && e == item.daan? 'red':''">{{i}}</el-radio>
          </div>
          <div v-if="item.state == 0" v-html="item.yiwen" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;"></div>
          <div v-if="item.state == 0" v-html="item.jiexi" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;"></div>
          <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin-bottom:10px;transform: translateX(-30px);"></div> -->
          <!-- 提交按钮。 -->
          <el-button type="primary" @click="submitFanyi(item)" style="margin-bottom:50px;">提交</el-button>
          <div style="float: right;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :page-size="pagesize"
              layout="total, prev, pager, next"
              :total="itemData.length"
              :current-page.sync="currentPage"
            ></el-pagination>
          </div>
        </div>
        <!-- 分页插件。 -->
        
      </div>
      <!-- 问题，单行输入框  词汇填空 -->
      <div class="content-box" v-if="problem == '词汇填空'">
        <div class="big-box" v-for="(item,key) in itemData.slice((currentPage -1) * pagesize, currentPage * pagesize)">
          <div v-html="item.wenti" style="margin-top:10px;padding:10px"></div>
          <el-input v-model="item.yn" placeholder="请输入答案" style="box-sizing: border-box;padding: 0 10px;margin-bottom:10px"></el-input>
          <div v-if="item.state == 0" v-html="item.yiwen" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;"></div>
          <div v-if="item.state == 0" v-html="item.daan" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;"></div>
          <div v-if="item.state == 0" v-html="item.cankaodaan" style="margin-top:10px;padding:10px;font-size: 14px;line-height: 25px;"></div>
          <!-- <div style="height:20px;width:110%;background-color: #F8F8F8;margin-bottom:10px;transform: translateX(-30px);"></div> -->
          <!-- 提交按钮。 -->
          <el-button type="primary" @click="submitXinwen(item)">提交</el-button>
           <!-- 分页插件。 -->
        <div style="float: right;">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            layout="total, prev, pager, next"
            :total="itemData.length"
            :current-page.sync="currentPage"
          ></el-pagination>
        </div>
        </div>

      </div>
        </div>

       </div>
    </div>
</template>

<script>
 import qs from "qs";
export default {
  name:'stufour',
    data() {
        return {
        currentPage:1,
        pagesize:1,
        isLoading:false,
        school_id:1,
        problem:'',
        type:1,
        itemData:[],
         itemOne:[],
        fourList: ["作文","听短文理解","选词填空","新闻报道","长篇阅读","仔细阅读","听长对话","篇章翻译"],
         xuancitiankongDy: [], // 选词填空答案
        english: [
        {value: 'A',label: '选项 A'},{value: 'B',label: '选项 B'},{value: 'C',label: '选项 C'},{value: 'D',label: '选项 D'},{value: 'E',label: '选项 E'},
        {value: 'F',label: '选项 F'},{value: 'G',label: '选项 G'},{value: 'H',label: '选项 H'},{value: 'I',label: '选项 I'},{value: 'J',label: '选项 J'},
        {value: 'K',label: '选项 K'},{value: 'L',label: '选项 L'},{value: 'M',label: '选项 M'},{value: 'N',label: '选项 N'},{value: 'O',label: '选项 O'},
        {value: 'P',label: '选项 P'},{value: 'Q',label: '选项 Q'},{value: 'R',label: '选项 R'},{value: 'S',label: '选项 S'},{value: 'T',label: '选项 T'}
      ],
        };
    },
    created() {

    },
    mounted() {
        // this.getList()
        this.getTimu(this.fourList[0], this.type);
    },
    watch: {
    itemData( val ){
      this.changeOne( val );
    //   console.log(val);
      
      deep: true   // 深度监听，监听到更深层级值的变化
    },
    currentPage( val ){
      this.itemOne = this.itemData.slice((this.currentPage -1) * this.pagesize, this.currentPage * this.pagesize);
      console.log(this.itemOne );
      
      this.itemOne = this.itemOne[0];
      console.log("触发分页事件");
      deep: true   // 深度监听，监听到更深层级值的变化
    },
  },
    methods: {
        handleSizeChange(val) {
            this.pagesize = val;
        },
        handleCurrentChange(val){
            this.currentPage = val;
         this.$set(this,"currentPage", val);

        },

    changeOne( val ){
      console.log(this.itemData.length);
      console.log(this.itemData);
      
      if (this.itemData.length == 1) {
        this.itemOne = val[0];
        console.log( this.itemOne);
        
      } else {
        this.itemOne = this.itemData.slice((this.currentPage -1) * this.pagesize, this.currentPage * this.pagesize);
        console.log( this.itemOne);
        this.itemOne = this.itemOne[0];
        console.log( this.itemOne);
        
      }
    },
    //点击
        cheched(val,value){
        //    this.type=val,
        //    this.problem=value 
           console.log(val,value); 
           this.getTimu(value, val);                 
        },
        // getList(){
        //  if (this.type == 1){ this.problem = this.fourList[0];this.problemList = this.fourList };
        //  if (this.type == 2){ this.problem = this.sixList[0];this.problemList = this.sixList };
        //  if (this.type == 3){ this.problem = this.aList[0];this.problemList = this.aList };
        //  if (this.type == 4){ this.problem = this.bList[0];this.problemList = this.bList };
        //  this.getTimu(this.problem, this.type);
        // },
    async getTimu(item, type){
      this.isLoading = true;
      this.problem = item;
      this.type = type;
      this.currentPage = 1;
      const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/Examination/danxiangtupo",qs.stringify({ test_paper_type_name:1, problem: this.problem }));
      if (res.status === 200 && res.data.code === "1") {
        //   console.log(res);
          this.itemData=res.data.info
        for ( var i = 0 ; i < this.itemData.length ; i++) {
        //   console.log(this.itemData[i]);         
          if (this.itemData[i].is_img  == 1){
            this.itemData[i].img_url = `${BASE_URL}${this.itemData[i].img_url}`;
          }
        };
        this.isLoading = false;
      };
    },
   
    // 大题播放
    submitXinwen(item){
      item.state = 0;
    },
    // 
    submitFanyi(item){
      item.state = 0;
    },
    submitYuedu(ie){
      ie.state = 0;
      console.log(ie.state);
    },
    play_yuedu(ie,k){
      // console.log(ie,k);
      this.$refs.xinwenAudio.src = `${BASE_URL}${ie.audio_url}`;
      this.$refs.xinwenAudio.play();
    },
    play_xinwen(item){ // 新闻报道 duanwenAudio
      console.log(this.$refs.xinwenAudio);
      this.$refs.xinwenAudio.src = `${BASE_URL}${item.audio_url}`;
      this.$refs.xinwenAudio.play();
    },
    play_xinwen_opt(ie,k){ // 新闻报道 单项
      const res = this.itemData.slice((this.currentPage -1) * this.pagesize, this.currentPage * this.pagesize);
      this.$refs.xinwenAudio.src = `${BASE_URL}${res[0].xuanzhe[0][k].audio_url}`;
      console.log(this.$refs.xinwenAudio.src);
      this.$refs.xinwenAudio.play();
    }, 
    }

    
};
</script>

<style scoped lang="less">
    .tiku{
        width: 100%;
        height: 100%;
        /* margin-top:70px; */
        .centers{
            width: 96%;
            margin:0 auto;
        }
    }
    .header{
        /* color:#808080; */
        margin-top: 20px;
        background-color: #fff;
        padding-left: 10px;
        border-bottom: 2px solid #E6A23C;
    }
    .content-box{
      /* max-height: 700px;
      overflow: auto; */

    }
    .big-box{
      padding-bottom: 20px;
    }

</style>
