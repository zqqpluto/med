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
                    <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">添加企业账户</el-button>
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
                <el-table-column prop="userAccount" fixed align="left"  label="帐号" width="100"></el-table-column>
                <el-table-column prop="userName" label="姓名" align="left" fixed width="100"></el-table-column>

                <el-table-column prop="province"  align="left" label="所在省份" width="90"></el-table-column>
                <el-table-column prop="web"  align="left" label="企业官网" width="150"></el-table-column>
                <el-table-column prop="recordnumber"  align="left" label="备案号" width="150"></el-table-column>
                <el-table-column prop="productionnumber"  align="left" label="生产许可证编号" width="150"></el-table-column>
                <el-table-column prop="legalperson"  align="center" label="法人姓名" width="90"></el-table-column>
                <el-table-column prop="registeredcapital"  align="center" label="注册资本" width="90"></el-table-column>
                <el-table-column prop="paidincapital"  align="center" label="实缴资本" width="90"></el-table-column>
                <el-table-column prop="stateoperation"  align="left" label="经营状态" width="90"></el-table-column>
                <el-table-column prop="establishtime"  align="left" label="成立日期" width="90"></el-table-column>
                <el-table-column prop="usccode"  align="left" label="统一社会信用代码" width="150"></el-table-column>
                <el-table-column prop="tinumber"  align="left" label="纳税人识别号" width="150"></el-table-column>
                <el-table-column prop="rnumber"  align="left" label="注册号" width="150"></el-table-column>
                <el-table-column prop="ocode"  align="left" label="组织机构代码" width="150"></el-table-column>
                <el-table-column prop="btype"  align="left" label="企业类型" width="90"></el-table-column>
                <el-table-column prop="industry"  align="left" label="所属行业" width="90"></el-table-column>
                <el-table-column prop="sanctiondate"  align="left" label="核准日期" width="90"></el-table-column>
                <el-table-column prop="registrationauthority"  align="left" label="登记机关" width="90"></el-table-column>
                <el-table-column prop="ename"  align="left" label="英文名" width="250"></el-table-column>
                <el-table-column prop="oname"  align="left" label="曾用名" width="250"></el-table-column>
                <el-table-column prop="insurepersons"  align="left" label="参保人数" width="90"></el-table-column>
                <el-table-column prop="otstaff"  align="left" label="人员规模" width="90"></el-table-column>
                <el-table-column prop="operatingperiod"  align="left" label="经营期限" width="90"></el-table-column>
                <el-table-column prop="address"  align="left" label="生产地址" width="250"></el-table-column>
                <el-table-column prop="gmp"  align="left" label="GMP证书" width="150"></el-table-column>

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
                        <el-col :span="6">
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
                        <el-col :span="6">
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
                        <el-col :span="6">
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
                        <el-col :span="6">
                            <el-form-item label="企业名:" prop="mname">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.mname"
                                    placeholder="请输入企业名"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="企业所在省份:" prop="province">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.province"
                                    placeholder="请输入企业名"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="企业官网:" prop="web">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.web"
                                    placeholder="请输入企业官网"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="备案号:" prop="recordnumber">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.recordnumber"
                                    placeholder="请输入备案号"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="生产许可证编号:" prop="productionnumber">
                                <el-input
                                    size="mini"
                                    style="width: 200px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.productionnumber"
                                    placeholder="请输入生产许可证编号"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="主要产品:" prop="productionnumber">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.productionnumber"
                                    placeholder="主要生产的药品"
                                ></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="6">
                            <el-form-item label="注册资本:" prop="registeredcapital">
                                <el-input
                                    size="mini"
                                    style="width: 200px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.registeredcapital"
                                    placeholder="请输入注册资本"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="实缴资本:" prop="paidincapital">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.paidincapital"
                                    placeholder="请输入实际缴纳资本"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="经营状态:" prop="stateoperation">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.stateoperation"
                                    placeholder="经营状态"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="成立日期:" prop="establishtime">
                                <el-date-picker
                                    v-model="emp.establishtime"
                                    size="mini"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    style="width: 150px;"
                                    placeholder="成立日期"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="统一社会信用代码:" prop="usccode">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.usccode"
                                    placeholder="请输入统一社会信用代码"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="纳税人识别号:" prop="usccode">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.usccode"
                                    placeholder="请输入纳税人识别号"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="注册号:" prop="rnumber">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.rnumber"
                                    placeholder="请输入注册号"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="组织机构代码:" prop="ocode">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.ocode"
                                    placeholder="请输入组织机构代码"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="企业类型:" prop="btype">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.btype"
                                    placeholder="请输入企业类型"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="所属行业:" prop="industry">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.industry"
                                    placeholder="请输入所属行业"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="核准日期:" prop="sanctiondate">
                                <el-date-picker
                                    v-model="emp.sanctiondate"
                                    size="mini"
                                    type="date"
                                    value-format="yyyy-MM-dd"
                                    style="width: 130px;"
                                    placeholder="核准日期"
                                ></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="登记机关:" prop="registrationauthority">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.registrationauthority"
                                    placeholder="请输入登记机关"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="参保人数:" prop="insurepersons">
                                <el-input
                                    size="mini"
                                    style="width: 150px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.insurepersons"
                                    placeholder="请输入参保人数"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="英文名:" prop="ename">
                                <el-input
                                    size="mini"
                                    style="width: 180px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.ename"
                                    placeholder="请输入英文名"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="曾用名:" prop="oname">
                                <el-input
                                    size="mini"
                                    style="width: 180px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.oname"
                                    placeholder="请输入曾用名"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="人员规模:" prop="otstaff">
                                <el-input
                                    size="mini"
                                    style="width: 180px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.otstaff"
                                    placeholder="人员规模"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="经营期限:" prop="otstaff">
                                <el-input
                                    size="mini"
                                    style="width: 180px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.operatingperiod"
                                    placeholder="经营期限"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="生产地址:" prop="address">
                                <el-input
                                    size="mini"
                                    style="width: 180px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.address"
                                    placeholder="请输入生产地址"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="GMP证书编号:" prop="gmp">
                                <el-input
                                    size="mini"
                                    style="width: 180px"
                                    prefix-icon="el-icon-edit"
                                    v-model="emp.gmp"
                                    placeholder="请输入证书编号"
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

                mname: '北京制药有限责任公司',
                province: '北京',
                web: 'www.zqqpluto.xyz',
                recordnumber: '123456',
                productionnumber: '123456',
                mainproduce: '999感冒冲剂、小儿止咳糖浆',
                legalperson: '小黑',
                registeredcapital: '500万',
                paidincapital: '300万',
                stateoperation: '正常',
                establishtime: '2018年5月21日',
                usccode: 'sjdfsj1245',
                tinumber: '123456',
                rnumber: '123456',
                ocode: '组织机构',
                btype: '民营',
                industry: '药品制造业',
                sanctiondate: '2019年5月21日',
                registrationauthority: '成都监管局',
                ename: '这是一个假的英文名',
                oname: '这是一个假的曾用名',
                insurepersons: '200人',
                otstaff: '200人',
                operatingperiod: '2018年5月-2030年12月',
                address: '四川省成都市高新西区',
                gmp: '123456789'
            },
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            rules: {
                mname: [{ required: true, message: '请输入企业名', trigger: 'blur' }],
                province: [{ required: true, message: '请输入生产企业所在省份', trigger: 'blur' }],
                web: [{ required: true, message: '请输入企业官网', trigger: 'blur' }],
                recordnumber: [{ required: true, message: '请输入备案号', trigger: 'blur' }],
                productionnumber: [{ required: true, message: '请输入生产许可证编号', trigger: 'blur' }],
                mainproduce: [{ required: true, message: '请输入主要产品', trigger: 'blur' }],
                legalperson: [{ required: true, message: '请输入法人信息', trigger: 'blur' }],
                registeredcapital: [{ required: true, message: '请输入注册资本', trigger: 'blur' }],
                paidincapital: [{ required: true, message: '请输入实缴资本', trigger: 'blur' }],
                stateoperation: [{ required: true, message: '请输入经营状态', trigger: 'blur' }],
                establishtime: [{ required: true, message: '请输入成立时间', trigger: 'blur' }],
                usccode: [{ required: true, message: '请输入统一社会信用代码', trigger: 'blur' }],
                tinumber: [{ required: true, message: '请输入纳税人识别号', trigger: 'blur' }],
                rnumber: [{ required: true, message: '请输入注册号', trigger: 'blur' }],
                ocode: [{ required: true, message: '请输入组织结构代码', trigger: 'blur' }],
                btype: [{ required: true, message: '请输入企业类型', trigger: 'blur' }],
                industry: [{ required: true, message: '请输入所属类型', trigger: 'blur' }],
                sanctiondate: [{ required: true, message: '请输入核准日期', trigger: 'blur' }],
                registrationauthority: [{ required: true, message: '请输入登记机关', trigger: 'blur' }],
                ename: [{ required: true, message: '请输入英文名', trigger: 'blur' }],
                oname: [{ required: true, message: '请输入曾用名', trigger: 'blur' }],
                insurepersons: [{ required: true, message: '请输入参保人数', trigger: 'blur' }],
                otstaff: [{ required: true, message: '请输入在职人数', trigger: 'blur' }],
                operatingperiod: [{ required: true, message: '请输入经营期限', trigger: 'blur' }],
                address: [{ required: true, message: '请输入生产地址编号', trigger: 'blur' }],
                gmp: [{ required: false, message: '请输入GMP证书编号', trigger: 'blur' }],

                userAccount: [{ required: true, message: '请输入账户号码', trigger: 'blur' },{
                    pattern: /(^E-\d{6}$)/,
                    message: '企业帐号必须以E-开头，后面跟六位数的帐号',
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
               id: '',
                fatherUserAccount: window.sessionStorage.getItem('ms_username'),
                userAccount: 'E-000001',
                userName: '小黑',
                userPassword: '000000',
                menuNumList: [],

                mname: '北京制药有限责任公司',
                province: '北京',
                web: 'www.zqqpluto.xyz',
                recordnumber: '123456',
                productionnumber: '123456',
                mainproduce: '999感冒冲剂、小儿止咳糖浆',
                legalperson: '小黑',
                registeredcapital: '500万',
                paidincapital: '300万',
                stateoperation: '正常',
                establishtime: '',
                usccode: 'sjdfsj1245',
                tinumber: '123456',
                rnumber: '123456',
                ocode: '组织机构',
                btype: '民营',
                industry: '药品制造业',
                sanctiondate: '',
                registrationauthority: '成都监管局',
                ename: '这是一个假的英文名',
                oname: '这是一个假的曾用名',
                insurepersons: '200人',
                otstaff: '200人',
                operatingperiod: '2018年5月-2030年12月',
                address: '四川省成都市高新西区',
                gmp: '123456789'
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
                    this.deleteRequest('/enterpriseInfo/' + data.id).then(resp => {
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
                        this.putRequest('/enterpriseInfo', this.emp).then(resp => {
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
                        this.postRequest('/enterpriseInfo', this.emp).then(resp => {
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
            let url = '/enterpriseInfo?page=' + this.page + '&size=' + this.size;
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