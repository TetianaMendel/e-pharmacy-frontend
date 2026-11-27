import { User } from "@/types/user";
import { nextServer } from "./api";

export type RegisterRequest = {
  email: string;
  password: string;
  username: string;
  phone: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  message: string;
};

export const register = async (data: RegisterRequest) => {
  const response = await nextServer.post<User>(
    "/auth/register",
    data
  );
  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await nextServer.post<LoginResponse>(
    "/auth/login",
    data
  );
  return response.data;
};