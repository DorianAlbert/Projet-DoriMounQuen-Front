import './App.css'
import { Route, Routes } from 'react-router'
import { HeroUIProvider } from '@heroui/react'
import HomePage from './components/HomePage.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HeroUIProvider>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </HeroUIProvider>
    </QueryClientProvider>
  )
}

export default App
