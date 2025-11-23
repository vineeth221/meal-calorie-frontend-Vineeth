// Request sent to /get-calories
export interface CalorieRequest {
    dish_name: string;
    servings: number;
  }
  
  // Response shape from backend
  export interface CalorieResponse {
    dish_name: string;
    servings: number;
    calories_per_serving: number;
    total_calories: number;
    source: string;
  }
  