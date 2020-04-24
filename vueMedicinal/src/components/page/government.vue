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
                    <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView2">添加政府账户</el-button>
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
                <!-- <el-table-column type="selection" width="55"></el-table-column> -->
                <el-table-column type="index"  fixed="" width="55" label="序号" align="center">
                    <template scope="scope"><span>{{scope.$index+(page - 1) * size + 1}} </span></template>
                </el-table-column>
                <el-table-column prop="userAccount" fixed align="left" label="帐号" width="150"></el-table-column>
                <el-table-column prop="userName" label="姓名" align="left" width="150"></el-table-column>
                <el-table-column prop="govermentDepartment" label="所属部门" align="left" width="250"></el-table-column>
                <el-table-column prop="govermentMan" width="150" align="left" label="部门负责人"></el-table-column>
                <el-table-column prop="govermentAddress" width="300" align="left" label="联系地址"></el-table-column>
                <el-table-column prop="govermentPhone" width="200" label="负责人电话"></el-table-column>
                <el-table-column prop="govermentPhoneSelf" width="200" label="联系方式"></el-table-column>
                
                <el-table-column fixed="right" width="200" label="操作">
                    <template slot-scope="scope">
                        <el-button
                            @click="showEditEmpView(scope.row)"
                            style="padding: 3px"
                            size="mini"
                        >修改</el-button>
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
        <el-dialog :title="title" :visible.sync="dialogVisibleGov" width="80%">
            <div>
                <el-form :model="gov" :rules="rules" ref="govForm">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="账号:" prop="userAccount">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="gov.userAccount"
                                    placeholder="请输入员工账号"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="密码:" prop="userPassword">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="gov.userPassword"
                                    placeholder="账户密码"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="姓名:" prop="userName">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="gov.userName"
                                    placeholder="请输入员工姓名"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="所属部门:" prop="govermentDepartment">
                                <el-input
                                    size="mini"
                                    style="width: 120px"
                                    prefix-icon="el-icon-edit"
                                    v-model="gov.govermentDepartment"
                                    placeholder="所属部门"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="负责人:" prop="govermentMan">
                                <el-input
                                    size="mini"
                                    style="width: 135px"
                                    prefix-icon="el-icon-edit"
                                    v-model="gov.govermentMan"
                                    placeholder="部门负责人"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="联系地址:" prop="govermentAddrsss">
                                <el-input
                                    size="mini"
                                    style="width: 250px"
                                    prefix-icon="el-icon-edit"
                                    v-model="gov.govermentAddrsss"
                                    placeholder="请输入联系地址"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="10">
                            <el-form-item label="负责人电话号码:" prop="govermentPhone">
                                <el-input
                                    size="mini"
                                    style="width: 200px"
                                    prefix-icon="el-icon-phone"
                                    v-model="gov.govermentPhone"
                                    placeholder="电话号码"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="10">
                            <el-form-item label="本人电话号码:" prop="govermentPhoneSelf">
                                <el-input
                                    size="mini"
                                    style="width: 200px"
                                    prefix-icon="el-icon-phone"
                                    v-model="gov.govermentPhoneSelf"
                                    placeholder="电话号码"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
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
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisibleGov = false">取 消</el-button>
                <el-button type="primary" @click="doAddGov">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'EmpBasic',
    data() {
        return {
            allmenus: [],
            selectedMenus: [],
            title: '',
            importDataBtnText: '导入数据',
            importDataBtnIcon: 'el-icon-upload2',
            importDataDisabled: false,
            showAdvanceSearchView: false,
            allDeps: [],
            emps: [],
            loading: false,
            popVisible: false,
            popVisible2: false,
            dialogVisible: false,
            dialogVisibleGov: false,
            total: 0,
            page: 1,
            userNameSearch: '',
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
            gov: {
                id : '',
                fatherUserAccount: window.sessionStorage.getItem('ms_username'),
                userAccount: '001',
                userName: '三毛',
                userPassword: '000000',
                govermentDepartment: '监管局',
                govermentMan: '三毛',
                govermentPhone: '123456',
                govermentPhoneSelf: '123456',
                govermentAddrsss: '北京市',
                menuNumList: []
            },
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            rules: {
                userAccount: [{ required: true, message: '请输入账户号码', trigger: 'blur' },{
                    pattern: /(^G-\d{6}$)/,
                    message: '政府帐号必须以G-开头，后面跟六位数的帐号',
                    trigger: 'blur'
                }],
                userName: [{ required: true, message: '请输入用户姓名', trigger: 'blur' }],
                userPassword: [{ required: false, message: '请输入初始密码', trigger: 'blur' }],
                govermentDepartment: [{ required: true, message: '请输入所属部门', trigger: 'blur' }],
                govermentMan: [{ required: true, message: '请输入部门负责人', trigger: 'blur' }],
                govermentPhone: [{ required: true, message: '请输入负责人联系电话', trigger: 'blur' }],
                govermentPhoneSelf: [{ required: true, message: '请输入本人联系方式', trigger: 'blur' }],
                govermentAddrsss: [{ required: true, message: '请输入联系地址', trigger: 'blur' }]
            }
        };
    },
    mounted() {
        this.initEmps();
        this.initData();
    },
    methods: {
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
        emptyGov() {
            this.gov = {
                id : '',
                fatherUserAccount: window.sessionStorage.getItem('ms_username'),
                userAccount: 'G-000001',
                userName: '三毛',
                userPassword: '000000',
                govermentDepartment: '监管局',
                govermentMan: '三毛',
                govermentPhone: '123456',
                govermentPhoneSelf: '123456',
                govermentAddrsss: '北京市',
                menuNumList: []
            };
        },
        showEditEmpView(data) {
            this.title = '编辑员工信息';
            this.gov = data;
            // this.inputDepName = data.department.name;
            this.dialogVisibleGov = true;
            this.initAllMenus();
            this.SelectedMenus(this.gov.userAccount);
        },
        deleteEmp(data) {
            this.$confirm('此操作将永久删除【' + data.userName + '】, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    this.deleteRequest('/govInfo/' + data.id).then(resp => {
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
        doAddGov() {
            if (this.gov.id){
                    this.gov.menuNumList = this.$refs.tree.getCheckedKeys();
                    this.$refs['govForm'].validate(valid => {
                    if (valid) {
                        this.gov.fatherUserAccount = window.sessionStorage.getItem('ms_username');
                        this.putRequest('/govInfo', this.gov).then(resp => {
                            if (resp) {
                                this.dialogVisibleGov = false;
                                this.initEmps();
                            }
                        });
                    }
                });
            }else{
                    this.gov.menuNumList = this.$refs.tree.getCheckedKeys();
                    this.$refs['govForm'].validate(valid => {
                    if (valid) {
                        this.postRequest('/govInfo', this.gov).then(resp => {
                            if (resp) {
                                this.dialogVisibleGov = false;
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
            // if (!window.sessionStorage.getItem('nations')) {
            //     this.getRequest('/employee/basic/nations').then(resp => {
            //         if (resp) {
            //             this.nations = resp;
            //             window.sessionStorage.setItem('nations', JSON.stringify(resp));
            //         }
            //     });
            // } else {
            //     this.nations = JSON.parse(window.sessionStorage.getItem('nations'));
            // }
            // if (!window.sessionStorage.getItem('joblevels')) {
            //     this.getRequest('/employee/basic/joblevels').then(resp => {
            //         if (resp) {
            //             this.joblevels = resp;
            //             window.sessionStorage.setItem('joblevels', JSON.stringify(resp));
            //         }
            //     });
            // } else {
            //     this.joblevels = JSON.parse(window.sessionStorage.getItem('joblevels'));
            // }
            // if (!window.sessionStorage.getItem('politicsstatus')) {
            //     this.getRequest('/employee/basic/politicsstatus').then(resp => {
            //         if (resp) {
            //             this.politicsstatus = resp;
            //             window.sessionStorage.setItem('politicsstatus', JSON.stringify(resp));
            //         }
            //     });
            // } else {
            //     this.politicsstatus = JSON.parse(window.sessionStorage.getItem('politicsstatus'));
            // }
            // if (!window.sessionStorage.getItem('deps')) {
            //     this.getRequest('/employee/basic/deps').then(resp => {
            //         if (resp) {
            //             this.allDeps = resp;
            //             window.sessionStorage.setItem('deps', JSON.stringify(resp));
            //         }
            //     });
            // } else {
            //     this.allDeps = JSON.parse(window.sessionStorage.getItem('deps'));
            // }
        },
        sizeChange(currentSize) {
            this.size = currentSize;
            this.initEmps();
        },
        currentChange(currentPage) {
            this.page = currentPage;
            this.initEmps();
        },
        showAddEmpView2() {
            this.emptyGov();
            this.title = '添加政府账户';
            this.dialogVisibleGov = true;
            this.initAllMenus();
            // this.initSelectedMenus();
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
            let url = '/govList?page=' + this.page + '&size=' + this.size;
                url += '&userName=' + window.sessionStorage.getItem('ms_username');
                url += '&userNameSearch='+this.userNameSearch;
            this.getRequest(url).then(resp => {
                this.loading = false;
                if (resp) {
                    this.emps = resp.data.data;
                    this.total = resp.data.total;
                    // console.log(resp.data)
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