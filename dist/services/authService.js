var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";
export class AuthService {
    constructor() {
        this.userRepository = new UserRepository();
    }
    register(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt.hash(password, 10);
            const existingUser = yield this.userRepository.findUserByUsername(username);
            if (existingUser) {
                throw new Error("This username is already taken");
            }
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
            if (!user || !(yield bcrypt.compare(password, user.password))) {
                throw new Error("Invalid credentials");
            }
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
            return token;
        });
    }
}
