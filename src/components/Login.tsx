import React, { useState, FormEvent } from 'react';
import { Form, Input, Button, useDisclosure,Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter} from '@heroui/react'

interface FormData {
  username: string;
  email: string;
}

const Login: React.FC = () => {
  const [action, setAction] = useState<string | null>(null);
  const {isOpen, onOpen, onOpenChange} = useDisclosure();


  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: FormData = Object.fromEntries(formData) as FormData;
    setAction(`submit ${JSON.stringify(data)}`);
  };
  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: FormData = Object.fromEntries(formData) as FormData;
    setAction(`submit ${JSON.stringify(data)}`);
  };

  const handleFormReset = () => {
    setAction("reset");
  };

  return (
    <>
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      validationBehavior="native"
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
    >
      <Input
        isRequired
        errorMessage="Rensigner votre identifiant "
        label="Pseudo / email"
        labelPlacement="outside"
        name="username"
        placeholder="Pseudo / email"
        type="text"
      />

      <Input
        isRequired
        errorMessage="Rensigner votre mot de passe"
        label="Password"
        labelPlacement="outside"
        name="password"
        placeholder="Mot de passe"
        type="password"
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Sign in
        </Button>
        <Button onPress={onOpen}>Sign up</Button>

      </div>
      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Register</ModalHeader>
            <ModalBody>
              <Form
                className="w-full max-w-xs flex flex-col gap-4"
                validationBehavior="native"
                onSubmit={handleLoginSubmit}
              >
                <Input
                  isRequired
                  errorMessage="Rensigner votre identifiant "
                  label="Pseudo / email"
                  labelPlacement="outside"
                  name="username"
                  placeholder="Pseudo / email"
                  type="text"
                />

                <Input
                  isRequired
                  errorMessage="Rensigner votre mot de passe"
                  label="Password"
                  labelPlacement="outside"
                  name="password"
                  placeholder="Mot de passe"
                  type="password"
                />
                <div className="flex gap-2">
                  <Button color="primary" type="submit">
                    Register
                  </Button>
                </div>
                {action && (
                  <div className="text-small text-default-500">
                    Action: <code>{action}</code>
                  </div>
                )}
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
    </>
  );
};

export default Login;
