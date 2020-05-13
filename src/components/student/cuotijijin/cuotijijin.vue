<template>
    <div class="cuotijijin"  style="padding-top:80px;"  v-loading="isLoading"   element-loading-text="拼命加载中" >
       <div class="centers">
      <audio ref="vide" size="mini"></audio>
      <div class="header">
        <div class="tiku-box" v-if="hasA">
            <div class="text-title">A级题库</div>
                <el-button type="warning" plain size="mini"  v-for="item in aList"  @click="getItem(item, 3, 1)" >{{item}}</el-button>
            <!-- <ul>
                  <li v-for="item in aList" :class="type == 3 && problem == item?'click': ''" @click="getItem(item, 3, 1)"><p>{{item}}</p></li>
            </ul> -->
          </div>
          <div class="tiku-box" v-if="hasB">
            <div class="text-title">B级题库</div>
               <el-button type="warning" plain size="mini" @click="getItem(item, 4, 1)"  v-for="item in bList" >{{item}}</el-button>
            <!-- <ul>
              <li v-for="item in bList" @click="getItem(item, 4, 1)" :class="type == 4 && problem == item?'click': ''"><p>{{item}}</p></li>
            </ul> -->
          </div>
          <div class="tiku-box" v-if="hasfour">
            <div class="text-title">四级题库</div>
            <el-button type="warning" plain size="mini"  v-for="item in fourList"    @click="getItem(item, 1, 1)"  >{{item}}</el-button>
            <!-- <ul>
              <li v-for="item in fourList" @click="getItem(item, 1, 1)" :class="type == 1 && problem == item?'click': ''"><p>{{item}}</p></li>
            </ul> -->
          </div>
          <div class="tiku-box" v-if="hassix">
            <div class="text-title">六级题库</div>
            <el-button type="warning" plain size="mini"  v-for="item in sixList" @click="getItem(item, 2, 1)"  >{{item}}</el-button>
            <!-- <ul>
              <li v-for="item in sixList" @click="getItem(item, 2, 1)" :class="type == 2 && problem == item?'click': ''"><p>{{item}}</p></li>
            </ul> -->
          </div>
      </div>
       <!-- <el-divider content-position="right" style="color:#409EFF">添加时间：{{ie.addtime | time}}</el-divider> -->
  
      <ul class="infinite-list" style="overflow:auto">
        <div   v-for="(ie,k) in itemData.slice((currentPage -1) * pagesize, currentPage * pagesize)">
          <li  class="infinite-list-item">
            <!-- <el-divider >{{ ie.test_paper_name }} </el-divider> -->
            <p class="titleName">题目类型：{{ie.type_name}}</p>
            <div  class="item">
               <span   class="wentiTitle">问题</span>
               <div v-html="ie.wenti"   class="wenti"></div>
            </div>
            <div  class="item">
              <span  class="wentiTitle" >你的答案</span>
            <div class="wenti"></div>
           </div>
           <div  class="item">
            <span  class="wentiTitle">参考答案</span>
            <div v-html="ie.yn" class="wenti"></div>
         </div>
          
            <div  class="buttom">
              <el-button type="primary"   class="playagain"   @click="goagain(ie.id,ie.type_name,ie.xuanxiang_id)">再做一次</el-button>
            </div>
          </li>
        </div>
        <div v-if="itemData.length < 1" style="height:60px;line-height: 60px;font-size: 18px;text-align: center;margin-top:10vh">暂无数据</div>
      </ul>
      <!-- 分页插件。 -->
      <div  class="fenye" >
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="pagesize"
          layout="total, prev, pager, next"
          :total="currLength"
          v-show="currLength > pagesize"
          :current-page.sync="currentPage"></el-pagination>
      </div>
      <!-- 再做一次弹框。 -->
      <!-- :visible.sync="dialogTableVisible" -->
      <el-dialog title="题目展示" v-if="dialogTableVisible" :visible.sync="dialogTableVisible" width="1000px" custom-class="cuotidialog" ref="dialog" :before-close="closeDialog">
      <!-- || problem == '英译汉' || problem == '篇章翻译' -->
        <div class="content-box" v-if="problem == '作文'">
          <div class="big-box" v-for="(item,key) in itemDatata.slice((currentPage -1) * pagesize, currentPage * pagesize)">
            <div class="zuowen-title">{{item.wenti}}</div>
            <img v-if="item.is_img != 0" :src="item.img_url" alt="" >
            <el-input v-model="item.yn" :autosize="{ minRows: 26}" type="textarea" style="border-radius: 0;margin: 10px 0"></el-input>
            <div v-html="item.daan" v-if="item.state == 0" style="border: 1px solid #ccc;padding:10px">{{item.daan}}</div>
            <div v-html="item.jiexi" v-if="item.state == 0" style="margin-top:10px;border: 1px solid #ccc;padding:10px">{{item.jiexi}}</div>
            <el-button type="primary" >提交(客观题无法提交)</el-button>
          </div>
        </div>
  
        <div class="content-box" v-if="problem == '英译汉'">
          <div class="big-box" v-for="(item,key) in itemDatata.slice((currentPage -1) * pagesize, currentPage * pagesize)">
            <div v-html="item.wenzhang" style="padding:10px">{{item.wenzhang}}</div>
            <el-input v-model="item.yn" :autosize="{ minRows: 26}" type="textarea" style="border-radius: 0;margin: 10px 0"></el-input>
            <div v-html="item.cankaodaan" v-if="item.state == 0" style="border: 1px solid #ccc;padding:10px">{{item.cankaodaan}}</div>
            <div v-html="item.jiexi" v-if="item.state == 0" style="margin-top:10px;border: 1px solid #ccc;padding:10px">{{item.jiexi}}</div>
            <el-button type="primary" >提交(客观题无法提交)</el-button>
          </div>
        </div>
        <div class="content-box" v-if="problem == '篇章翻译'">
          <div class="big-box" v-for="(item,key) in itemDatata.slice((currentPage -1) * pagesize, currentPage * pagesize)">
            <div class="zuowen-title">{{item.wenti}}</div>
            <el-input v-model="item.yn" :autosize="{ minRows: 24}" type="textarea" style="border-radius: 0;margin: 10px 0"></el-input>
            <div v-html="item.daan" v-if="item.state == 0" style="border: 1px solid #ccc;padding:10px">{{item.daan}}</div>
            <div v-html="item.jiexi" v-if="item.state == 0" style="margin-top:10px;border: 1px solid #ccc;padding:10px">{{item.jiexi}}</div>
            <el-button type="primary" >提交(客观题无法提交)</el-button>
          </div>
        </div>
        <!--  第一种类型大题音频，小题音频，abcd单选： -->
        <div class="content-box" v-if="problem == '新闻报道' || problem == '听讲座对话'|| problem == '听长对话' || problem == '听短文理解' || problem == '听篇章' || problem == '听短对话'">
          <div class="big-box" v-for="(item,key) in itemDatata.slice((currentPage -1) * pagesize, currentPage * pagesize)">
              <div class="zuowen-title">Directions: In this section, you will hear several newsreports.At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A，B，C and D. Then select the corresponding letter on the web page.</div>
              <audio ref="xinwenOpt" size="mini"></audio>
              <el-button size="mini" type="primary" icon="el-icon-video-play" @click="play_xinwen(item,key)" style="padding: 6px 11px;font-size: 12px;margin-top:10px">播放大题听力</el-button>
              <div v-if="item.state == 0" v-html="item.yiwen" style="margin-top:10px;border: 1px solid #ccc;padding:10px">{{item.yiwen}}</div>
              <div class="duanwen-options" >
                <div class="option-one" v-for="(ie, k, index) in item.xuanzhe[0]">
                  <el-button type="success" icon="el-icon-video-play" @click="play_xinwen_opt(ie,k)" ref="dw_btn" style="padding: 5px 10px;font-size: 12px;margin-top:10px">第({{k + 1}})小题听力</el-button>
                  <div class="xuanxiang" v-for="(i,e) in ie.xuanxiang" style="margin-top: 5px">
                    <el-radio v-model="ie.yn" :label="e">{{i}}</el-radio>
                  </div>
                  <div v-if="item.state == 0" v-html="ie.tiyan" style="margin-top:10px;border: 1px solid #ccc;padding:10px">{{ie.tiyan}}</div>
                  <div v-if="item.state == 0" v-html="ie.jiexi" style="margin:10px 0;border: 1px solid #ccc;padding:10px">{{ie.jiexi}}</div>
                </div>
              </div>
            <!-- 提交按钮。 -->
            <el-button type="primary" @click="submitXinweng(item)" >提交</el-button>
          </div>
        </div>
        <!-- 单独一种听单句 -->
        <div class="content-box" v-if="problem == '听单句'">
          <div class="big-box" v-for="(item,key) in itemDatata.slice((currentPage -1) * pagesize, currentPage * pagesize)">
              <div class="zuowen-title">Directions: In this section, you will hear several newsreports.At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A，B，C and D. Then select the corresponding letter on the web page.</div>
              <audio ref="xinwenOpt" size="mini"></audio>
                <div class="duanwen-options" >
                  <div class="option-one" v-for="(ie, k, index) in item.xuanzhe[0]">
                    <el-button type="success" icon="el-icon-video-play" @click="play_xinwen_opt(ie,key,k)" ref="dw_btn" style="padding: 5px 10px;font-size: 12px;margin-top:10px">第({{k + 1}})小题听力</el-button>
                    <div class="xuanxiang" v-for="(i,e) in ie.xuanxiang" style="margin-top: 5px">
                      <el-radio v-model="ie.yn" :label="e">{{i}}</el-radio>
                    </div>
                    <div v-if="item.state == 0" v-html="ie.tiyan" style="margin-top:10px;border: 1px solid #ccc;padding:10px">{{ie.tiyan}}</div>
                    <div v-if="item.state == 0" v-html="ie.jiexi" style="margin-top:10px;border: 1px solid #ccc;padding:10px">{{ie.jiexi}}</div>
                  </div>
                </div>
            <!-- 提交按钮。 -->
            <el-button type="primary" @click="submitXinweng(item)">提交</el-button>
          </div>
        </div>
        <!-- 富文本段落，遍历空数组，下拉选择返回答案   选词填空 -->
        <div class="content-box" v-if="problem == '选词填空'">
          <div class="big-box" v-for="(item,key) in itemDatata.slice((currentPage -1) * pagesize, currentPage * pagesize)">
            <div class="xuancutiankong-box" style="overflow:hidden">
              <div v-html="item.duanwen" style="padding:10px;padding:10px;">{{item.duanwen}}</div>
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
            <div style="margin:10px 0;padding:10px;border: 1px solid #ccc;box-sizing:border-box;" v-if="item.state == 0">{{item.daan}}</div>
            <div style="padding:10px;padding:10px;border: 1px solid #ccc;box-sizing:border-box;" v-if="item.state == 0">{{item.yiwen}}</div>
            <!-- 提交按钮。 -->
            <el-button type="primary" @click="submitXuanci(item)">提交</el-button>
          </div>
        </div>
        <!-- 富文本段落，问题，单行输入框  阅读理解  -->
        <div class="content-box" v-if="problem == '阅读理解' || problem == '词汇匹配'">
          <div class="big-box" v-for="(item,key) in itemDatata.slice((currentPage -1) * pagesize, currentPage * pagesize)">
            <div v-html="item.duanwen" style="margin-top:10px;padding:10px" v-if="problem == '阅读理解'"></div>
            <div v-html="item.beixuanxiang" style="margin-top:10px;padding:10px" v-if="problem == '词汇匹配'"></div>
            <div v-html="item.jiexi" style="margin-top:10px;padding:10px;box-sizing: border-box;border:1px solid #ccc;" v-if="problem == '词汇匹配' && item.state == 0"></div>
            
            <div class="xuanxiang" v-for="(ie, k, index) in item.xuanzhe">
              <div v-html="ie.wenti" style="margin-top:10px;padding:10px"></div>
              <el-input v-model="ie.yn" placeholder="请输入答案" style="box-sizing: border-box;padding: 0 10px;margin-bottom:10px"></el-input>
              <div class="zuowen-title" v-if="item.state == 0"  style="margin-top:10px;padding:10px;box-sizing: border-box;border:1px solid #ccc;" >{{ie.daan}}</div>
              <div v-if="item.state == 0 && problem == '阅读理解'" v-html="ie.tiyan" style="margin-top:10px;padding:10px;box-sizing: border-box;border:1px solid #ccc;"></div>
            </div>
            <!-- <div v-if="item.state==0" v-html="item.cankaodaan" style="margin-top:10px;padding:10px;box-sizing: border-box;border:1px solid #ccc;"></div> -->
            <!-- 提交按钮。 -->
            <!-- <el-button type="primary" @click="submitXinwen(item)">提交</el-button> -->
            <el-button type="primary" @click="submitCihui(item)"  style="margin-top: 10px;">提交</el-button>
          </div>
        </div>
        <!-- 富文本段落，循环小题，答案A - T  长篇阅读   -->
        <div class="content-box" v-if="problem == '长篇阅读'">
          <div class="big-box" v-for="(ie,k) in itemDatata.slice((currentPage -1) * pagesize, currentPage * pagesize)">
            <div v-html="ie.beixuanxiang" style="margin-top:10px;padding:10px"></div>
              <div v-for="(item, key, index) in ie.xuanzhe" style="margin-bottom:10px">
                <div class="wenti" style="float:left;margin-left:20px;margin-top:10px;width:70px">第{{key + 1}}题:</div>
                <div v-html="item.wenti" style="margin-top:10px;padding:10px">{{item.wenti}}</div>
                <el-select v-model="item.yn" placeholder="请选择" style="margin-left:20px">
                  <el-option
                    v-for="item in english"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <div style="margin-top:10px;padding:10px;margin-left:10px;" v-if="ie.state == 0 ">答案：{{item.daan}}</div>
                <div v-html="item.tiyan" style="padding:10px;margin-left:10px;" v-if="ie.state == 0 "></div>
                <div v-html="item.jiexi" style="padding:10px;margin-left:10px;" v-if="ie.state == 0 "></div>
              </div>
            <!-- 提交按钮。 -->
            <el-button type="primary" @click="submitYuedu(ie)">提交</el-button>
          </div>
        </div>
        <!-- 富文本段落，问题，abcd单选  仔细阅读 -->
        <div class="content-box" v-if="problem == '仔细阅读'">
          <div class="big-box" v-for="(item,key) in itemDatata.slice((currentPage -1) * pagesize, currentPage * pagesize)">
            <div class="zuowen-title">Directions: In this section, you will hear several newsreports.At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A，B，C and D. Then select the corresponding letter on the web page.</div>
            <div v-html="item.wenzhang" style="margin-top:10px;padding:10px">{{item.wenzhang}}</div>
            <div class="duanwen-options">
              <div class="option-one" v-for="(ie, k, index) in item.xuanzhe[0]">
                <div v-html="ie.wenti" style="margin-top:10px;padding:10px">{{ie.wenti}}</div>
                <div class="xuanxiang" v-for="(i,e) in ie.xuanxiang" style="margin-top: 5px">
                  <el-radio v-model="ie.yn" :label="e">{{i}}</el-radio>
                </div>
                <div v-if="item.state == 0" v-html="ie.jiexi" style="margin-top:10px;padding:10px;;box-sizing: border-box;border:1px solid #ccc">{{ie.jiexi}}</div>
                <div v-if="item.state == 0" v-html="ie.tiyan" style="padding:10px;;box-sizing: border-box;border:1px solid #ccc">{{ie.tiyan}}</div>
              </div>
            </div>
            <!-- 提交按钮。 -->
            <el-button type="primary" @click="submitXinweng(item)" style="margin:10px 0">提交</el-button>
          </div>
        </div>
        <!-- 阅读填空  短文填空 -->
        <div class="content-box" v-if="problem == '阅读填空' || problem == '短文填空' ">
          <div class="big-box" v-for="(ie,k) in itemDatata.slice((currentPage -1) * pagesize, currentPage * pagesize)">
            <div class="zuowen-title">Directions: In this section you will hear a record short passage.The passage is printed in the test paper,but with some words or phrases missing.The passage will be read two times.You are required to put the missing words or phrases on the Answer Sheet in order of the number blanks according to what you hear.Now the passage will begin.</div>
            <div style="overflow:hidden">
              <el-button size="mini" type="primary" icon="el-icon-video-play" @click="play_yuedu(ie,k)" v-if="problem == '短文填空'" style="padding: 5px 10px;font-size: 12px;">播放音频</el-button>
              <div v-html="ie.wenti" style="margin-top:10px;padding:10px" v-if="problem == '短文填空'"></div>
              <div v-html="ie.duanwen" style="margin-top:10px;padding:10px" v-if="problem == '阅读填空'"></div>
              <div style="min-height:100%;overflow:hidden">
                <div v-for="(item, key, index) in ie.yn" >
                  <div style="float:left;margin: 10px 10px">
                    <span>第{{key + 1}}题：</span>
                    <el-input v-model="ie.yn[key]" placeholder="请输入答案" style="box-sizing: border-box;padding: 0 5px;width: 200px"></el-input>
                  </div>
                </div>
              </div>
              <div v-if="ie.state == 0 " v-html="ie.daan" style="margin-top:10px;padding:10px;box-sizing: border-box;border:1px solid #ccc"></div>
              <div v-if="ie.state == 0 " v-html="ie.yiwen" style="margin-top:10px;padding:10px;box-sizing: border-box;border:1px solid #ccc"></div>
              <div v-if="ie.state == 0 " v-html="ie.cankaodaan" style="margin-top:10px;padding:10px;box-sizing: border-box;border:1px solid #ccc"></div>
            </div>
            <!-- 提交按钮。 -->
            <el-button type="primary" @click="submitDuanwen(ie)">提交</el-button>
          </div>
        </div>
        <!-- 大音频，小音频，输入框   听短文 -->
        <div class="content-box" v-if="problem == '听短文' ">
          <div class="big-box" v-for="(item,key) in itemDatata.slice((currentPage -1) * pagesize, currentPage * pagesize)">
            <div class="zuowen-title">Directions: In this section, you will hear several newsreports.At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A，B，C and D. Then select the corresponding letter on the web page.</div>
            <audio ref="xinwenOpt" size="mini"></audio>
              <el-button size="mini" type="primary" icon="el-icon-video-play" @click="play_xinwen(item,key)" style="padding: 6px 11px;font-size: 12px;margin-top:10px">播放大题听力</el-button>
              <div v-if="item.state == 0" v-html="item.yiwen" style="margin-top:10px;border: 1px solid #ccc;padding:10px">{{item.yiwen}}</div>
              <div class="duanwen-options" style="maigin-top:10px">
                <div class="option-one" v-for="(ie, k, index) in item.xuanzhe">
                  <!-- <el-button type="success" icon="el-icon-video-play" @click="play_xinwen_opt(ie,k)" style="padding: 5px 10px;font-size: 12px;">第({{k + 1}})小题听力</el-button> -->
                  <div v-html="ie.wenti" style="padding:10px"></div>
                  <el-input v-model="ie.yn" placeholder="请输入答案" style="box-sizing: border-box;padding: 0 10px;margin-bottom: 10px;"></el-input>
                  <div v-if="item.state == 0" v-html="ie.jiexi" style="margin-top:10px;border: 1px solid #ccc;padding:10px">{{ie.tiyan}}</div>
                  <div v-if="item.state == 0" v-html="ie.daan" style="margin:10px 0;border: 1px solid #ccc;padding:10px">{{ie.jiexi}}</div>
                </div>
              </div>
            <!-- 提交按钮。 -->
            <el-button type="primary" @click="submitListen(item)">提交</el-button>
          </div>
        </div>
        <!-- 问题，abcd单选  词汇选择   翻译选择 -->
        <div class="content-box" v-if="problem == '词汇选择' || problem == '翻译选择'">
          <div class="big-box" v-for="(item,key) in itemDatata.slice((currentPage -1) * pagesize, currentPage * pagesize)">
            <div v-html="item.wenti" style="margin-top:10px;padding:10px"></div>
            <div class="xuanxiang" v-for="(i,e) in item.xuanxiang" style="margin-top: 5px;margin-bottom:10px">
                <el-radio v-model="item.yn"   :label="e">{{i}}</el-radio>
              <!-- <div  @click="clicks(i,e)" >{{i}}</div> -->
            </div>
            <div v-if="item.state == 0" v-html="item.yiwen" style="margin-top:10px;padding:10px;box-sizing: border-box;border: 1px solid #ccc;"></div>
            <div v-if="item.state == 0" v-html="item.jiexi" style="margin:10px;padding:10px;box-sizing: border-box;border: 1px solid #ccc;"></div>
            <!-- 提交按钮。 -->
            <!-- <el-button type="primary" @click="submitXinwen(item)">提交</el-button> -->
            <el-button type="primary" @click="submitFanyi(item)">提交</el-button>
          </div>
        </div>
        <!-- 问题，单行输入框  词汇填空 -->
        <div class="content-box" v-if="problem == '词汇填空'">
          <div class="big-box" v-for="(item,key) in itemDatata.slice((currentPage -1) * pagesize, currentPage * pagesize)">
            <div v-html="item.wenti" style="margin-top:10px;padding:10px"></div>
            <el-input v-model="item.yn" placeholder="请输入答案" style="box-sizing: border-box;padding: 10px ;margin-bottom:10px"></el-input>
            <div v-if="item.state == 0" v-html="item.yiwen" style="margin-top:10px;padding:10px;box-sizing: border-box;border: 1px solid #ccc;"></div>
            <div v-if="item.state == 0" v-html="item.daan" style="margin-top:10px;padding:10px;box-sizing: border-box;border: 1px solid #ccc;"></div>
            <div v-if="item.state == 0" v-html="item.cankaodaan" style="margin:10px 0;padding:10px;box-sizing: border-box;border: 1px solid #ccc;"></div>
            <!-- 提交按钮。 -->
            <el-button type="primary" @click="submitXinwen(item)"  >提交</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </div>
  </template>
  
  <script>
  import qs from "qs";
  import { close, constants } from 'fs';
  export default {
    components: {
      // XdhScroll: prefixCls
    },
    data() {
      return {
        active:'',
        count: 0,
        u_id: '', // 用户id
        fourList: ["作文","听短文理解","选词填空","新闻报道","长篇阅读","仔细阅读","听长对话","篇章翻译"],
        sixList: ["作文","听篇章","选词填空","听讲座对话","长篇阅读","仔细阅读","听长对话","篇章翻译"],
        aList: ["听短对话","听长对话","短文填空","听短文","词汇选择","词汇填空","仔细阅读","阅读填空","词汇匹配","阅读理解","翻译选择","英译汉","作文"],
        bList: ["听单句","听短对话","听长对话","短文填空","词汇选择","词汇填空","仔细阅读","阅读填空","词汇匹配","阅读理解","翻译选择","英译汉","作文"],
        paperList: [],
        paper: '',
        // 单项突破粘贴。
        isLoading: false,
        is_tijiao: false,
        teacher_id: '',
        school_id: '',
        nickname: '',
        options: [],
        type: '',
        problemList: [],
        problem: '',
        zuowenImgUrl: '',
        itemData: [],
        itemOne: '',
        baseUrl: '',
        xuancitiankongDy: [], // 选词填空答案
        english: [
          {value: 'A',label: '选项 A'},{value: 'B',label: '选项 B'},{value: 'C',label: '选项 C'},{value: 'D',label: '选项 D'},{value: 'E',label: '选项 E'},
          {value: 'F',label: '选项 F'},{value: 'G',label: '选项 G'},{value: 'H',label: '选项 H'},{value: 'I',label: '选项 I'},{value: 'J',label: '选项 J'},
          {value: 'K',label: '选项 K'},{value: 'L',label: '选项 L'},{value: 'M',label: '选项 M'},{value: 'N',label: '选项 N'},{value: 'O',label: '选项 O'},
          {value: 'P',label: '选项 P'},{value: 'Q',label: '选项 Q'},{value: 'R',label: '选项 R'},{value: 'S',label: '选项 S'},{value: 'T',label: '选项 T'}
        ],
        dialogTableVisible: false,
        itemDatata: [],
        pagesize:1,
        currentPage:1,
        currLength: 0,
        hasfour: false,
        hassix: false,
        hasA: false,
        hasB: false,
      };
    },
    created() {
      this.u_id = localStorage.getItem("id");
      this.nickname = localStorage.getItem("nickname");
      this.school_id = localStorage.getItem("school_id");
      this.baseUrl = BASE_URL;  
      this.getList();
      this.getItem('作文',1, 1);
    },
    computed: {},
    methods: {
      clicks(val,vals){
        this.active=vals
        console.log(val);
        console.log(vals);
      },
      flatten(arr) {
        var res = [];
        arr.map(item => {
          if (Array.isArray(item)) {
            res = res.concat(flatten(item));
          } else {
            res.push(item);
          }
        });
        return res;
      },
      handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        this.getItem(this.problem, this.type, this.currentPage)
      },
      load () {
        this.count += 2
      },
      // changePaper(){
      //   this.problem = "";
      //   // this.paperList = [];
      //   if (this.type == 1){ this.problemList = this.fourList };
      //   if (this.type == 2){ this.problemList = this.sixList };
      //   if (this.type == 3){ this.problemList = this.aList };
      //   if (this.type == 4){ this.problemList = this.bList };
      // },
      // async getUserList(){
      //   this.problem = "";
      //   this.paper = "";
      //   this.paperList = [];
      //   this.problemList = [];
      //   const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/Teacher/shijuanlst", qs.stringify({ test_paper_type_id: this.type}));
      //   if (res.status === 200 && res.data.code === "1") {
      //     this.paperList = res.data.info
      //   };
      // },
      async getList(){
        const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/Examination/tiku", qs.stringify({ school_id: this.school_id}));
        if (res.status === 200 && res.data.code === "1") {
          this.options = res.data.info
        };
        for ( let i = 0 ; i < this.options.length ; i++) {
          if(this.options[i].name == "四级题库"){ this.hasfour = true; };
          if(this.options[i].name == "六级题库"){ this.hassix = true; };
          if(this.options[i].name == "A级题库"){ this.hasA = true ;};
          if(this.options[i].name == "B级题库"){ this.hasB = true ;};
        }
        if (this.options[0].id == 1){ this.problem = this.fourList[0];this.problemList = this.fourList };
        if (this.options[0].id == 2){ this.problem = this.sixList[0];this.problemList = this.sixList };
        if (this.options[0].id == 3){ this.problem = this.aList[0];this.problemList = this.aList };
        if (this.options[0].id == 4){ this.problem = this.bList[0];this.problemList = this.bList };
        this.getItem(this.problem, this.options[0].id, 1);
      }, 

      async getItem(item, type, currentPage){ 
        this.isLoading = true;
        this.problem=item;
        this.type=type;
        this.currentPage=currentPage;
        
        const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/Teacher/cuotijinew", 
        qs.stringify({ 
          u_id:1, 
          test_paper_id:this.type,
          type_name: this.problem,
          currentpage:this.currentPage
        }));
        console.log(res)

        if (res.status === 200 && res.data.code === "1") {
          // console.log("666",res.data.info)
          this.isLoading = false;
          this.itemData = res.data.info.info;
          this.currLength = res.data.info.pageinfo.sum;
          // this.pagesize = parseInt(res.data.info.pageinfo.page);
        }
      },
      async goagain(id,type,xuanxiang){
        // this.$refs.dialog.style.transform = "translateX(300px)";
        this.dialogTableVisible = true;
        this.problem = type;
        const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/Examination/zaizuoyici", qs.stringify({ id: id, problem: type, xuanxiang_id:xuanxiang}));
        if (res.status === 200 && res.data.code === "1") {
          console.log("...",res.data.info)
          this.$set(this,"itemDatata", res.data.info)
          for ( var i = 0 ; i < this.itemDatata.length; i++) {
            if (this.itemDatata[i].is_img  == 1){
              this.itemDatata[i].img_url = `${BASE_URL}${this.itemDatata[i].img_url}`;
            }
          }
        };
      },
      closeDialog(){ // 关闭对话框回调
        // if (this.paper == ""){
        //   this.problem = "";
        // }
        this.dialogTableVisible = false;
      },
      // 词汇填空
      submitXinwen(item){
        console.log(item);
        item.state=0
        if (item.daan != item.yn){
          this.$message({ message: "答错了", type: "error", duration: 5000,offset:90});
        } else {
          this.$message({ message: "填写正确", type: "success", duration: 5000,offset:90 });
        }

      },
      submitYuedu(item){
        console.log(item);
        item.state=0
        if (item.xuanzhe[0].daan != item.xuanzhe[0].yn){
          this.$message({ message: "答错了", type: "error", duration: 5000,offset:90});
        } else {
          this.$message({ message: "填写正确", type: "success", duration: 5000,offset:90 });
        }
      },
      // 仔细阅读
      submitXinweng(item){ // 新闻报道  仔细阅读
        console.log(item);
        item.state=0;
        
        if (item.xuanzhe[0][0].daan != item.xuanzhe[0][0].yn){
          this.$message({ message: "答错了", type: "error", duration: 5000,offset:90});
        } else {
          this.$message({ message: "填写正确", type: "success", duration: 5000,offset:90 });
        }
      },
      submitXuanci(ie){ // 选词填空
        ie.state=0
        console.log(this.xuancitiankongDy);
        var array =ie.daan.split(",");   
        for (let i = 0; i <array.length; i++) { 
         if(this.xuancitiankongDy[i]!=array[i]){
            this.$message({ message: "答错了", type: "error", duration: 5000,offset:90 });
         }else{
             this.$message({ message: "填写正确", type: "success", duration: 5000,offset:90 });
         }
       }
        

      
      },
      submitCihui(item){ // 词汇匹配
        console.log(item);
        item.state=0      
        if (item.xuanzhe[0].daan != item.xuanzhe[0].yn){
          this.$message({ message: "答错了", type: "error", duration: 5000,offset:90 });
        } else {
          this.$message({ message: "填写正确", type: "success", duration: 5000,offset:90 });
        }
      },
      submitDuanwen(ie){ //短文填空
        item.state=0
        var array =ie.daan.split(",");   
        for (let i = 0; i <array.length; i++) { 
         if(ie.yn[i]!=array[i]){
            this.$message({ message: "答错了", type: "error", duration: 5000,offset:90 });
         }else{
             this.$message({ message: "填写正确", type: "success", duration: 5000,offset:90 });
         }
       }
      },
      submitFanyi(item){ // 翻译选择
        item.state=0
        if (item.daan != item.yn){
          this.$message({ message: "答错了", type: "error", duration: 5000,offset:90 });
        } else {
          this.$message({ message: "填写正确", type: "success", duration: 5000 ,offset:90});
        }
      },
      submitListen(item){ // 听短文
        item.state=0
        if (item.xuanzhe[0].yn != item.xuanzhe[0].daan){
          this.$message({ message: "答错了", type: "error", duration: 5000,offset:90 });
        } else {
          this.$message({ message: "填写正确", type: "success", duration: 5000,offset:90 });
        }
      },
      submitZixi(item){ // 仔细阅读
        console.log(item);
      },
      play_xinwen(item,key){ // 新闻报道 duanwenAudio
        this.$refs.vide.src = `${this.baseUrl}${item.audio_url}`;
        this.$refs.vide.play();
      },
      play_xinwen_opt(ie,key,k){ // 新闻报道 单项
        this.$refs.vide.src = `${this.baseUrl}${ie.audio_url}`;
        this.$refs.vide.play();
      },
      play_yuedu(ie,K){
        this.$refs.vide.src = `${this.baseUrl}${ie.audio_url}`;
        this.$refs.vide.play();
      },
    }
  };
  </script>
  
  <style lang="less" scoped>
  .cuotijijin {
  padding-top:10px;
  min-height: 100%;
  border: 1px solid transparent;
  background:url(../../../assets/image/creatshijuan/bg.png)  no-repeat   ;
  width:100%;
  height:100%;
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  padding-bottom: 30px;
  overflow: auto;
  .centers{
    width: 96%;
    margin-left:2%;
  }
  .header{
        padding-left:30px;
        background-color: #fff; 
        box-sizing: border-box;
  }

    .infinite-list {
      width: 100%;
      background-color: #fff; 
      box-sizing: border-box;
      margin-top:20px;
      opacity: .7;
      .infinite-list-item {
        width:90%;
        margin:0 auto;
        min-height: 60px;
        border-radius: 2px;
        overflow: hidden;
        padding: 10px;
        position: relative;
        padding-bottom: 50px;
        .titleName{
          text-align: center;
          height:60px;
          line-height: 60px;
          font-weight:700;
          margin-bottom: 20px;
          font-size: 1.1em;
        }
        .wentiTitle{
          width:7%;
          float: left;
          font-size: 0.9em;
        }
        .wenti{         
          float: left;
          width:93%;
          border:1px solid #CCC9CA;
          box-sizing: border-box;
          padding:20px;
          border-radius: 10px;
          font-size:14px;
          line-height:25px;
          margin-bottom: 40px;
        }
      
          .playagain {
            float: right;
            padding: 10px  25px;
            border-radius: 20px;
            border:none;
            color:#fff;
            font-size: 1em;
            background-image: linear-gradient(to top, #FD9C10 , #F1E282);
            /* margin: 10px 0px 5px; */
            /* width: 100%; */
          }
        
      }
     
    }
    
    .tiku-box {
      height: 50px;
      line-height: 50px;
      background-color: #fff;
      .text-title {
        float: left;
        width: 80px;
        text-align: center;
      }
      .el-button{
        border:none
      }
      ul {
        float: left;
        font-size: 14px;
        li {
          margin-top: 5px;
          float: left;
          border: 1px solid #ccc;
          height: 30px;
          padding: 0 10px;
          box-sizing: border-box;
          border-left: none;
          cursor: pointer;
          &:nth-child(1){
            border-left: 1px solid #ccc;
          }
          p {
            line-height: 30px;
          }
        }
      }
    }
  }
  .click {
    /* background-color: @theme; */
    color: #fff;
  }
  .activecolor{
    color:red
  }
  </style>