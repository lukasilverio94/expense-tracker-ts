import { Request, Response } from "express";
import { ExpenseService } from "../services/expenseService.js";

export class ExpenseController {
  private expenseService = new ExpenseService();

  async handleAddExpense(req: Request, res: Response) {
    const { category, amount, description } = req.body;
    const userId = req.user?.userId;
    if (!userId) throw new Error("Unauthorized");
    const expense = await this.expenseService.addExpense(
      userId,
      category,
      amount,
      description
    );
    res.status(201).json(expense);
  }

  async handleGetUserExpense(req: Request, res: Response) {
    const userId = req.user?.userId;
    if (!userId) throw new Error("Unauthorized");
    const expenses = await this.expenseService.getExpenses(userId);
    res.status(200).json(expenses);
  }
}
