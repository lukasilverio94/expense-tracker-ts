import knex from "knex";
import config from "../knexfile.ts";
import { Expense } from "../types.js";

const db = knex(config.development);

export class ExpenseRepository {
  async createExpense(expense: Expense): Promise<Expense> {
    const [newExpense] = await db("expenses").insert(expense).returning("*");
    return newExpense;
  }

  async getExpensesByUserId(userId: number): Promise<Expense[]> {
    return db("expenses").where({ user_id: userId });
  }

  async getExpenseById(expenseId: number): Promise<Expense[]> {
    return db("expenses").where({id: expenseId});
  }
}
