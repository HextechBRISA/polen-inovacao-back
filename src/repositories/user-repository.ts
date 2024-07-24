import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

const findByEmail = async (email: string, select?: Prisma.userSelect) => {
  const params: Prisma.userFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
};

const create = async (data: Prisma.userUncheckedCreateInput) => {
  return prisma.user.create({
    data,
  });
};

const userRepository = {
  findByEmail,
  create
};

export default userRepository;
