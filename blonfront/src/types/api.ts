export interface BaseResponse<T = any> {
  code: number        
  data: T            
  message: string    
  success: boolean,
  [key:string]:any; 
}

"登录"
export interface LoginParams{
    email:string
    password:string
}
export interface LoginResponse {
  user: {
    [key:string]:any
  };
  token: string;
}

"修改密码"
export interface ResetPwdParams {
  oldpwd: string;
  pwd1: string;
  pwd2: string;
}

export interface ResetPwdResponse{
    oldpwd: string;
    pwd1: string;
    pwd2: string;
}

