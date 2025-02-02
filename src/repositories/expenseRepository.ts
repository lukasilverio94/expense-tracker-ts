import knex from "knex";
import config from "../knexfile";
import { Expense } from "../types/expense";

const db = knex(config.development);

export class ExpenseRepository {
  async createExpense(expense: Expense): Promise<Expense> {
    const [newExpense] = await db("expenses").insert(expense).returning("*");
    return newExpense;
  }

  async getExpensesByUserId(userId: number): Promise<Expense[]> {
    return db("expenses").where({ user_id: userId });
  }

  async getExpenseById(expenseId: number): Promise<Expense | null> {
    const expense = await knex<Expense>("expenses")
      .where({ id: expenseId })
      .first();
    return expense || null;
  }
}
