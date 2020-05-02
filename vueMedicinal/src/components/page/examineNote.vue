<template>
    <div>
        <div>
            <div style="display: flex;justify-content: space-between">
                <div>
                    <el-input
                        placeholder="请输入药品名进行搜索，可以直接回车搜索..."
                        prefix-icon="el-icon-search"
                        clearable
                        @clear="initEmps"
                        style="width: 350px;margin-right: 10px"
                        v-model="nameSearch"
                        @keydown.enter.native="initEmps"
                        :disabled="showAdvanceSearchView"
                    ></el-input>
                    <el-button
                        icon="el-icon-search"
                        type="primary"
                        @click="initEmps"
                        :disabled="showAdvanceSearchView"
                    >搜索</el-button>
                </div>
                
            </div>
        </div>
        <div style="margin-top: 10px">
            <el-table
                :data="emps"
                stripe
                border
                v-loading="loading"
                element-loading-text="正在加载..."
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                style="width: 100%"
            >
                <el-table-column type="index" align="center" fixed="" width="55" label="序号">
                    <template scope="scope"><span>{{scope.$index+(page - 1) * size + 1}} </span></template>
                </el-table-column>
                <el-table-column prop="nname" fixed align="left"  label="药品名称" width="150"></el-table-column>
                <el-table-column prop="mark" label="条形码编号" align="left" fixed width="150"></el-table-column>
                <el-table-column prop="username"  align="left" label="审核人" width="200"></el-table-column>
                <el-table-column prop="ndcid"  align="left" label="类别" width="100"></el-table-column>
                <el-table-column prop="mname"  align="left" label="公司名" width="200"></el-table-column>
                <el-table-column prop="fromdrug"  align="left" label="剂型" width="200"></el-table-column>
                <el-table-column prop="specs"  align="left" label="规格" width="150"></el-table-column>
                <el-table-column prop="indication"  align="left" label="适应征状" width="250"></el-table-column>
                <el-table-column prop="usetaboo"  align="center" label="使用禁忌" width="250"></el-table-column>
                <el-table-column prop="dosageandadministration"  align="center" label="用法用量" width="250"></el-table-column>
                <el-table-column prop="basis"  align="center" label="主要成分" width="250"></el-table-column>
                <el-table-column prop="batch"  align="center" label="批次" width="100"></el-table-column>
                <el-table-column prop="newbatch"  align="center" label="再注册批次" width="100"></el-table-column>
                <el-table-column prop="newdrugcertificate"  align="center" label="新药证书编号" width="100"></el-table-column>
                <el-table-column prop="examineresult"  align="center" label="审核结果" width="100"></el-table-column>
                <el-table-column prop="examinefailmessage"  align="center" label="失败原因" width="150"></el-table-column>
                <el-table-column prop="remark"  align="center" label="备注" width="150"></el-table-column>


                <el-table-column fixed="right" width="200" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            @click="showEditEmpView(scope.row)"
                            style="padding: 3px"
                            size="mini"
                        >查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end">
                <el-pagination
                    background
                    @current-change="currentChange"
                    @size-change="sizeChange"
                    layout="sizes, prev, pager, next, jumper, ->, total, slot"
                    :total="total"
                ></el-pagination>
            </div>
        </div>
        <el-dialog :title="title" :visible.sync="dialogVisible" width="80%">
            <div>
                <el-form :model="emp" :rules="rules" ref="empForm">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="药名:" prop="nname">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    
                                    v-model="emp.nname"
                                    placeholder="请输入药品名"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="剂型:" prop="fromdrug">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    
                                    v-model="emp.fromdrug"
                                    placeholder="药品剂型"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="规格:" prop="specs">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    
                                    v-model="emp.specs"
                                    placeholder="请输入药品规格"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="新药证书编号:" prop="newdrugcertificate">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    
                                    v-model="emp.newdrugcertificate"
                                    placeholder="请输入新药证书编号"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="批次:" prop="batch">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    
                                    v-model="emp.batch"
                                    placeholder="请输入药品批次"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="再注册批次:" prop="newbatch">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    
                                    v-model="emp.newbatch"
                                    placeholder="请输入药品再注册批次"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="条形码编号:" prop="specs">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    
                                    v-model="emp.specs"
                                    placeholder="请输入药品规格"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="备注:" prop="remark">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    
                                    v-model="emp.remark"
                                    placeholder="请输入药品再注册批次"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>   
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="适应症状:" prop="indication">
                                <el-input
                                    type="textarea"
                                    rows="3"
                                    size="mini"
                                    style="width: 250px"
                                    
                                    v-model="emp.indication"
                                    placeholder="请输入适应症状"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="使用禁忌:" prop="usetaboo">
                                <el-input
                                    type="textarea"
                                    rows="3"
                                    size="mini"
                                    style="width: 250px"
                                    
                                    v-model="emp.usetaboo"
                                    placeholder="请输入使用禁忌"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="用法用量:" prop="dosageandadministration">
                                <el-input
                                    type="textarea"
                                    rows="3"
                                    size="mini"
                                    style="width: 250px"
                                    
                                    v-model="emp.dosageandadministration"
                                    placeholder="药品的用法用量"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="主要成份:" prop="basis">
                                <el-input
                                type="textarea"
                                rows="3"
                                    size="mini"
                                    style="width: 250px"
                                    v-model="emp.basis"
                                    placeholder="请输入药品的主要成分"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="5">
                            <el-form-item label="类别:" prop="ndcid">
                                <el-input
                                    size="mini"
                                    style="width: 100px"
                                    v-model="emp.ndcid"
                                    placeholder="类别"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="审核人:" prop="username">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    v-model="emp.username"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                            <el-form-item label="审核失败原因:" prop="examinefailmessage">
                                <el-input
                                    type="textarea"
                                    rows="3"
                                    size="mini"
                                    style="width: 250px"
                                    
                                    v-model="emp.examinefailmessage"
                                    placeholder="请输入不通过审核原因"
                                    :disabled="true"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <!-- <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="success" @click="doAddEmp(1)">通过审核</el-button>
                <el-button type="warning" @click="doAddEmp(2)">审核失败</el-button>
            </span> -->
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'EmpBasic',
    data() {
        return {
            searchValue: {
                politicId: null,
                nationId: null,
                jobLevelId: null,
                posId: null,
                engageForm: null,
                departmentId: null,
                beginDateScope: null
            },
            allmenus: [],
            selectedMenus: [],
            title: '',
            importDataBtnText: '导入数据',
            importDataBtnIcon: 'el-icon-upload2',
            importDataDisabled: false,
            showAdvanceSearchView: false,
            allDeps: [],
            emps: [],
            nameSearch: '',
            loading: false,
            popVisible: false,
            popVisible2: false,
            dialogVisible: false,
            total: 0,
            page: 1,
            keyword: '',
            size: 10,
            nations: [],
            joblevels: [],
            examine: [],
            positions: [],
            tiptopDegrees: ['本科', '大专', '硕士', '博士', '高中', '初中', '小学', '其他'],
            options: [
                {
                    value: '选项1',
                    label: '黄金糕'
                },
                {
                    value: '选项2',
                    label: '双皮奶'
                },
                {
                    value: '选项3',
                    label: '蚵仔煎'
                },
                {
                    value: '选项4',
                    label: '龙须面'
                },
                {
                    value: '选项5',
                    label: '北京烤鸭'
                }
            ],
            inputDepName: '所属部门',
            emp: {
                userid: '',
                useraccount: window.sessionStorage.getItem('ms_username'),    
                username: '',    
                userpassword: '',    
                fatherid: '',    
                fathername: '',    
                nid: '',    
                mid: '',    
                ndcid: '',    
                nname: '测试药品1',    
                fromdrug: '测试剂型',    
                specs: '测试规格',    
                indication: '测试药品适合症状1、症状2、症状3',    
                usetaboo: '测试药品使用禁忌1、禁忌2、禁忌3',    
                dosageandadministration: '测试药品的使用方法和使用量测试',    
                basis: '主要成份有：成份1、成份2、成份3、、、、',    
                remark: '备注的情况1、情况2、情况3',    
                batch: '第一批次',    
                newbatch: '再注册批次',    
                mark: '1234567891234',    
                newdrugcertificate: 'xxxxxxxxxxxx',
                examineuserid: '',
                mname: '',
                examinefailmessage: ''
            },
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            rules: {
                nname: [{ required: true, message: '请输入药品名', trigger: 'blur' }],
                fromdrug: [{ required: true, message: '请输入药物剂型', trigger: 'blur' }],
                specs: [{ required: true, message: '请输入测试规格', trigger: 'blur' }],
                indication: [{ required: true, message: '请输入适应症状', trigger: 'blur' }],
                usetaboo: [{ required: true, message: '请输入使用禁忌', trigger: 'blur' }],
                dosageandadministration: [{ required: true, message: '请输入用量和用法', trigger: 'blur' }],
                basis: [{ required: true, message: '请输入主要成分', trigger: 'blur' }],
                remark: [{ required: false, message: '', trigger: 'blur' }],
                batch: [{ required: true, message: '请输入批次', trigger: 'blur' }],
                newbatch: [{ required: false, message: '请输入再注册批次', trigger: 'blur' }],
                mark: [{ required: true, message: '请输入条形码编号', trigger: 'blur' }],
                newdrugcertificate: [{ required: true, message: '请输入新药证书编号', trigger: 'blur' }],
                ndcid: [{required: true, message: '请选择药品类型', trigger: 'blur'}]
            },

        };
    },
    mounted() {
        this.initEmps();
        this.initData();
    },
    methods: {
        table_index(index){
            return (this.page - 1) * this.size + 1;
        },
        searvhViewHandleNodeClick(data) {
            this.inputDepName = data.name;
            this.searchValue.departmentId = data.id;
            this.popVisible2 = !this.popVisible2;
        },
        onError(err, file, fileList) {
            this.importDataBtnText = '导入数据';
            this.importDataBtnIcon = 'el-icon-upload2';
            this.importDataDisabled = false;
        },
        onSuccess(response, file, fileList) {
            this.importDataBtnText = '导入数据';
            this.importDataBtnIcon = 'el-icon-upload2';
            this.importDataDisabled = false;
            this.initEmps();
        },
        beforeUpload() {
            this.importDataBtnText = '正在导入';
            this.importDataBtnIcon = 'el-icon-loading';
            this.importDataDisabled = true;
        },
        exportData() {
            window.open('/employee/basic/export', '_parent');
        },
        emptyEmp() {
            this.emp = {
                userid: '',
                useraccount: window.sessionStorage.getItem('ms_username'),    
                username: '',    
                userpassword: '',    
                fatherid: '',    
                fathername: '',    
                nid: '',    
                mid: '',    
                ndcid: '',    
                nname: '测试药品1',    
                fromdrug: '测试剂型',    
                specs: '测试规格',    
                indication: '测试药品适合症状1、症状2、症状3',    
                usetaboo: '测试药品使用禁忌1、禁忌2、禁忌3',    
                dosageandadministration: '测试药品的使用方法和使用量测试',    
                basis: '主要成份有：成份1、成份2、成份3、、、、',    
                remark: '备注的情况1、情况2、情况3',    
                batch: '第一批次',    
                newbatch: '再注册批次',    
                mark: '1234567891234',    
                newdrugcertificate: 'xxxxxxxxxxxx',
                mname: '企业名',
                examineuserid: '',
                examinefailmessage: ''
            };
        },
        showEditEmpView(data) {
            this.title = '查看详情';
            this.emp = data;
            this.dialogVisible = true;
        },
       
        doAddEmp(number) {

            if(number == 1){
                this.getRequest("/examine?nid="+emp.nid).then(resp => {
                    if(resp){
                        this.dialogVisible = false;
                                this.initEmps();
                    }
                })
            }else{
                this.postRequest("/examine", this.emp).then(resp => {
                    if(resp){
                        this.dialogVisible = false;
                                this.initEmps();
                    }
                })
            }

        },
        handleNodeClick(data) {
            this.inputDepName = data.name;
            this.emp.departmentId = data.id;
            this.popVisible = !this.popVisible;
        },
        showDepView() {
            this.popVisible = !this.popVisible;
        },
        showDepView2() {
            this.popVisible2 = !this.popVisible2;
        },
        initData() {
        },
        sizeChange(currentSize) {
            this.size = currentSize;
            this.initEmps();
        },
        currentChange(currentPage) {
            this.page = currentPage;
            this.initEmps();
        },
        initSelectedMenus() {
            this.getRequest('/system/basic/permiss/mids/').then(resp => { 
                if (resp) {
                    this.selectedMenus = resp;
                }
            });
        },
        SelectedMenus(account) {
            this.getRequest('/select?account='+account).then(resp => {
                if (resp) {
                    this.selectedMenus = resp;
                }
            });
        },
        initEmps(type) {
            this.loading = true;
            let url = '/examineNote?page=' + this.page + '&size=' + this.size;
                url += '&userName=' + window.sessionStorage.getItem('ms_username');
                url += '&nameSearch='+this.nameSearch ;
            this.getRequest(url).then(resp => {
                this.loading = false;
                if (resp) {
                    this.emps = resp.data.data;
                    this.total = resp.data.total;
                }
            });
        }
    }
};
</script>

<style>
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
    transition: all 0.8s ease;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter, .slide-fade-leave-to
        /* .slide-fade-leave-active for below version 2.1.8 */
 {
    transform: translateX(10px);
    opacity: 0;
}
</style>