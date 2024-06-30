import axiosInterceptorInstance from "./Interceptor";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getUser() {
    return axiosInterceptorInstance.get(`${API_URL}/api/user`);
}

export function findUser(id: string) {
    return axiosInterceptorInstance.get(`${API_URL}/api/user/find/${id}`);
}

export function login(email: string, password: string) {
    return axiosInterceptorInstance.post(`${API_URL}/api/user/login`, { email, password });
}

export function register(name: string, email: string, password: string) {
    return axiosInterceptorInstance.post(`${API_URL}/api/user/signup`, { name, email, password });
}

export function updateUser(user: any) {
    return axiosInterceptorInstance.put(`${API_URL}/api/user/update`, user);
}