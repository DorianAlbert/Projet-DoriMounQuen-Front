import {
  Alert,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Textarea,
  UseDisclosureProps
} from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import useClientProvider from '../hooks/useClientProvider'
import { Prompt, PromptForUpdate } from '../types'

export interface PromptModalProps {
  isOpen: boolean
  onOpenChange: () => void
}

export default function PromptModal({ isOpen, onOpenChange }: PromptModalProps) {
  const [value, setValue] = useState('')
  const { client } = useClientProvider()

  const { mutate, isPending } = useMutation({
    mutationFn: client?.fetchPrompt,
    onSuccess: d => setValue(d.content)
  })

  const { mutate: updatePrompt, isPending: isUpdating, isSuccess, reset } = useMutation<Prompt, any, PromptForUpdate>(
    {
      mutationFn: pfu => client!.updatePrompt({ content: pfu.content }),
      onSuccess: d => setValue(d.content)
    }
  )

  useEffect(() => mutate(), [])
  const handleSubmit = () => updatePrompt({ content: value })
  const handleClose = () => reset()

  return (
    <>
      {isPending && <Spinner size="lg" color="primary" />}
      {!isPending && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} onClose={handleClose}>
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1">Modify current prompt</ModalHeader>
                <ModalBody>
                  <Textarea
                    isDisabled={isUpdating}
                    value={value}
                    onValueChange={setValue}
                    label="Custom Text"
                    type="textarea"
                    variant="bordered"
                  />
                  {isSuccess && <Alert color="success" title="Prompt successfully updated !" />}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={handleSubmit} isLoading={isUpdating}>
                    Update prompt
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  )
}
