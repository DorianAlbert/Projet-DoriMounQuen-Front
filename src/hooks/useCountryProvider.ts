import { useContext } from 'react'
import { SelectedCountryContext, CountryProvider } from '../contexts/SelectedCountryProvider'

export default function useCountryProvider(): CountryProvider {
  return useContext(SelectedCountryContext)!
}
