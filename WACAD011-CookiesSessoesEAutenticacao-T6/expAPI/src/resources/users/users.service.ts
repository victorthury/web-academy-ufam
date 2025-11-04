import { PrismaClient, User } from '@prisma/client';
import { CreateUserDTO, UpdateUserDTO } from './users.type';
import { UserTypes } from '../userTypes/userTypes.constants';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function list(): Promise<User[]> {
  const users: User[] = await prisma.user.findMany();
  return users;
}

async function getById(id: string): Promise<User | null> {
  const user: User | null = await prisma.user.findFirst({ where: { id } });

  return user;
}

export async function createUser(createUser: CreateUserDTO): Promise<User> {
  const { password } = createUser;
  const rounds = parseInt(process.env.SALT_ROUNDS as string);

  const salt = await bcrypt.genSalt(rounds);
  const hash = await bcrypt.hash(password, salt);

  return prisma.user.create({
    data: { ...createUser, password: hash }
  });
}

export async function update(
  id: string,
  updateData: UpdateUserDTO
): Promise<User> {
  const { password } = updateData;
  const rounds = parseInt(process.env.SALT_ROUNDS as string);

  const salt = await bcrypt.genSalt(rounds);
  const hash = await bcrypt.hash(password, salt);

  const user: User = await prisma.user.update({
    where: { id },
    data: { ...updateData, password: hash }
  });
  return user;
}

async function idExists(id: string): Promise<boolean> {
  const user: User | null = await prisma.user.findFirst({ where: { id } });
  if (!user) {
    return false;
  }
  return true;
}

async function remove(id: string): Promise<User> {
  const deleteUser: User = await prisma.user.delete({
    where: { id }
  });
  return deleteUser;
}

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export default {
  list,
  getById,
  createUser,
  update,
  remove,
  idExists
};
