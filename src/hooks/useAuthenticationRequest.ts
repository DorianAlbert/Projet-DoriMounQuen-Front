import { UserCredentials } from '../types'

export type AuthFunc = (creds: UserCredentials) => void;

export default function useAuthenticationRequest(): AuthFunc {
  const handler = (creds: UserCredentials) => {}

  return handler
}