export interface User {
      id: number;
      email: string;
      password: string;
      created_at: Date;
      updated_at: Date;
      remember_token: string;
      detail_id: number;
      role_id: number;
}