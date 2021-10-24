<template>
    <div>
        <el-menu
                default-active="2"
                class="el-menu-vertical-demo"

        >

            <el-menu-item index="1">
                <i class="el-icon-menu"></i>
                <span>基本信息查询</span>
            </el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <i class="el-icon-location"></i>
                    <span>站点查询</span>
                </template>

                    <el-menu-item index="1-1">item one</el-menu-item>
                    <el-menu-item index="1-2">item one</el-menu-item>
                    <el-menu-item index="1-3">item three</el-menu-item>

            </el-sub-menu>
            <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span>班次查询</span>
            </el-menu-item>
            <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span>分析查询</span>
            </el-menu-item>
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