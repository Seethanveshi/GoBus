import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, Router, RouterProvider } from 'react-router-dom'
import MainLayout from './MainLayout.jsx'
import SearchResultPage from './components/SearchResultPage.jsx'
import SearchForm from './components/searchForm/SearchForm.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout /> }>
        <Route path='' element={<SearchForm />} />
        <Route path='/search' element={<SearchResultPage />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
