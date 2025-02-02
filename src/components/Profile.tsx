import {
  Avatar,
  Code,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure
} from '@heroui/react'
import useClientProvider from '../hooks/useClientProvider.ts'
import PromptModal from './PromptModal.tsx'

export default function Profile() {
  const { client, setClient } = useClientProvider()
  const handleLogout = () => setClient(null)

  const { isOpen, onOpenChange } = useDisclosure()

  return (
    <div className="absolute right-4 top-4 z-50">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="gap-2" isReadOnly>
            Signed in as <Code>{client?.user.username}</Code>
          </DropdownItem>
          {client!.user.role === 'ADMIN' ? (
            <DropdownItem key="prompt" onPress={onOpenChange}>
              Prompt
            </DropdownItem>
          ) : null}
          <DropdownItem key="logout" color="danger" onPress={handleLogout}>
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {client?.user.role === 'ADMIN' && <PromptModal isOpen={isOpen} onOpenChange={onOpenChange} />}
    </div>
  )
}
