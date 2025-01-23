import { Form, Button, Input } from '@heroui/react'
import { useState } from 'react'
import { User, UserForCreate } from '../../types'
import { useMutation } from '@tanstack/react-query'
import { ApiClient } from '../../api-client'

export default function SignUpForm() {
  const [data, setData] = useState<UserForCreate>({ username: '', password: '' })
  
  const { mutate } = useMutation<User, unknown, UserForCreate>({
    mutationFn: data => ApiClient.register(data),
    onError: e => console.log(e)
  })

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    mutate(data)
  }
  
  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      validationBehavior="native"
      onSubmit={onSubmit}
    >
      <Input
        isRequired
        value={data.username}
        errorMessage="Le nom d'utilisateur est incorrecte."
        label="Nom d'utilisateur"
        labelPlacement="outside"
        placeholder="Nom d'utilisateur"
        type="text"
        validationBehavior="native"
        validate={v => v.length > 0 || "Le nom d'utilisateur ne peut pas être vide."}
        onValueChange={v => setData({ ...data, username: v })}
      />
      <Input
        isRequired
        value={data.password}
        errorMessage="Le mot de passe est incorrecte."
        label="Mot de passe"
        labelPlacement="outside"
        placeholder="Mot de passe"
        type="password"
        validationBehavior="native"
        validate={v => v.length > 0 || 'Le mot de passe ne peut pas être vide.'}
        onValueChange={v => setData({ ...data, password: v })}
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Register
        </Button>
      </div>
    </Form>
  )
}