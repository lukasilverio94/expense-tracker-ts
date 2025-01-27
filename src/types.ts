export interface Expense {
  id?: number;
  category: string;
  amount: number;
  description?: string;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface User {
  id?: number;
  username: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}
