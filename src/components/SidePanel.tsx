import { Drawer, DrawerBody, DrawerContent, DrawerHeader } from '@heroui/react'
import QuestionHost from './QuestionHost'
import useCountryProvider from '../hooks/useCountryProvider'

export default function SidePanel() {
  const selectedCountry = useCountryProvider()

  return (
    <Drawer
      isOpen={!!selectedCountry.country}
      onClose={() => selectedCountry.setCountry(null)}
      className="w-full h-screen"
    >
      <DrawerHeader>
        <h2>{selectedCountry.country?.properties.ADMIN}</h2>
      </DrawerHeader>
      <DrawerContent className="w-full h-full">
        <DrawerBody className="flex-grow">
          <QuestionHost />
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}
