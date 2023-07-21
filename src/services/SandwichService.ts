import Sandwich from '@/models/Sandwich';
import axiosInterceptorInstance from './Interceptor';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getSandwiches() {
    return axiosInterceptorInstance.get(`${API_URL}/api/sandwich`);
}

export function getSandwich(id: number) {
    return axiosInterceptorInstance.get(`${API_URL}/api/sandwich/${id}`);
}

export function getLayers() {
    return axiosInterceptorInstance.get(`${API_URL}/api/layer`);
}

export function getSandwichesByUserID(id: string) {
    return axiosInterceptorInstance.get(`${API_URL}/api/sandwich/user/${id}`);
}

export function createSandwich(sandwich: Sandwich) {
    return axiosInterceptorInstance.post(`${API_URL}/api/sandwich/create`, sandwich);
}