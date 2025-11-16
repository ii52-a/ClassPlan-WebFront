<script setup name="OApageHeader">

</script>
<template>
    <el-space direction="vertical" fill style="width: 100%;" :size="20">
        <slot></slot>
    </el-space>

</template>

<style scoped>
.el-space:deep(.el-space__item) {
    width: 100%;
}
</style>