// Standard API error format
export interface ApiError {
    message: string;
    status?: number;
  }
  
  // Generic success wrapper
  export interface ApiSuccess<T> {
    data: T;
  }
  