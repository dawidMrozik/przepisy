export interface Comment {
    id: number;
    content: string;
    created_at: Date;
    updated_at: Date;
    user_id: number;
    recipe_id: number;
}
