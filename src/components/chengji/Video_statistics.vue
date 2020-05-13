<template>
    <div  style="padding-top:60px;">
        <div style="width: 100%;height: 50px;background: #1B65D5;display: flex;padding-left: 150px;box-sizing: border-box;">
            <div @click="toother(1)" class="item">成绩统计</div>
            <div @click="toother(2)" class="item">错题统计</div>
            <div @click="toother(3)" class="item" style="background: #fff;color: #1B65D5">视频统计</div>
            <div @click="toother(4)" class="item">直播统计</div>
        </div>
        <div style="width: 100%;margin-top: 20px">
            <div class="leftmain" >
                <div id="myChart" :style="{width: '100%', height: '400px',}"></div>
            </div>
            <div class="rightmain">
                <div id="myChart2" :style="{width: '100%', height: '400px',}"></div>
            </div>
        </div>


        <div style="margin-top: 450px;margin-left: 40px">          
            <el-select v-model="tracher" placeholder="请选择教师" @change="changeTeacher" clearable style="width:120px;margin-right:30px;"  @clear="getData">
                <el-option
                    v-for="item in teacherList"
                    :key="item.id"
                    :label="item.nickname"
                   :value="[item.id,item.nickname]"
                ></el-option>
            </el-select>
 
            <el-select v-model="classes" placeholder="请选择班级" @change="changeClass" style="width:120px;margin-right:30px;">
                <el-option
                    v-for="item in classList"
                    :key="item.id"
                    :label="item.class_name"
                    :value="[item.id,item.class_name]"
                ></el-option>
            </el-select>
                <el-select v-model="type" placeholder="请选择学生" style="width:120px;">
                    <el-option
                            v-for="item in stuList"
                            :key="item.id"
                            :label="item.nickname"
                            :value="[item.id,item.nickname]"
                    ></el-option>
                </el-select>
 
            <el-select style="margin-left: 30px" v-model="value" placeholder="请选择课程">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                </el-option>
            </el-select>
            <el-select style="margin-left: 30px" v-model="value" placeholder="请选择视频">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                </el-option>
            </el-select>
            <el-date-picker
                    @change="data_change"
                    style="margin-left: 30px"
                    v-model="value1"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
            </el-date-picker>
            <el-button style="margin-left: 30px" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>

        <div style="width: 96%;margin-left:2%;box-shadow: 2px 2px 2px #ccc;margin-top: 30px;margin-bottom: 50px">
            <el-table
                    :header-cell-style="getRowClass"
                     :data="flatten(tableData.slice((currentPage -1) * pagesize, currentPage * pagesize))"
                    style="width: 100%">
                <el-table-column
                        align="center"
                        prop="sjname"
                        label="试卷名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="score"
                        label="总分"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="type"
                        label="等级">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="class"
                        label="班级">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="name"
                        label="学生姓名">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="time"
                        label="考试时长">
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="fenshu"
                        label="得分">
                </el-table-column>
            </el-table>
        </div>
            <!-- 分页插件。 -->
        <div style="float:right;padding-top:5px">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-size="pagesize"
            layout="total, prev, pager, next,jumper"
            :total="tableData.length"
        ></el-pagination>
        </div>
    </div>
</template>

