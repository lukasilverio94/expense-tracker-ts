import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/userRepository.js";

export class AuthService {
  private userRepository = new UserRepository();

  async register(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepository.createUser({
      username,
      password: hashedPassword,
    });
    return user;
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
    return token;
  }
}
