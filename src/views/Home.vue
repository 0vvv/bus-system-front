<template>

    <div  style="padding:10px">
        <!--        搜索框-->
        <el-row :gutter="0"  >
            <div >
            <el-input v-model="id" placeholder="请输入线路的id">
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
    <el-row >

        <div ><el-descriptions

                class="margin-top"
                title="线路信息"
                :column="1"

                border
        >

            <el-descriptions-item  >
                <template #label>
                    <i class="el-icon-user"></i>
                    线路名称
                </template>
                {{routeName}}
            </el-descriptions-item>

            <el-descriptions-item >
                <template #label>
                    <i class="el-icon-user"></i>
                    是否有向
                </template>

                <el-tag size="small">{{isDirectional}}</el-tag>
            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <i class="el-icon-mobile-phone"></i>
                    班次间隔
                </template>

            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <i class="el-icon-location-outline"></i>
                    单向里程
                </template>

            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <i class="el-icon-tickets"></i>
                    运行时长
                </template>

            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <i class="el-icon-office-building"></i>
                    线路走向
                </template>

            </el-descriptions-item>

            <el-descriptions-item>
                <template #label>
                    <i class="el-icon-mobile-phone"></i>
                    运营时间
                </template>

            </el-descriptions-item>
            <el-descriptions-item>
                <template #label>
                    <i class="el-icon-mobile-phone"></i>
                    线路类型
                </template>

            </el-descriptions-item>
        </el-descriptions>
        </div>
    </el-row>

    </div>
</template>

<script>

import request from "../utils/request";

export default {
    data() {
        return {
            tableData: [
                {"name": '203路',
                    "isDirectional":'true'
                }

            ],
            size: '',
            routeName: '',
            id:'',
            isDirectional: 'true',
        }
    },
    methods:{
        search(){

            request.get("/api/StationById",{
                params:{
                    id:this.id
                }
            }).then(res => {
                this.routeName=res.name

            })

        },
        created(){
          this.load()
        },

        load(){


        }
    },
  name: 'Home',
  components: {

  }
}
</script>
