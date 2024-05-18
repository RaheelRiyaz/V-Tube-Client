/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { getAccessToken, refreshToken } from './TokenService';
import { APIResponse } from '../../models/APIResponse';

// Extend AxiosRequestConfig to include sendToken property
interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  sendToken?: boolean;
}

class BaseService {
  private Axios: AxiosInstance;

  constructor() {
    this.Axios = axios.create({
      baseURL: "/api",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });

    this.Axios.interceptors.request.use(
      async (config: any) => {
        if (config.sendToken) {
          const accessToken = getAccessToken();
          if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
          } else {
            await refreshToken(config);
            config.headers.Authorization = `Bearer ${getAccessToken()}`;
          }
        }
        return config;
      },
      (error) => {
        console.error('Request error', error);
        return Promise.reject(error);
      }
    );
  }

  // Generic Function for fetching data
  async Fetch<T>(url: string, sendToken = true): Promise<APIResponse<T>> {
    try {
      const response: AxiosResponse<APIResponse<T>> = await this.Axios.get(url, { sendToken } as CustomAxiosRequestConfig);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred during fetching data');
    }
  }

  // Generic function for posting data
  async Post<TReq, TRes>(url: string, model: TReq, sendToken = true): Promise<APIResponse<TRes>> {
    try {
      const response: AxiosResponse<APIResponse<TRes>> = await this.Axios.post(url, model, { sendToken } as CustomAxiosRequestConfig);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred during posting data');
    }
  }

  // Generic function for deleting data
  async Delete<T>(url: string, sendToken = true): Promise<APIResponse<T>> {
    try {
      const response: AxiosResponse<APIResponse<T>> = await this.Axios.delete(url, { sendToken } as CustomAxiosRequestConfig);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred during deleting data');
    }
  }

  // Generic function for updating data
  async Update<TReq, TRes>(url: string, model: TReq, sendToken = true): Promise<APIResponse<TRes>> {
    try {
      const response: AxiosResponse<APIResponse<TRes>> = await this.Axios.put(url, model, { sendToken } as CustomAxiosRequestConfig);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message || 'An error occurred during updating data');
    }
  }
}

export const BASE_SERVICE = new BaseService();
