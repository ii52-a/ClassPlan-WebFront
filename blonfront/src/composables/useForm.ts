import { FormInstance, FormRules, ROOT_COMMON_COLOR_INJECTION_KEY } from "element-plus"
import { reactive, ref } from 'vue';


//提供初始表单规范
interface UseFormOptions<T>{
    initialValues:T
    rules:FormRules
    onSubmit?:(values:T)=>Promise<void>
}

export function useForm<T extends object>(options:UseFormOptions<T>){
    const {initialValues,rules={},onSubmit}=options
    const formRef=ref<FormInstance>()   //ref的类型定义，FormInstance是elementplus的表单类型
    const formData=reactive({...initialValues}) as T
    const handleSubmit=async():Promise<void> =>{
        if (!formRef.value) return ;

        if (onSubmit){
            await onSubmit(formData)
        }
    }
    return {
    formRef,     
    formData,     
    handleSubmit  
  }
}
