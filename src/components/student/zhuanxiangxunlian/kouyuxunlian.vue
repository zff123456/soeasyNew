<template>
    <div class="right">
      <div class="centers">
      <el-table :data="tableData2" style="width: 100%" border>
        <el-table-column type="index"  align="center" width="70">
        </el-table-column>
        <el-table-column prop="count" label="语句" align="center" min-width="60%">
        </el-table-column>
        <el-table-column label="操作" align="center" min-width="15%">
          <template slot-scope="scope">
            <el-button  type="primary"  size="mini"  @click="checket2(scope.row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column label="查看评测记录" align="center" min-width="25%">
          <template slot-scope="scope">
            <el-button  type="primary"  size="mini" @click ="chakan(scope.row)">查看评测记录</el-button>
          </template>
        </el-table-column>
      </el-table> 
      <div v-if="yuyinList.length!=0" >
        <el-table :data="flatten(yuyinList.slice((currentPage -1) * pagesize, currentPage * pagesize))" style="width: 100%;margin-top:20px" border v-if="yuyinList !=[]">
          <el-table-column prop="addtime" label="训练时间" >
            <template slot-scope="scope">{{scope.row.addtime | time}}</template>
          </el-table-column>
          <el-table-column prop="nickname" label="姓名" ></el-table-column>
          <el-table-column prop="fenshu" label="分数"></el-table-column>
          <el-table-column label="播放" >
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="playVideo(scope.row)">播放</el-button>
              <el-button type="danger" size="mini" @click="delet">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页插件。 -->
      <div style="float:right;padding-top:5px">
        <el-pagination
          @size-change="handleSizeChange"
          :page-size="pagesize"
          layout="total, prev, pager, next"
          :total="yuyinList.length"
        ></el-pagination>
      </div>  
      <el-drawer title="语音评测"  :visible.sync="table"  direction="rtl" size="50%">
        <div style="font-size:16px;line-height:22px;text-align: justify;width:90%;margin-left:5%;margin-top:10px">{{count}}</div>
        <audio :src="videoSrc" controls="controls" style="width:90%;height:40px;margin-top:10px;margin-left:5%;color:red " v-show="videoSrc != ''">
        您的浏览器不支持 audio 标签。

        </audio>
        <el-button type="primary"   size="small" v-show="time =='点击说话(60秒)'"  @click ="mouseStart"><i class="el-icon-headset el-icon--right"></i>{{time}}</el-button>
        <el-button type="primary"   size="small" v-show="time !='点击说话(60秒)'"  @click ="mouseEnd"><i class="el-icon-headset el-icon--right"></i>{{time}}</el-button>
        <!-- <el--button  @click ="mouseStart" icon="el-icon-headset"     type="info" style="margin:0.5rem 10%;width:80%" size="small" v-show="time =='点击说话(60秒)'">{{time}}</el--button> -->
        <!-- <el--button @click ="mouseEnd" icon="play-circle-o" type="info" style="margin:0.5rem 10%;width:80%" size="small" v-show="time !='点击说话(60秒)'">{{time}}</el--button> -->
        <el-button   type="info" size="small" style="margin-left:26%;margin-top:0.4rem;"  @click="submit" :loading ="isLogin" >提交(提交最后一次语音录入)</el-button>
      </el-drawer>
    </div>          
  </div>
  </template>
 
  <script>
  import qs from "qs";
  import recording from '../../untils/recorder.js';
  import "../../untils/fileSaver.js";
  let that = this;
  export default {
    data() {
      return {
        tableData2: [{count:'1234'}], // 语音评测
        pagesize: 10,
        currentPage: 1,
        titleId: '',
        table: false,
        tableData: [],
        loading: false,
        finished: false,
        radio: '',
        time: '点击说话(60秒)',
        num: 60, // 点击说话时间
        recorder: null,
        interval: '',
        startTime: '', // 语音开始时间
        endTime: '', // 语音结束
        count: '',
        isLogin: false,
        wavUrl: '',
        videoSrc: '',
        yuyinList: [],
      };
    },
    created() {
      this.type = localStorage.getItem("type");
      this.test_paper_type_id = localStorage.getItem("test_paper_type_id");
      this.stu_id = localStorage.getItem("id");
      this.school_id = localStorage.getItem("school_id");
      this.identity = localStorage.getItem("identity");
    //   this.getItem();  // 语音评测
    },
    mounted() {},
    methods: {
      handleSizeChange(val) {
        this.pagesize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
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
      checket2(item) { // 语音评测
        this.table = true;
        // this.$router.push({ name: "gendu",query: {count: item.count,titleId: item.id} });
        this.count = item.count;
        this.titleId = item.id;
      },
      async getItem(){ // 获取语音评测
        const res = await this.$http.post( "http://ruanjian.chinadingao.com/admin/index/addpingcelst" );
        if (res.status === 200 && res.data.code === "1") {
          this.tableData2 = res.data.info;
        }
      },
      // 播放音频
      playVideo(){

      },
      clearTimer () {
        if (this.interval) {
          this.num = 60
          clearInterval(this.interval)
        }
      },
      mouseStart (e) {
        console.log(123)
        // e.preventDefault()
        // this.form.time = "请开始口语表达";
        this.clearTimer()
        this.startTime = new Date().getTime()
        recording.get((rec) => {
          // 当首次按下时，要获取浏览器的麦克风权限，所以这时要做一个判断处理
          if (rec) {
            // 首次按下，只调用一次
            if (this.flag) {
              this.mouseEnd()
              this.flag = false
            } else {
              console.log(rec)
              this.recorder = rec
              this.interval = setInterval(() => {
                if (this.num <= 0) {
                  this.recorder.stop()
                  this.num = 60
                  this.clearTimer()
                } else {
                  this.num--
                  this.time = '点击结束（' + this.num + '秒）'
                  this.recorder.start()
                }
              }, 1000)
            }
          }
        })
      },
      mouseEnd (e) {
        // e.preventDefault()
        // this.form.time = "点击说话(60秒)";
        this.clearTimer()
        this.endTime = new Date().getTime()
        if (this.recorder) {
          this.recorder.stop()
          // 重置说话时间
          this.num = 60
          // this.time = '点击说话（' + this.num + '秒）'
          this.time = '点击说话(60秒)'
          // 获取语音二进制文件
          let bold = this.recorder.getBlob()
          console.log(bold)
          // 将获取的二进制对象转为二进制文件流
          let files = new File([bold], 'test.wav', {type: 'audio/wav', lastModified: Date.now()})
          let fd = new FormData()
          fd.append('file', files)
          console.log(fd)
          // fd.append('tenantId', 3) // 额外参数，可根据选择填写
          // 这里是通过上传语音文件的接口，获取接口返回的路径作为语音路径
          this.$http({
            header: ({'Content-Type': 'application/x-www-form-urlencodeed'}),
            method: 'POST',
            url: 'admin/paper/updatafile',
            data: fd,
            withCredentials: false,
          }).then((res) => {
            console.log(res)
            //  这里做登录拦截
            if (res.status === 200 && res.data.code === "1") {
              this.wavUrl = res.data.info;
              
              console.log("成功res:",res);
              // this.$message({ message: res.data.info, type: "success", duration: 4000 });
            } else {
              console.log("失败res",res);
              // document.write("上传未成功",res)
              // this.$message({ message: res.data.info, type: "error", duration: 4000 });
            }
          });
        }
      },
      gotouchmove(){
        console.log(222)
      },
      async submit(){ // 提交
        if (this.wavUrl == ''){
          this.$message({ message: "请勿重复提交，或录音完成之后再提交", type: "error", duration: 4000,offset:90 });
          return false;
        }
        this.isLogin = true;
        const res = await this.$http.post(
          "admin/index/pingce",
          qs.stringify({ url: this.wavUrl ,count: this.count,u_id: this.stu_id, p_id :this.titleId})
        );
        if (res.status === 200 && res.data.code === "1") {
          this.videoSrc = `${BASE_URL}${this.wavUrl}`;
          this.wavUrl = "";
          this.isLogin = false;
          console.log("提交1",res);
          this.$message({ message: res.data.info, type: "success", duration: 4000 });
        } else {
          console.log("提交2",res);
          this.isLogin = false;
          this.$message({ message: res.data.info, type: "error", duration: 4000 });
        }
      },
      async chakan(item) {
        // const res = await this.$http.post( "http://ruanjian.chinadingao.com/admin/index/userpingcelst", qs.stringify({ p_id: item.id }) );
        // if (res.status === 200 && res.data.code === "1") {
        //   this.yuyinList = res.data.info;
        // }
        // this.yuyinList=[{nickname:'张三',fenshu:15,time:""}]

      },
      delet(){
        this.$message({ message: "此项权限尚未开放。", type: "error", duration: 4000 });
      },
    }
  };
  </script>
  
  <style lang="less" scoped>
  /* // @import url("../../../assets/css/index.less"); */
  
  .right {
    padding-top: 80px;
    min-height: 100%;
   padding-bottom:50px;
    background:url(../../../assets/image/creatshijuan/bg.png) no-repeat   ;
    width:100%;
    height:100%;
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-background-size: cover;
    -o-background-size: cover;
    background-position: center 0;
    overflow:auto;
    /* min-height: 100%;
    overflow: hidden;
    padding-top:80px;
    background-color: #f0f0f0; */
    .centers{
      width: 96%;
      margin:0 auto;
    }
  }
  .xwbgra {
    font-size: 16px;
    margin: 10px;
    display: block;
  }
  .xwbgra .van-radio {
      padding: 5px;
    }
  .van-button__icon {
      min-width: 1em;
      /* font-size: 1.2em; */
      line-height: inherit;
      vertical-align: top;
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
  </style>