import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import SignIn from '../components/SignIn.vue'
import SignUp from '../components/SignUp.vue'
import Case from '../components/Case.vue'



const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    name:'SignIn',
    component:SignIn
  },
  {
    path:'/sign-up',
    name:'SignUp',
    component:SignUp
  },
  {
    path:'/case',
    name:'Case',
    component:Case
  },
]

const router = new VueRouter({
  routes
})

export default router
