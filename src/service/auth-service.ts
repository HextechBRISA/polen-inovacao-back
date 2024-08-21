import { requestError } from "../errors/request-error";
import sessionRepository from "../repositories/session-repository";
import userRepository from "../repositories/user-repository";
import { user as User } from "@prisma/client";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

export type SignInParams = Pick<User, "email" | "password">;

const signIn = async (params: SignInParams) => {
  const { email, password: userPassword } = params;

  const user = await userRepository.findByEmail(email, {
    id: true,
    email: true,
    password: true,
    course: true,
    image: true,
    category: true,
  });

  if (!user) throw requestError("email or password are incorrect");

  const isPasswordValid = bcrypt.compareSync(userPassword, user.password);

  if (!isPasswordValid) throw requestError("email or password are incorrect");

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT secret is not defined");
  }

  const token = jwt.sign({ userId: user.id }, secret);

  await sessionRepository.create({ token, userId: user.id });

  const { password: _, ...userWithoutPassword } = user; // eslint-disable-line @typescript-eslint/no-unused-vars

  return { user: userWithoutPassword, token };
};

const authService = { signIn };

export default authService;
