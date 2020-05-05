import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
            path: '/',
            redirect: '/government'
        },
        {
            path: '/',
            component: () =>
                import ( /* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '三方共制的非处方药监管平台' },
            children: [{
                    path: '/dashboard',
                    component: () =>
                        import ( /* webpackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
                    meta: { title: '系统首页' }
                },
                {
                    path: '/government',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/government.vue'),
                    meta: { title: '政府用户' }
                },
                {
                    path: '/enterprise',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/enterprise.vue'),
                    meta: { title: '企业用户' }
                },

                {
                    path: '/enterpriseworker',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/enterpriseworker.vue'),
                    meta: { title: '企业员工' }
                },
                {
                    path: '/submitExamine',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/submitExamine.vue'),
                    meta: { title: '提交审核' }
                },
                {
                    path: '/drugExamine',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/drugExamine.vue'),
                    meta: { title: '审核药品' }
                },
                {
                    path: '/examineNote',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/examineNote.vue'),
                    meta: { title: '审核记录' }
                },
                {
                    path: '/drugManager',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/drugManager.vue'),
                    meta: { title: '药品管理' }
                },
                {
                    // 富文本编辑器组件
                    path: '/meiti',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/meiti.vue'),
                    meta: { title: '媒体资料' }
                },
                {
                    // 富文本编辑器组件
                    path: '/guowai',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/guowai.vue'),
                    meta: { title: '国外资料' }
                },
                {
                    // 富文本编辑器组件
                    path: '/zhongda',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/zhongda.vue'),
                    meta: { title: '重大事件' }
                },
                {
                    // 富文本编辑器组件
                    path: '/lingdao',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/lingdao.vue'),
                    meta: { title: '领导讲话' }
                },
                {
                    // 富文本编辑器组件
                    path: '/falv',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/falv.vue'),
                    meta: { title: '法律法规' }
                },
                {
                    // 富文本编辑器组件
                    path: '/lianghui',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/lianghui.vue'),
                    meta: { title: '两会文件' }
                },
                {
                    // 富文本编辑器组件
                    path: '/wenxian',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/wenxian.vue'),
                    meta: { title: '党的文献' }
                },
                {
                    // 富文本编辑器组件
                    path: '/biaozhun',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/biaozhun.vue'),
                    meta: { title: '标准规范' }
                },
                {
                    // 富文本编辑器组件
                    path: '/zhuanxiang',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/zhuanxiang.vue'),
                    meta: { title: '专项政策' }
                },
                {
                    // 富文本编辑器组件
                    path: '/qiye',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/qiye.vue'),
                    meta: { title: '生产企业' }
                },
                {
                    // 富文本编辑器组件
                    path: '/kexue',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/kexue.vue'),
                    meta: { title: '科学研究' }
                },
                {
                    // 富文本编辑器组件
                    path: '/wenxian',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/wenxian.vue'),
                    meta: { title: '党的文献' }
                },
                {
                    path: '/icon',
                    component: () =>
                        import ( /* webpackChunkName: "icon" */ '../components/page/Icon.vue'),
                    meta: { title: '自定义图标' }
                },
                {
                    path: '/table',
                    component: () =>
                        import ( /* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
                    meta: { title: '基础表格' }
                },
                {
                    path: '/tabs',
                    component: () =>
                        import ( /* webpackChunkName: "tabs" */ '../components/page/Tabs.vue'),
                    meta: { title: 'tab选项卡' }
                },
                {
                    path: '/form',
                    component: () =>
                        import ( /* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
                    meta: { title: '基本表单' }
                },
                {
                    // 富文本编辑器组件
                    path: '/addAnounce',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/addAnounce.vue'),
                    meta: { title: '添加公告' }
                },
                {
                    // 富文本编辑器组件
                    path: '/anounce',
                    component: () =>
                        import ( /* webpackChunkName: "editor" */ '../components/page/anounce.vue'),
                    meta: { title: '添加公告' }
                },

                {
                    // markdown组件
                    path: '/markdown',
                    component: () =>
                        import ( /* webpackChunkName: "markdown" */ '../components/page/Markdown.vue'),
                    meta: { title: 'markdown编辑器' }
                },
                {
                    // 图片上传组件
                    path: '/upload',
                    component: () =>
                        import ( /* webpackChunkName: "upload" */ '../components/page/Upload.vue'),
                    meta: { title: '文件上传' }
                },
                {
                    // vue-schart组件
                    path: '/charts',
                    component: () =>
                        import ( /* webpackChunkName: "chart" */ '../components/page/BaseCharts.vue'),
                    meta: { title: 'schart图表' }
                },
                {
                    // 拖拽列表组件
                    path: '/drag',
                    component: () =>
                        import ( /* webpackChunkName: "drag" */ '../components/page/DragList.vue'),
                    meta: { title: '拖拽列表' }
                },
                {
                    // 拖拽Dialog组件
                    path: '/dialog',
                    component: () =>
                        import ( /* webpackChunkName: "dragdialog" */ '../components/page/DragDialog.vue'),
                    meta: { title: '拖拽弹框' }
                },
                {
                    // 国际化组件
                    path: '/i18n',
                    component: () =>
                        import ( /* webpackChunkName: "i18n" */ '../components/page/I18n.vue'),
                    meta: { title: '国际化' }
                },
                {
                    // 权限页面
                    path: '/permission',
                    component: () =>
                        import ( /* webpackChunkName: "permission" */ '../components/page/Permission.vue'),
                    meta: { title: '权限测试', permission: true }
                },
                {
                    path: '/404',
                    component: () =>
                        import ( /* webpackChunkName: "404" */ '../components/page/404.vue'),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: () =>
                        import ( /* webpackChunkName: "403" */ '../components/page/403.vue'),
                    meta: { title: '403' }
                },
                {
                    path: '/donate',
                    component: () =>
                        import ( /* webpackChunkName: "donate" */ '../components/page/Donate.vue'),
                    meta: { title: '支持作者' }
                }
            ]
        },
        {
            path: '/login',
            component: () =>
                import ( /* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: { title: '登录' }
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});