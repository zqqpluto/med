<template>
    <div>
        <div>
            <div style="display: flex;justify-content: space-between">
                <div>
                    <el-input
                        placeholder="请输入员工名进行搜索，可以直接回车搜索..."
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
                    <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">添加员工账户</el-button>
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
                <el-table-column prop="userAccount" fixed align="left"  label="帐号" width="200"></el-table-column>
                <el-table-column prop="userName" label="姓名" align="left" fixed width="200"></el-table-column>
                <el-table-column prop="mname" label="公司名" align="left" fixed width="800"></el-table-column>
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
        <el-dialog :title="title" :visible.sync="dialogVisible" width="80%">
            <div>
                <el-form :model="emp" :rules="rules" ref="empForm">
                    <el-row>
                        <el-col :span="4">
                            <el-form-item label="账号:" prop="userAccount">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.userAccount"
                                    placeholder="请输入员工账号"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="密码:" prop="userPassword">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.userPassword"
                                    placeholder="账户密码"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="姓名:" prop="userName">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.userName"
                                    placeholder="请输入员工姓名"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="企业名:" prop="mname">
                                <el-input
                                    size="mini"
                                    style="width: 300px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.mname"
                                    placeholder="请输入企业名"
                                    :disabled="true" 
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>可访问的资源</span>
                    </div>
                    <div>
                        <el-tree
                            show-checkbox
                            node-key="id"
                            ref="tree"
                            :default-checked-keys="selectedMenus"
                            :data="allmenus"
                            :props="defaultProps"
                        ></el-tree>
                    </div>
                </el-card>
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
                id: '',
                fatherUserAccount: window.sessionStorage.getItem('ms_username'),
                userAccount: '001',
                userName: '三毛',
                userPassword: '000000',
                menuNumList: [],

                workername: '',
                mname: ''
            },
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            rules: {
                workername: [{ required: true, message: '请输入员工姓名', trigger: 'blur' }],
                mname: [{ required: true, message: '请输入公司名', trigger: 'blur' }],

                userAccount: [{ required: true, message: '请输入账户号码', trigger: 'blur' },{
                    pattern: /(^W-\d{6}$)/,
                    message: '企业帐号必须以W-开头，后面跟六位数的帐号',
                    trigger: 'blur'
                }],
                userName: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
                userPassword: [{ required: false, message: '请输入初始密码', trigger: 'blur' }],
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
        emptyEmp() {
            this.emp = {
               id: '',
                fatherUserAccount: window.sessionStorage.getItem('ms_username'),
                userAccount: 'W-000001',
                userName: '小黑',
                userPassword: '000000',
                menuNumList: [],

                workername: '',
                mname: ''
            };
        },
        showEditEmpView(data) {
            this.title = '编辑企业信息';
            this.emp = data;
            this.dialogVisible = true;
            this.initAllMenus();
            this.SelectedMenus(this.emp.userAccount);
        },
        deleteEmp(data) {
            this.$confirm('此操作将永久删除【' + data.userName + '】, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.deleteRequest('/enterpriseWorkerInfo/' + data.id).then(resp => {
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
            if(this.emp.id){
                this.emp.menuNumList = this.$refs.tree.getCheckedKeys();
                this.$refs['empForm'].validate(valid => {
                    if (valid) {
                        this.emp.fatherUserAccount = window.sessionStorage.getItem('ms_username');
                        this.emp.workername = this.emp.userName
                        this.putRequest('/enterpriseWorkerInfo', this.emp).then(resp => {
                            if (resp) {
                                this.dialogVisible = false;
                                this.initEmps();
                            }
                        });
                    }
                });
            }else{
                this.emp.menuNumList = this.$refs.tree.getCheckedKeys();
                this.$refs['empForm'].validate(valid => {
                    if (valid) {
                        this.emp.fatherUserAccount = window.sessionStorage.getItem('ms_username');
                        this.emp.workername = this.emp.userName
                        this.postRequest('/enterpriseWorkerInfo', this.emp).then(resp => {
                            if (resp) {
                                this.dialogVisible = false;
                                this.initEmps();
                            }
                        });
                    }
                });
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
        showAddEmpView() {
            this.emptyEmp();
            this.title = '添加企业账户';
            this.dialogVisible = true;
            this.initEnterprise();
            this.initAllMenus();
        },
        initEnterprise() {
            const name = window.sessionStorage.getItem('mName');
            if(name){
                this.emp.mname = name;
            }else{
                const role = window.sessionStorage.getItem('ms_username');
                let path = '/enterpriseName?username='+role;
                this.getRequest(path).then(resp => {
                    this.emp.mname = resp.msg;
                    window.sessionStorage.setItem('mName',resp.msg)
                })
            }
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
                        this.allmenus = resp;
                        window.sessionStorage.setItem("menu", JSON.stringify(resp));
                    }
                });
            }
        },
        initEmps(type) {
            this.loading = true;
            let url = '/enterpriseWorkerInfo?page=' + this.page + '&size=' + this.size;
                url += '&userName=' + window.sessionStorage.getItem('ms_username');
                url += '&userNameSearch='+this.userNameSearch;
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