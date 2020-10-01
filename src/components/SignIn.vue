<template>
    <div class="login-form">
       <h1>登录</h1> 
       <v-text-field label="用户名" v-model="username"></v-text-field>
       <v-text-field label="密码"  v-model="password" type="password"></v-text-field>
       <v-btn color="primary" @click="login()"> 登录</v-btn>
       <v-btn color="primary" text @click="signUp()"> 注册</v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username:'',
            password:''
        }
    },
    methods: {
        signUp(){
            this.$router.push({name:'SignUp'})
        },
        login(){
            let post_data = {
                userName:this.username,
                password:this.password,
            }
            this.$api.user.signIn(post_data).then(res=>{
                console.log(res)
                localStorage.setItem('token',res.data.data.token)
                localStorage.setItem('username',this.username)
                this.$router.push({name:'Case'})
            })
        }
    },
    
}
</script>

<style scoped>
.login-form{
    width: 500px;
    margin: 0 auto;
    text-align: center;
}
</style>