export interface Expense {
  id?: number;
  category: string;
  amount: number;
  description?: string;
  user_id: number;
  created_at?: Date;
  updated_at?: Date;
}
