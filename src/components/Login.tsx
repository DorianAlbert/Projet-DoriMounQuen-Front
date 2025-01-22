import React, { useState, FormEvent } from 'react';
import { Form, Input, Button } from '@heroui/react';

interface FormData {
  username: string;
  email: string;
}

const Login: React.FC = () => {
  const [action, setAction] = useState<string | null>(null);

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: FormData = Object.fromEntries(formData) as FormData;
    setAction(`submit ${JSON.stringify(data)}`);
  };

  const handleFormReset = () => {
    setAction("reset");
  };

  return (
    <Form
      className="w-full max-w-xs flex flex-col gap-4"
      validationBehavior="native"
      onReset={handleFormReset}
      onSubmit={handleFormSubmit}
    >
      <Input
        isRequired
        errorMessage="Please enter a valid username"
        label="Username"
        labelPlacement="outside"
        name="username"
        placeholder="Enter your username"
        type="text"
      />

      <Input
        isRequired
        errorMessage="Please enter a valid email"
        label="Email"
        labelPlacement="outside"
        name="email"
        placeholder="Enter your email"
        type="email"
      />
      <div className="flex gap-2">
        <Button color="primary" type="submit">
          Submit
        </Button>
        <Button type="reset" variant="flat">
          Reset
        </Button>
      </div>
      {action && (
        <div className="text-small text-default-500">
          Action: <code>{action}</code>
        </div>
      )}
    </Form>
  );
};

export default Login;
