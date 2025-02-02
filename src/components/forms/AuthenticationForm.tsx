import { Tab, Tabs } from '@heroui/react'
import { useState } from 'react'
import SignInForm from './SignInForm'
import SignUpForm from './SignUpForm'

export type FormChoice = 'sign-in' | 'sign-up'

export default function AuthenticationForm() {
  const [tab, setTab] = useState<FormChoice>('sign-in')
  const handleSignUpSuccess = () => setTab('sign-in')

  return (
    <Tabs
      color="primary"
      radius="full"
      selectedKey={tab}
      onSelectionChange={k => setTab(k as FormChoice)}
    >
      <Tab key="sign-in" title="Login">
        <SignInForm />
      </Tab>
      <Tab key="sign-up" title="Register">
        <SignUpForm onSignUpSuccess={handleSignUpSuccess} />
      </Tab>
    </Tabs>
  )
}
