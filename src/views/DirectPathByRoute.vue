<template>
    <div style="padding: 10px">
        <div style="padding: 10px">

            <el-input v-model="search1" placeholder="请输入站点1的名称" style="width: 25%;margin-right:10px;margin-bottom: 10px" clearable/>


            <el-input v-model="search2" placeholder="请输入站点2的名称" style="width: 25%;margin-bottom: 10px" clearable/>
            <tr/>

            <el-input v-model="search3" placeholder="请输入线路的名称" style="width: 25%;margin-bottom: 10px;margin-right:10px" clearable/>
            <el-button type="primary" style="margin: 5px" @click="findPath">搜索途径站点</el-button>
        </div>
        <div class="block">
            <el-timeline v-if="showTimeline" v-for="eachroute in route" style="padding-left: 20px">
                <div style="margin: 10px; ">
                    <el-tag :key="eachroute.name" style="margin-bottom: 10px">
                        线路名称：{{ eachroute.name }}
                    </el-tag>
                    <br>
                    <el-tag :key="eachroute.time" style="margin-bottom: 10px">
                        运行时间：{{ eachroute.time }}
                    </el-tag>
                    <br>

                </div>
                <el-timeline-item
                        v-for="(station, index) in eachroute.stations"
                        :key="index"
                        color="#507cff"
                        size='large'
                        :timestamp="station.myId"
                        center="true"
                >
                    {{ station.name }}
                </el-timeline-item>
            </el-timeline>
        </div>
    </div>
</template>

<script>
    import request from "@/utils/request";

    export default {
        name: "DirectPathByRoute",
        components: {},
        data() {
            return {
                loading: true,
                search1: '',
                search2: '',
                search3: '',
                showTimeline: false,
                route: [],
                tags: [
                    // { name: 'Tag 1', type: '' },
                ],
            }
        }, created() {  //页面加载的时候调用

        },
        methods: {
            findPath () {
                this.loading = true
                request.get("stationline/line/of/start/and/end/station/" + this.search3 + "/" + this.search1 + "/" + this.search2, {

                }).then(res => {
                    this.tags = []
                    this.route = []
                    console.log(res)
                    console.log(res.data)

                    if (res.data == null)
                        this.$message.warning(res.msg)
                    else{
                        this.$message.success("查询成功！")
                        this.showTimeline = true
                        this.route = res.data
                    }



                })
            }
        },
    }

</script>

<style scoped>

</style>