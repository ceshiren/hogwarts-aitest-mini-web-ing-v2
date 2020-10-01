<template>
    <div class="sign-up">
        <h1>注册</h1> 
        <v-text-field v-model="username" label="用户名" ></v-text-field>
        <v-text-field v-model="password" label="密码"  type="password"></v-text-field>
        <v-text-field v-model="email" label="邮箱" ></v-text-field>
        <v-btn color="primary" @click="register()">注册</v-btn>
        <v-btn color="primary" @click="signIn()" text>去登录</v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username:'',
            password:'',
            email:''
        }
    },
    methods: {
        signIn(){
            this.$router.push({name:'SignIn'})
        },
        register(){
            let post_data = {
                userName : this.username,
                password : this.password,
                email : this.email,
            }
            this.$api.user.signUp(post_data).then(res=>{
                console.log(res)
            })
        }
    },
}
</script>

<style scoped>
.sign-up{
    width: 500px;
    margin: 0 auto;
    text-align: center;
}
</style>