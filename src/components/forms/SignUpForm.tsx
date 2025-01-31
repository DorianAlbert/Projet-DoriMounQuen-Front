import { Form, Button, Input, Alert } from '@heroui/react'
import { useState } from 'react'
import { User, UserForCreate } from '../../types'
import { useMutation } from '@tanstack/react-query'
import { ApiClient } from '../../api-client'

export default function SignUpForm({ onSignUpSuccess }: { onSignUpSuccess: () => void }) {
  const [data, setData] = useState<UserForCreate>({ username: '', password: '' })
  const [isSuccess, setIsSuccess] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)  // État pour gérer les erreurs

  const { mutate } = useMutation<User, unknown, UserForCreate>({
    mutationFn: data => ApiClient.register(data),
    onError: (error: any) => {
      if (error?.response?.status === 409) {
        setError('Le nom d\'utilisateur est déjà pris, veuillez en choisir un autre.');
      } else {
        setError('Une erreur est survenue, veuillez réessayer plus tard.');
      }
      setIsSubmitting(false); // Réactiver le bouton d'inscription après l'erreur
    },
    onSuccess: () => {
      setIsSuccess(true)
      setIsSubmitting(false)
      setTimeout(() => {
        onSignUpSuccess()
      }, 2000)
    }
  })

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError(null)  // Réinitialiser l'erreur avant de soumettre
    mutate(data)
  }

  return (
    <div className="flex flex-col items-center w-full max-w-xs gap-4">
      {isSuccess && (
        <Alert
          description="Votre compte a été créé avec succès ! Veuillez maintenant vous connecter."
          title="Compte créé avec succès"
          color="success"
        />
      )}

      {error && (
        <Alert
          description={error}
          title="Erreur"
          color="danger"
        />
      )}

      <Form
        className="w-full flex flex-col gap-4"
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
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Register
          </Button>
        </div>
      </Form>
    </div>
  )
}
