// User model 
export interface User {
    firstName: string;
    lastName: string;
    email: string;
  }
  
  // Registration request body
  export interface RegisterRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  // Login request body
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  // Login API response
  export interface LoginResponse {
    token: string;
    user: User;
  }
  