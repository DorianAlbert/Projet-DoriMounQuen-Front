import { Tab, Tabs } from '@heroui/react'
import NewForm from './NewForm'
import History from './History'

export default function QuestionHost() {
  return (
    <Tabs color="primary" radius="full">
      <Tab title="Ask">
        <NewForm />
      </Tab>
      <Tab title="My questions">
        <History />
      </Tab>
    </Tabs>
  )
}
