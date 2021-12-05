<template><el-main>
    <!--lines的基本信息-->
<el-row>
    <el-form ref="form" :model="form" label-width="120px" >
        <el-col :span="24">
        <el-form-item label="是否有向">
            <el-select v-model="form.directional" placeholder="请选择线路是否有向">
                <el-option label="true" value="true"></el-option>
                <el-option label="false" value="false"></el-option>
            </el-select>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="线路名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="班次间隔">
            <el-input v-model="form.interval"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="线路里程">
            <el-input v-model="form.kilometer"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="单程运行时间">
            <el-input v-model="form.onewayTime"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="路线走向">
            <el-input v-model="form.route"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
        <el-form-item label="运行时间">
            <el-input v-model="form.runtime"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="24">
        <el-form-item label="线路类型">
            <el-select v-model="form.type" placeholder="请选择线路类型">
                <el-option label="干线" value="C"></el-option>
                <el-option label="社区线" value="S"></el-option>
                <el-option label="夜班线" value="N"></el-option>
                <el-option label="高峰线" value="G"></el-option>
                <el-option label="快速公交" value="K"></el-option>
                <el-option label="支线" value="Z"></el-option>
                <el-option label="斑驳线" value="B"></el-option>
                <el-option label="城乡线" value="CC"></el-option>
            </el-select>
        </el-form-item>
        </el-col>

        <el-col :span="12">
            <el-form-item label="班次总数">
            <el-input v-model="timetableNum" placeholder="输入班次总数" />
            </el-form-item>
        </el-col>
        <el-col>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
        </el-col>
    </el-form>
</el-row>
<!--班次总数-->

    <!--添加站点-->
<el-row>
    <el-form
            ref="dynamicValidateForm"
            :model="dynamicValidateForm"
            label-width="120px"
            class="demo-dynamic"
    >


        <el-form-item
                v-for="(domain, index) in dynamicValidateForm.domains"
                :key="domain.key"
                :label="'站点' + index"
                :prop="'domains.' + index + '.value'"
                :rules="{
        required: true,
        message: '站点名不能为空',
        trigger: 'blur',
      }"
        >
            <el-col :span="6" style="margin-right: 10px">
            <el-input v-model="domain.value" ></el-input>
            </el-col>
            <el-col :span="4" style="margin-right: 10px">
                <div> {{"第一班车时间"}}</div>
            </el-col>
            <el-col :span="12" style="margin-right: 10px;margin-bottom: 5px">
            <el-input v-model="domain.time" ></el-input>
            </el-col>

            <el-button @click.prevent="removeDomain(domain)">删除一个站点</el-button>

        </el-form-item>
        <el-form-item>
            <el-button @click="addDomain">新增一个站点</el-button>
            <el-button @click="resetForm('dynamicValidateForm')">Reset</el-button>
        </el-form-item>
    </el-form>
 </el-row>




    </el-main>
</template>

<script>

    import request from '@/utils/request'

    export default {



        name: "ManageLine",
        data(){
            return{
                form:{
                    directional:true,
                    interval:5,
                    kilometer:15,
                    name:"439路测试",
                    lineNumber:"",
                    onewayTime:52,
                    route:"金河客运站-花明公交站",
                    runtime:"6:00-23:59",
                    type:"C",
                },
                dynamicValidateForm: {
                    domains: [
                        {
                            key: 1,
                            value: '',
                            time:''
                        },
                    ],
                },
                timetableNum:10,
                stationList:[],
                timetableList:[],

            }
        },
        methods:{
            onSubmit(){
                this.form.lineNumber = parseInt(this.form.name)
                //this.postData()
                //this.postTimetable()

            },

            postTimetable(){
                //处理并发送班次表信息
               alert(formatDate(new Date().getTime(),'hh:mm'))
                var intervalTime = fmt.parse("00:0"+this.form.interval)
                var firstTimetableList = [];

                this.dynamicValidateForm.domains.forEach((element, index) => {
                    var aTime = formatDate(new Date(element.time),'hh:mm');//Date 类型
                    alert(aTime)
                    firstTimetableList.push(aTime)//把第一班车时间压入dateList中
                    var strTime = fmt.format(aTime)
                    alert(strTime)
                })

                /*for(var i = 0; i < this.timetableNum ; i++) {
                    firstTimetableList.forEach((element, index) => {
                        var strTime = fmt.format(element) ;
                        this.timetableList.push(strTime) ;
                        element = element + intervalTime ; //把下一班车的时间压入dataList中
                    })
                }*/


            },
            postData(){
                // 直接传json对象给后台
                //发送vLine信息
                const req = request({
                    method:'post',
                    url:'/line/addNewLine',
                    data:JSON.stringify(this.form)
                })

                //发送vStation信息
                //先封一个线路名进去(一些偷懒
                this.stationList.push({
                    "name":this.form.name,
                    "myId":999
                })
                //处理站点列表
                this.dynamicValidateForm.domains.forEach((element,index)=>{
                    this.stationList.push({
                        "name":element.value,
                        "myId":index
                    })
                })
                //发送站点信息
                const req2 = request({
                    method:'post',
                    url:'/station/addNewStations',
                    data:JSON.stringify(this.stationList)
                })


            },

            resetForm(formName) {
                this.$refs[formName].resetFields()
            },
            removeDomain(item) {
                const index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
            },
            addDomain() {
                this.dynamicValidateForm.domains.push({
                    key: Date.now(),
                    value: '',
                })
            },
        }
    }
    /**
     * 时间格式化
     */
    Date.prototype.format = function(fmt){
        var o = {
            "M+" : this.getMonth()+1,                 //月份
            "d+" : this.getDate(),                    //日
            "h+" : this.getHours(),                   //小时
            "m+" : this.getMinutes(),                 //分
            "s+" : this.getSeconds(),                 //秒
            "q+" : Math.floor((this.getMonth()+3)/3), //季度
            "S"  : this.getMilliseconds()             //毫秒
        };

        if(/(y+)/.test(fmt)){
            fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
        }

        for(var k in o){
            if(new RegExp("("+ k +")").test(fmt)){
                fmt = fmt.replace(
                    RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
            }
        }

        return fmt;
    }



</script>

<style scoped>

</style>