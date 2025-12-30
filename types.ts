
export interface FoodItem {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  category: string;
}

export interface Recommendation {
  reasoning: string;
  suggestions: string[];
}

export enum AuthMode {
  LOGIN = 'login',
  SIGNUP = 'signup'
}