<script>
   import qs from "qs";
    export default {
        data(){
            return{
                // 当前页
                currentPage:1,
                // 每页显示的条数
                pagesize:6,
                // 总页数
                total:0,
                value1: '',
                // 老师列表
                teacherList:[],
                // 教师
                tracher:'',
                // 班级
                classes:'',
                // 班级列表
                classList:[],
                // 教师的id
                teacher_id: '',
                //学校的id
                school_id: '',
                // 学生列表数据
                stuList:[],
                // 学生
                type:'',
                subordinate_id: '',
                pagesize: 15,
                currentPage: 1,
                nickname: '',
                teacheride: '',
                classide: '',
                uide: '',
                options: [

                    {
                        value: '选项2',
                        label: '双皮奶',
                        disabled: true
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }],
                value: '',
                tableData: [{
                    sjname: '四级模拟试卷1',
                    score: '120',
                    type:"四级",
                    class:"测试一班",
                    name:"张三",
                    time:"01:30:02",
                    fenshu:"60",
                }, {
                    sjname: '四级模拟试卷1',
                    score: '120',
                    type:"四级",
                    class:"测试一班",
                    name:"张三",
                    time:"01:30:02",
                    fenshu:"60",
                },
                    {
                        sjname: '四级模拟试卷1',
                        score: '120',
                        type:"四级",
                        class:"测试一班",
                        name:"张三",
                        time:"01:30:02",
                        fenshu:"60",
                    },
                    {
                        sjname: '四级模拟试卷1',
                        score: '120',
                        type:"四级",
                        class:"测试一班",
                        name:"张三",
                        time:"01:30:02",
                        fenshu:"60",
                    },
                    {
                        sjname: '四级模拟试卷1',
                        score: '120',
                        type:"四级",
                        class:"测试一班",
                        name:"张三",
                        time:"01:30:02",
                        fenshu:"60",
                    },
                    {
                        sjname: '四级模拟试卷1',
                        score: '120',
                        type:"四级",
                        class:"测试一班",
                        name:"张三",
                        time:"01:30:02",
                        fenshu:"60",
                    },],
                   
            }
        },
        name: "score",
        mounted(){
            this.drawLine();
            this.getTeacher()
            this.teacher_id = localStorage.getItem("id");
            this.nickname = localStorage.getItem("nickname");
            this.school_id = localStorage.getItem("school_id");
            this.identity = localStorage.getItem("identity");
            console.log(this.teacher_id, this.teacher_id,this.nickname,this.identity,this.school_id )
        },
        methods: {
            // 点击搜索按钮发生的事件
              search(){
                // if (!this.value2 || this.value2 == ""){
                //   this.$message({ message: "搜索条件必须添加时间选择", type: "error", duration: 4000});
                //   return false;
                // };
                if (this.tracher[0] && this.type == "") {
                    this.$message({ message: "选择教师之后，必须具体到某位学生，方可查询", type: "error", duration: 4000,offset:90});
                    return false;
                }
                this.getList();
            },
            // 分页
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
            // 表格设置样式
            getRowClass ({ rowIndex }) {
                if (rowIndex == 0) {
                    return 'background:RGB(238,239,246);border:1px solid #ccc'
                } else {
                    return ''
                }
            },
            //老师选项发生呢个变化的时候
            changeTeacher(){
                console.log(111)
                
                // this.classes = "";
                // this.classList = [];
                // this.type = "";
                // this.stuList = [];
                // if (this.tracher == "" || !this.tracher){
                //     this.value2 = '';
                //     return false;
                // }
                 this.getClass();
               
            },
             //班级选项发生呢个变化的时候
            changeClass(){
                this.type = "";
                this.stuList = [];
                this.getStu();
            },
            async getTeacher() { // 获取教师
                const res = await this.$http.post(
                    "admin/login/teacherlst",
                    qs.stringify({ school_id:1 })
                );
                if (res.status === 200 && res.data.code === "1") {
                    this.teacherList = res.data.info;
                }
            },
            async getClass() { // 获取班级
                const res = await this.$http.post(
                    "admin/login/classlst",
                    qs.stringify({ teacher_id: this.tracher[0] })
                );
                console.log(res)
                if (res.status === 200 && res.data.code === "1") {
                    this.classList = res.data.info;
                    console.log(this.classList)
                }
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
                const res =  await  this.$http.post("admin/teacher/teachertubiaofenxinew",qs.stringify({
                    school_id: 1, teacher_id:"",class_id:"",u_id:"",start_time:"",end_time:"",currentpage:this.currentPage
                }));
                if (res.status === 200 && res.data.code == 1) {
                   this.tableData = res.data.info.user_add_paper
                    this.total = res.data.info.pageinfo.sum
                }
            },
            data_change(val){
                console.log(val)
            },
            toother(val){
                if(val==1){ this.$router.push('/score')}
                if(val==2){ this.$router.push('/Error_statistics')}
                if(val==3){ this.$router.push('/Video_statistics')}
                if(val==4){ this.$router.push('/Live_broadcast_statistics')}
            },
            drawLine(){
                let myChart = this.$echarts.init(document.getElementById('myChart'))
                let myChart2 = this.$echarts.init(document.getElementById('myChart2'))
                myChart.setOption({
                    title: {
                        text: '每月视频观看量（章节）',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    xAxis: {
                        axisTick:{
                            show:false//不显示坐标轴刻度线
                        },
                        axisLine: {
                            show: false,//不显示坐标轴线
                        },
                        type: 'category',
                        boundaryGap: false,
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月',, '8月', '9月', '10月', '11月', '12月']
                    },
                    yAxis: {
                        axisTick:{
                            show:false//不显示坐标轴刻度线
                        },
                        axisLine: {
                            show: false,//不显示坐标轴线
                        },
                        type: 'value'
                    },
                    series: [{
                        smooth: true,
                        data: [820, 932, 901, 934, 1290, 1330, 1320,1231,432,123,567,12,456],
                        type: 'line',
                        areaStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0, //从左到右，但不能从上到下，需要借助辅助系列
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: '#FFEFF3' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: '#FFFDFE' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            }

                        },
                        itemStyle:{
                            normal:{
                                lineStyle:{
                                    width:5,
                                    color:["#FF7999"],
                                }
                            }

                        }
                    }]

                });




                myChart2.setOption({
                    colors:["red","blue"],
                    title: {
                        text: '课程观看时长对比',
                        left: 'center'
                    },
                    tooltip: {
                        trigger: 'item',

                    },
                    xAxis: {
                        axisTick:{
                            show:false//不显示坐标轴刻度线
                        },
                        axisLine: {
                            show: false,//不显示坐标轴线
                        },
                        type: 'category',
                        data: ['1', '2', '3', '4', '5', '6', '7']
                    },
                    yAxis: {
                        axisTick:{
                            show:false//不显示坐标轴刻度线
                        },
                        axisLine: {
                            show: false,//不显示坐标轴线
                        },
                        type: 'value'
                    },
                    legend: {
                        icon:'stack',
                        orient: 'vertical',
                        left: 'right',
                        padding:[20,20,0,0],
                        data: ['上次对比', '最近成绩'],
                    },
                    series: [
                        {
                            color:['#DCDBE0'],
                            name:"上次对比",
                            data: [23, 12, 32, 67, 32, 89, 32],
                            symbolSize: 10,   //设定实心点的大小
                            type: 'bar',
                            barWidth :20

                        },
                        {
                            color: ["#FF5B82"],
                            name:"最近成绩",
                            data: [1, 67, 43, 12, 98, 12, 1],
                            symbolSize: 10,   //设定实心点的大小
                            type: 'bar',
                            barWidth :20
                        }
                    ]

                });
            }}
    }
</script>

<style scoped>
    page{
        background: red;
    }
    .item{
        width:10%;
        text-align: center;
        line-height: 50px;
        font-weight: bold;
        color: #fff;
        cursor: pointer;
    }
    .leftmain{
        width: 48%;
        height:400px;
        position: absolute;
        margin-left: 1%;
        box-shadow:  0px 2px 0px 0px #ccc,
        -2px 0px 0px 0px #ccc,
        2px 0px 0px 0px #ccc,
        0px 2px 0px 0px #ccc;
    }
    .rightmain{
        width: 48%;
        height:400px;
        position: absolute;
        margin-left:51%;
        box-shadow:  0px 2px 0px 0px #ccc,
        -2px 0px 0px 0px #ccc,
        2px 0px 0px 0px #ccc,
        0px 2px 0px 0px #ccc;
    }
</style>