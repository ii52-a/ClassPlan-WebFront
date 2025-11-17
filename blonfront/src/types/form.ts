export interface FormRule{
    required?:boolean
    message?:string
    trigger?: ('blur' | 'change' | 'submit')[]
    min?:number
    max?:number,
    pattern?:RegExp
    validator?: (rule: any, value: any, callback: (error?: Error) => void) => void
}


export interface FormRules {
    [key:string]:FormRule[]
}