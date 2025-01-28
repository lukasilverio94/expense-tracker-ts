"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_js_1 = require("../controllers/authController.js");
const expenseController_js_1 = require("../controllers/expenseController.js");
const router = express_1.default.Router();
const authController = new authController_js_1.AuthController();
const expenseController = new expenseController_js_1.ExpenseController();
router.post("/register", authController.handleRegisterUser);
router.post("/login", authController.handleLoginUser);
// router.use(authMiddleware);
router.post("/expenses", expenseController.handleAddExpense);
router.get("/expenses", expenseController.handleGetUserExpenses);
exports.default = router;
