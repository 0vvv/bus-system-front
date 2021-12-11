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
    <!--公交车动画-->
    <transition name="slide-fade">
        <div v-if="show">
            <div class="van">
                <div class="van-body">
                    <div class="window-layer">
                        <div class="window"></div>
                        <div class="window"></div>
                        <div class="window"></div>
                        <div class="window">
                            <div class="me"></div>
                        </div>
                    </div>
                    <div class="canopy"></div>
                    <div class="roofrack">
                        <div class="support"></div>
                        <div class="support"></div>
                        <div class="board"></div>
                    </div>
                    <div class="tailpipe">
                        <div class="smoke"></div>
                        <div class="smoke"></div>
                        <div class="smoke"></div>
                    </div>
                    <div class="rear"></div>
                    <div class="front"></div>
                </div>
                <div class="wheels">
                    <div class="wheel"></div>
                    <div class="wheel"></div>
                </div>
            </div>
        </div>
    </transition>
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
            },
            show: false,
            timer:''

        }
    },
    methods:{
        search(){
            this.getData()
            this.show = true
            this.timer = setTimeout(this.changeShow, 300);

        },
        changeShow(){
            this.show = !this.show
        },
        created(){
          this.load()

        },

        load(){


        },
        getData(){
            request.get("/line/vague/name/"+ this.searchName,{
            }).then(res=>{
                if (res.data == null)
                {
                    this.$message({
                        type: "error",
                        message: res.msg
                    })

                }
                else{
                    this.$message({
                        type: "success",
                        message: "查询成功"
                    })
                this.routeName = this.searchName
                this.isDirectional = res.data[0].directional
                this.kilometer = res.data[0].kilometer+"km"
                this.onewayTime = res.data[0].onewayTime
                this.runtime = res.data[0].runtime+"分"
                this.route = res.data[0].route
                this.interval = res.data[0].interval+"分"
                this.type = this.TYPE_DICT[res.data[0].type]
            }
            })
        }
    },
    beforeDestroy() {
        clearTimeout(this.timer);
    }


}
</script>
<style lang="scss">
    $white: #fff;
    $orange-1: #ffedb2;
    $orange-2: #ffbf87;
    $orange-3: #ff9867;
    $teal: #306d85;
    $black: #000;

    .el-main {

        position: relative;
        height: 100vh;
        overflow: hidden;

    }

    .slide-fade-enter-active {
        transition: all .30s ease-out;
    }

    .slide-fade-leave-active {
        transition: all .40s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }

    .slide-fade-enter-from{
        transform: translateX(-220px);
        opacity: 0;
    }
    .slide-fade-leave-to {
        transform: translateX(220px);
        opacity: 0;
    }

    .van {
        &:after {
            content: "";
            height: 2px;
            width: 200%;
            background-color: $black;
            opacity: 0.7;
            position: absolute;
            left: -50%;

        }
        margin-top: 100px;
    }

    .van-body {
        background-color: $orange-2;
        border-radius: 30px 50px 10px 5px;
        height: 100px;
        width: 210px;
        position: relative;
        animation: bounce 0.25s ease-in-out infinite alternate;

        .canopy {
            position: relative;
            background-color: $orange-3;
            border-radius: 30px 20px 0 0;
            width: 92%;
            height: 10px;
            top: -50px;
            left: 8px;
        }

        .roofrack {
            width: 90px;
            height: 3px;
            background-color: $black;
            opacity: 0.5;
            position: relative;
            top: -68px;
            left: 75px;
            display: flex;

            .support {
                height: 5px;
                width: 3px;
                background-color: $black;
                position: relative;
                top: 3px;
                left: 10px;

                &:nth-of-type(2) {
                    left: 75px;
                }
            }

            .board {
                width: 100%;
                height: 5px;
                background-color: $orange-3;
                position: relative;
                top: -5px;
                left: -15px;
                border-radius: 20px 20px 0 0;

                &:before {
                    content: "";
                    width: 0;
                    position: absolute;
                    left: 10px;
                    top: -7px;
                    border-left: 3px solid $teal;
                    border-top: 7px solid $orange-1;
                    background-color: $teal;
                }
            }
        }

        .tailpipe {
            height: 5px;
            width: 5px;
            background-color: $black;
            opacity: 0.5;
            position: relative;
            left: -5px;
            top: 20px;
            display: flex;

            .smoke {
                border-radius: 50%;
                background-color: $teal;
                position: absolute;
                animation: smoke 0.8s ease-out infinite;

                &:nth-of-type(1) {
                    height: 10px;
                    width: 10px;
                    left: -8px;
                    top: -3px;
                }
                &:nth-of-type(2) {
                    height: 14px;
                    width: 14px;
                    left: -16px;
                    top: -8px;
                }
                &:nth-of-type(3) {
                    height: 18px;
                    width: 18px;
                    left: -28px;
                    top: -14px;
                }
            }
        }

        .window-layer {
            background-color: $white;
            border-radius: 30px 50px 0 0;
            height: 50px;
            opacity: 0.8;
            display: flex;

            .window {
                position: relative;
                background-color: $teal;
                border-radius: 5px;
                opacity: 0.3;
                height: 30px;
                width: 30px;
                top: 15px;

                &:before {
                    content: "";
                    height: 10px;
                    width: 100%;
                    position: absolute;
                    background-color: $white;
                    opacity: 0.5;
                }

                &:nth-of-type(1) {
                    left: 50px;
                }

                &:nth-of-type(2) {
                    left: 55px;
                }

                &:nth-of-type(3) {
                    left: 60px;
                }

                &:nth-of-type(4) {
                    left: 65px;
                    border-radius: 5px 40px 5px 5px;
                    width: 45px;

                    .me {
                        height: 15px;
                        width: 15px;
                        border-radius: 50%;
                        background-color: $orange-1;
                        opacity: 0.9;
                        position: absolute;
                        top: 12px;
                        left: 10px;
                    }
                }
            }
        }

        .rear,
        .front {
            position: relative;
        }

        .rear {
            left: 20px;
            border-radius: 5px 5px 0 0;
            top: 22px;
            height: 10px;
            width: 40px;
            background-color: $orange-1;

            &:before {
                content: "";
                display: block;
                position: relative;
                top: -15px;
                height: 15px;
                width: 40px;
                background-color: $orange-2;
                z-index: 10;
            }
        }

        .front {
            left: 155px;
            border-radius: 15px 15px 0 0;
            height: 23px;
            width: 39px;
            background-color: $orange-1;
        }
    }

    .wheels {
        display: flex;

        .wheel {
            height: 20px;
            width: 20px;
            background-color: $white;
            opacity: 0.7;
            border: 5px solid $black;
            border-radius: 50%;
            position: relative;
            top: 0;
            left: 25px;
            animation: spin 0.8s linear infinite;

            &:after {
                content: "";
                height: 4px;
                width: 4px;
                border-radius: 50%;
                background-color: $orange-3;
                position: absolute;
                top: 4px;
                left: 4px;
            }

            &:last-of-type {
                left: 130px;
            }
        }
    }

    @keyframes smoke {
        0% {
            opacity: 0;
            height: 0;
            width: 0;
            left: 0;
            top: 0;
        }

        50% {
            opacity: 0.4;
        }

        100% {
            opacity: 0;
        }
    }

    @keyframes bounce {
        0% {
            top: 17px;
        }

        100% {
            top: 20px;
        }
    }

    @keyframes spin {
        100% {
            transform: rotate(360deg);
        }
    }
</style>