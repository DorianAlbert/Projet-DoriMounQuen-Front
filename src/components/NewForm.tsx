import { useState } from 'react'
import { RadioGroup, Radio, Input, Button } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import useClientProvider from '../hooks/useClientProvider'
import { AIExchangeIn, AIExchangeOut } from '../types'
import useCountryProvider from '../hooks/useCountryProvider'
import AIResponse from './AIResponse'

export default function NewForm() {
  const [selectedOption, setSelectedOption] = useState<string>("Histoire")
  const [inputValue, setInputValue] = useState<string>('')
  const {country} = useCountryProvider()

  const handleOptionChange = (value: string) => {
    if (!inputValue.trim()) {
      setSelectedOption(value)
    }
  }

  const handleInputChange = (value: string) => {
    setInputValue(value)
  }
  
  const { client } = useClientProvider()

  const [response, setResponse] = useState<AIExchangeOut | null>(null)

  const { mutate, isPending } = useMutation<AIExchangeOut, unknown, AIExchangeIn>({
    mutationFn: data => client!.fetchUserExchange(data),
    onError: e => console.log(e),
    onSuccess: (d, _x, _xx) => setResponse(d)
  })

  const handleSubmit = () => mutate({
    country: country!.properties.ISO_A2,
    language: navigator.language,
    topic: selectedOption !== 'Autre' ? selectedOption! : inputValue
  })

  const canSubmit = selectedOption !== 'Autre' ? true : (inputValue.trim().length > 1)

  return (
    <div className="flex flex-col gap-4">
      <RadioGroup
        value={selectedOption}
        onValueChange={handleOptionChange}
        label="Select a topic"
      >
        <Radio value="Histoire">
          Histoire
        </Radio>
        <Radio value="Politique">
          Politique
        </Radio>
        <Radio value="Gastronomie">
          Gastronomie
        </Radio>
        <Radio value="Autre">
          Autre
        </Radio>
      </RadioGroup>
      <Input
        isReadOnly={false}
        className="max-w-xs"
        value={inputValue}
        label="Custom Text"
        type="text"
        variant="bordered"
        onValueChange={handleInputChange}
        isDisabled={selectedOption != 'Autre'}
      />
      <Button color="primary" onPress={handleSubmit} isLoading={isPending} isDisabled={!canSubmit}>
        Submit
      </Button>
      { response && <AIResponse data={response} /> }
    </div>
  )
}