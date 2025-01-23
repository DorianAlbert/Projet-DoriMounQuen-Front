
export interface UserCredentials {
  readonly username: string
  readonly password: string
}

export interface UserForCreate {
  readonly username: string
  readonly password: string
}

export interface User {
  readonly id: number
  readonly username: string
  readonly password: string
}
