import { createContext } from 'react'
import { ApiClient } from '../api-client'

export const ClientContext = createContext<ApiClient | null>(null)

export interface ClientProviderProps extends React.PropsWithChildren {
  client: ApiClient
}

export default function ClientProvider({ children, client }: ClientProviderProps) {
  return <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
}
