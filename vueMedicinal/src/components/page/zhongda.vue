<template>
    <div>
        <div>
            <div style="display: flex;justify-content: space-between">
                <div>
                    <el-input
                        placeholder="请输入标题进行搜索，可以直接回车搜索..."
                        prefix-icon="el-icon-search"
                        clearable
                        @clear="initEmps"
                        style="width: 350px;margin-right: 10px"
                        v-model="userNameSearch"
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
                <div>
                    <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">添加重大事件</el-button>
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
                <el-table-column prop="useraccount" fixed align="left"  label="帐号" width="150"></el-table-column>
                <el-table-column prop="username" label="名称" align="left" fixed width="150"></el-table-column>
                <el-table-column prop="ndcid" label="类别" align="left" fixed width="150"></el-table-column>

                <el-table-column prop="kstitle"  align="left" label="标题" width="300"></el-table-column>
                <el-table-column prop="kspath"  align="left" label="链接" width="300"></el-table-column>
                <el-table-column prop="mname"  align="left" label="公司" width="300"></el-table-column>


                <el-table-column fixed="right" width="200" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            @click="showEditEmpView(scope.row)"
                            style="padding: 3px"
                            size="mini"
                        >编辑</el-button>
                        <el-button
                            @click="deleteEmp(scope.row)"
                            style="padding: 3px"
                            size="mini"
                            type="danger"
                        >删除</el-button>
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
        <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
            <div>
                <el-form :model="emp" :rules="rules" ref="empForm">
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="标题:" prop="kstitle">
                                <el-input
                                    size="mini"
                                    style="width: 400px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.kstitle"
                                    placeholder="请输入文章标题"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="链接:" prop="kspath">
                                <el-input
                                    size="mini"
                                    style="width: 400px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.kspath"
                                    placeholder="请输入链接"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8">
                            <el-form-item label="类别:" prop="ndcid">
                                <el-radio-group v-model="emp.ndcid">
                                    <el-radio label="甲类">甲类</el-radio>
                                    <el-radio label="乙类">乙类</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="doAddEmp">确 定</el-button>
            </span>
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
            userNameSearch: '',
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
            politicsstatus: [],
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
                ksid: '',
                userid: '',
                useraccount: '',
                username: '',
                kcid: '',
                ndcid: '',
                mid: '',
                kspath: 'www.baidu.com',
                kstitle: '标题1',
                mname: '',
            },
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            rules: {
                mname: [{ required: true, message: '请输入企业名', trigger: 'blur' }],
                ndcid: [{ required: true, message: '请选择类型', trigger: 'blur' }],
                kspath: [{ required: true, message: '请选择类型', trigger: 'blur' }],
                kstitle: [{ required: true, message: '请选择类型', trigger: 'blur' }]
                
                // userAccount: [{ required: true, message: '请输入账户号码', trigger: 'blur' },{
                //     pattern: /(^E-\d{6}$)/,
                //     message: '企业帐号必须以E-开头，后面跟六位数的帐号',
                //     trigger: 'blur'
                // }]

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
        exportData() {
            window.open('/employee/basic/export', '_parent');
        },
        emptyEmp() {
            this.emp = {
                ksid: '',
                userid: '',
                useraccount: '',
                username: '',
                kcid: '',
                ndcid: '',
                mid: '',
                kspath: 'www.baidu.com',
                kstitle: '测试标题1',
                mname: '',
            };
        },
        showEditEmpView(data) {
            this.title = '编辑重大事件';
            this.emp = data;
            this.dialogVisible = true;
            this.initAllMenus();
        },
        deleteEmp(data) {
            this.$confirm('此操作将永久删除【' + data.kstitle + '】, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.deleteRequest('/knowledgeService/' + data.ksid).then(resp => {
                        if (resp) {
                            this.initEmps();
                        }
                    });
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
        },
        doAddEmp() {
            this.$refs['empForm'].validate(valid => {
                if (valid) {
                    if (this.emp.ndcid == '甲类'){
                        this.emp.ndcid = 0;
                    }else{
                        this.emp.ndcid = 1;
                    }
                    this.emp.kcid = 1003;
                    if (this.emp.ksid){
                        this.putRequest('/knowledgeService', this.emp).then(resp => {
                            if (resp) {
                                this.dialogVisible = false;
                                this.initEmps();
                            }
                        });
                    }else{
                        this.postRequest('/knowledgeService', this.emp).then(resp => {
                            if (resp) {
                                this.dialogVisible = false;
                                this.initEmps();
                            }
                        });
                    }
                }
            });
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
        showAddEmpView() {
            this.emptyEmp();
            this.emp.useraccount = window.sessionStorage.getItem("ms_username")
            this.title = '添加重大事件';
            this.dialogVisible = true;
            this.initAllMenus();
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
        initAllMenus() {
            const m = JSON.parse(window.sessionStorage.getItem("menu"));
            if (m){
                this.allmenus = m;
            }else{
                const role = window.sessionStorage.getItem('ms_username');
                this.getRequest('/menus?username=' + role + '&time=' + (new Date).getTime()).then(resp => {
                    if (resp) {
                        // console.log(resp)
                        this.allmenus = resp;
                        window.sessionStorage.setItem("menu", JSON.stringify(resp));
                    }
                });
            }
        },
        initEmps(type) {
            this.loading = true;
            let url = '/knowledgeService?page=' + this.page + '&size=' + this.size;
                url += '&userName=' + window.sessionStorage.getItem('ms_username');
                url += '&nameSearch='+this.userNameSearch+ "&kcid=1003";
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