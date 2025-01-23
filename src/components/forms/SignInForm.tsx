import { Form, Button, Input } from '@heroui/react'
import { useState } from 'react'
import { UserCredentials } from '../../types'
import { useMutation } from '@tanstack/react-query'
import { ApiClient } from '../../api-client'
import useClientProvider from '../../hooks/useClientProvider'

export default function SignInForm() {
  const [credentials, setData] = useState<UserCredentials>({ username: '', password: '' })
  
  const { setClient } = useClientProvider()
  const { mutate } = useMutation<ApiClient, unknown, UserCredentials>({
    mutationFn: data => ApiClient.authenticate(data),
    onError: e => console.log(e),
    onSuccess: client => setClient(client)
  })

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutate(credentials)
  }

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      validationBehavior="native"
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        value={credentials.username}
        errorMessage="Le nom d'utilisateur est incorrecte."
        label="Nom d'utilisateur"
        labelPlacement="outside"
        placeholder="Nom d'utilisateur"
        type="text"
        validationBehavior="native"
        validate={v => v.length > 0 || "Le nom d'utilisateur ne peut pas être vide."}
        onValueChange={v => setData({ ...credentials, username: v })}
      />
      <Input
        isRequired
        value={credentials.password}
        errorMessage="Le mot de passe est incorrecte."
        label="Mot de passe"
        labelPlacement="outside"
        placeholder="Mot de passe"
        type="password"
        validationBehavior="native"
        validate={v => v.length > 0 || 'Le mot de passe ne peut pas être vide.'}
        onValueChange={v => setData({ ...credentials, password: v })}
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Login
        </Button>
      </div>
    </Form>
  )
}
