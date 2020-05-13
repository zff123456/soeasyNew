<template>
    <div>
        <div class="print" style="margin-top: 80px">
            <div >
                <div style="margin-left: 40px">
                    <div style=" width:100%;margin-left:20px;height: 60px;margin-top: 20px;" >
                        <div  style="float:left;margin-right: 20px;">
                            <el-select v-model="queryName" placeholder="请选择查询条件">
                                <el-option  v-for="item in queryInfo" :key="item.id"  :label="item.name"   :value="item.id"> </el-option>
                            </el-select>
                        </div> 
                        <div style="float:left;" >
                          <el-input placeholder="请输入搜索内容" v-model="keys"  clearable  style="border-radius: 20px;width: 200px;"  ></el-input>
                          <el-button slot="append"  style="background:#F56C6C;color:#fff;margin-left:20px;border-radius: 20px;border: none"   @click="searchInfo">搜索</el-button> 
                          <el-button slot="append"  @click="print" style="background:#013A6F;color:#fff;margin-left:20px;border-radius: 20px;border: none"  >打印</el-button>                                     
                      </div>
                    </div> 
                    <!-- <el-input style="width: 120px" v-model="print_classname" placeholder="班级名称"></el-input>
                    <el-input style="width: 120px;margin-left: 20px"  v-model="print_teachername"  placeholder="教师姓名"></el-input>
                    <el-input style="width: 120px;margin-left: 20px"  v-model="print_allnember"  placeholder="应有学生"></el-input>
                    <el-input style="width: 120px;margin-left: 20px"   v-model="print_number" placeholder="班级注册人数"></el-input>
                    <el-date-picker   style="margin-left: 20px"  v-model="print_addtime"   type="datetime"   placeholder="添加时间">  </el-date-picker>
                    <el-date-picker     style="margin-left: 20px"  v-model="print_changetime"   type="datetime"   placeholder="最近修改时间"> </el-date-picker> -->
                    <!-- <el-button @click="print_search" slot="append"  style="background:#F56C6C;color:#fff;position: absolute;margin-left:30px;border-radius: 20px;border: none">搜索</el-button>
                    <el-button @click="reset" slot="append"  style="background:#AE5DA1;color:#fff;position: absolute;margin-left:100px;border-radius: 20px;border: none">重置</el-button>
                    <el-button @click="print"  slot="append"  style="background:#013A6F;color:#fff;position: absolute;margin-left:170px;border-radius: 20px;border: none">打印</el-button> -->
                </div>
                <el-table   id="printMe" ref="multipleTable"  @selection-change="handleSelectionChange" style="margin-top: 20px" border stripe :data="tableData">
                    <!--                    <el-table-column :render-header="renderProductId"    fixed prop="class_name"  label="班级名称"  align="center" color="#000"></el-table-column>-->
                    <el-table-column  v-if="show1==1"  fixed prop="class_name"  :render-header="renderHeaderDate1" label="班级名称"  align="center"> </el-table-column>
                    <el-table-column  v-if="show2==1"  :render-header="renderHeaderDate2" fixed prop="teacher_name" label="教师姓名"   align="center"  ></el-table-column>
                    <el-table-column  v-if="show3==1"  :render-header="renderHeaderDate3" fixed prop="student_num"  label="应有学生"  align="center"> </el-table-column>
                    <el-table-column   v-if="show4==1"  :render-header="renderHeaderDate4" fixed prop="use_num"  label="班级注册人数"   align="center" > </el-table-column>
                    <el-table-column   v-if="show5==1"  :render-header="renderHeaderDate5" fixed prop="addtime" label="添加时间"  align="center" >
                        <template slot-scope="scope">{{ scope.row.addtime | time}}</template>
                    </el-table-column>
                    <el-table-column   v-if="show6==1"  :render-header="renderHeaderDate6" fixed prop="update_time"  label="最近修改时间"  align="center">
                        <template slot-scope="scope">{{ scope.row.update_time | time}}</template>
                    </el-table-column>
                    <el-table-column   align="center"   label="操作">
                        <template slot-scope="scope">
                            <el-button size="mini" @click="delete_print(scope.row)" type="danger" >移除（不打印）</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import qs from "qs";
    import print from 'print-js'
    export default {
        data(){
            return {
                keys:'',
                 queryInfo:[{id:1,name:'学生姓名'},{id:2,name:'学生账号'},{id:3,name:'班级名称'},{id:4,name:'教师名称'},],
                queryName:'',
                someJSONdata :[
                    {
                        name: 'John Doe',
                        email: 'john@doe.com',
                        phone: '111-111-1111'
                    },
                    {
                        name: 'Barry Allen',
                        email: 'barry@flash.com',
                        phone: '222-222-2222'
                    },
                    {
                        name: 'Cool Dude',
                        email: 'cool@dude.com',
                        phone: '333-333-3333'
                    }
                ],
                print_classname:"",
                print_teachername:"",
                print_allnember:"",
                print_number:"",
                print_addtime:"",
                print_changetime:"",
                tableData:[],
                tableData:[{class_name:'一班',use_num:1,student_num:20,teacher_name:'李四',u_nickname:'张三',u_name:123456,test_paper_name:'试卷01',addtime:0,wenti:'aaaa',user_yn:'bbbb',id:1
                         },{u_nickname:'张三',u_name:123456,test_paper_name:'试卷01',addtime:0,wenti:'aaaa',user_yn:'bbbb',class_name:'一班',use_num:1,student_num:20,teacher_name:'李四',id:2
                         },{u_nickname:'张三',u_name:123456,test_paper_name:'试卷01',addtime:0,wenti:'aaaa',user_yn:'bbbb',class_name:'一班',use_num:1,student_num:20,teacher_name:'李四',id:3
                         },{u_nickname:'张三',u_name:123456,test_paper_name:'试卷01',addtime:0,wenti:'aaaa',user_yn:'bbbb',class_name:'一班',use_num:1,student_num:20,teacher_name:'李四',id:4
                         },{u_nickname:'张三',u_name:123456,test_paper_name:'试卷01',addtime:0,wenti:'aaaa',user_yn:'bbbb',class_name:'一班',use_num:1,student_num:20,teacher_name:'李四',id:5}],
                school_id:1,
                addtime:"",
                changetime:"",
                select_id:[],
                show1:1,
                show2:1,
                show3:1,
                show4:1,
                show5:1,
                show6:1,
                properties:[
                    {
                        field: 'class_name',
                        displayName: '班级名称',
                        columnSize: 1,
                    },
                    {
                        field: 'teacher_name',
                        displayName: '教师姓名',
                        columnSize: 1
                    },
                    {
                        field: 'student_num',
                        displayName: '应有学生',
                        columnSize: 1
                    },
                    {
                        field: 'use_num',
                        displayName: '班级注册人数',
                        columnSize: 1
                    },
                    {
                        field: 'addtime',
                        displayName: '添加时间',
                        columnSize: 1
                    },
                    {
                        field: 'update_time',
                        displayName: '最近修改时间',
                        columnSize: 1,
                        align:"center"
                    },

                ],
                properties1:[
                    {
                        field: 'class_name',
                        displayName: '班级名称',
                        columnSize: 1,

                    },
                    {
                        field: 'teacher_name',
                        displayName: '教师姓名',
                        columnSize: 1
                    },
                    {
                        field: 'student_num',
                        displayName: '应有学生',
                        columnSize: 1
                    },
                    {
                        field: 'use_num',
                        displayName: '班级注册人数',
                        columnSize: 1
                    },
                    {
                        field: 'addtime',
                        displayName: '添加时间',
                        columnSize: 1
                    },
                    {
                        field: 'update_time',
                        displayName: '最近修改时间',
                        columnSize: 1,
                        align:"center"
                    },

                ],
            }
        },
        name: "print",
        created() {
            this.get_school_class()
        },
        methods:{
            renderHeaderDate1(){
                return (
                    <div v-if="show1 ==1">
                    <span>班级名称</span>
                    <i style="margin-left:10px" onClick={ this.del1} class="el-icon-delete"></i>
                    </div>
            )
            },
            renderHeaderDate2(){
                return (
                    <div v-if="show2 ==1">
                    <span>教师姓名</span>
                    <i style="margin-left:10px" onClick={ this.del2} class="el-icon-delete"></i>
                    </div>

            )
            },
            renderHeaderDate3(){
                return (
                    <div v-if="show3 ==1">
                    <span>应有学生</span>
                    <i style="margin-left:10px" onClick={ this.del3} class="el-icon-delete"></i>
                    </div>

            )
            },
            renderHeaderDate4(){
                return (
                    <div v-if="show4 ==1">
                    <span>班级注册人数</span>
                    <i style="margin-left:10px" onClick={ this.del4} class="el-icon-delete"></i>
                    </div>

            )
            },
            renderHeaderDate5(){
                return (
                    <div v-if="show5 ==1">
                    <span>添加时间</span>
                    <i style="margin-left:10px" onClick={ this.del5} class="el-icon-delete"></i>
                    </div>

            )
            },
            renderHeaderDate6(){
                return (
                    <div v-if="show6 ==1">
                    <span>最近修改时间</span>
                    <i style="margin-left:10px" onClick={ this.del6} class="el-icon-delete"></i>
                    </div>

            )
            },
            del1(){
                for(var k=0;k<this.tableData.length;k++){
                    delete this.tableData[k]["class_name"];

                }
                this.properties =  this.properties.filter(item => item.field !=="class_name");

                console.log(this.properties)
                this.show1 = 0
            },
            del2(){
                for(var k=0;k<this.tableData.length;k++){
                    delete this.tableData[k]["teacher_name"];

                }
                this.properties =  this.properties.filter(item => item.field !=="teacher_name");

                console.log(this.properties)
                this.show2 = 0
            },
            del3(){
                for(var k=0;k<this.tableData.length;k++){
                    delete this.tableData[k]["student_num"];

                }
                this.properties =  this.properties.filter(item => item.field !=="student_num");

                console.log(this.properties)
                this.show3 =0
            },
            del4(){
                for(var k=0;k<this.tableData.length;k++){
                    delete this.tableData[k]["use_num"];

                }
                this.properties =  this.properties.filter(item => item.field !=="use_num");

                console.log(this.properties)
                this.show4 =0
            },
            del5(){
                for(var k=0;k<this.tableData.length;k++){
                    delete this.tableData[k]["addtime"];

                }
                this.properties =  this.properties.filter(item => item.field !=="addtime");

                console.log(this.properties)
                this.show5 =0
            },
            del6(){
                for(var k=0;k<this.tableData.length;k++){
                    delete this.tableData[k]["update_time"];

                }
                this.properties =  this.properties.filter(item => item.field !=="update_time");

                console.log(this.properties)
                this.show6 =0
            },

            async get_school_class(){
                const res = await this.$http.post("admin/teacher/classlst", qs.stringify({ teacher_id: "",school_id: this.school_id}));
                if (res.status === 200 && res.data.code === "1") {
                    this.tableData = res.data.info
                }
                console.log(this.tableData)
            },
            async print_search(){
                var add = new Date(this.print_addtime);
                add=add.getFullYear() + '-' + (add.getMonth() + 1) + '-' + add.getDate() + ' ' + add.getHours() + ':' + add.getMinutes() + ':' + add.getSeconds();
                var s=new Date(add).getTime();
                this.addtime= s.toString().slice(0,10)

                var change = new Date(this.print_changetime);
                change=change.getFullYear() + '-' + (change.getMonth() + 1) + '-' + change.getDate() + ' ' + change.getHours() + ':' + change.getMinutes() + ':' + change.getSeconds();
                var change=new Date(change).getTime();
                this.changetime= change.toString().slice(0,10)
                console.log(this.addtime)
                console.log(this.changetime)
                // console.log(this.print_classname)
                // console.log(this.print_teachername)
                // console.log(this.print_allnember)
                // console.log(this.print_number)
                // console.log(this.print_addtime)
                // console.log(this.print_changetime)
            },
            handleSelectionChange(val) {
                let a = []
                val.forEach(function(item, index) {
                    a.push({ id: item.id })
                })
                this.select_id = a
            },
            print(){
                printJS({
                    documentTitle:"学校班级",
                    printable: this.tableData,
                    properties:this.properties,
                    type: 'json'
                })
                // var printhtml = window.getElementById("#printMe").innerHtml // 获取打印区域
                // var oldhtml = document.innerHtml // 保存原始内容
                // document.innerHtml = printhtml // 赋值打印
                // window.print()
                // document.innerHtml = oldhtml // 还原页面
                // window.location.reload() // 刷新解决页面无法点击
            },
            delete_print(row){
                console.log(row)
                this.tableData =  this.tableData.filter(item => item.id !==row.id);

            },
            reset(){
                this.get_school_class()
                console.log(123)
                this.show1 =1
                this.show2 =1
                this.show3 =1
                this.show4 =1
                this.show5 =1
                this.show6 =1
                this.properties =this.properties1
            }


        }
    }
</script>

<style scoped>

</style>