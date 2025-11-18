import axios, { Axios, AxiosInstance, InternalAxiosRequestConfig,AxiosResponse } from "axios";
import { useAuthStore} from "@/stores/auth";
import { BaseResponse } from "@/types/api";

class Http{
    private instance:AxiosInstance;
    constructor(){
        this.instance= axios.create({
            baseURL:'http://127.0.0.1:8000',
            timeout:6000,
        });
        this.instance.interceptors.request.use((config:InternalAxiosRequestConfig)=>{
            const authStore=useAuthStore();
            const token =authStore.get_token;
            if (token && config.headers) config.headers.Authorization="JWT"+token;
            return config;
        })
    }
    async post<T=any>(path:string,data?:any):Promise<T>{
        return await this.instance.post(path,data)
        .then((response:AxiosResponse<BaseResponse>) => response.data as T)
        .catch((err:any)=>{
            const err_detail=err?.response?.data?.detail || "请求失败";
            return Promise.reject(err_detail);
        })
    }
    async get<T=any>(path:string,params?:any):Promise<BaseResponse<T>>{
        return await this.instance.get(path,params)
        .then((response:AxiosResponse<BaseResponse<T>>) => response.data)
        .catch((err:any)=>{
            const err_detail=err?.response?.data?.detail || "请求失败";
            return Promise.reject(err_detail);
        })
    }
    async put<T=any>(path:string,data?:any):Promise<T>{
        return await this.instance.put(path,data)
        .then((response:AxiosResponse<BaseResponse>) => response.data as T)
        .catch((err:any)=>{
            const err_detail=err?.response?.data?.detail || "请求失败";
            return Promise.reject(new Error(err_detail));
        })
    }
}
export default new Http();