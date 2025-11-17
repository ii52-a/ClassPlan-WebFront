# TS逻辑

## types/form.ts

### 规范
- FormRule,用于规定单个数据验证的结构{required:...,min:...,}
- FormRules，所有数据的验证

## types/task.ts
### 规范
- 提供enum枚举
- 提供枚举接口TaskFormOptions
- TaskFormData:任务信息的详细内容

## useForm.ts

### 规范
- UseFormRules:表单数据规范

### 函数
- useForm：解构输入表单内容，提供formRef，提交处理函数

## useValidation.ts

## 函数
-提供验证函数required,length,pattern