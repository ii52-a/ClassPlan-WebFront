<template name="main">

  <el-container class="container">
    <el-header class="header"><el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal"
        :ellipsis="false" :router="true" @select="handleSelect">
        <el-menu-item  class="logo" disabled>
          <el-icon>
            <HelpFilled />
          </el-icon>ii-usiverse ClassPlan
        </el-menu-item>
        <el-menu-item index="0" :route="{ name: 'frame' }">首页</el-menu-item>
        <el-sub-menu index="2">
          <template #title>查询区</template>
          <el-menu-item index="2-1">暂定</el-menu-item>
          <el-menu-item index="2-2">暂定</el-menu-item>
          <el-menu-item index="2-3">暂定</el-menu-item>
          <el-sub-menu index="2-4">
            <template #title>暂定</template>
            <el-menu-item index="2-4-1">暂定</el-menu-item>
            <el-menu-item index="2-4-2">暂定</el-menu-item>
            <el-menu-item index="2-4-3">暂定</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-menu-item index="3" :route="{ name: 'add_event' }">发布添加</el-menu-item>
        <el-menu-item  class="user-info" disabled>
          <el-dropdown>
                    <span class="el-dropdown-link">
                        <el-avatar icon="UserFilled" />
                        <span style="margin-left: 10px;">{{ authStore.get_user.enrolled_class.name}}&nbsp;|&nbsp;{{
                            authStore.get_user.realname
                        }}</span>
                        <el-icon class="el-icon--right">
                            <arrow-down />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>修改密码</el-dropdown-item>
                            <el-dropdown-item @click="onExit()">退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
        </el-menu-item>
      </el-menu>
    </el-header>
    <el-container>
      <el-aside class="aside">Aside</el-aside>
      <el-container>
        <el-main>
          <RouterView></RouterView>
        </el-main>

      </el-container>
    </el-container>
  </el-container>

</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
const router=useRouter()
const authStore=useAuthStore()

const activeIndex = ref('1')
const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}
const onExit = (e) => {
    authStore.clearUserToken()
    router.push({ name: 'login' })
    ElMessage.success("退出成功")
}
</script>
<style scoped>
* {
  padding: 0px;
  margin: 0px;
}
.el-dropdown-link {
    display: flex;
    align-items: center;
    cursor: pointer;
}
.user-info {
  margin-left: auto;
  cursor: pointer;
  margin-right: 15px;
}
.user-info.is-disabled {
  opacity: 1 !important; 
  cursor: default !important;
}
.logo {
  color: #b437da;
  margin: 0 30px 0 10px;
  font-size: 16px;
}
.logo.is-disabled{
  opacity: 1 ; 
  cursor: default ;
}
.container {
  height: 100vh;
  background-color: #ffffff;
}

.header {
  padding: 0;
  color: #ffffff;
}

.aside {
  width: 200px;
  padding: 0;
  background-color: #ffffff;
  color: #333333;
  border-right: 1px solid #e0e0e0;
}

.el-main {
  background-color: #ffffff;
  color: #555555;
}

.el-footer {
  background-color: #f0f0f0;
  color: #777777;
  border-top: 1px solid #e0e0e0;
}
.el-dropdown-link:focus {
    outline: none !important;
}
</style>
