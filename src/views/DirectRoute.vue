<template>
    <!--    给两个站点，返回直达的公交车路线名-->
    <el-main>
    <div style="padding: 10px">
        <!--        搜索框-->
        <el-row>
        <div style="margin: 10px ">
            <el-col :span="6" style="margin-right: 10px">
            站点1:
            <el-input v-model="search1" placeholder="请输入站点1的名称……" clearable/>
            </el-col>
            <el-col :span="6" style="margin-right: 10px">
            站点2:
            <el-input v-model="search2" placeholder="请输入站点2的名称……"  clearable/>
            </el-col>
            <el-col :span="4" style="margin-top:20px;">
            <el-button type="primary" style="margin-left: 15px" @click="load">搜索直达线路名称</el-button>
            </el-col>
        </div>
        </el-row>
        <el-row style="margin-top: 20px">
        <el-table :data="tableData" border stripe style="width: 100%">
            <el-table-column prop="name" label="路线名称" sortable/>
            <el-table-column prop="directional" label="路线方向"/>
        </el-table>
        </el-row>
    </div>
    </el-main>
</template>

<script>
    import request from "@/utils/request";

    export default {
        name: "DirectRoute",
        components: {},
        data() {
            return {
                search1: '',
                search2: '',
                tableData: [],
            }
        },
        created() {  //页面加载的时候调用load
            this.load();
        },
        methods: {
            load() {     //给到一个url和参数
                request.get("/stationline/direct/path/between/two/station/" + this.search1 + "/" + this.search2, {

                }).then(res => {  //结果放在.then里面，通过=>取后台返回结果
                    console.log(this.search1 + " " + this.search2)
                    console.log(res.data)
                    if (res.data == null)
                        this.$message.warning(res.data.msg)
                    else{
                        this.$message.success("查询成功！")
                        this.tableData = res.data
                    }
                })
            },
        }
    }
</script>

<style scoped>

</style>