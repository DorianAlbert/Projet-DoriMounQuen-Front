import { useState } from 'react'
import { ApiClient } from '../api-client'
import ClientProvider from '../contexts/ClientProvider'

export default function AuthenticationProvider({ children }: React.PropsWithChildren) {
  const [client, _setClient] = useState<ApiClient | null>(null)

  return (
    <>
      {client && <ClientProvider client={client}>{children}</ClientProvider>}
      {!client && <></>}
    </>
  )
}
