import { createContext, useState } from 'react'
import { ApiClient } from '../api-client'
import AuthenticationModal from '../components/forms/AuthenticationModal'
import useCountryProvider from '../hooks/useCountryProvider'

export interface RequireAuthenticationProps extends React.PropsWithChildren {
}

export interface ClientContextReturn {
  client: ApiClient | null
  setClient: (client: ApiClient | null) => void
}

export const ClientContext = createContext<ClientContextReturn | null>(null)

export default function RequireAuthentication({ children }: RequireAuthenticationProps) {
  const [client, setClient] = useState<ApiClient | null>(null)
  const scp = useCountryProvider()

  return (
    <ClientContext.Provider value={{ client, setClient }}>
      {client && <>{children}</>}
      {!client && scp.country && <AuthenticationModal />}
    </ClientContext.Provider>
  )
}
