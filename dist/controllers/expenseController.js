var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { ExpenseService } from "../services/expenseService.js";
export class ExpenseController {
    constructor() {
        this.expenseService = new ExpenseService();
    }
    handleAddExpense(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { category, amount, description } = req.body;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!userId)
                    throw new Error("Unauthorized");
                const expense = yield this.expenseService.addExpense(userId, category, amount, description);
                res.status(201).json(expense);
            }
            catch (error) {
                next(error);
            }
        });
    }
    handleGetUserExpenses(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                if (!userId)
                    throw new Error("Unauthorized");
                const expenses = yield this.expenseService.getExpenses(Number(userId));
                res.json(expenses);
            }
            catch (error) {
                next(error);
            }
        });
    }
    handleGetUserExpense(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { expenseId } = req.params;
                const expense = yield this.expenseService.getExpenseById(Number(expenseId));
                res.json(expense);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
