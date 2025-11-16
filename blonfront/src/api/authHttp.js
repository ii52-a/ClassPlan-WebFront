import http from "./http";

const login=(email,password)=>{
    const path='/auth/login/'
    return http.post(path,{email,password})
}

const resetPwd=(oldpwd,pwd1,pwd2)=>{
    const path="/auth/resetpwd/"
    return http.post(path,{oldpwd,pwd1,pwd2})
}


export default {
    login,
    resetPwd,
}