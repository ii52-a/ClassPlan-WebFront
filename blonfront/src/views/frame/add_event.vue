<template>
    <PLmain>
        <el-form :model="form" label-width="auto" style="max-width: 600px" class="form" ref="formRef" :rules="rules">
            <el-form-item label="学科" prop="object">
                <el-input v-model="form.object" />
            </el-form-item>
            <el-form-item label="教学平台" prop="where">
                <el-select v-model="form.where" placeholder="选择任务提交平台">
                    <el-option label="学习通" value="xuexi" />
                    <el-option label="课程伴侣" value="kecheng" />
                    <el-option label="活动报名" value="huodong" />
                </el-select>
            </el-form-item>
            
            <el-form-item label="起始日期" prop="object_start_date">
                <el-date-picker 
                    v-model="form.object_start_date" 
                    type="date" 
                    placeholder="开始日期"
                    style="width: 100%" 
                />
            </el-form-item>
            <el-form-item label="起始时间" prop="object_start_time">
                <el-time-picker 
                    v-model="form.object_start_time" 
                    placeholder="开始时间" 
                    style="width: 100%" 
                    format="HH"  
                    step="3600" 
                />
            </el-form-item>
            
            <el-form-item label="结束日期" prop="object_end_date">
                <el-date-picker 
                    v-model="form.object_end_date" 
                    type="date" 
                    placeholder="结束日期" 
                    style="width: 100%" 
                />
            </el-form-item>
            <el-form-item label="结束时间" prop="object_end_time">
                <el-time-picker 
                    v-model="form.object_end_time" 
                    placeholder="结束时间" 
                    style="width: 100%" 
                    format="HH"  
                    step="3600" 
                />
            </el-form-item>
            
            <el-form-item label="是否设置结束提醒">
                <el-switch v-model="form.is_alert" />
            </el-form-item>
            <el-form-item label="任务类型" prop="type">
                <el-checkbox-group v-model="form.type">
                    <el-checkbox value="作业" name="TODO1">作业</el-checkbox>
                    <el-checkbox value="实验" name="TODO2">实验</el-checkbox>
                    <el-checkbox value="活动" name="TODO3">活动</el-checkbox>
                    <el-checkbox value="其他" name="TODO4">其他</el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="选择身份发布" prop="resource">
                <el-radio-group v-model="form.resource">
                    <el-radio value="Class_monitor">班长</el-radio>
                    <el-radio value="Class_commissar">班委</el-radio>
                    <el-radio value="Class_teacher">老师</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="描述">
                <el-input v-model="form.desc" type="textarea" />
            </el-form-item>
            <el-form-item>
                <div style="text-align: right; width: 100%;">
                    <el-button type="primary" @click="onSubmit">提交</el-button>
                </div>
            </el-form-item>
        </el-form>
    </PLmain>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import PLmain from '@/components/PLmain.vue'
import { ElMessage } from 'element-plus'

const formRef = ref()
interface FormData {
    object: string;
    where: string;
    object_start_date: Date | null;
    object_start_time: Date | null;
    object_end_date: Date | null;
    object_end_time: Date | null;
    is_alert: boolean;
    type: string[];
    resource: string;
    desc: string;
}
const form = reactive<FormData>({
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
});


const rules = reactive({
    object: [
        { required: true, message: '请输入学科', trigger: 'blur' },
        { min: 2, max: 15, message: '学科名称长度应为2-15个字符', trigger: 'blur' },
    ], 
    where: [
        { required: true, message: '请选择教学平台', trigger: 'change' }
    ],
    object_start_date: [
        { required: true, message: '请选择起始日期', trigger: 'change' },
    ], 
    object_start_time: [
        { required: true, message: '请选择起始时间', trigger: 'change' },
    ], 
    object_end_date: [
        { required: true, message: '请选择结束日期', trigger: 'change' },
        { 
            validator: (rule: any, value: any, callback: Function) => {
                if (!value) {
                    callback(new Error("请选择结束日期"));
                    return;
                }
                
                if (!form.object_end_time) {
                    callback(new Error("请选择结束时间"));
                    return;
                }
                
                if (!form.object_start_date || !form.object_start_time) {
                    callback(new Error("请先填写完整的开始时间"));
                    return;
                }
                
                // 完整的日期对象.
                const startDateTime = new Date(
                    form.object_start_date.getFullYear(),
                    form.object_start_date.getMonth(),
                    form.object_start_date.getDate(),
                    form.object_start_time.getHours(),
                );
                
                const endDateTime = new Date(
                    value.getFullYear(),
                    value.getMonth(),
                    value.getDate(),
                    form.object_end_time.getHours(),
                );
                
                const now = new Date();
                
                // 验证
                console.log(startDateTime,endDateTime);
                
                if (endDateTime <= startDateTime) {
                    callback(new Error("结束时间必须晚于开始时间"));
                    return;
                }
                

                if (endDateTime <= now) {
                    callback(new Error("结束时间必须晚于当前时间"));
                    return;
                }
                
                callback();
            },
            trigger: 'change'
        }
    ], 
    object_end_time: [
        { required: true, message: '请选择结束时间', trigger: 'change' },
    ],
    type: [
        { 
            type: 'array', 
            required: true, 
            message: '请至少选择一种任务类型', 
            trigger: 'change' 
        }
    ],
    resource: [
        { required: true, message: '请选择发布身份', trigger: 'change' }
    ]
})

const onSubmit = async () => {
    try {

        const valid = await formRef.value.validate();
        
        if (valid) {
            ElMessage.success('提交成功');
            console.log('表单数据:', form);
            // TODO:实际提交数据的代码
        }
    } catch (error: any) {
        ElMessage.error(error?.errors?.message || '表单验证失败，请检查输入')
    }
}
</script>

<style scoped>
.form {
    width: 100%;
    height: 100%;
    margin: 50px auto;
}
</style>