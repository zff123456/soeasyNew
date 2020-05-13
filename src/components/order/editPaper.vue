<template>
  <div class="fourKaoshi" style="margin-top:70px;">
    <div class="centers">
        <div class="title-box">
          <el-button type="warning" plain  style="float:left;margin:10px 0 0 20px;" @click="goback">上一页</el-button>
          <h2>试卷名称111111</h2>
      </div>
     <div class="button-box">   
        <el-button type="warning" plain @click.native="check(1)" :class="isCheck == 1?'checked':''">作文题</el-button>
        <el-button type="warning" plain @click.native="check(2)" :class="isCheck == 2?'checked':''">听短文理解</el-button>
        <el-button type="warning" plain @click.native="check(3)" :class="isCheck == 3?'checked':''">选词填空</el-button>
        <el-button type="warning" plain @click.native="check(4)" :class="isCheck == 4?'checked':''">新闻报道</el-button>
        <el-button type="warning" plain @click.native="check(5)" :class="isCheck == 5?'checked':''">长篇阅读</el-button>
        <el-button type="warning" plain @click.native="check(6)" :class="isCheck == 6?'checked':''">仔细阅读</el-button>
        <el-button type="warning" plain @click.native="check(7)" :class="isCheck == 7?'checked':''">听长对话</el-button>
        <el-button type="warning" plain @click.native="check(8)" :class="isCheck == 8?'checked':''">篇章翻译</el-button>
      </div>
      <div class="component-box">
            <!-- 作文题 -->
        <div class="big-box" v-show="isCheck == 1">
            <div class="zuowen-title">{{zuowen.wenti}}</div>
            <img v-if="zuowen.is_img != 0" :src="zuowenImgUrl" alt="" >
            <el-input v-model="zuowen.yn" :autosize="{ minRows: 26}" type="textarea" style="border-radius: 0;margin: 10px 0">11111111111</el-input>
            <div v-html="zuowen.daan" v-if="is_tijiao" style="border: 1px solid #ccc;padding:10px;font-size:14px;line-height:25px;">{{zuowen.daan}}</div>
            <div v-html="zuowen.jiexi" v-if="is_tijiao" style="margin-top:10px;border: 1px solid #ccc;padding:10px;font-size:14px;line-height:25px;">{{zuowen.jiexi}}</div>
        </div>  
         <!-- 听短文理解 -->
        <div class="big-box" v-show="isCheck == 2">
          <div class="zuowen-title">Directions: In this section, you will hear several newsreports.At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A，B，C and D. Then select the corresponding letter on the web page.</div>
          <audio ref="duanwenOpt" size="mini"></audio>
          <div v-for="(item, key, index) in duanwenlijie" class="duanwen-box">
            <el-button size="mini" type="primary" icon="el-icon-video-play" @click ="play_duanwen(item,key)" :disabled="duanwenPlay" style="margin-top:5px; background:#00EAEE;border:none" >第{{key + 1}}题</el-button>
            <audio ref="duanwenAudio"></audio>
            <div v-if="is_tijiao" v-html="item.yiwen" style="margin-top:10px;border: 1px solid #ccc;padding:10px;font-size:14px;line-height:25px;">{{item.yiwen}}</div>
            <div class="duanwen-options" >
              <div class="option-one" v-for="(ie, k, index) in item.xuanzhe[0]">
                <el-button type="success" icon="el-icon-video-play" @click="play_duanwen_opt(ie,key,k)" ref="dw_btn" style="margin-top:5px; background: rgb(174, 93, 161);border:none">第({{k + 1}})小题听力</el-button>
                <el-popover
                  placement="left"
                  width="500"
                  trigger="hover">
                  <template slot-scope="scope">
                    <div v-html="ie.tiyan" style="border: 1px dashed #ccc;padding:10px;max-height:70vh;overflow: auto;"></div>
                  </template>
                  <el-button slot="reference" type="warning" style="float:right;margin-top:5px;" v-show="is_tijiao" >题眼</el-button>
                </el-popover>
                <div class="xuanxiang" v-for="(i,e) in ie.xuanxiang" style="margin-top: 5px">
                  <el-radio   v-model="ie.yn" :label="e" :class="is_tijiao == true && ie.yn != ie.daan && e == ie.daan? 'red':'blue'">{{i}}</el-radio>
                </div>
                <!-- <div v-if="is_tijiao" v-html="ie.tiyan" style="margin-top:10px;border: 1px dashed #ccc;padding:10px">{{ie.tiyan}}</div> -->
                <div v-if="is_tijiao" v-html="ie.jiexi" style="margin-top:10px;border: 1px dashed #ccc;padding:10px">{{ie.jiexi}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 选词填空 -->
        <div class="big-box" v-show="isCheck == 3">
          <div class="xuancutiankong-box" style="overflow:hidden">
            <div v-html="xuancitiankong.duanwen" style="padding:10px;padding:10px;font-size:14px;line-height:25px;">{{xuancitiankong.duanwen}}</div>
            <div class="for-box" v-for="(item, key, index) in xuancitiankong.xuan"  style="margin:10px 20px;width:300px;float:left;overflow: hidden">
              <div class="wenti" style="float:left;margin-right:10px;width:70px;">第{{key + 1}}题:</div>
              <el-select v-model="xuancitiankongDy[key]" placeholder="请选择">
                <el-option
                  v-for="e in item"
                  :key="e"
                  :label="e"
                  :value="e">
                </el-option>
              </el-select>
            </div>
          </div>
          <div style="padding:10px;padding:10px;font-size:14px;line-height:25px;" v-if="is_tijiao">{{xuancitiankong.daan}}</div>
          <div style="padding:10px;padding:10px;font-size:14px;line-height:25px;" v-if="is_tijiao">{{xuancitiankong.yiwen}}</div>
        </div>
        <!-- 新闻报道 -->
        <div class="big-box" v-show="isCheck == 4">
          <div class="zuowen-title">Directions: In this section, you will hear several newsreports.At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A，B，C and D. Then select the corresponding letter on the web page.</div>
          <audio ref="xinwenOpt" size="mini"></audio>
          <div v-for="(item, key, index) in xinwenbaodao" class="duanwen-box">
            <el-button size="mini" type="primary" icon="el-icon-video-play" @click ="play_xinwen(item,key)" :disabled="duanwenPlay" style="background:#00EAEE;border:none;margin-top:5px;">第{{key + 1}}题</el-button>
            <audio ref="xinwenAudio"></audio>
            <div v-if="is_tijiao" v-html="item.yiwen" style="margin-top:10px;border: 1px solid #ccc;padding:10px;font-size:14px;line-height:25px;">{{item.yiwen}}</div>
            <div class="duanwen-options" >
              <div class="option-one" v-for="(ie, k, index) in item.xuanzhe[0]">
                <el-button type="success" icon="el-icon-video-play" @click="play_xinwen_opt(ie,key,k)" ref="dw_btn" style="background: rgb(174, 93, 161);border:none;margin-top:5px;">第({{k + 1}})小题听力</el-button>
                <el-popover
                  placement="left"
                  width="500"
                  trigger="hover">
                  <template slot-scope="scope">
                    <div v-html="ie.tiyan" style="border: 1px dashed #ccc;padding:10px;max-height:70vh;overflow: auto;"></div>
                  </template>
                  <el-button slot="reference" type="warning" style="float:right;margin-top:5px;" v-show="is_tijiao">题眼</el-button>
                </el-popover>
                <div class="xuanxiang" v-for="(i,e) in ie.xuanxiang" style="margin-top: 5px">
                  <el-radio v-model="ie.yn" :label="e" :class="is_tijiao == true && ie.yn != ie.daan && e == ie.daan? 'red':''">{{i}}</el-radio>
                </div>
                <!-- <div v-if="is_tijiao" v-html="ie.tiyan" style="margin-top:10px;border: 1px dashed #ccc;padding:10px">{{ie.tiyan}}</div> -->
                <div v-if="is_tijiao" v-html="ie.jiexi" style="margin-top:10px;border: 1px dashed #ccc;padding:10px;font-size:14px;line-height:25px;">{{ie.jiexi}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 长篇阅读 -->
        <div class="big-box" v-show="isCheck == 5">
          <div>
            <div v-html="changyuedu.beixuanxiang" style="margin-top:10px;padding:10px;font-size:14px;line-height:25px;"></div>
            <div v-for="(item, key, index) in changyuedu.xuanzhe">
              <div class="wenti" style="float:left;margin-left:20px;margin-top:10px;width:70px;">第{{key + 1}}题:</div>
              <el-popover
                placement="left"
                width="500"
                trigger="hover">
                <template slot-scope="scope">
                  <div v-html="item.tiyan" style="border: 1px dashed #ccc;padding:10px;max-height:70vh;overflow: auto;"></div>
                </template>
                <el-button slot="reference" type="warning" style="float:right" v-show="is_tijiao">题眼</el-button>
              </el-popover>
              <div v-html="item.wenti" style="margin-top:10px;padding:10px;font-size:14px;line-height:25px;font-size:14px;line-height:25px;">{{item.wenti}}</div>
              <el-select v-model="item.yn" placeholder="请选择" style="margin-left:20px">
                <el-option
                  v-for="item in english"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <div style="margin-top:10px;padding:10px;margin-left:10px;font-size:14px;line-height:25px;" v-if="is_tijiao">答案：{{item.daan}}</div>
              <!-- <div v-html="item.tiyan" style="padding:10px;margin-left:10px;" v-if="is_tijiao"></div> -->
              <div v-html="item.jiexi" style="padding:10px;margin-left:10px;" v-if="is_tijiao"></div>
            </div>
          </div>
        </div>
                <!-- 仔细阅读 -->
        <div class="big-box" v-show="isCheck == 6">
          <div class="zuowen-title">Directions: In this section, you will hear several newsreports.At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A，B，C and D. Then select the corresponding letter on the web page.</div>
          <div v-for="(item, key, index) in zixiyuedu" class="duanwen-box">
            <div v-html="item.wenzhang" style="margin-top:10px;padding:10px;font-size:14px;line-height:25px;">{{item.wenzhang}}</div>
            <div class="duanwen-options">
              <div class="option-one" v-for="(ie, k, index) in item.xuanzhe[0]">
                <el-popover
                  placement="left"
                  width="500"
                  trigger="hover">
                  <template slot-scope="scope">
                    <div v-html="ie.tiyan" style="border: 1px dashed #ccc;padding:10px;max-height:70vh;overflow: auto;"></div>
                  </template>
                  <el-button slot="reference" type="warning" style="float:right" v-show="is_tijiao">题眼</el-button>
                </el-popover>
                <div v-html="ie.wenti" style="padding:10px">{{ie.wenti}}</div>
                <!-- <div class="xuanxiang" v-for="i in ie.xuanxiang" style="margin-top: 5px">
                  <el-radio v-model="ie.yn" :label="i">{{i}}</el-radio>
                </div> -->
                <div class="xuanxiang" v-for="(i,e) in ie.xuanxiang" style="margin-top: 5px">
                  <el-radio v-model="ie.yn" :label="e" :class="is_tijiao == true && ie.yn != ie.daan && e == ie.daan? 'red':''">{{i}}</el-radio>
                </div>
                <div v-if="is_tijiao" v-html="ie.jiexi" style="margin-top:10px;padding:10px;font-size:14px;line-height:25px;">{{ie.jiexi}}</div>
                <!-- <div v-if="is_tijiao" v-html="ie.tiyan" style="padding:10px">{{ie.tiyan}}</div> -->
              </div>
            </div>
          </div>
        </div>
        <!-- 听长对话 -->
        <div class="big-box" v-show="isCheck == 7">
          <div class="zuowen-title">Directions: In this section, you will hear several newsreports.At the end of each news report, you will hear two or three questions. Both the news report and the questions will be spoken only once. After you hear a question, you must choose the best answer from the four choices marked A，B，C and D. Then select the corresponding letter on the web page.</div>
          <audio ref="changOpt" size="mini"></audio>
          <div v-for="(item, key, index) in changduihua" class="duanwen-box">
            <el-button size="mini" type="primary" icon="el-icon-video-play" @click ="play_chang(item,key)" :disabled="duanwenPlay" style="background:#00EAEE;border:none;margin-top:5px;">第{{key + 1}}题</el-button>
            <audio ref="changAudio"></audio>
            <div v-if="is_tijiao" v-html="item.yiwen" style="margin-top:10px;border: 1px solid #ccc;padding:10px;font-size:14px;line-height:25px;">{{item.yiwen}}</div>
            <div class="duanwen-options" >
              <div class="option-one" v-for="(ie, k, index) in item.xuanzhe[0]">
                <el-button type="success" icon="el-icon-video-play" @click="play_chang_opt(ie,key,k)" ref="dw_btn" style="background: rgb(174, 93, 161);border:none;margin-top:5px;">第({{k + 1}})小题听力</el-button>
                <el-popover
                  placement="left"
                  width="500"
                  trigger="hover">
                  <template slot-scope="scope">
                    <div v-html="ie.tiyan" style="border: 1px dashed #ccc;padding:10px;max-height:70vh;overflow: auto;"></div>
                  </template>
                  <el-button slot="reference" type="warning" style="float:right;margin-top:5px;" v-show="is_tijiao">题眼</el-button>
                </el-popover>
                <!-- <div class="xuanxiang" v-for="i in ie.xuanxiang" style="margin-top: 5px">
                  <el-radio v-model="ie.yn" :label="i">{{i}}</el-radio>
                </div> -->
                <div class="xuanxiang" v-for="(i,e) in ie.xuanxiang" style="margin-top: 5px">
                  <el-radio v-model="ie.yn" :label="e" :class="is_tijiao == true && ie.yn != ie.daan && e == ie.daan? 'red':''">{{i}}</el-radio>
                </div>
                <!-- <div v-if="is_tijiao" v-html="ie.tiyan" style="margin-top:10px;border: 1px dashed #ccc;padding:10px">{{ie.tiyan}}</div> -->
                <div v-if="is_tijiao" v-html="ie.jiexi" style="margin-top:10px;border: 1px dashed #ccc;padding:10px;font-size:14px;line-height:25px;">{{ie.jiexi}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 篇章翻译 -->
        <div class="big-box" v-show="isCheck == 8">
          <div class="zuowen-title">{{pianzhangfanyi.wenti}}</div>
          <el-input v-model="pianzhangfanyi.yn" :autosize="{ minRows: 24}" type="textarea" style="border-radius: 0;margin: 10px 0"></el-input>
          <div v-html="pianzhangfanyi.daan" v-if="is_tijiao" style="border: 1px solid #ccc;padding:10px;font-size:14px;line-height:25px;">{{pianzhangfanyi.daan}}</div>
          <div v-html="pianzhangfanyi.jiexi" v-if="is_tijiao" style="margin-top:10px;border: 1px solid #ccc;padding:10px;font-size:14px;line-height:25px;">{{pianzhangfanyi.jiexi}}</div>
        </div>

    </div>
    <div class="datika">
     
        <div class="title">答题卡</div>
        <div class="video-box">
          <el-button type="primary" icon="el-icon-video-play" @click="play_ztingli" :disabled="noplay" v-if="test_paper.file_name != '' &&  test_paper.file_name != null">{{test_paper.file_name}}</el-button>
          <audio ref="vide"></audio>
        </div> 
        <div class="one-box">
          <div class="one-title" @click ="check(1)">作文</div>
          <div class="span-box">
            <span :class="zuowen.yn == ''? '': 'chec'" v-if="is_tijiao " @click ="check(1)">1</span>
            <!-- <span :class="zuowen.yn == ''? 'bg-red': 'chec'" v-if="is_tijiao== false" @click ="check(1)">1</span> -->
          </div>
        </div>
        <div class="one-box">
          <div class="one-title" @click ="check(2)">听短文理解(每题两分)</div>
          <div class="span-box" v-for="(item, key, index) in duanwenlijie">
            <em style="font-style:normal;margin-right:5px;font-size:16px">第{{ key + 1 }}大题</em>
            <span :class="ie.yn == ''? '': 'chec'" v-for="(ie, k) in item.xuanzhe[0]" v-if="is_tijiao " @click ="check(2)">{{k + 1}}</span>
            <!-- <span :class="ie.yn != ie.daan? 'bg-red':'chec'" v-for="(ie, k) in item.xuanzhe[0]" v-if="is_tijiao== false" @click ="check(2)">{{k + 1}}</span> -->
          </div>
        </div>
        <div class="one-box">
          <div class="one-title" @click ="check(3)">选词填空(每题两分)</div>
          <div class="span-box">
            <span :class="xuancitiankongDy[key] == null? '': 'chec'" v-for="(item, key, index) in xuancitiankong.xuan" v-if="is_tijiao " @click ="check(3)">{{key + 1}}</span>
            <!-- <span :class="chakan(key)? 'chec': 'bg-red'" v-for="(item, key, index) in xuancitiankong.xuan" v-if="is_tijiao== false" @click ="check(3)">{{key + 1}}</span> -->
          </div>
        </div>
        <div class="one-box">
          <div class="one-title" @click ="check(4)">新闻报道(每题两分)</div>
          <div class="span-box" v-for="(item, key, index) in xinwenbaodao">
            <em style="font-style:normal;margin-right:5px;font-size:16px">第{{ key + 1 }}大题</em>
            <span :class="ie.yn == ''? '': 'chec'" v-for="(ie, k) in item.xuanzhe[0]" v-if="is_tijiao " @click ="check(4)">{{k + 1}}</span>
            <!-- <span :class="ie.yn != ie.daan? 'bg-red':'chec'" v-for="(ie, k) in item.xuanzhe[0]" v-if="is_tijiao== false" @click ="check(4)">{{k + 1}}</span> -->
          </div>
        </div>
        <div class="one-box">
          <div class="one-title" @click ="check(5)">长篇阅读(每题两分)</div>
          <div class="span-box" >
            <span :class="item.yn == ''? '': 'chec'" v-for="(item, key, index) in changyuedu.xuanzhe" v-if="is_tijiao " @click ="check(5)">{{key + 1}}</span>
            <!-- <span :class="item.yn != item.daan? 'bg-red': 'chec'" v-for="(item, key, index) in changyuedu.xuanzhe" v-if="is_tijiao== false" @click ="check(5)">{{key + 1}}</span> -->
          </div>
        </div>
        <div class="one-box">
          <div class="one-title" @click ="check(6)">仔细阅读(每题两分)</div>
          <div class="span-box" v-for="(item, key, index) in zixiyuedu">
            <span :class="ie.yn == ''? '': 'chec'" v-for="(ie, k) in item.xuanzhe[0]" v-if="is_tijiao " @click ="check(6)">{{k + 1}}</span>
            <!-- <span :class="ie.yn != ie.daan? 'bg-red':'chec'" v-for="(ie, k) in item.xuanzhe[0]" v-if="is_tijiao== false" @click ="check(6)">{{k + 1}}</span>
          </div> -->
        </div>
        <div class="one-box">
          <div class="one-title" @click ="check(7)">听长对话(每题两分)</div>
          <div class="span-box" v-for="(item, key, index) in changduihua">
            <em style="font-style:normal;margin-right:5px;font-size:16px">第{{ key + 1 }}大题</em>
            <span :class="ie.yn == ''? '': 'chec'" v-for="(ie, k) in item.xuanzhe[0]" v-if="is_tijiao " @click ="check(7)">{{k + 1}}</span>
            <!-- <span :class="ie.yn != ie.daan? 'bg-red':'chec'" v-for="(ie, k) in item.xuanzhe[0]" v-if="is_tijiao== false" @click ="check(7)">{{k + 1}}</span> -->
          </div>
        </div>
        <div class="one-box">
          <div class="one-title" @click ="check(8)">篇章翻译</div>
          <div class="span-box">
            <span :class="pianzhangfanyi.yn == ''? '': 'chec'" v-if="is_tijiao " @click ="check(8)">1</span>
            <!-- <span :class="pianzhangfanyi.yn == ''? 'bg-red': 'chec'" v-if="is_tijiao== false" @click ="check(8)">1</span> -->
          </div>
        </div>
         <div class="one-box last-box">
             <div class="titles"  >{{typeName}}</div>
             <div class="input">分数 <input type="text"></div>
            <div class="button" @click="next">下一题</div>
          </div>
        </div>
    </div>
      </div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  components: {},
  props: {},
  data() {
    return {
      typeList:["作文题","听短文理解","选词填空","新闻报道","长篇阅读","仔细阅读","听长对话","篇章翻译"],
        isCheck:1,
        is_tijiao:true,
        zuowen:{
            yn:'111111111',
            daan:'',
            jiexi:'',
        },
        // is_tijiao:false,
        zuowen: '',
      listenDuan: '',
      zuowenImgUrl: '', // 作文题目图片路径
      is_tijiao: true,
      test_paper: '',
      bigAudioUrl: '', // 总音频按钮
      duanwenPlay: false,
      duanwenlijie: '',
      keepTime: '开始考试', // 按钮字样
      limittime:120, // 控制倒计时时间
      settime: '', // 倒计时相关
      leftTime: '',
      start_time: '',
      flag: false,
      kaoshiId: '207',
      xuancitiankong: '', // 选词填空
      xuancitiankongDy: [], // 选词填空答案
      xinwenbaodao: '', // 新闻报道
      changyuedu: '',
      english: [
        {value: 'A',label: '选项 A'},{value: 'B',label: '选项 B'},{value: 'C',label: '选项 C'},{value: 'D',label: '选项 D'},{value: 'E',label: '选项 E'},
        {value: 'F',label: '选项 F'},{value: 'G',label: '选项 G'},{value: 'H',label: '选项 H'},{value: 'I',label: '选项 I'},{value: 'J',label: '选项 J'},
        {value: 'K',label: '选项 K'},{value: 'L',label: '选项 L'},{value: 'M',label: '选项 M'},{value: 'N',label: '选项 N'},{value: 'O',label: '选项 O'},
        {value: 'P',label: '选项 P'},{value: 'Q',label: '选项 Q'},{value: 'R',label: '选项 R'},{value: 'S',label: '选项 S'},{value: 'T',label: '选项 T'}
      ],
      zixiyuedu: '',
      changduihua: '',
      pianzhangfanyi: '',
      school_id: '1',
      id: '1',
      isChakan: 0,
      //1表示老师2表示学生
      identity: '2',
    typeName:'作文'
    };
  },
 
  methods: {
    // 返回上一页
    goback(){
      this.$router.push('/stuOrder')
    },
      check(val){               
          //  this.changeName(val)
          this.isCheck=val             
      },
      play_ztingli(){

      },
    
      next(){
        this.isCheck+=1
        this.typeName=this.typeList[this.isCheck-1]
        
          this.changeName( this.isCheck)
          if(this.isCheck==8){
              this.isCheck=1
              this.typeName=this.typeList[this.isCheck-1]
              this.getItem()
              // return
          }
      },
     
     async getItem(){
      const res = await this.$http.post("admin/Examination/paperlst",qs.stringify({id: this.kaoshiId,u_id:this.id,identity: this.identity}));
      if (res.status === 200 && res.data.code === "1") {
        console.log(res);        
        this.zuowen = res.data.info.zuowen;
        this.test_paper = res.data.info.test_paper;
        this.duanwenlijie = res.data.info.duanwenlijie;
        this.xuancitiankong = res.data.info.xuancitiankong;
        this.xinwenbaodao = res.data.info.xinwenbaodao;
        this.changyuedu = res.data.info.changyuedu;
        this.zixiyuedu = res.data.info.zixiyuedu;
        this.changduihua = res.data.info.changduihua;
        this.pianzhangfanyi = res.data.info.pianzhangfanyi;
        if (this.zuowen.is_img == 1){
          this.zuowenImgUrl = `${this.baseUrl}${this.zuowen.img_url}`;
        }
      }
    },
    chakan(key){
      if (this.xuancitiankongDy[key] == undefined || this.xuancitiankongDy[key] == null){
        return false;
      }
      if (this.xuancitiankong.daan.split(',')[key].replace(/^\s+|\s+$/g,'')  == this.xuancitiankongDy[key].replace(/^\s+|\s+$/g,'')){
        return true;
      } else {
        return false;
      }
    },
    // check(item) {
    //   this.isCheck = item;
    // },
    play_ztingli(){ // 总音频
      this.$refs.vide.src = `${this.baseUrl}${this.test_paper.file}`;
      this.$refs.vide.play();
      this.noplay = true;
    },
    play_duanwen(item,key){ // 短文理解听力 duanwenAudio
      // this.$refs.duanwenAudio[key].src = `${this.baseUrl}${item.audio_url}`;
      // this.$refs.duanwenAudio[key].play();
      this.$refs.vide.src = `${this.baseUrl}${item.audio_url}`;
      this.$refs.vide.play();
    },
    play_duanwen_opt(ie,key,k){ // 短文听力下的每一项的播放
      // this.$refs.duanwenOpt.src = `${this.baseUrl}${this.duanwenlijie[key].xuanzhe[0][k].audio_url}`;
      // this.$refs.duanwenOpt.play();
      this.$refs.vide.src = `${this.baseUrl}${this.duanwenlijie[key].xuanzhe[0][k].audio_url}`;
      this.$refs.vide.play();
    },
    play_xinwen(item,key){ // 新闻报道 duanwenAudio
      // this.$refs.xinwenAudio[key].src = `${this.baseUrl}${item.audio_url}`;
      // this.$refs.xinwenAudio[key].play();
      this.$refs.vide.src = `${this.baseUrl}${item.audio_url}`;
      this.$refs.vide.play();
    },
    play_xinwen_opt(ie,key,k){ // 新闻报道 单项
      // this.$refs.xinwenOpt.src = `${this.baseUrl}${this.xinwenbaodao[key].xuanzhe[0][k].audio_url}`;
      // this.$refs.xinwenOpt.play();
      this.$refs.vide.src = `${this.baseUrl}${this.xinwenbaodao[key].xuanzhe[0][k].audio_url}`;
      this.$refs.vide.play();
    },
    play_chang(item,key){ // 听长对话 duanwenAudio
      // this.$refs.changAudio[key].src = `${this.baseUrl}${item.audio_url}`;
      // this.$refs.changAudio[key].play();
      this.$refs.vide.src = `${this.baseUrl}${item.audio_url}`;
      this.$refs.vide.play();
    },
    play_chang_opt(ie,key,k){ // 听长对话下的每一项的播放
      // this.$refs.changOpt.src = `${this.baseUrl}${this.changduihua[key].xuanzhe[0][k].audio_url}`;
      // this.$refs.changOpt.play();
      this.$refs.vide.src = `${this.baseUrl}${this.changduihua[key].xuanzhe[0][k].audio_url}`;
      this.$refs.vide.play();
    },
    async getItem(){
      const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/Examination/paperlst",qs.stringify({id: 104,u_id:1,identity:2}));
      if (res.status === 200 && res.data.code === "1") {
        console.log(res);
        
        this.zuowen = res.data.info.zuowen;
        this.test_paper = res.data.info.test_paper;
        this.duanwenlijie = res.data.info.duanwenlijie;
        this.xuancitiankong = res.data.info.xuancitiankong;
        this.xinwenbaodao = res.data.info.xinwenbaodao;
        this.changyuedu = res.data.info.changyuedu;
        this.zixiyuedu = res.data.info.zixiyuedu;
        this.changduihua = res.data.info.changduihua;
        this.pianzhangfanyi = res.data.info.pianzhangfanyi;
        if (this.zuowen.is_img == 1){
          this.zuowenImgUrl = `${this.baseUrl}${this.zuowen.img_url}`;
        }
      }
    },
  
      
  },
  created() {},
  mounted() {
        this.baseUrl = `${BASE_URL}`;
    this.kaoshiId = localStorage.getItem("kaoshiId");
    this.school_id = localStorage.getItem("school_id");
    this.identity = localStorage.getItem("identity");
    this.id = localStorage.getItem("id");
      console.log( this.kaoshiId,this.school_id, this.identity,this.id )
    this.start_time = Date.parse(new Date())/1000;
    this.isChakan = this.$route.params.isChakan;
    this.getItem();
    if (this.identity == 2 && this.isChakan != 1){
    //   this.StartCountDown();
    };
    if (this.identity == 1 || this.isChakan == 1){
      this.is_tijiao = true;
    }
  },
//     watch: {
//      typeName(newName, oldName) {
//          if(this.isCheck==1){
//              this.typeName='作文'
//          }
//           if(this.isCheck==2){
//              this.typeName='听短文理解'
//          }
//         console.log(newName)
//         console.log(oldName)
//      }
//    } 
  }
</script>
<style lang="less" scoped>
.red {
  color: red;
}
.blue{
     /* color:#409EFF; */
 }
.fourKaoshi{
 min-height: 100%;
  /* // border: 1px solid #ccc; */
 padding-bottom:50px;
  background:url(../../assets/image/creatshijuan/bg.png) no-repeat   ;
  width:100%;
  height:100%;
 /* min-width: 1366px; */
  background-repeat: no-repeat;
  background-size: cover;
  -webkit-background-size: cover;
  -o-background-size: cover;
  background-position: center 0;
  overflow:auto;
}
.fourKaoshi .centers{
    width: 95%;
    margin: 0 auto;
    min-height: 100%;
}
.title-box {
    height: 60px;
    width: 100%;
    overflow: hidden;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid #E9E8EC;
    margin-bottom: 10px;
    h2 {
      font-size: 20px;
    }
}
  .button-box {
      text-align: left;
      border-bottom: 2px solid #E6A23C;
      box-sizing: border-box;
      background-color: #fff;
      position: -webkit-sticky;
      position: sticky;
      z-index: 11;
      button {
        color:#E6A23C;
        background-color: #fff;
        border: none;
        border-radius:0;
        margin-left: 0;
        font-size: 16px;     
      }
    }
     .component-box {
       width:60%;
      float: left;
      text-align: left;
      font-size: 14px;
      padding-top: 10px;
      overflow: hidden;
      background-color: #fff;
      // margin-top: 20px;
      .big-box {
        padding: 20px;
        .zuowen-title {
          font-size: 14px;
          line-height: 30px;
        }
        img {
          height: 200px;
          margin-left: 145px;
        }
      }
     }
    .datika {
      background-color: #fff;
      width: 30%;
      float: right;
      // height: 70vh;
      margin-left: 20px;
      // margin-top: 20px;
      padding: 10px 20px;
      box-sizing: border-box;
      overflow:auto;
      position: -webkit-sticky;
      position: sticky;
      top: 40px;
      z-index: 11;
      .title {
        height: 26px;
        font-size: 14px;
        text-align: center;
        line-height: 26px;
        padding-bottom: 5px;
        font-weight: 700;
        border-bottom: 1px solid #ccc;
      }
      .one-box {
        margin-top: 10px;
        margin-bottom: 20px;
        &:last-child {
          border-bottom: none;
        }
        
        .one-title {
          height: 20px;
          font-size: 16px;
          color: #FF7E00;
          line-height: 18px;
          margin-bottom: 5px;
          cursor: pointer;
        }
        .icon{
          display: inline-block
        }
        .span-box {
          margin: 5px 0;
          span {
            height: 22px;
            width: 22px;
            color:#fff;
            background-color: #989898;
            // border: 1px solid #000;
            display: inline-block;
            font-size: 12px;
            line-height: 20px;
            margin: 4px;
            text-align: center;
            box-sizing: border-box;
            cursor: pointer;
          }
         .bg-red {
           background-color: #409EFF;
            // background-color: #989898;
            color: #fff;
            border: none;
          }
         
          .chec {
            background-color: #409EFF;
            color: #fff;
            border: none;
          }

        }
      }
      .last-box{
          border-top: 1px solid transparent;
            width: 80%;
            height: 200px;
            background:url(../../assets/image/yuejuan/yuejuan_02.png) no-repeat   ;
            background-size: 80%
        }
        .titles{
            font-size: 16px;
            font-weight: 700;
            text-align: center;
            margin-top: 80px;
        }  
        .input{
            margin: 20px 0;
            input{
                width: 70%;
                height: 30px;
                border: 1px solid #ccc;
            }
        } 
        .button{
            width: 40%;
            height: 40px;
            line-height: 40px;
            border-radius: 20px;
            text-align: center;
            color: #fff;
            background-color: #FF7E00;
            margin-left: 30%;
            cursor:pointer;
        }
 }
 
</style>