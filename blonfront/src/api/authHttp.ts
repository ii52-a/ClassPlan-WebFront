import { BaseResponse, LoginParams, LoginResponse, ResetPwdParams, ResetPwdResponse } from "@/types/api";
import http from "./http";

const login=(email:string,password:string):Promise<BaseResponse<LoginResponse>>=>{
    const path:string='/auth/login/'
    return http.post<BaseResponse>(path,{email,password} as LoginParams)
}

const resetPwd=(oldpwd:string,pwd1:string,pwd2:string):Promise<ResetPwdParams>=>{
    const path:string="/auth/resetpwd/"
    return http.post<ResetPwdResponse>(path,{oldpwd,pwd1,pwd2} as ResetPwdParams)
}


export default {
    login,
    resetPwd,
}