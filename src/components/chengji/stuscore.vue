<template>
    <div  style="padding-top:61px;">
        <div style="width: 100%;height: 50px;background: #1B65D5;display: flex;padding-left: 150px;box-sizing: border-box;">
            <div @click="toother(1)" class="item" style="background: #fff;color: #1B65D5;">成绩统计</div>
            <div @click="toother(2)" class="item">错题统计</div>
        </div>
        <div  style="width: 100%; margin-top:30px">
            <div class="pie2" >
                <div style="height:40px;background:#E5E5E5;line-height:40px">
                    <span style="margin-left:15px;color:#777777;font-size:16px;">绩统对比图</span>
                </div>
                <div id="myChart"   class="chart" :style="{width: '100%', height: '400px',}"></div>
            </div>
            <div class="pie">
                <div style="height:40px;background:#E5E5E5;line-height:40px">
                    <span style="margin-left:15px;color:#777777;font-size:16px;">总成绩统计</span>
                   <div class="select" style="float:right;padding:0 20px 0 0">
                       <el-select  placeholder="请选择试卷"  v-model="value"    @change="changeshijuan"  style="height:30px;">
                         <el-option
                           v-for="item in options"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                         </el-option>          
                     </el-select>
                   </div>
                </div>
                <div id="myChart2"   class="chart"  :style="{width: '100%', height: '400px',}"></div>
            </div>
        </div>


        <div style="margin-top: 450px;margin-left: 40px">
            <div class="search-box">
                <!-- <div class="title">选择教师</div> -->
                <el-select v-model="tracher" placeholder="请选择试卷" @change="changeTeacher"    clearable style="width:120px;" @clear="getData">
                    <el-option v-for="item in teacherList" :key="item.id"   :label="item.nickname"   :value="[item.id,item.nickname]" ></el-option>
                </el-select>
            </div>
            <div class="search-box">
                <!-- <div class="title">选择班级</div> -->
                <el-select v-model="classes" placeholder="请选择班级" @change="changeClass" style="width:150px;">
                    <el-option
                            v-for="item in classList"
                            :key="item.id"
                            :label="item.class_name"
                            :value="[item.id,item.class_name]"
                    ></el-option>
                </el-select>
            </div>
            <div class="search-box">
                <!-- <div class="title">选择学生</div> -->
                <el-select v-model="type" placeholder="请选择学生" style="width:120px;">
                    <el-option
                            v-for="item in stuList"
                            :key="item.id"
                            :label="item.nickname"
                            :value="[item.id,item.nickname]"
                    ></el-option>
                </el-select>
            </div>
            <div class="block">
                <!-- <p class="demonstration">选择时间区间</p> -->
                <el-date-picker
                        v-model="value2"
                        type="datetimerange"
                        value-format="timestamp"
                        :picker-options="pickerOptions"
                        range-separator="至"
                        start-placeholder="选择开始日期"
                        end-placeholder="选择结束日期"
                        align="right"
                        style="margin:10px;width:340px;">
                </el-date-picker>
                <el-button type="primary" style="margin: 10px;" @click="search">搜索</el-button>
            </div>
        </div>

        <div style="width: 96%;margin-left:2%;margin-top: 30px;margin-bottom: 50px">
            <el-table   border   stripe  :header-cell-style="getRowClass"       style="width: 100%" :data="flatten(tableData.slice((currentPage -1) * pagesize, currentPage * pagesize))" >
                <el-table-column   align="center"    prop="test_paper_name"  label="试卷名称"    > </el-table-column>
                <el-table-column     align="center" prop="manfen"  label="总分"> </el-table-column>
                <el-table-column prop="test_paper_type_id" label="等级" width="" align="center">
                    <template slot-scope="scope">
                    　<span v-if="scope.row.test_paper_type_id=== 1">四级</span>
                    　<span v-if="scope.row.test_paper_type_id=== 2">六级</span>
                    　<span v-if="scope.row.test_paper_type_id=== 3">A级</span>
                    　<span v-if="scope.row.test_paper_type_id=== 4">B级</span>
                    </template>
                </el-table-column>
                <el-table-column align="center"   prop="class_name"  label="班级">  </el-table-column>
                <el-table-column  align="center"   prop="u_nickname"   label="姓名"> </el-table-column>
                <el-table-column prop="addtime" :formatter="map" label="考试时长"  align="center">  </el-table-column>
                <el-table-column     align="center" prop="zongfen"  label="得分"> </el-table-column>
            </el-table>
            <div style="float:right;padding-top:5px">
                <el-pagination small 
                   @size-change="handleSizeChange" 
                @current-change="handleCurrentChange"
                :page-size="pagesize" 
                layout=" total,prev, pager, next,jumper"
                :total="tableData.length"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    import qs from "qs";
    import  moment from "moment"
    export default {
        data(){
            return{
                tableData: [],
                isLoading: false,
                teacherList: [],
                tracher: '',
                classList: [],
                classes: '',
                stuList: [],
                type: '',
                teacher_id: '',
                school_id: '',
                subordinate_id: '',
                pagesize: 6,
                currentPage: 1,
                nickname: '',
                teacheride: '',
                classide: '',
                uide: '',
               
                value2: '',
                identity: '',
                start_time: '',
                end_time: '',
                pickerOptions:'',
                value:'',
                options:[{value:1,label:'试卷01'},
                {value:2,label:'试卷02'}],
                xArrer:[],
                yArrer:[],

            }
        },
        name: "score",
        mounted(){
            this.drawLine();
            this.getData();
            this.teacher_id = localStorage.getItem("id");
            this.nickname = localStorage.getItem("nickname");
            this.school_id = localStorage.getItem("school_id");
            this.identity = localStorage.getItem("identity");
            // 获取试卷
            this.getList();
            // this.getTeacher();
        },
        methods: {
            getRowClass ({ rowIndex }) {
                if (rowIndex == 0) {
                    return 'background:#1890ff;color:#fff;border:none'
                } else {
                    return ''
                }
            },
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
            async getList(){           
                this.xArrer = [];
                this.yArrer = [];
                const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/teacher/chartfenxi", qs.stringify({ 
                    student_id:1,
                    test_paper_type_id:1,
                }));
                // this.tableData = res.data.info
                console.log(res);

                if (res.status === 200 && res.data.code === "1") {
                    for ( var i = 0 ; i < res.data.info.length ; i++) {
                      this.xArrer.push(res.data.info[i].test_paper_name);
                      this.yArrer.push(parseInt(res.data.info[i].zongfen))
                 }
                 console.log(this.xArrer);
                 console.log(this.yArrer);
                 this.drawLine()
                 
                 
                    // this.tableData = res.data.info
                    // console.log(this.tableData);
                    
                }
            },
            search(){
             
                if (this.tracher[0] && this.type == "") {
                    this.$message({ message: "选择教师之后，必须具体到某位学生，方可查询", type: "error", duration: 4000,offset:90});
                    return false;
                }
                this.getData();
            },
            async qvxiaoYuyue(e){ // 取消预约
                const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/Examination/quxiaoyuyue", qs.stringify({ id: e.id}));
                if (res.status === 200 && res.data.code === "1") {
                    this.$message({ message: res.data.info, type: "success", duration: 3000,offset:90});
                    this.getData();
                } else {
                    this.$message({ message: res.data.info, type: "error", duration: 3000,offset:90});
                }
            },
            startKaoshi(e){
                localStorage.setItem("kaoshiId", e.test_paper_id);
                if (e.test_paper_type_id == 1){ this.$router.push({ name: "fourKaoshi", params: { isChakan: 0}}) };
                if (e.test_paper_type_id == 2){ this.$router.push({ name: "sixKaoshi",params: { isChakan: 0}}) };
                if (e.test_paper_type_id == 3){ this.$router.push({ name: "aKaoshi",params: { isChakan: 0}}) };
                if (e.test_paper_type_id == 4){ this.$router.push({ name: "bKaoshi",params: { isChakan: 0}}) };
            },
            exportExcel() {
                let getCurrentPage = this.currentPage;
                this.pagesize = 99999;
                this.currentPage = 1;
                this.$nextTick(function () {
                    let time = new Date();
                    let year = time.getFullYear();
                    let month = time.getMonth() + 1;
                    let day = time.getDate();
                    let name = year + "" + month + "" + day;
                    var wb = XLSX.utils.table_to_book(document.querySelector(".table"));
                    var wbout = XLSX.write(wb, {
                        bookType: "xlsx",
                        bookSST: true,
                        type: "array"
                    });
                    try {
                        FileSaver.saveAs(
                            new Blob([wbout], { type: "application/octet-stream" }),
                            name + ".xlsx"
                        );
                    } catch (e) {
                        if (typeof console !== "undefined") console.log(e, wbout);
                    }
                    this.pagesize = 15;
                    this.currentPage = getCurrentPage;
                    return wbout;
                })
            },
            grade( e ){
                if (e == 1){ return "四级" };
                if (e == 2){ return "六级" };
                if (e == 3){ return "A级" };
                if (e == 4){ return "B级" };
                if (e == 5){ return "其他" };
            },
            async getTeacher() { // 获取教师
                const res = await this.$http.post(
                    "admin/login/teacherlst",
                    qs.stringify({ school_id: this.school_id })
                );
                if (res.status === 200 && res.data.code === "1") {
                    this.teacherList = res.data.info;
                }
            },
            changeTeacher(){
                this.classes = "";
                this.classList = [];
                this.type = "";
                this.stuList = [];
                if (this.tracher == "" || !this.tracher){
                    this.value2 = '';
                    return false;
                }
                this.getClass();
            },
            async getClass() { // 获取班级
                const res = await this.$http.post(
                    "admin/login/classlst",
                    qs.stringify({ teacher_id: this.tracher[0] })
                );
                if (res.status === 200 && res.data.code === "1") {
                    this.classList = res.data.info;
                }
            },
            changeClass(){
                this.type = "";
                this.stuList = [];
                this.getStu();
            },
            async getStu() { // 获取学生
                const res = await this.$http.post(
                    "admin/login/studentlst",
                    qs.stringify({ class_id: this.classes[0] })
                );
                if (res.status === 200 && res.data.code === "1") {
                    this.stuList = res.data.info;
                }
            },
            changeshijuan(){
                this.getList()

            },
            changeTeacher(){
                this.getClass();
            },
            async getTeacher() { // 获取教师
                const res = await this.$http.post(
                    "http://ruanjian.chinadingao.com/admin/login/teacherlst",
                    qs.stringify({ school_id:1 })
                );
                if (res.status === 200 && res.data.code === "1") {
                    this.teacherList = res.data.info;
                }
            },
            async getClass() { // 获取班级
                const res = await this.$http.post(
                    "http://ruanjian.chinadingao.com/admin/login/classlst",
                    qs.stringify({ teacher_id: this.tracher[0] })
                );
                if (res.status === 200 && res.data.code === "1") {
                    this.classList = res.data.info;
                }
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
            map(row){
                if( moment(row.addtime).diff(moment(row.start_time), 'seconds') == 0){
                    return  moment(row.addtime).diff(moment(row.start_time), 'seconds')
                }else{
                    return  moment(row.addtime).diff(moment(row.start_time), 'seconds') +"分钟"
                }

            },
            async getData(){
                //     this.tracher == ''? this.teacheride = '' : this.teacheride = this.tracher[0];
            //     this.classes == ''? this.classide = '' : this.classide = this.classes[0];
            //     this.type == ''? this.uide = '' : this.uide = this.type[0];
            //     if (!this.value2 || this.value2 == ''){ this.start_time = '';this.end_time = '' } else { this.start_time = this.value2

            //    [0]/1000;this.end_time = this.value2[1]/1000 };
                // const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/teacher/teachertubiaofenxi", qs.stringify({
                //      school_id: this.school_id, 
                //      teacher_id:  this.teacheride,
                //       class_id: this.classide, 
                //       u_id:this.uide, 
                //       start_time: this.start_time,
                //       end_time: this.end_time 
                // }));
                // , teacher_id:"",class_id:"",u_id:"",start_time:"",end_time:"",currentpage:this.currentPage
                const res =  await  this.$http.post("http://ruanjian.chinadingao.com/admin/teacher/tubiaofenxi",qs.stringify({
                    student_id: 1
                }));
                if (res.status === 200 && res.data.code == 1) {
                   this.tableData = res.data.info
                    // this.total = res.data.info.pageinfo.sum
                }
            },
            data_change(val){
                console.log(val)
            },
            toother(val){
                if(val==1){ this.$router.push('/stuscore')}
                if(val==2){ this.$router.push('/stuerror')}
                // if(val==3){ this.$router.push('/Video_statistics')}
                // if(val==4){ this.$router.push('/Live_broadcast_statistics')}
            },
            drawLine(){
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
                myChart.setOption({
                    title: {
                        text: '成绩对比图',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['60分以下', '60-80分', '80-100分', '100分-120分', '120分以上']
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '40%'],
                            data: [
                                {value: 335, name: '60分以下'},
                                {value: 310, name: '60-80分'},
                                {value: 234, name: '80-100分'},
                                {value: 135, name: '100分-120分'},
                                {value: 1548, name: '120分以上'}
                            ],
                            emphasis: {
                                itemStyle: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]

                });




                myChart2.setOption({
                    // colors:["red","blue"],
                    // title: {
                    //     text: '成绩对比图',
                    //     left: 'center'
                    // },
                    // tooltip: {
                    //     trigger: 'item',

                    // },
                    xAxis: {
                        name:"试卷名称",
                        type: 'category',
                        data:this.xArrer
                    },
                    yAxis: {
                        name:"总分",
                        type: 'value'
                    },
    
                series: [{
                      data:this.yArrer,
                       type: 'line',
                      smooth: true
                }]

                });
            }},

    }
</script>

<style scoped lang="less">
    page{
        background: red;
    }
.item{
    width:10%;
    text-align: center;
    line-height: 50px;
    margin:0 3%;
    font-weight: bold;
    color: #fff;
    cursor: pointer;
}
    .pie{
        width: 40%;
        height:400px;
        float: left;
        /* position: absolute; */
        margin:30px  5%; 
        margin-top:0;
        /* margin-left: 37%; */
        box-shadow: 2px 0 0 0  #ccc,0 2px 0 0 #ccc,0 0 2px 0 #ccc ,0 0 0 2px #ccc;
    }
    #myChart{
        margin-top:50px;
    }
    .pie2{
        width: 40%;
        height:400px;
        float: left;
        /* position: absolute; */
        margin:30px  5%; 
        margin-top:0;
        box-shadow: 2px 0 0 0  #ccc,0 2px 0 0 #ccc,0 0 2px 0 #ccc ,0 0 0 2px #ccc;
    }
    .search-box{
        float:left;
        display:flex;
        height:40px;
        line-height:40px;
        margin:10px 10px 0 10px;
        // .title{
        //     margin:0 10px 0 20px;
        // }
    }
</style>