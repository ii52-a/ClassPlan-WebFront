import { ElMessage, FormInstance, FormRules} from "element-plus"
import { reactive, ref } from 'vue';


//输入约束
interface UseFormOptions<T>{
    initialValues:T
    rules:FormRules
    onSubmit?:(values:T)=>Promise<void>
}

export function useForm<T extends object>(options:UseFormOptions<T>){
    const {initialValues,rules={},onSubmit}=options
    const formRef=ref<FormInstance>()   //ref的类型定义，FormInstance是elementplus的表单类型
    const formData=initialValues
    const handleSubmit=async():Promise<void>=>{
        if (!formRef.value) return ;
        formRef.value.validate((vaild:boolean,field:any):void=>{
            if (vaild){
                //TODO:连接api
                ElMessage.success("添加成功")
            }else{
                ElMessage.info("请输入正确信息")
            }
        }
    )
    }

    return {
    formRef,     
    formData,
    rules,     
    handleSubmit  
  }
}
