import { createContext, useState } from 'react'
import { Country } from '../types'

export interface CountryProvider {
  country: Country | null,
  setCountry: (country: Country | null) => void
}

export const SelectedCountryContext = createContext<CountryProvider | null>(null)

export default function SelectedCountryProvider({ children }: React.PropsWithChildren) {
  const [country, setCountry] = useState<Country | null>(null)
  
  return (
    <SelectedCountryContext.Provider value={{ country, setCountry }}>
      {children}
    </SelectedCountryContext.Provider>
  )
}
