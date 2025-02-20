import type { CreateUserRepository } from '@/data/protocols/db/user/create-user-repository'
import type { User } from '@/domain/models';
import { prisma } from '@/infra/db/prisma/helpers/prisma-helper'

export class PrismaUserRepository implements CreateUserRepository {
  async create (data: CreateUserRepository.Params): Promise<CreateUserRepository.Result> {
    const user: User = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.password
      }
    })
    return user
  }
} 
