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
                    <el-menu-item index="lineofstation">沿途站点查询</el-menu-item>
                    <el-menu-item index="1-3">最短路径查询</el-menu-item>
                    <el-menu-item index="1-3">直达站点查询</el-menu-item>

            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>
                    <i class="el-icon-location"></i>
                    <span>班次查询</span>
                </template>

                <el-menu-item index="stationofline">全部班次信息查询</el-menu-item>
                <el-menu-item index="lineofstation">站点即将停靠线路</el-menu-item>
                <el-menu-item index="lineofstation">站点最近班次</el-menu-item>

            </el-sub-menu>
            <el-sub-menu index="4">
                <template #title>
                    <i class="el-icon-location"></i>
                    <span>分析查询</span>
                </template>

                <el-menu-item index="findstations">统计站台</el-menu-item>
                <el-menu-item index="lineofstation">统计线路</el-menu-item>
                <el-menu-item index="lineofstation">站台间线路数</el-menu-item>

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