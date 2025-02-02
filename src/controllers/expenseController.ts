import { Request, Response, NextFunction } from "express";
import { ExpenseService } from "../services/expenseService.js";

export class ExpenseController {
  private expenseService = new ExpenseService();

  async handleAddExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const { category, amount, description } = req.body;
      const userId = req.user?.userId;
      if (!userId) throw new Error("Unauthorized");
      const expense = await this.expenseService.addExpense(
        userId,
        category,
        amount,
        description,
      );
      res.status(201).json(expense);
    } catch (error) {
      next(error);
    }
  }

  async handleGetUserExpenses(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) throw new Error("Unauthorized");
      const expenses = await this.expenseService.getExpenses(Number(userId));
      res.json(expenses);
    } catch (error) {
      next(error);
    }
  }

  async handleGetUserExpense(req: Request, res: Response, next: NextFunction) {
    try {
      const { expenseId } = req.params;
      const expense = await this.expenseService.getExpenseById(
        Number(expenseId),
      );
      res.json(expense);
    } catch (error) {
      next(error);
    }
  }
}
