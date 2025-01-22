// components/NewForm.tsx
import React, { useState } from "react";
import { CheckboxGroup, Checkbox, Textarea, Button } from "@heroui/react";

const NewForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [textareaValue, setTextareaValue] = useState("");

  const handleOptionChange = (value: string[]) => {
    setSelectedOption(value[0]); // Gérer un seul choix
  };

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value);
  };

  const handleSubmit = () => {
    if (textareaValue.trim()) {
      console.log("Submit with custom text:", textareaValue);
    } else {
      console.log("Submit with category:", selectedOption);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <CheckboxGroup
        value={selectedOption ? [selectedOption] : []}
        onChange={handleOptionChange}
        label="Select a topic"
      >
        <Checkbox value="Histoire">Histoire</Checkbox>
        <Checkbox value="Politique">Politique</Checkbox>
        <Checkbox value="Gastronomie">Gastronomie</Checkbox>
      </CheckboxGroup>

      <Textarea
        label="Custom Input"
        placeholder="Enter custom text"
        value={textareaValue}
        onChange={handleTextareaChange}
      />
      <Button color="primary" onPress={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default NewForm;
