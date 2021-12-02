<template>
    <el-main>
        <!--        搜索框-->
        <el-row :gutter="0"  >
            <div >
                <el-input v-model="routeName" placeholder="请输入想要搜索的线路名">
                    <template #prefix>
                        <i class="el-input__icon el-icon-search"></i>
                    </template>
                </el-input>
            </div>
            <div style="margin-left: 10px">
                <el-button type="primary" @click="search">查询</el-button>
            </div>
        </el-row>
        <div style="margin-bottom: 50px"></div>
        <el-row :gutter="8">
            <el-col :span="12">
                <el-card  shadow="always">
                <template #header>
                    <div class="card-header">
                        <span>非重复系数</span>
                    </div>
                </template>
                    {{answer}} </el-card>
            </el-col>

        </el-row>
    </el-main>
</template>

<script>
    import request from "../utils/request";

    export default {
        name: "notRepeating",
        data(){
            return{
                routeName:"",
                answer:"",

            }
        },
        methods:{
            search() {
                request.get("/line/not/repeating/"+this.routeName

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
                        this.answer = res.data.number

                    }
                });
            },
        },
    }
</script>

<style scoped>
    .card-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 20px;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .box-card {
        width: 480px;
    }
</style>