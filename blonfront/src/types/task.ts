export interface TaskFormData{
    object:string;
    where:string;
    object_start_date: Date | null;
    object_start_time: Date | null;
    object_end_date: Date | null;
    object_end_time: Date | null;
    is_alert: boolean;
    type: string[];
    resource: string;
    desc: string;
}
export enum TeachingPlatform{
    XUEXITONG='学习通',
    KECHENGBIANLU='课程伴侣',
    HUODONG='活动',
}

export enum TaskType {
  HOMEWORK = '作业',
  EXPERIMENT = '实验',
  ACTIVITY = '活动',
  OTHER = '其他'
}

export enum PublisherRole {
  CLASS_MONITOR = '班长',
  CLASS_COMMISSAR = '班委',
  CLASS_TEACHER = '老师'
}
export interface TaskFormOptions{
    platforms:Array<{label:string,value:TeachingPlatform}>
    taskTypes: Array<{ label: string; value: TaskType }>
    roles: Array<{ label: string; value: PublisherRole }>
}