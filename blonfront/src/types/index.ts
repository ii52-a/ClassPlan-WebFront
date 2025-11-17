//响应
export interface BaseResponse<T = any> {
  code: number        // 状态码
  data: T            // 数据
  message: string    
  success: boolean   
}


export interface PaginationParams {
  page: number       
  pageSize: number   
}