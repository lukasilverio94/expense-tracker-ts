"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userRepository_js_1 = require("../repositories/userRepository.js");
class AuthService {
    constructor() {
        this.userRepository = new userRepository_js_1.UserRepository();
    }
    register(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
            const user = yield this.userRepository.createUser({
                username,
                password: hashedPassword,
            });
            return user;
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUserByUsername(username);
            if (!user || !(yield bcryptjs_1.default.compare(password, user.password))) {
                throw new Error("Invalid credentials");
            }
            const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            return token;
        });
    }
}
exports.AuthService = AuthService;
