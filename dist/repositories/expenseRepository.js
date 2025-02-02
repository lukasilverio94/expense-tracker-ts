var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import knex from "knex";
import config from "../knexfile";
const db = knex(config.development);
export class ExpenseRepository {
    createExpense(expense) {
        return __awaiter(this, void 0, void 0, function* () {
            const [newExpense] = yield db("expenses").insert(expense).returning("*");
            return newExpense;
        });
    }
    getExpensesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return db("expenses").where({ user_id: userId });
        });
    }
    getExpenseById(expenseId) {
        return __awaiter(this, void 0, void 0, function* () {
            return db("expenses").where({ id: expenseId });
        });
    }
}
