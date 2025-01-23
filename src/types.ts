
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

export interface User {
  readonly id: number
  readonly username: string
}

export interface AccessToken {
  readonly accessToken: string
}
