import { PrismaUserRepository } from '@/infra/db/prisma/user-repository/prisma-user-repository'
import { prisma } from '@/infra/db/prisma/helpers/prisma-helper'

const makeSut = (): PrismaUserRepository => {
  return new PrismaUserRepository()
}

describe('PrismaUser Repository', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  describe('create()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const user = await sut.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
      expect(user.name).toBe('any_name')
      expect(user.email).toBe('any_email@mail.com')
      expect(user.password).toBe('any_password')
    })

    test('Should throw if email is already in use', async () => {
      const sut = makeSut()
      await sut.create({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const promise = sut.create({
        name: 'other_name',
        email: 'any_email@mail.com',
        password: 'other_password'
      })
      await expect(promise).rejects.toThrow()
    })
  })
}) 
