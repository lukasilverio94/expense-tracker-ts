import knex from "knex";
import config from "../knexfile";
import { User } from "../types/user";

const db = knex(config.development);

export class UserRepository {
  async createUser(user: User): Promise<User> {
    const [newUser] = await db("users").insert(user).returning("*");
    return newUser;
  }

  async findUserByUsername(username: string): Promise<User | undefined> {
    return db("users").where({ username }).first();
  }
}
