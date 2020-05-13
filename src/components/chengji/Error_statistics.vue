<template>
    <div style="padding-top:60px;"> 
        <div style="width: 100%;height: 50px;background: #1B65D5;display: flex;padding-left: 150px;box-sizing: border-box;">
            <div @click="toother(1)" class="item">成绩统计</div>
            <div @click="toother(2)" class="item"  style="background: #fff;color: #1B65D5">错题统计</div>
            <div @click="toother(3)" class="item">视频统计</div>
            <div @click="toother(4)" class="item">直播统计</div>
           
        </div>
        <div style="width: 100%;margin-top: 20px">
            <div class="leftmain" >
                <div style="width: 100%;height: 50px;background: #E5E5E5">
                    <div style="height: 50px;line-height: 50px;color: #848484;position: absolute;margin-left: 100px">近期班级平均正确率</div>
                    <el-select style="margin-left: 30px;line-height: 50px;margin-left: 80%" v-model="value" placeholder="请选择班级">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </div>
                <div id="myChart" :style="{width: '100%', height: '400px',}"></div>
            </div>
            <div class="rightmain" >
                <div style="width: 100%;height: 50px;background: #E5E5E5">
                    <div style="height: 50px;line-height: 50px;color: #848484;position: absolute;margin-left: 10px">学生错题统计</div>
                    <el-select style="margin-left: 30px;line-height: 50px;margin-left: 22%;position: absolute" v-model="value" placeholder="请选择学生">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                        </el-option>
                    </el-select>
                    <el-select style="margin-left: 30px;line-height: 50px;margin-left:65%" v-model="value" placeholder="请选择题型">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                        </el-option>
                    </el-select>



                    <div>
                        <div>
                            <img :src="require('@/assets/image/score/tongji_03.png')" style="margin-top: 40px;position: absolute;margin-left: 30px">
                            <div style="margin-top: 45px;position: absolute;margin-left:90px;font-size: 18px;font-weight: bold;color:#969696">总题数</div>
                            <div style="margin-top: 45px;position: absolute;margin-left:450px;font-size: 18px;font-weight: bold;color:#969696">112</div>
                        </div>
                        <div>
                            <img :src="require('@/assets/image/score/tongji_06.png')" style="margin-top: 130px;position: absolute;margin-left: 30px">
                            <div style="margin-top: 135px;position: absolute;margin-left:90px;font-size: 18px;font-weight: bold;color:#969696">正确数量</div>
                            <div style="margin-top: 135px;position: absolute;margin-left:450px;font-size: 18px;font-weight: bold;color:#969696">100</div>
                        </div>
                        <div>
                            <img :src="require('@/assets/image/score/tongji_08.png')" style="margin-top: 220px;position: absolute;margin-left: 30px">
                            <div style="margin-top: 225px;position: absolute;margin-left:90px;font-size: 18px;font-weight: bold;color:#969696">错误题数</div>
                            <div style="margin-top: 225px;position: absolute;margin-left:450px;font-size: 18px;font-weight: bold;color:#969696">100</div>
                        </div>
                        <div>
                            <img :src="require('@/assets/image/score/tongji_10.png')" style="margin-top: 310px;position: absolute;margin-left: 30px">
                            <div style="margin-top: 315px;position: absolute;margin-left:90px;font-size: 18px;font-weight: bold;color:#969696">正确率</div>
                            <div style="margin-top: 315px;position: absolute;margin-left:450px;font-size: 18px;font-weight: bold;color:#969696">90%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <div style="margin-top: 500px;margin-left: 40px">
            <el-select style="margin-left: 30px" v-model="value" placeholder="请选择班级">
                <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                        :disabled="item.disabled">
                </el-option>
            </el-select>
            <el-select style="margin-left: 30px" v-model="value" placeholder="请选择题目类型">
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

        <div class="table" >
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
                    sjname: '四级模拟试卷2',
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
                    sjname: '四级模拟试卷2',
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
                        sjname: '四级模拟试卷3',
                        score: '120',
                        type:"四级",
                        class:"测试一班",
                        name:"张三",
                        time:"01:30:02",
                        fenshu:"60",
                    },
                    {
                        sjname: '四级模拟试卷4',
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
                    tooltip: {
                        trigger: 'item',

                    },
                    xAxis: {
                        name:"题型",
                        type: 'category',
                        data: ['听短文理解', '新闻报告', '听讲座对话', '听长对话', '听篇章', '听短对话', '听单句',"仔细阅读","词汇选择","翻译选择"]
                    },
                    yAxis: {
                        name:"正确率%",
                        type: 'value'
                    },
                    legend: {
                        icon:'stack',
                        orient: 'vertical',
                        left: 'right',
                        data: ['上次对比', '最近成绩'],
                    },
                    series: [{
                        data: [47, 80, 23, 46, 12, 39, 92,34,12,56],
                        type: 'bar',
                        barWidth:35,
                        itemStyle:{
                            color:["#71B2EE"]
                        }
                    }]

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
        width: 68%;
        height:450px;
        position: absolute;
        margin-left: 1%;
        box-shadow:  0px 2px 0px 0px #ccc,
        -2px 0px 0px 0px #ccc,
        2px 0px 0px 0px #ccc,
        0px 2px 0px 0px #ccc;
    }
    .rightmain{
        width: 28%;
        height:450px;
        position: absolute;
        margin-left:71%;
        box-shadow:  0px 2px 0px 0px #ccc,
        -2px 0px 0px 0px #ccc,
        2px 0px 0px 0px #ccc,
        0px 2px 0px 0px #ccc;
    }
    .table{
        width: 96%;
        margin-left:2%;
        box-shadow: 2px 2px 2px #ccc;
        margin-top: 30px;
        margin-bottom: 10px;
        box-shadow:  0px 2px 0px 0px #ccc,
                     -2px 0px 0px 0px #ccc,
                     2px 0px 0px 0px #ccc,
                     0px 2px 0px 0px #ccc;
    }
</style>