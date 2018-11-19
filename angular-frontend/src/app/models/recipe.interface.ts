export interface Recipe {
  Recipe: Recipe;
    id: number;
    title: string;
    img_url: string;
    description: string;
    preparation: string;
    calories: number;
    created_at: Date;
    updated_at: Date;
    user_id: number;
}