<template>
    <div>
        <div class="container">
            <div class="plugins-tips">
                添加公告信息
            </div>
            
            <div class="title">
                <label>通告标题</label>
                <el-input v-model="anounce.atitle" placeholder="请输入标题"></el-input>
            </div>
            
            <quill-editor ref="myTextEditor" v-model="anounce.acontent"></quill-editor>
            <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
        </div>
    </div>
</template>

<script>
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    import { quillEditor } from 'vue-quill-editor';
    export default {
        name: 'editor',
        data: function(){
            return {
                anounce: {
                    id: '',
                    userid: '',
                    useraccount: '',
                    username: '',
                    atitle: '',
                    acontent: '',
                    mid: '',
                    mname: '',
                }
            }
        },
        components: {
            quillEditor
        },
        methods: {
            onEditorChange({ editor, html, text }) {
                this.content = html;
            },
            submit(){
                this.anounce.useraccount = window.sessionStorage.getItem('ms_username');
                this.postRequest("/anounce", this.anounce).then(resp => {
                    if(resp){
                        this.initEmpty();
                    }
                })
            },
            initEmpty(){
                this.anounce = {
                    id: '',
                    userid: '',
                    useraccount: '',
                    username: '',
                    atitle: '',
                    acontent: '',
                    mid: '',
                    mname: '',
                }
            }
        }
    }
</script>
<style scoped>
    .editor-btn{
        margin-top: 20px;
    }

    .title{
        height: 70px;
        width: 300px;
        display: inline-block;
    }
</style>