<template>
    <div class="container">
        <div class="login-group">

            <div class="cycles">
                <div class="cycle c1"></div>
                <div class="cycle c2"></div>
                <div class="cycle c3" v-if="!login_box_fold"></div>
                <div class="cycle c4" v-if="!login_box_fold"></div>
                <div class="cycle c5" v-if="!login_box_fold"></div>
            </div>

            <div v-if="show_if" :class="{ box_login_fold: login_box_fold, box_login: !login_box_fold } "@click="fold">
                <div v-if="!login_box_fold">ii universe</div>
                <div class="form" v-if="!login_box_fold">
                    <label for="email">Email: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<el-input v-model="form.email"
                            style="width: 100%" placeholder="Please input" id="email" clearable /></label>
                    <label for="password">Password: <el-input v-model="form.password" style="width: 100%"
                            placeholder="Please input" id="password" clearable /></label>
                    <el-button class="button" @click="onSubmit">Login</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useAuthStore } from "@/stores/auth"
import { useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import authHttp from '@/api/authHttp'
let login_box_fold = ref(true)
const fold = () => {
    login_box_fold.value = false
}

const authStore = useAuthStore()
const router = useRouter()
let form = reactive({
    email: "",
    password: ""
})
// 判断是否弹出登录框
const show_if=computed(()=>{  
    if (login_box_fold.value)return true;
    else if (authStore.is_logined){
        setTimeout(()=>{
            router.push({name:"main"})
        },1500)
        return false;

    }
    else return true;
});
const onSubmit = async () => {
    let pwdRgx = /^[0-9a-zA-Z_-]{6,20}$/
    let emailRgx = /^[a-zA-Z0-9_]{1,12}@[a-zA-Z0-9_-]+\.[a-zA-Z]{2,}$/
    if (!emailRgx.test(form.email)){
        ElMessage.info("邮箱格式不正确")
        return;
    }
    else if (!pwdRgx.test(form.password)){
        ElMessage.info("密码格式不正确")
        return;
    }
    try{
        let data=await authHttp.login(form.email,form.password)
        let token=data.token;
        let user =data.user;
        authStore.setUserToken(user,token)
        router.push({name:"main"})
        ElMessage.success("登录成功")
    }catch(err){
        ElMessage.error(err)
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

.container {
    width: 100vw;
    height: 100vh;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    overflow: hidden;
}


.login-group {
    width: 100%;
    max-width: 1200px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5%;
}


.form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    max-width: 350px;
}

.button {
    width: 100%;
    height: 40px;
    margin-top: 10px;
}


.cycles {
    position: relative;
    width: clamp(200px, 40vw, 450px);
    /* 最小200px，最大450px，中间按40vw缩放 */
    height: clamp(200px, 40vw, 450px);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 1s all;
}

/* 轨道基础样式 */
.cycle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #000;
    border: 3px solid rgb(135, 135, 135);
    position: absolute;
    z-index: 5;
    box-shadow: 0 0 1px 1px rgb(123, 123, 123);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 1s all;
}

/* 太阳样式 */
.c1 {
    background-color: rgb(255, 22, 22);
    border: 1px solid red;
    animation: sun linear 20s infinite;
}


.c2 {
    width: 150px;
    height: 150px;
    z-index: 4;
}

.c2::after {
    content: '';
    width: 30px;
    height: 30px;
    background-color: rgb(244, 255, 44);
    border-radius: 50%;
    z-index: 6;
    animation: orbit linear 5s infinite;
}

.c3 {
    width: 240px;
    height: 240px;
    z-index: 3;
}

.c3::after {
    content: '';
    width: 20px;
    height: 20px;
    background-color: rgb(36, 245, 245);
    border-radius: 50%;
    z-index: 6;
    animation: orbit2 linear 6s infinite;
}

.c4 {
    width: 360px;
    height: 360px;
    z-index: 2;
}

.c4::after {
    content: '';
    width: 40px;
    height: 40px;
    background-color: rgb(255, 55, 188);
    border-radius: 50%;
    z-index: 6;
    animation: orbit3 linear 8s infinite;
}

.c5 {
    width: 450px;
    height: 450px;
    z-index: 1;
}

.c5:after {
    content: '';
    width: 30px;
    height: 30px;
    background-color: rgb(32, 29, 210);
    border-radius: 50%;
    z-index: 6;
    animation: orbit4 linear 5s infinite;
}

/* 折叠状态登录框 */
.box_login_fold {
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 25px;
    transition: all 1s;
    cursor: pointer;
    z-index: 10;
}


.box_login {
    width: clamp(300px, 45vw, 500px);
    /* 响应式宽度 */
    height: clamp(200px, 30vh, 300px);
    /* 响应式高度 */
    border-radius: 5px;
    background-color: #dddddd;
    transition: all 1s;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
    z-index: 10;
}

.box_login_fold:hover {
    box-shadow: 0 0 10px 10px #e7e7e7;
    background-color: #9b9b9b;
}
.displayan{
    animation: displayt 5s linear;
}

/* 轨道动画（基础状态） */
@keyframes orbit {
    0% {
        transform: rotate(0deg) translateY(75px);
    }

    50% {
        transform: rotate(180deg) translateY(75px);
        box-shadow: 0 0 5px 5px rgb(177, 218, 30);
    }

    100% {
        transform: rotate(360deg) translateY(75px);
    }

    /* 修复原终点偏移问题 */
}

@keyframes orbit2 {
    0% {
        transform: rotate(0deg) translateY(120px);
    }

    50% {
        transform: rotate(180deg) translateY(120px);
        box-shadow: 0 0 5px 5px rgb(49, 190, 255);
    }

    100% {
        transform: rotate(360deg) translateY(120px);
    }
}

@keyframes orbit3 {
    0% {
        transform: rotate(0deg) translateY(180px);
    }

    50% {
        transform: rotate(180deg) translateY(180px);
        box-shadow: 0 0 5px 5px rgb(162, 25, 186);
    }

    100% {
        transform: rotate(360deg) translateY(180px);
    }
}

@keyframes orbit4 {
    0% {
        transform: rotate(0deg) translateY(225px);
    }

    50% {
        transform: rotate(180deg) translateY(225px);
        box-shadow: 0 0 5px 5px rgb(55, 94, 202);
    }

    100% {
        transform: rotate(360deg) translateY(225px);
    }
}

/* 太阳动画 */
@keyframes sun {
    10% {
        box-shadow: 0 0 5px 5px rgb(255, 66, 66);
    }

    30% {
        box-shadow: 0 0 30px 30px rgb(255, 70, 70);
    }

    50% {
        box-shadow: 0 0 50px 50px rgb(255, 66, 66);
    }

    80% {
        box-shadow: 0 0 30px 30px rgb(255, 101, 101);
    }

    100% {
        box-shadow: 0 0 0 0;
    }
}


@media (max-width: 860px) {
    .login-group {
        flex-direction: column;
        gap: 30px;
    }

    .box_login {
        margin-left: 0;
        width: 90vw;
        height: auto;
        padding: 30px 20px;
    }

    .cycles {
        width: clamp(150px, 60vw, 300px);
        height: clamp(150px, 60vw, 300px);
    }

    /* 缩小轨道和小球尺寸，适应手机屏幕 */
    .cycle {
        width: 40px;
        height: 40px;
        border-width: 2px;
    }

    .c2 {
        width: 100px;
        height: 100px;
    }

    .c2::after {
        width: 20px;
        height: 20px;
    }

    .c3 {
        width: 160px;
        height: 160px;
    }

    .c3::after {
        width: 15px;
        height: 15px;
    }

    .c4 {
        width: 240px;
        height: 240px;
    }

    .c4::after {
        width: 25px;
        height: 25px;
    }

    .c5 {
        width: 300px;
        height: 300px;
    }

    .c5::after {
        width: 20px;
        height: 20px;
    }

    /* 调整动画轨道半径 */
    @keyframes orbit {
        0% {
            transform: rotate(0deg) translateY(50px);
        }

        50% {
            transform: rotate(180deg) translateY(50px);
            box-shadow: 0 0 3px 3px rgb(177, 218, 30);
        }

        100% {
            transform: rotate(360deg) translateY(50px);
        }
    }

    @keyframes orbit2 {
        0% {
            transform: rotate(0deg) translateY(80px);
        }

        50% {
            transform: rotate(180deg) translateY(80px);
            box-shadow: 0 0 3px 3px rgb(49, 190, 255);
        }

        100% {
            transform: rotate(360deg) translateY(80px);
        }
    }

    @keyframes orbit3 {
        0% {
            transform: rotate(0deg) translateY(120px);
        }

        50% {
            transform: rotate(180deg) translateY(120px);
            box-shadow: 0 0 3px 3px rgb(162, 25, 186);
        }

        100% {
            transform: rotate(360deg) translateY(120px);
        }
    }

    @keyframes orbit4 {
        0% {
            transform: rotate(0deg) translateY(150px);
        }

        50% {
            transform: rotate(180deg) translateY(150px);
            box-shadow: 0 0 3px 3px rgb(55, 94, 202);
        }

        100% {
            transform: rotate(360deg) translateY(150px);
        }
    }

    /* 调整太阳动画 */
    @keyframes sun {
        10% {
            box-shadow: 0 0 3px 3px rgb(255, 66, 66);
        }

        30% {
            box-shadow: 0 0 20px 20px rgb(255, 70, 70);
        }

        50% {
            box-shadow: 0 0 30px 30px rgb(255, 66, 66);
        }

        80% {
            box-shadow: 0 0 20px 20px rgb(255, 101, 101);
        }

        100% {
            box-shadow: 0 0 0 0;
        }
    }
}

/* 登录消失 */
@keyframes displayt{
    100%{
        opacity: 0;
        width: 0;
        height: 0;
    }
}
</style>

