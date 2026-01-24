import { useState } from 'react'
import SearchResultPage from './components/SearchResultPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <SearchResultPage/>
    </>
  )
}

export default App
