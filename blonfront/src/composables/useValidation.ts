import type { FormRule } from '@/types/form'


export const useValidation = () => {
  const required = (message: string): FormRule => ({
    required: true,
    message,
    trigger: ['submit']
  })
  
  const length = (min: number, max: number, field: string): FormRule => ({
    min,
    max,
    message: `${field}长度应为${min}-${max}个字符`,
    trigger: ['submit']
  })
  
  const pattern = (regex: RegExp, message: string): FormRule => ({
    pattern: regex,
    message,
    trigger: ['submit']
  })
  
  return {
    required,
    length,
    pattern
  }
}