import type { User } from '@/domain/models/user'

export interface CreateUserRepository {
  create: (data: CreateUserRepository.Params) => Promise<CreateUserRepository.Result>
}

export namespace CreateUserRepository {
  export interface Params {
    name: string
    email: string
    password: string
  }
  export type Result = User
} 
