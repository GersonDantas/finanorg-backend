import { DbCreateUser } from '@/data/usecases/create-user/db-create-user'
import type { CreateUser } from '@/domain/usecases/create-user';
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { PrismaUserRepository } from '@/infra/db/prisma/user-repository/prisma-user-repository'

export const makeDbCreateUser = (): CreateUser => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const prismaUserRepository = new PrismaUserRepository()
  return new DbCreateUser(bcryptAdapter, prismaUserRepository)
} 
