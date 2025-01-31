import { useState } from 'react';
import { Input, Button } from '@heroui/react';

export default function PromptForm() {
  const [value, setValue] = useState('');

  const handleSubmit = () => {
    console.log(value);
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="max-w-xs"
        label="Custom Text"
        type="textarea"
        variant="bordered"
      />
      <Button color="primary" onPress={handleSubmit}>
        Submit
      </Button>
    </div>
  );
}
