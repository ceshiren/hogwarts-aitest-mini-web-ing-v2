<template>
    <div>
        <template>
            <v-tabs :value="0" background-color="primary">
                <v-tab @click="$router.push({name:'Case'})">用例管理</v-tab>
                <v-spacer></v-spacer>
                <v-btn text @click="logout()">退出</v-btn>
            </v-tabs>
        </template>

        <v-dialog
                v-model="editDialog"
                max-width="500px"
        >
            <v-card>
                <v-card-title>
                    修改测试用例
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field label="用例名称" v-model="editItem.caseName"></v-text-field>
                        <v-textarea label="用例数据" v-model="editItem.caseData"></v-textarea>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="confirmEdit()">确定</v-btn>
                    <v-btn color="primary" text @click="editDialog = false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog
                v-model="addDialog"
                max-width="500px"
        >
            <v-card>
                <v-card-title>
                    添加测试用例
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field label="用例名称" v-model="addItem.name"></v-text-field>
                        <v-select :items="selectItem" v-model="addItem.type" label="用例类型"></v-select>
                        <v-textarea label="用例数据" v-model="addItem.data" v-if="addItem.type=='文本'"></v-textarea>
                        <v-file-input label="用例数据" v-model="addItem.file" v-if="addItem.type=='文件'"></v-file-input>
                        <v-text-field label="备注" v-model="addItem.remark"></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="addCase()">确定</v-btn>
                    <v-btn color="primary" text @click="addDialog = false">取消</v-btn>
                </v-card-actions>

            </v-card>
        </v-dialog>

        <v-dialog v-model="executeDialog" max-width="600px">
            <v-card>
                <v-card-title>
                    输入执行内容
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field label="应用" v-model="executeItem.application"></v-text-field>
                        <v-btn small color="primary" @click="createParamsFunc">新增参数</v-btn>
                        <v-data-table :headers="paramsHeaders" :items="executeItem.params" hide-default-footer
                                      disable-sort>
                            <template v-slot:item.operate="{item}">
                                <v-btn small color="primary" @click="modifyParams(item)">修改</v-btn>
                                <v-btn small color="error" @click="deleteParams(item)">删除</v-btn>
                            </template>
                        </v-data-table>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="execute()">确定</v-btn>
                    <v-btn color="primary" text @click="executeDialog = false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="createParamDialog" max-width="600px">
            <v-card>
                <v-card-title>
                    输入键值对
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field label="key" v-model="createParamItem.key"></v-text-field>
                        <v-text-field label="value" v-model="createParamItem.value"></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="createParam()">确定</v-btn>
                    <v-btn color="primary" text @click="createParamDialog = false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-dialog v-model="modifyParamDialog" max-width="600px">
            <v-card>
                <v-card-title>
                    修改键值对
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field label="key" v-model="modifyItem.key"></v-text-field>
                        <v-text-field label="value" v-model="modifyItem.value"></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="modifyParam()">确定</v-btn>
                    <v-btn color="primary" text @click="modifyParamDialog = false">取消</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <v-btn color="primary" class="btn" @click="addDialog = true">添加用例</v-btn>
        <template>
            <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="desserts"
                    item-key="id"
                    show-select
                    class="elevation-1"
            >
                <template v-slot:[`item.operate`]="{item}">
                    <v-btn color="primary" text small @click="editCase(item)">编辑</v-btn>
                    <v-btn color="error" text small @click="deleteCase(item)">删除</v-btn>
                    <v-btn color="green" text small @click="executeCase(item)">执行</v-btn>
                </template>
            </v-data-table>
        </template>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                addDialog: false,
                editDialog: false,
                selectItem: ['文本', '文件'],
                editItem: {},
                addTask: {
                    name: '',
                    remark: ''
                },
                addItem: {
                    name: '',
                    type: '文本',
                    data: '',
                    file: null,
                    remark: ''
                },
                selected: [],
                headers: [
                    {
                        text: 'id',
                        value: 'id'
                    },
                    {
                        text: '用例名称',
                        value: 'caseName'
                    },
                    {
                        text: '用例数据',
                        value: 'caseData'
                    },
                    {
                        text: '操作',
                        value: 'operate',
                        align: 'center'
                    },
                ],
                desserts: [],
                //执行测试弹窗是否可见 true 可见 false 不可见
                executeDialog: false,
                executeItem: {
                    caseId: '',
                    application: '',
                    params: [],
                },
                paramsHeaders: [
                    {value: 'key', text: 'key'},
                    {value: 'value', text: 'value'},
                    {value: 'operate', text: '操作'},
                ],
                createParamDialog: false,
                createParamItem: {
                    key: '',
                    value: '',
                },
                modifyParamDialog:false,
                modifyItem:{
                    key:'',
                    value:'',
                },
                modifyIndex:-1,
            }
        },
        created() {
            this.getCaseList();
        },
        methods: {
            getCaseList() {
                this.$api.cases.getList().then(res => {
                    console.log(res)
                    this.desserts = res.data.data
                })
            },
            addCase() {
                if (this.addItem.type == '文本') {
                    let post_data = {
                        caseData: this.addItem.data,
                        caseName: this.addItem.name,
                        remark: this.addItem.remark
                    }
                    this.$api.cases.creatCaseByText(post_data).then(res => {
                        console.log(res)
                        this.getCaseList();
                    })
                } else if (this.addItem.type == '文件') {
                    let post_data = new FormData()
                    post_data.append('caseFile', this.addItem.file)
                    post_data.append('caseData', this.addItem.data)
                    post_data.append('caseName', this.addItem.name)
                    this.$api.cases.creatCaseByFile(post_data).then(res => {
                        console.log(res)
                        this.getCaseList();
                    })
                }
                console.log(this.addItem)
                this.addDialog = false
            },
            editCase(item) {
                this.editDialog = true
                this.editItem = item
            },
            confirmEdit() {
                let post_data = {
                    caseData: this.editItem.caseData,
                    caseName: this.editItem.caseName,
                    id: this.editItem.id,
                    remark: this.editItem.remark
                }
                this.$api.cases.editCase(post_data).then(res => {
                    console.log(res)
                    this.editDialog = false
                    this.getCaseList();
                })
            },

            deleteCase(item) {
                console.log(item)
                let post_data = {
                    caseId: item.id
                }
                this.$api.cases.deleteCase(post_data).then(res => {
                    console.log(res)
                    let post_data = {
                        pageNum: 1,
                        pageSize: 10
                    }
                    this.$api.cases.getList(post_data).then(res => {
                        console.log(res)
                        this.desserts = res.data.data.data
                    })
                })
            },
            //打开执行测试的弹窗
            executeCase(item) {
                this.executeItem.caseId = item.id;
                this.executeItem.params = [];
                this.executeItem.application = '';
                this.executeDialog = true;
            },
            //确定执行测试
            execute() {
                console.log(this.executeItem)
                this.$api.cases.executeCase(this.executeItem).then(res=>{
                    console.log(res);
                    this.executeDialog = false;
                })
            },
            //打开新增键值对数据的弹窗
            createParamsFunc() {
                this.createParamDialog = true;
                this.createParamItem = {
                    key: '',
                    value: '',
                }
            },
            //确认新增键值对数据
            createParam() {
                this.executeItem.params.push(this.createParamItem);
                this.createParamDialog = false;
            },
            //获取要修改的键值对数据
            modifyParams(item) {
                let index = this.executeItem.params.indexOf(item);
                this.modifyItem = this.executeItem.params[index];
                this.modifyIndex = index;
                this.modifyParamDialog = true;
            },
            //确定修改键值对数据
            modifyParam(){
                //splice(起始位置，个数，参数) 见splice源码
                this.executeItem.params.splice(this.modifyIndex,1,this.modifyItem);
                this.modifyParamDialog = false;

            },
            //删除键值对数据
            deleteParams(item) {
                let index = this.executeItem.params.indexOf(item);
                this.executeItem.params.splice(index,1);
            },
            logout(){
                this.$api.user.logout().then(res=>{
                    this.$router.push('/')
                })
            }

        },
    }
</script>

<style scoped>
    .btn {
        margin: 10px;
    }
</style>
