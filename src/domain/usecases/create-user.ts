import type { User } from '@/domain/models'

export interface CreateUser {
  create: (data: CreateUser.Params) => Promise<CreateUser.Result>
}

export namespace CreateUser {
  export type Params = Omit<User, 'id'>
  export type Result = User
} 
