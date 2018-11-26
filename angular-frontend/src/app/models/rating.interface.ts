export interface Rating {
      id: number;
      rate: number;
      isRated: boolean;
      created_at: Date;
      updated_at: Date;
      user_id: number;
      recipe_id: number;
}