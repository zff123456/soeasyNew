<template>
    <div  style="padding-top:61px;">
        <div style="width: 100%;height: 50px;background: #1B65D5;display: flex;padding-left: 150px;box-sizing: border-box;">
            <div @click="toother(1)" class="item">成绩统计</div>
            <div @click="toother(2)" class="item"  style="background: #fff;color: #1B65D5">错题统计</div>

        </div>
        <div style="width: 100%;margin-top: 30px">
            <div class="leftmain" >
                <div style="width: 100%;height: 50px;background: #E5E5E5">
                    <div style="height: 50px;line-height: 50px;color: #848484;float: left;margin-left: 5%;">各种题型的正确率</div>
                    <el-select style="margin-left: 30px;line-height: 50px;float: right;margin-right: 5%;" v-model="value" placeholder="请选择试卷">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                                :disabled="item.disabled">
                        </el-option>
                    </el-select>
                </div>
                <div id="myChart" class="chart"   :style="{width: '100%', height: '400px',}"></div>
            </div>
            <div class="rightmain" >
                <div style="width: 100%;height: 50px;background: #E5E5E5">
                     <div style="line-height: 50px;height: 50px;">
                        <div style="height: 50px;line-height: 50px;color: #848484;float: left;margin:0 3%;">错题统计</div>
                        <el-select style="line-height: 50px;float: left;width: 35%;" v-model="value" placeholder="请选择试卷">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>
                        <el-select style="line-height: 50px;float: left;width: 35%;" v-model="value" placeholder="请选择题型">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>
                        <!-- <div style="height: 50px;line-height: 50px;color: #848484;position: absolute;margin-left: 10px">错题统计</div>
                        <el-select style="margin-left: 30px;line-height: 50px;margin-left: 5%;position: absolute" v-model="value" placeholder="请选择试卷">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select>
                        <el-select style="margin-left:30px;line-height: 50px;margin-left:65%" v-model="value" placeholder="请选择题型">
                            <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                    :disabled="item.disabled">
                            </el-option>
                        </el-select> -->
                     </div>
                    <div   class="bigBox">
                        <div class="item-list"  style="width: 80%;margin-left:10%;">
                           <div class="item-l" style="margin-top:35px;width: 60%;float: left;height:50px;line-height: 50px;">
                               <img :src="require('@/assets/image/score/tongji_03.png')"   style="margin-right:10px;vertical-align: middle;"       class="img">
                               <span style="font-size: 18px;font-weight: bold;color:#969696;" class="img-r">总题数</span>
                           </div>
                            <div  class="item-r"   style="margin-top:35px;line-height: 50px;text-align:center;float: right;width:40%;font-size: 18px;font-weight: bold;color:#969696">112</div>                            
                        </div>
                        <div class="item-list"  style="width: 80%;margin-left:10%;">
                            <div class="item-l" style="margin-top:35px;width: 60%;float: left;height:50px;line-height: 50px;">
                                <img :src="require('@/assets/image/score/tongji_06.png')"   style="margin-right:10px;vertical-align: middle;"       class="img">
                                <span style="font-size: 18px;font-weight: bold;color:#969696;" class="img-r">正确数量</span>
                            </div>
                             <div  class="item-r"   style="margin-top:35px;line-height: 50px;text-align:center;float: right;width:40%;font-size: 18px;font-weight: bold;color:#969696">100</div>                            
                         </div>
                         <div class="item-list"  style="width: 80%;margin-left:10%;">
                            <div class="item-l" style="margin-top:35px;width: 60%;float: left;height:50px;line-height: 50px;">
                                <img :src="require('@/assets/image/score/tongji_08.png')"   style="margin-right:10px;vertical-align: middle;"       class="img">
                                <span style="font-size: 18px;font-weight: bold;color:#969696;" class="img-r">错题数量</span>
                            </div>
                             <div  class="item-r"   style="margin-top:35px;line-height: 50px;text-align:center;float: right;width:40%;font-size: 18px;font-weight: bold;color:#969696">100</div>                            
                         </div>
                         <div class="item-list"  style="width: 80%;margin-left:10%;">
                            <div class="item-l" style="margin-top:35px;width: 60%;float: left;height:50px;line-height: 50px;">
                                <img :src="require('@/assets/image/score/tongji_10.png')"   style="margin-right:10px;vertical-align: middle;"       class="img">
                                <span style="font-size: 18px;font-weight: bold;color:#969696;" class="img-r">总题数</span>
                            </div>
                             <div  class="item-r"   style="margin-top:35px;line-height: 50px;text-align:center;float: right;width:40%;font-size: 18px;font-weight: bold;color:#969696">90%</div>                            
                         </div>
                        <!-- <div>
                            <img :src="require('@/assets/image/score/tongji_03.png')" style="margin-top: 40px;position: absolute;margin-left: 30px">
                            <div style="margin-top: 45px;position: absolute;margin-left:90px;font-size: 18px;font-weight: bold;color:#969696">总题数</div>
                            <div style="margin-top: 45px;position: absolute;margin-left:450px;font-size: 18px;font-weight: bold;color:#969696">112</div>
                        </div> -->
                        <!-- <div>
                            <img :src="require('@/assets/image/score/tongji_06.png')" style="margin-top: 130px;position: absolute;margin-left: 30px">
                            <div style="margin-top: 135px;position: absolute;margin-left:90px;font-size: 18px;font-weight: bold;color:#969696">正确数量</div>
                            <div style="margin-top: 135px;position: absolute;margin-left:450px;font-size: 18px;font-weight: bold;color:#969696">100</div>
                        </div> -->
                        <!-- <div>
                            <img :src="require('@/assets/image/score/tongji_08.png')" style="margin-top: 220px;position: absolute;margin-left: 30px">
                            <div style="margin-top: 225px;position: absolute;margin-left:90px;font-size: 18px;font-weight: bold;color:#969696">错题数量</div>
                            <div style="margin-top: 225px;position: absolute;margin-left:450px;font-size: 18px;font-weight: bold;color:#969696">100</div>
                        </div> -->
                        <!-- <div>
                            <img :src="require('@/assets/image/score/tongji_10.png')" style="margin-top: 310px;position: absolute;margin-left: 30px">
                            <div style="margin-top: 315px;position: absolute;margin-left:90px;font-size: 18px;font-weight: bold;color:#969696">正确率</div>
                            <div style="margin-top: 315px;position: absolute;margin-left:450px;font-size: 18px;font-weight: bold;color:#969696">90%</div>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>


        <div style="margin-top: 500px;margin-left: 40px">
            <el-select style="margin-left: 30px" v-model="value" placeholder="请选择试卷">
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
            <!-- :header-cell-style="getRowClass" -->
            <!-- flatten(tableData.slice((currentPage -1) * pagesize, currentPage * pagesize)) -->
            <el-table       :data="tableData"  style="width: 100%"  border   stripe :header-cell-style="getRowClass"  >
                <el-table-column   align="center"    prop="class_name"  label="班级"   width="300"   min-width="300" > </el-table-column>
                <el-table-column   align="center"    prop="type_name"  label="题目类型"   width="300"   min-width="300" > </el-table-column>
                <el-table-column   align="center"    prop="zongtishu"  label="总题数"   width="300"   min-width="300" > </el-table-column>
                <el-table-column   align="center"    prop="zhengqueshu"  label="正确数"   width="300"   min-width="300" > </el-table-column>
                <el-table-column   align="center"    prop="cuotishu"  label="错题数"   width="300"   min-width="300" > </el-table-column>
                <el-table-column   align="center"    prop="zhengquelv"  label="正确率"   width="300"   min-width="300" > 
                    <template slot-scope="scope">
                        {{`${scope.row.zhengquelv}%`}}
                    </template>
                </el-table-column>
                <!-- <el-table-column     align="center" prop="manfen"  label="总分"> </el-table-column>
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
                <el-table-column     align="center" prop="zongfen"  label="得分"> </el-table-column> -->
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
    export default {
        data(){
            return{
                school_id:'',
                teacher_id:'1',
                nickname:'',
                identity:'',
                teacheride:'',
                classide :'',  
                uide:'' ,
                start_time:'' ,
                end_time:'',
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
                    zongtishu: 15,id: 135,zhengqueshu: 15,cuotishu:0,test_paper_id: 3,type_name: "作文",class_name:'测试01班',zhengquelv:2.3},{
                    zongtishu: 15,id: 135,zhengqueshu: 15,cuotishu:0,test_paper_id: 3,type_name: "短文理解",class_name:'测试02班',zhengquelv:2.3},{
                    zongtishu: 15,id: 135,zhengqueshu: 15,cuotishu:0,test_paper_id: 3,type_name: "阅读理解",class_name:'测试04班',zhengquelv:2.3},{
                    zongtishu: 15,id: 135,zhengqueshu: 15,cuotishu:0,test_paper_id: 3,type_name: "选词填空",class_name:'测试07班',zhengquelv:2.3},{
                    zongtishu: 15,id: 135,zhengqueshu: 15,cuotishu:0,test_paper_id: 3,type_name: "作文",class_name:'测试02班',zhengquelv:2.3},{
                    zongtishu: 15,id: 135,zhengqueshu: 15,cuotishu:0,test_paper_id: 3,type_name: "篇章翻译",class_name:'测试01班',zhengquelv:2.3},{
                    zongtishu: 15,id: 135,zhengqueshu: 15,cuotishu:0,test_paper_id: 3,type_name: "作文",class_name:'测试01班',zhengquelv:2.3
                }],
                    xArray:[],
                    yArray:[],
                    itemDate:[]
            }
        },
        name: "score",
        mounted(){
            this.drawLine();
            this.getList();
            this.getDate()
            this.teacher_id = localStorage.getItem("id");
            this.nickname = localStorage.getItem("nickname");
            this.school_id = localStorage.getItem("school_id");
            this.identity = localStorage.getItem("identity");

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
                    return 'background:#1890ff;color:#fff;border:none'
                } else {
                    return ''
                }
            }, 
            async getList(){   
                console.log(1111);
                // const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/teacher/tubiaofenxi", qs.stringify({ student_id: this.teacher_id}));
                const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/Teacher/cuotijinew", qs.stringify({ 
                    u_id: 1,
                    test_paper_id: 1,
                    type_name:" ",
                    currentpage: 1
                }));
                console.log(res)
                if (res.status === 200 && res.data.code === "1") {
                    this.tableData = res.data.info
                    console.log(this.tableData);                   
                }
            },
            data_change(val){
                console.log(val)
            },
            toother(val){
                if(val==1){ this.$router.push('/stuscore')}
                if(val==2){ this.$router.push('/stuerror')}

            },
            async getDate(){  
                this.xArray=[] 
                this.yArray=[]
                console.log(1111);
                // const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/teacher/tubiaofenxi", qs.stringify({ student_id: this.teacher_id}));
                const res = await this.$http.post("http://ruanjian.chinadingao.com/admin/index/studenhome", qs.stringify({ 
                    id: 1,
                    identity:2,
                }));
                console.log(res)
                if (res.status === 200 && res.data.code === "1") {
                    for (var i in res.data.info.tongji) {
                        this.xArray.push(res.data.info.tongji[i].type_name);
                        this.yArray.push(res.data.info.tongji[i].zhengquelv)
                       // this.chartDate.push({value: res.data.info.tongji[i].})
                 }
                 console.log(this.xArray);
                 console.log(this.yArray);
                    this.drawLine();                  
                }
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
                        data: this.xArray
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
                        data:this.yArray,
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
        margin:0 3%;
        color: #fff;
        cursor: pointer;
    }
    .leftmain{
        width: 60%;
        height:450px;
        float: left;
        /* position: absolute; */
        margin-left: 2%;
        box-shadow:  0px 2px 0px 0px #ccc,
        -2px 0px 0px 0px #ccc,
        2px 0px 0px 0px #ccc,
        0px 2px 0px 0px #ccc;
    }
    .rightmain{
        width: 28%;
        height:450px;
        float: right;
        margin-right: 2%;
        /* position: absolute; */
        /* margin-left:71%; */
        box-shadow:  0px 2px 0px 0px #ccc,
        -2px 0px 0px 0px #ccc,
        2px 0px 0px 0px #ccc,
        0px 2px 0px 0px #ccc;
    }
    .table{
        width: 96%;
        margin-left:2%;
        /* box-shadow: 2px 2px 2px #ccc; */
        margin-top: 30px;
        margin-bottom: 10px;
        /* box-shadow:  0px 2px 0px 0px #ccc,
                     -2px 0px 0px 0px #ccc,
                     2px 0px 0px 0px #ccc,
                     0px 2px 0px 0px #ccc; */
    }
   
</style>