import axios from "axios";
import { useAuthStore} from "@/stores/auth";

class Http{
    constructor(){
        this.instance= axios.create({
            baseURL:import.meta.env.VITE_BASE_URL,
            timeout:6000,
        });
        this.instance.interceptors.request.use((config)=>{
            const authStore=useAuthStore();
            const token =authStore.token;
            if (token) config.headers.Authorization="JWT"+token;
            return config;
        })
    }
    async post(path,data){
        return await this.instance.post(path,data)
        .then(response => response.data)
        .catch(err=>{
            const err_detail=err?.response?.data?.detail || "请求失败";
            return Promise.reject(err_detail);
        })
    }
    async get(path, params) { 
        return await this.instance.get(path, { params })
            .then(response => response.data)
            .catch(err => {
                const detail = err?.response?.data?.detail || "请求失败";
                return Promise.reject(detail);
            });
    }
    async put(path,data){
        return await this.instance.put(path, data)
            .then(response => response.data)
            .catch(err => {
                const detail = err?.response?.data?.detail || "请求失败";
                return Promise.reject(detail);
            });
    }
}
export default new Http();