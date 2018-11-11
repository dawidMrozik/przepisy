export interface Recipe {
  Recipe: Recipe;
    id: number;
    title: String;
    img_url: String;
    description: String;
    preparation: String;
    created_at: Date;
    updated_at: Date;
    user_id: number;
}