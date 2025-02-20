import type { AuthenticationModel } from '@/domain/models'

export interface Authentication {
  auth: (data: Authentication.Params) => Promise<Authentication.Result>
}

export namespace Authentication {
  export interface Params {
    email: string
    password: string
  }
  export type Result = AuthenticationModel
} 
