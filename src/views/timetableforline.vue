<template>
    <el-main>
        <!--搜索框-->
        <el-row >

            <el-col :span="10" style="padding:10px;margin-left: 10px">
                <el-input v-model="routeName" placeholder="输入线路名称" />
            </el-col>
            <el-col :span="2">
            <div style="padding:10px; margin-left: 20px;">
                <el-button type="primary" @click="search">查询</el-button>
            </div>
            </el-col>


        </el-row>

        <!--        结果显示表格-->
        <el-row  >
            <div>
                <el-table :data="tableData"
                          style="width:100%;">
                    <el-table-column
                            v-for="(item, index) in tableHead"
                            :key=index
                            :prop="item.prop"
                            :label="item.label"
                            :width="item.width">

                    </el-table-column>
                </el-table>
            </div>

        </el-row>
    </el-main>
</template>

<script>
    import request from "../utils/request";

    export default {
        name: "timetableforline",
        data(){
            return{
                routeName:"",
                tableHead:[],
                tableData:[],
                ansTable:[],
                tempList:[],

            }
        },
        methods:{
            getData(){
                request.get("/timetable/line/"+ this.routeName

                ).then(res => {
                    console.log(res);

                    if (res.data == null)
                    {
                        this.$message({
                            type: "error",
                            message: res.msg
                        })

                    }
                    else
                    {
                        //确定列头
                        this.tableHead.push({
                            prop: "bancihao",
                            label: "班次",
                            width: 50
                        })
                        this.ansTable=res.data.timetables;
                       this.ansTable.forEach((element,index)=>{
                            this.tableHead.push({
                                prop: "s"+index,
                                label: element.station,
                                width: 120
                            })

                        })
                        //确定内容
                        this.rowToCol();

                    }
                });
            },
            search(){
                this.clear();
                this.getData();
            },
            rowToCol(){

                //第一次：循环ansTable[0]，外层循环共126次,建表
                this.tempList = this.ansTable[0].timetables;
                this.tempList.forEach((element,index)=>{
                    this.tableData.push({
                        "bancihao":index,

                    });
                })
                //接下来若干次（根据有多少站决定）：更改赋值
                let i;
                for (i = 0; i < this.ansTable.length; i++){
                    this.tempList = this.ansTable[i].timetables;
                    this.tempList.forEach((element,index)=>{
                        let key = "s"+i;
                        let value = element.passTime;
                        this.tableData[index][key] = value;
                    });
                }


            },
            clear(){
                this.tableHead=[];
                this.tableData=[];
                this.ansTable=[];
                this.tempList=[];
            }

        }
    }
</script>

<style scoped>

</style>