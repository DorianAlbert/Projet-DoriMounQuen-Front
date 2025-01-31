import { Tab, Tabs } from '@heroui/react'
import NewForm from './NewForm'
import QuestionHistory from './QuestionHistory'

export default function QuestionHost() {
  return (
    <Tabs color="primary" radius="full">
      <Tab title="Ask">
        <NewForm />
      </Tab>
      <Tab title="My questions">
        <QuestionHistory />
      </Tab>
    </Tabs>

  )
}
