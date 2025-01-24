import { Accordion, AccordionItem } from '@heroui/react'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import useClientProvider from '../hooks/useClientProvider'
import { AIExchangeOut } from '../types'
import AIResponse from './AIResponse'

export default function QuestionHistory() {
  const [questions, setQuestions] = useState<AIExchangeOut[]>([])
  const { client } = useClientProvider()
  const { mutate, isError } = useMutation({
    mutationFn: () => client!.fetchUserHistory(),
    onError: err => console.log(err),
    onSuccess: d => setQuestions(d)
  })

  useEffect(() => mutate(), [])

  return (
    <>
      {isError && <div>Failed to fetch your history</div>}
      {!isError && (
        <Accordion>
          {questions.map((a, i) => (
            <AccordionItem key={i} title={a.country} subtitle={a.topic}>
              <AIResponse data={a} />
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </>
  )
}
