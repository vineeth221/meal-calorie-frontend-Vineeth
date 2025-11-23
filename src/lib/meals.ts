import { api } from "./api";
import {
  CalorieRequest,
  CalorieResponse,
} from "@/types/meal";

export async function getCalories(
  data: CalorieRequest,
  token?: string
): Promise<CalorieResponse> {
  return api<CalorieResponse>("/get-calories", {
    method: "POST",
    body: JSON.stringify(data),
  }, token);
}
