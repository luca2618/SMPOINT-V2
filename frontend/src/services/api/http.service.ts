import axiosInstance from '../http/axios-instance';

export const httpClient = {
  get: async <T>(url: string) => {
    const response = await axiosInstance.get<T>(url);
    return response.data;
  },

  post: async <T>(url: string, data?: any) => {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
  },

  put: async <T>(url: string, data: any) => {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
  },

  delete: async <T>(url: string) => {
    const response = await axiosInstance.delete<T>(url);
    return response.data;
  },
};