import { requestError } from "@/errors/request-error";
import userRepository from "@/repositories/user-repository";
import { user } from "@prisma/client";
import bcrypt from "bcrypt";

export type CreateUserParams = Omit<user, "id"> 

export const createUser = async ({ name, email, password, image, course, category }: CreateUserParams): Promise<user> => {
  const emailExists = await userRepository.findByEmail(email);

  if (emailExists) throw requestError("DuplicatedEmailError");

  const hashPassword = bcrypt.hashSync(password, 10);

  return userRepository.create({
    password: hashPassword,
    name,
    email,
    image,
    course,
    category
  });
};

const userService = {
  createUser,
};

export default userService;
