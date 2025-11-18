<template>
    <PLmain>
        <el-form :model="initialValues" label-width="auto" style="max-width: 600px" class="form" ref="formRef" :rules="rules">
            <el-form-item label="学科" prop="object">
                <el-input v-model="initialValues.object" />
            </el-form-item>
            <el-form-item label="教学平台" prop="where">
                <el-select v-model="initialValues.where" placeholder="选择任务提交平台">
                    <el-option label="学习通" value="xuexi" />
                    <el-option label="课程伴侣" value="kecheng" />
                    <el-option label="活动报名" value="huodong" />
                </el-select>
            </el-form-item>

            <el-form-item label="起始日期" prop="object_start_date">
                <el-date-picker v-model="initialValues.object_start_date" type="date" placeholder="开始日期" style="width: 100%" />
            </el-form-item>
            <el-form-item label="起始时间" prop="object_start_time">
                <el-time-picker v-model="initialValues.object_start_time" placeholder="开始时间" style="width: 100%" format="HH"
                    step="3600" />
            </el-form-item>

            <el-form-item label="结束日期" prop="object_end_date">
                <el-date-picker v-model="initialValues.object_end_date" type="date" placeholder="结束日期" style="width: 100%" />
            </el-form-item>
            <el-form-item label="结束时间" prop="object_end_time">
                <el-time-picker v-model="initialValues.object_end_time" placeholder="结束时间" style="width: 100%" format="HH"
                    step="3600" />
            </el-form-item>

            <el-form-item label="是否设置结束提醒">
                <el-switch v-model="initialValues.is_alert" />
            </el-form-item>
            <el-form-item label="任务类型" prop="type">
                <el-checkbox-group v-model="initialValues.type">
                    <el-checkbox value="作业" name="TODO1">作业</el-checkbox>
                    <el-checkbox value="实验" name="TODO2">实验</el-checkbox>
                    <el-checkbox value="活动" name="TODO3">活动</el-checkbox>
                    <el-checkbox value="其他" name="TODO4">其他</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="选择身份发布" prop="resource">
                <el-radio-group v-model="initialValues.resource">
                    <el-radio value="Class_monitor">班长</el-radio>
                    <el-radio value="Class_commissar">班委</el-radio>
                    <el-radio value="Class_teacher">老师</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="initialValues.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
                <div style="text-align: right; width: 100%;">
                    <el-button type="primary" @click="handleSubmit">提交</el-button>
                </div>
            </el-form-item>
        </el-form>
    </PLmain>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import PLmain from '@/components/PLmain.vue';
import { useForm } from '@/composables/useForm';
import { getTaskFormRules } from '@/utils/taskValidation';
import { TeachingPlatform } from '@/types/task';
import  {TaskFormData,TaskType,TaskFormOptions,PublisherRole} from '@/types/task';
const initialValues: TaskFormData = reactive({
    object: '',
    where: '',
    object_start_date: null,
    object_start_time: null,
    object_end_date: null,
    object_end_time: null,
    is_alert: false,
    type: [],
    resource: '',
    desc: '',
})
const formOptions: TaskFormOptions={
    platforms:[
        {
            label:'学习通',value:TeachingPlatform.XUEXITONG
        },
        {
            label:'课程伴侣',value:TeachingPlatform.KECHENGBIANLU
        },
        {
            label:'活动报名',value:TeachingPlatform.HUODONG
        },
    ],
    taskTypes: [
    { label: '作业', value: TaskType.HOMEWORK },
    { label: '实验', value: TaskType.EXPERIMENT },
    { label: '活动', value: TaskType.ACTIVITY },
    { label: '其他', value: TaskType.OTHER }
  ],
  roles: [
    { label: '班长', value: PublisherRole.CLASS_MONITOR },
    { label: '班委', value: PublisherRole.CLASS_COMMISSAR },
    { label: '老师', value: PublisherRole.CLASS_TEACHER }
  ]
}
const { formRef, formData,rules, handleSubmit } = useForm<TaskFormData>({
  initialValues,
  rules: getTaskFormRules(initialValues),
  onSubmit: async (formData: TaskFormData) => {
    // 反馈
            try{
                //TODO:API
                console.log('表单数据:', formData)
                ElMessage.success('任务创建成功！')
            }catch(error:any){
                ElMessage.error(error?.message || "加载失败")
            }
  },
})
</script>

<style scoped>
.form {
    width: 100%;
    height: 100%;
    margin: 50px auto;
}
</style>