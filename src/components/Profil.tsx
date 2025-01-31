import { useState } from 'react';
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import PromptForm from './forms/PromptForm.tsx'
import useClientProvider from '../hooks/useClientProvider.ts'

export default function Profil() {
  const [showPromptForm, setShowPromptForm] = useState(false);
  const { client } = useClientProvider()

  return (
    <div className='absolute right-4 top-4 z-50'>
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
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as {client?.user.username}</p>
          </DropdownItem>
          <DropdownItem key="prompt" onPress={() => setShowPromptForm(true)}>
            Prompt
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Affichage conditionnel du formulaire */}
      {showPromptForm && (
        <div className="mt-4 p-4 border rounded shadow bg-white absolute top-24, right-4 w-80">
          <PromptForm />
          <button
            onClick={() => setShowPromptForm(false)}
            className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
