import type { FormRules } from '@/types/form'
import type { TaskFormData } from '@/types/task'
import { useValidation } from '@/composables/useValidation'

export const getTaskFormRules = (formData: TaskFormData): FormRules => {
  const { required, length } = useValidation()
  
  return {
    object: [
      required('请输入学科'),
      length(2, 15, '学科名称')
    ],
    where: [
      { required: true, message: '请选择教学平台', trigger: ['change','submit'] }
    ],
    object_start_date: [
      required('请选择起始日期')
    ],
    object_start_time: [
      required('请选择起始时间')
    ],
    object_end_date: [
      required('请选择结束日期'),
      { 
        validator: (rule: any, value: any, callback: Function) => {
          if (!value) {
            callback(new Error("请选择结束日期"))
            return
          }
          
          if (!formData.object_end_time) {
            callback(new Error("请选择结束时间"))
            return
          }
          
          if (!formData.object_start_date || !formData.object_start_time) {
            callback(new Error("请先填写完整的开始时间"))
            return
          }
          
          const startDateTime = new Date(
            formData.object_start_date.getFullYear(),
            formData.object_start_date.getMonth(),
            formData.object_start_date.getDate(),
            formData.object_start_time.getHours(),
          )
          
          const endDateTime = new Date(
            value.getFullYear(),
            value.getMonth(),
            value.getDate(),
            formData.object_end_time.getHours(),
          )
          
          const now = new Date()
          
          if (endDateTime <= startDateTime) {
            callback(new Error("结束时间必须晚于开始时间"))
            return
          }
          
          if (endDateTime <= now) {
            callback(new Error("结束时间必须晚于当前时间"))
            return
          }
          
          callback()
        },
        trigger: ['change']
      }
    ],
    object_end_time: [
      required('请选择结束时间')
    ],
    type: [
      { 
        required: true, 
        message: '请至少选择一种任务类型', 
        trigger: ['change']
      }
    ],
    resource: [
      { required: true, message: '请选择发布身份', trigger: ['change'] }
    ]
  }
}