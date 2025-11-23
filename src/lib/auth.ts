import { api } from "./api";
import {
  RegisterRequest,
  LoginRequest,
  LoginResponse,
} from "@/types/auth";

// Register a new user
export async function registerUser(data: RegisterRequest): Promise<{ token: string }> {
  return api("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// Login a new user
export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  return api("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
