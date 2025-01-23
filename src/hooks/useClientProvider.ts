import { useContext } from 'react'
import { ClientContext, ClientContextReturn } from '../contexts/RequireAuthentication'

/**
 * Get API client
 * 
 * @returns ApiClient instance held the current context.
 */
export default function useClientProvider(): ClientContextReturn {
  return useContext<ClientContextReturn | null>(ClientContext)!
}