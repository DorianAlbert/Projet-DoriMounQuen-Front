import { useContext } from 'react'
import { ApiClient } from '../api-client'
import { ClientContext } from '../contexts/ClientProvider'

export default function useClient() {
  return useContext<ApiClient | null>(ClientContext)!
}