<template>
<el-main>
    <div  style="padding:10px">
        <!--        搜索框-->
        <el-row :gutter="0"  >
            <div >
            <el-input v-model="searchName" placeholder="请输入线路的名称">
                <template #prefix>
                    <i class="el-input__icon el-icon-search"></i>
                </template>
            </el-input>
            </div>
            <div style="margin-left: 10px">
            <el-button type="primary" @click="search">查询</el-button>
            </div>
        </el-row>



        <!--        显示框-->
    <el-row  >
        <div style="margin-top: 20px" ><el-descriptions
                class="margin-top"
                title="线路信息"
                :column="2"
                size="medium"
                border

        >

            <el-descriptions-item width="200px"  >
                <template #label>
                    <i class="el-icon-user"></i>
                    线路名称
                </template>
                {{routeName}}
            </el-descriptions-item>

            <el-descriptions-item width="200px">
                <template #label>
                    <i class="el-icon-user" ></i>
                    是否有向
                </template>

                <el-tag size="small">{{isDirectional}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <i class="el-icon-mobile-phone"></i>
                    班次间隔
                </template>
                {{interval}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <i class="el-icon-location-outline"></i>
                    单向里程
                </template>
                {{kilometer}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <i class="el-icon-tickets"></i>
                    运行时长
                </template>
                {{onewayTime}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <i class="el-icon-office-building"></i>
                    线路走向
                </template>
                {{route}}
            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <i class="el-icon-mobile-phone"></i>
                    运营时间
                </template>
                {{runtime}}
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <i class="el-icon-mobile-phone"></i>
                    线路类型
                </template>

                <el-tag size="small">{{type}}</el-tag>
            </el-descriptions-item>
        </el-descriptions>
        </div>
    </el-row>

    </div>
</el-main>
</template>

<script>

import request from "../utils/request";

export default {
    data() {
        return {
            searchName:"",
            routeName:"",
            route:"",
            size: '',
            interval:"",
            kilometer:"",
            onewayTime:"",
            id:'',
            runtime:"",
            isDirectional: '',
            type:"",
            TYPE_DICT:{
                "C":"干线",
                "S":"社区线",
                "N":"夜班线",
                "G":"高峰线",
                "K":"快速公交线",
                "Z":"支线",
                "B":"斑驳线",
                "CC":"城乡线",
            }

        }
    },
    methods:{
        search(){
            this.getData()


        },
        created(){
          this.load()
        },

        load(){


        },
        getData(){
            request.get("/line/percise/line/name/"+ this.searchName,{
            }).then(res=>{
                this.routeName = res.data.name
                this.isDirectional = res.data.directional
                this.kilometer = res.data.kilometer+"km"
                this.onewayTime = res.data.onewayTime
                this.runtime = res.data.runtime+"分"
                this.route = res.data.route
                this.interval = res.data.interval+"分"
                this.type = this.TYPE_DICT[res.data.type]

            })
        }
    },

}
</script>
