import { Modal, ModalBody, ModalContent } from '@heroui/react'
import AuthenticationForm from './AuthenticationForm'
import { useEffect, useState } from 'react'
import useCountryProvider from '../../hooks/useCountryProvider'

export interface AuthenticationModalProps {
  isOpen: boolean
  setOpen: (open: boolean) => void
}

export default function AuthenticationModal() {
  const [isOpen, setOpen] = useState(true)
  const scp = useCountryProvider()

  useEffect(() => {
    setOpen(true)
  }, [scp.country])

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)} onOpenChange={setOpen}>
      <ModalContent>
        <ModalBody>
          <AuthenticationForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
