import { ExpenseRepository } from "../repositories/expenseRepository.js";

export class ExpenseService {
  private expenseRepository = new ExpenseRepository();

  async addExpense(
    userId: number,
    category: string,
    amount: number,
    description?: string
  ) {
    const expense = await this.expenseRepository.createExpense({
      user_id: userId,
      category,
      amount,
      description,
    });
    return expense;
  }

  async getExpenses(userId: number) {
    return this.expenseRepository.getExpensesByUserId(userId);
  }
}
