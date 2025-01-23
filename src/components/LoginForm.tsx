import { useState } from 'react'
import { UserCredentials } from '../types'
import { Button, Form, Input } from '@heroui/react'

export default function LoginForm() {
  const [creds, setCreds] = useState<UserCredentials>({ username: '', password: '' })
  const canSubmit = !(creds.username && creds.password)

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      validationBehavior="native"
      onSubmit={e => e.preventDefault()}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Username"
        labelPlacement="inside"
        placeholder="Enter your username"
        type="text"
        value={creds.username}
        onValueChange={v => setCreds({ ...creds, username: v })}
      />
      <Input
        isRequired
        errorMessage="Please enter a password"
        label="Password"
        labelPlacement="inside"
        placeholder="Enter your password"
        type="password"
        value={creds.password}
        onValueChange={v => setCreds({ ...creds, password: v })}
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit" isDisabled={canSubmit}>
          Submit
        </Button>
      </div>
    </Form>
  )
}
