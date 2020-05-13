<template>
    <div  style="padding-top:60px;">
        <div style="width: 100%;height: 50px;background: #1B65D5;display: flex;padding-left: 150px;box-sizing:border-box;">
            <div @click="toother(1)" class="item">成绩统计</div>
            <div @click="toother(2)" class="item">错题统计</div>
            <div @click="toother(3)" class="item" >视频统计</div>
            <div @click="toother(4)" style="background: #fff;color: #1B65D5" class="item">直播统计</div>
        </div>
        <div class="echartsmain">
            <div id="myChart" :style="{width: '100%', height: '400px',}"></div>
        </div>


        <div style="margin-top: 30px;margin-left: 40px">
            <el-select v-model="value" placeholder="请选择直播">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                </el-option>
            </el-select>
            <el-select style="margin-left: 30px" v-model="value" placeholder="请选择班级">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                </el-option>
            </el-select>
            <el-select style="margin-left: 30px" v-model="value" placeholder="请选择学生">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                </el-option>
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
            <el-button style="margin-left: 30px" type="primary" icon="el-icon-search">搜索</el-button>
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
    export default {
        data(){
            return{
                 currentPage:1,
                pagesize:6,
                value1: '',
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
                    },]
            }
        },
        name: "score",
        mounted(){
            this.drawLine();
        },
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
            getRowClass ({ rowIndex }) {
                if (rowIndex == 0) {
                    return 'background:RGB(238,239,246);border:1px solid #ccc'
                } else {
                    return ''
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

                myChart.setOption({
                    colors:["red","blue"],
                    title: {
                        text: '直播观看时长对比',
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
                        data: ['观看时长', '视频总时长'],
                    },
                    series: [
                        {
                            color:['#DCDBE0'],
                            name:"观看时长",
                            data: [23, 12, 32, 67, 32, 89, 32],
                            symbolSize: 10,   //设定实心点的大小
                            type: 'bar',
                            barWidth :20

                        },
                        {
                            color: ["#FF5B82"],
                            name:"视频总时长",
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
.echartsmain{
    width: 98%;
    margin-left: 1%;
    margin-top: 20px;
    box-shadow:  0px 2px 0px 0px #ccc,
    -2px 0px 0px 0px #ccc,
    2px 0px 0px 0px #ccc,
    0px 2px 0px 0px #ccc;
}
</style>