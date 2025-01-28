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
import config from "../../knexfile.js";
const db = knex(config.development);
export class UserRepository {
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const [newUser] = yield db("users").insert(user).returning("*");
            return newUser;
        });
    }
    findUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return db("users").where({ username }).first();
        });
    }
}
