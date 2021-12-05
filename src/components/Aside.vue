<template>
    <div>
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                router
        >

            <el-menu-item index="RouteBasicInfo">
                <i class="el-icon-menu"></i>
                <span>基本信息查询</span>
            </el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <i class="el-icon-location"></i>
                    <span>站点查询</span>
                </template>

                    <el-menu-item index="stationofline">全部站点查询</el-menu-item>
                    <el-menu-item index="lineofstation">停靠公交线路查询</el-menu-item>
                    <el-menu-item index="DirectPathByRoute">沿途站点查询</el-menu-item>
                    <el-menu-item index="shortestpath">最短路径查询</el-menu-item>
                    <el-menu-item index="DirectRoute">直达线路查询</el-menu-item>

            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>
                    <i class="el-icon-location"></i>
                    <span>班次查询</span>
                </template>

                <el-menu-item index="timetableforline">全部班次信息查询</el-menu-item>
                <el-menu-item index="timetablewithrange">站点即将停靠线路</el-menu-item>
                <el-menu-item index="alltimetableofstation">站点最近班次</el-menu-item>

            </el-sub-menu>
            <el-sub-menu index="4">
                <template #title>
                    <i class="el-icon-location"></i>
                    <span>分析查询</span>
                </template>

                <el-menu-item index="findstations">统计站台</el-menu-item>
                <el-menu-item index="findlines">统计线路</el-menu-item>
                <el-menu-item index="findonewaystation">统计单行站</el-menu-item>
                <el-menu-item index="duplicatestations">线路间重复站点名</el-menu-item>
                <el-menu-item index="transferline">查询换乘线路</el-menu-item>
                <el-menu-item index="notRepeating">非重复系数</el-menu-item>

            </el-sub-menu>
            <el-sub-menu index="5">
                <template #title>
                    <i class="el-icon-location"></i>
                    <span>线路管理</span>
                </template>

                <el-menu-item index="ManageLine">增加线路</el-menu-item>
                <el-menu-item index="deleteline">删除线路与恢复</el-menu-item>
                <el-menu-item index="replaceline">更新线路</el-menu-item>


            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "Aside"
    }
</script>

<style scoped>

</style>