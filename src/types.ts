export interface Country {
  properties: {
    ADMIN: string
    ISO_A2: string
    GDP_MD_EST: number
    POP_EST: number
  }
  geometry: {
    type: string
    coordinates: any
  }
}

export interface UserCredentials {
  readonly username: string
  readonly password: string
}

export interface UserForCreate {
  readonly username: string
  readonly password: string
}

export type Role = 'ADMIN' | 'USER'

export interface User {
  readonly id: number
  readonly username: string
  readonly role: Role
}

export interface AccessToken {
  readonly accessToken: string
}

export interface AIExchangeOut {
  readonly id: number
  readonly topic: string
  readonly language: string
  readonly country: string
  readonly response: string
}

export interface AIExchangeIn {
  readonly topic: string
  readonly language: string
  readonly country: string
}

export interface PromptForUpdate {
  readonly content: string
}

export interface Prompt {
  readonly id: number
  readonly content: string
}