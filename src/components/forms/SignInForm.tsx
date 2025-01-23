import { Form, Button, Input } from '@heroui/react'
import { useState } from 'react'
import { UserCredentials } from '../../types'

export default function SignInForm() {
  const [data, setData] = useState<UserCredentials>({ username: '', password: '' })
  const onSubmit = () => {}

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
          Login
        </Button>
      </div>
    </Form>
  )
}
