import React, { useState } from "react";
import { RadioGroup, Radio, Input, Button } from "@heroui/react";

const NewForm: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputValue.trim() === "") {
      setSelectedOption(event.target.value);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    // If text is entered, reset the selected option
    if (event.target.value.trim() !== "") {
      setSelectedOption(null);
    }
  };

  const handleSubmit = () => {
    if (inputValue.trim()) {
      console.log("Submit with custom text:", inputValue);
    } else {
      console.log("Submit with category:", selectedOption);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        value={selectedOption}
        onChange={handleOptionChange} // Handling the change correctly
        label="Select a topic"
      >
        <Radio value="Histoire" disabled={!!inputValue}>
          Histoire
        </Radio>
        <Radio value="Politique" disabled={!!inputValue}>
          Politique
        </Radio>
        <Radio value="Gastronomie" disabled={!!inputValue}>
          Gastronomie
        </Radio>
      </RadioGroup>

      <Input
        isReadOnly={false}
        className="max-w-xs"
        value={inputValue}
        label="Custom Text"
        type="text"
        variant="bordered"
        onChange={handleInputChange} // Handles text input change
      />

      <Button color="primary" onPress={handleSubmit}>
        Submit
      </Button>
    </div>
  );
};

export default NewForm;
