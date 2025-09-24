import axios from "axios";
import type { ProductQueryParams, RegisterData, SignInData } from "../types/types";
import { API_BASE_URL, LOGIN_ENDPOINT, PRODUCTS_ENDPOINT, REGISTER_ENDPOINT } from "../constants/constants";


export const userRegistration = async (data: RegisterData) => {
  try {
    let payload: unknown = data;
    let headers: Record<string, string> = { "Content-Type": "application/json" };

    if (data.avatar) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        const value = (data as never)[key];
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      payload = formData;
      headers = { "Content-Type": "multipart/form-data" };
    }

    const response = await axios.post(
      `${API_BASE_URL}${REGISTER_ENDPOINT}`,
      payload,
      { headers }
    );

    if (response.data?.token) {
      localStorage.setItem("auth_token", response.data.token);
    }

    if (response.data?.user) {
      localStorage.setItem("auth_user", JSON.stringify(response.data.user));
    }

    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An axios error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};


export const loginUser = async (data: SignInData) => {
  try {
    let payload: unknown = data;
    let headers: Record<string, string> = { "Content-Type": "application/json" };
    if (data.avatar) {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        const value = (data as never)[key];
        if (value !== undefined && value !== null) {
          formData.append(key, value);
        }
      });

      payload = formData;
      headers = { "Content-Type": "multipart/form-data" };
    }
    const response = await axios.post(
      `${API_BASE_URL}${LOGIN_ENDPOINT}`,
      payload,
      { headers }
    );
    if (response.data?.token) {
      localStorage.setItem("auth_token", response.data.token);
    }
    if (response.data?.user) {
      localStorage.setItem("auth_user", JSON.stringify(response.data.user));
    }
    return response;
  } catch (error) { 
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An axios error occurred");
    }
    else {
      throw new Error("An unexpected error occurred");
    }
  }
}

export const getProductsData = async (params?: ProductQueryParams) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${PRODUCTS_ENDPOINT}`, {
      params: {
        page: params?.page,
        "filter[price_from]": params?.filter?.price_from,
        "filter[price_to]": params?.filter?.price_to,
        sort: params?.sort,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || "An axios error occurred");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};