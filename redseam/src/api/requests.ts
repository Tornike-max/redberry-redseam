import axios from "axios";
import type { RegisterData } from "../types/types";
import { API_BASE_URL, REGISTER_ENDPOINT } from "../constants/constants";

export const userRegistration = async (data: RegisterData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${REGISTER_ENDPOINT}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data.message || "An axios error occurred"
      );
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};