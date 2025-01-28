import express from "express";
import { AuthController } from "../controllers/authController.js";
import { ExpenseController } from "../controllers/expenseController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
const authController = new AuthController();
const expenseController = new ExpenseController();

router.post("/register", authController.handleRegisterUser);
router.post("/login", authController.handleLoginUser);

router.post("/expenses", authMiddleware, expenseController.handleAddExpense);
router.get(
  "/expenses",
  authMiddleware,
  expenseController.handleGetUserExpenses
);

export default router;
